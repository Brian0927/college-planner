import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, mergeModules } from '../engine/index.js';
import { store } from '../ui/store.js';
import major from '../rulesets/major.dongji-114.js';
const rules=mergeModules([major]);
const bucket=(report,id)=>report.credit.categories.flatMap(c=>c.buckets).find(b=>b.id===id);
const course=(name,credit,tag,semester='y1s1')=>({id:name+semester,name,credit,tag,semester});
const german=[course('初級德語一',3,'tag.major-elective'),course('初級德文二',3,'tag.major-elective','y1s2')];
const run=(courses,options={englishRoute:'advanced-german'},tagEdits={})=>evaluate({courses,options,tagEdits},rules);
beforeEach(()=>store.reset());

test('德語一二只計英文領域6學分，不重複計選修、不虛增2學分',()=>{
  const r=run(german);
  assert.equal(bucket(r,'bkt.english').earned,6);
  assert.equal(bucket(r,'bkt.english').target,6);
  assert.equal(bucket(r,'bkt.english').replacement.completed,true);
  assert.equal(bucket(r,'bkt.elective').earned,0);
  assert.equal(r.credit.total.earned,6);
  assert.equal(r.credit.total.target,129);
  assert.equal(r.credit.categories.find(c=>c.id==='cat.school').target,28);
  assert.equal(german[0].tag,'tag.major-elective','引擎不改動輸入');
});
test('未排定、只修一門、重複同一門均不視為完成外語替代',()=>{
  for(const courses of [[german[0]],[...german.map(c=>({...c,semester:null}))],[german[0],{...german[0],id:'repeat',semester:'y2s1'}]]) {
    assert.equal(bucket(run(courses),'bkt.english').replacement.completed,false);
    assert.equal(bucket(run(courses),'bkt.english').met,false);
  }
});
test('舊檔與已鎖課程自動移列英文；切換一般英文方案可還原歸類',()=>{
  store.importPlan({courses:german,lockedSemesters:['y1s1','y1s2']});
  assert.ok(store.plan.courses.every(c=>c.tag==='tag.english'));
  assert.equal(store.plan.courses[0].semester,'y1s1');
  store.setOption('englishRoute','standard');
  assert.ok(store.plan.courses.every(c=>c.tag==='tag.major-elective'));
  assert.equal(bucket(evaluate(store.plan,store.ruleset),'bkt.english').target,8);
});
test('舊的標籤搬移設定不能讓德語替代課重複算進其他選修',()=>{
  const r=run(german,undefined,{moves:{'tag.english':'bkt.elective'}});
  assert.equal(bucket(r,'bkt.english').earned,6);
  assert.equal(bucket(r,'bkt.elective').earned,0);
});
test('體育零學分仍記門數，重複興趣項目可認列，但須大一體育',()=>{
  const pe=[course('大一體育',0,'tag.pe-first'),...[1,2,3,4,5].map(i=>course('羽球',0,'tag.pe','y'+i+'s1'))];
  const r=run(pe);
  assert.equal(bucket(r,'bkt.pe').met,true);
  assert.equal(bucket(r,'bkt.pe').courses.length,6);
  assert.equal(r.credit.total.earned,0);
  assert.equal(r.credit.exceptions.duplicates.length,0);
  assert.equal(bucket(run(pe.slice(1)),'bkt.pe').met,false);
});
test('核心四向度沒有各自學分限制，但通識合計仍須20且不重算其他選修',()=>{
  const core=[1,2,3,4].map(i=>course('核心'+i,1,'tag.ge-core-'+i));
  assert.equal(bucket(run(core),'bkt.ge').met,false);
  const r=run([...core,course('一般通識',16,'tag.ge-general')]);
  assert.equal(bucket(r,'bkt.ge').met,true);
  assert.equal(bucket(r,'bkt.ge').checks.length,1);
  assert.equal(bucket(r,'bkt.elective').earned,0);
});
test('外語方案減少的2學分仍須補足129，可由任何類別的實修學分補足',()=>{
  const courses=[...german,course('大學中文',2,'tag.chinese'),course('其餘選修',20,'tag.major-elective')];
  courses.push(...major.subjectGroups.find(g=>g.id==='grp.dept').items.map(c=>course(c.name,c.credit,c.tag)));
  courses.push(course('工程光學',3,'tag.physics'),course('電磁學',3,'tag.physics'));
  courses.push(...[1,2,3,4].map(i=>course('核心'+i,2,'tag.ge-core-'+i)),course('一般通識',12,'tag.ge-general'));
  courses.push(...['控制系統一','控制系統二','電子學二','振動學','數值分析'].map(n=>course(n,3,'tag.track')));
  courses.push(course('大一體育',0,'tag.pe-first'),...[1,2,3,4,5].map(i=>course('羽球',0,'tag.pe','y'+i+'s1')));
  const options={englishRoute:'advanced-german',track:'control'};
  const r=run(courses,options);
  assert.equal(r.credit.total.earned,127);
  assert.equal(r.credit.total.remaining,2);
  assert.equal(r.credit.total.met,false);
  const full=run([...courses,course('額外系選修',2,'tag.dept')],options);
  assert.equal(full.credit.total.earned,129);
  assert.equal(full.credit.total.met,true);
});
