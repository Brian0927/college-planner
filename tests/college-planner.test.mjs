import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { MAJORS, IDENTITIES } from '../rulesets/index.js';
import languages from '../rulesets/languages-115.js';
import { store } from '../ui/store.js';
import { evaluate, mergeModules, validateRuleset } from '../engine/index.js';
import mse from '../rulesets/minor.mse.js';
beforeEach(() => store.reset());

test('只提供指定入學主修與四個全名輔系，全部16種組合有效', () => {
  assert.deepEqual(MAJORS.map(m=>m.id), ['major.dongji-114']);
  assert.deepEqual(IDENTITIES.map(m=>m.label), ['外國語文學系','計量財務金融學系','材料科學工程學系','電機工程學系']);
  for(let mask=0; mask<16; mask++) {
    const rules=mergeModules([...MAJORS,...IDENTITIES.filter((m,i)=>mask & (1<<i))]);
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
test('語言選修不增加必修要求，粵語非學分與停開狀態明列', () => {
  assert.ok(languages.every(g=>g.rule.type==='optional'));
  const cantonese=languages.flatMap(g=>g.items).find(c=>c.name.includes('粵語'));
  assert.equal(cantonese.credit,0);
  assert.match(cantonese.note,/停開/);
  store.addCourse({...cantonese,semester:'y2s1'});
  assert.equal(evaluate(store.plan,store.ruleset).credit.total.earned,0);
});
