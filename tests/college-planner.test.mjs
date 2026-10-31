import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { MAJORS, IDENTITIES } from '../rulesets/index.js';
import languages from '../rulesets/languages-115.js';
import { store } from '../ui/store.js';
import { evaluate, mergeModules, validateRuleset } from '../engine/index.js';
import mse from '../rulesets/minor.mse.js';
beforeEach(() => store.reset());

test('只提供指定入學主修與四個全名輔系，各單選組合有效', () => {
  assert.deepEqual(MAJORS.map(m=>m.id), ['major.dongji-114']);
  assert.deepEqual(IDENTITIES.map(m=>m.label), ['外國語文學系','計量財務金融學系','材料科學工程學系','電機工程學系']);
  for(const minor of [null,...IDENTITIES]) {
    const rules=mergeModules([...MAJORS,...(minor?[minor]:[])]);
    assert.equal(validateRuleset(rules).filter(i=>i.level==='error').length,0);
  }
});
test('舊規劃移除個人欄位及不支援主修，保留課程、學期與身分', () => {
  store.importPlan({majorId:'major.ee-114',meta:{studentName:'legacy person'},studentName:'legacy person',studentId:'123',identityIds:['minor.qf'],courses:[{id:'c1',name:'統計學一',credit:3,tag:'tag.minor-qf',semester:'y2s1'}]});
  assert.equal(store.plan.majorId,'major.dongji-114');
  assert.equal(store.plan.courses[0].semester,'y2s1');
  assert.equal(store.plan.identityIds[0],'minor.qf');
  assert.ok(!store.exportPlan().includes('legacy person'));
  assert.ok(!store.exportPlan().includes('studentId'));
});
test('材料輔系須必修9學分及選修至少11學分', () => {
  const courses=mse.subjectGroups[0].items.map((c,i)=>({...c,id:'c'+i,semester:'y2s1'}));
  assert.equal(evaluate({courses},mergeModules([mse])).subject.allSatisfied,false);
  courses.push(...mse.subjectGroups[1].items.slice(0,4).map((c,i)=>({...c,id:'e'+i,semester:'y3s1'})));
  assert.equal(evaluate({courses},mergeModules([mse])).subject.allSatisfied,true);
});
test('移除非學分班與英文佔位課，保留主修英文學分門檻', () => {
  assert.ok(languages.every(g=>g.rule.type==='optional'));
  assert.ok(languages.flatMap(g=>g.items).every(c=>c.credit>0 && !c.name.includes('非學分')));
  assert.ok(!MAJORS[0].subjectGroups.flatMap(g=>g.items||[]).some(c=>c.tag==='tag.english'));
  assert.equal(MAJORS[0].categories.flatMap(c=>c.buckets).find(b=>b.id==='bkt.english').minCredits,8);
});
test('切換及取消輔系保留課程並重新歸類，最多一個輔系', () => {
  store.addIdentity('minor.qf');
  store.addCourse({name:'統計學一',credit:3,tag:'tag.minor-qf',semester:'y2s1'});
  store.addIdentity('minor.fl');
  assert.deepEqual(store.plan.identityIds,['minor.fl']);
  assert.equal(store.plan.courses[0].tag,'tag.major-elective');
  assert.equal(store.ruleset.totalCredits,151);
  store.selectMinor('');
  assert.deepEqual(store.plan.identityIds,[]);
  assert.equal(store.ruleset.totalCredits,129);
  assert.equal(store.plan.courses.length,1);
});
test('舊檔多輔系及自訂輔系也受單選限制', () => {
  store.importPlan({identityIds:['minor.qf','minor.fl'],customIdentities:[{id:'custom.m',type:'minor',label:'自訂輔系',credits:20}],courses:[{id:'c1',name:'英語聽講一',credit:2,tag:'tag.minor-fl',semester:'y2s1'}]});
  assert.deepEqual(store.plan.identityIds,['minor.qf']);
  assert.equal(store.plan.customIdentities.length,0);
  assert.equal(store.plan.courses[0].tag,'tag.major-elective');
  const id=store.addCustomIdentity({type:'minor',label:'自訂輔系',credits:20});
  assert.deepEqual(store.plan.identityIds,[]);
  assert.equal(store.plan.customIdentities[0].id,id);
  store.addIdentity('minor.ee');
  assert.deepEqual(store.plan.identityIds,['minor.ee']);
  assert.equal(store.plan.customIdentities.length,0);
});
