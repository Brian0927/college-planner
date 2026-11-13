/**
 * engine/index.js — 判定引擎對外的唯一入口
 *
 * UI 只需要知道這一個函式：
 *   const report = evaluate(plan, ruleset);
 *
 * 引擎是純函式：同樣的 plan + ruleset 一定得到同樣的 report，
 * 不碰 DOM、不碰 localStorage、不碰 window，所以可以直接在 Node 裡跑測試。
 *
 * ── plan（學生的規劃）─────────────────────────
 * {
 *   rulesetId: 'dongji-113',
 *   options:  { track:'control', minor:'qf' },
 *   courses:  [{ id, name, credit, tag, semester, note, section }],   section＝選的班（科號），見 schedule.js
 *   tagEdits: { tags:{}, moves:{}, custom:[] }
 * }
 *
 * ── report（判定結果）─────────────────────────
 * {
 *   subject: { groups, allSatisfied, totals, missing },
 *   credit:  { categories, total, exceptions, allocations },
 *   issues:  [{ level, message }]
 * }
 */

import { applyTagEdits, buildIndex, validateRuleset } from './ruleset.js';
import { evaluateSubjects } from './subject.js';
import { evaluateCredits } from './credit.js';
import { resolvePlanRules } from './plan-rules.js';
import { evaluatePrograms, physicsProgramCredits, PROGRAM_GROUP_PREFIX } from './programs.js';

export function evaluate(plan, baseRuleset) {
  const base = applyTagEdits(baseRuleset, plan.tagEdits || {});
  const issues = validateRuleset(base);
  const pendingExchange = new Set((plan.exchangeSemesters || []).filter(id => !(plan.approvedExchangeSemesters || []).includes(id)));
  const assessablePlan = pendingExchange.size
    ? { ...plan, courses: (plan.courses || []).filter(course => !pendingExchange.has(course.semester)) }
    : plan;
  const resolved = resolvePlanRules(assessablePlan, base);
  const ruleset = resolved.ruleset;
  plan = resolved.plan;
  const index = buildIndex(ruleset, plan.options || {});

  const programs = evaluatePrograms(plan, ruleset);
  const subject = evaluateSubjects(plan, ruleset);
  if (programs.programs.length) {
    const eligible = new Set(programs.programs.flatMap(program => program.courses.map(course => course.id)));
    plan = { ...plan, courses: (plan.courses || []).map(course =>
      eligible.has(course.id) && !course.tag
        ? { ...course, tag: 'tag.track' } : course) };
  }
  const credit = evaluateCredits(plan, ruleset, index, programs.programs);

  if (programs.programs.length) {
    subject.programRequired = true;
    subject.programSatisfied = programs.recognized.length > 0;
    subject.allSatisfied &&= subject.programSatisfied;
    const track = credit.categories.find(category => category.id === 'cat.track');
    const physics = credit.categories.flatMap(category => category.buckets).find(bucket => bucket.id === 'bkt.physics');
    if (track) {
      const bucket = track.buckets.find(bucket => bucket.id === 'bkt.track');
      const complete = programs.programs.filter(program => program.complete);
      const candidates = complete.map(program => {
        const matchingIds = new Set(program.courses.map(course => course.id));
        const scheduled = bucket.courses.filter(row => matchingIds.has(row.courseId)).reduce((sum, row) => sum + row.counted, 0);
        const shared = physicsProgramCredits([program], physics?.courses || []);
        return { credits: scheduled + shared, shared };
      }).sort((a, b) => b.credits - a.credits || a.shared - b.shared);
      const { credits: qualifyingCredits, shared } = candidates[0] || { credits: 0, shared: 0 };
      bucket.sharedCredits = shared;
      bucket.remaining = Math.max(0, bucket.target - qualifyingCredits);
      bucket.met = bucket.remaining === 0 && programs.recognized.length > 0;
      track.remaining = bucket.remaining;
      track.met = bucket.met;
      credit.total.met = credit.total.remaining === 0 && credit.categories.every(category => category.met);
    }
  }

  if (plan.options?.englishRoute === 'advanced-german') {
    const elective = credit.categories.flatMap(category => category.buckets).find(bucket => bucket.id === 'bkt.elective');
    if (elective) {
      const surplus = Math.max(0, credit.total.earned - (credit.total.target - 2),
        credit.categories.reduce((sum, category) =>
          sum + Math.max(0, category.earned - category.target), 0));
      elective.englishSupplement = { target: 2, remaining: Math.max(0, 2 - surplus) };
    }
  }

  return {
    rulesetId: ruleset.id,
    rulesetLabel: ruleset.label,
    subject,
    credit,
    programs,
    issues,
  };
}

/** 給 UI 用的展平標籤表：一次拿到標籤 → 項目 → 大類 的對照。 */
export function tagTable(plan, baseRuleset) {
  const ruleset = applyTagEdits(baseRuleset, plan.tagEdits || {});
  const index = buildIndex(ruleset, plan.options || {});
  return ruleset.tags.map((t) => {
    const bucketId = index.bucketOfTag.get(t.id);
    const bucket = bucketId ? index.bucketById.get(bucketId) : null;
    return {
      ...t,
      bucketId: bucketId || null,
      bucketLabel: bucket ? bucket.label : null,
      categoryId: bucket ? bucket.categoryId : null,
      categoryLabel: bucket ? bucket.categoryLabel : null,
      active: bucket ? bucket.active : false,
    };
  });
}

export { applyTagEdits, buildIndex, validateRuleset } from './ruleset.js';
export { normalizeName, isCounted, isActive } from './ruleset.js';
export { optionCombos, sumCategories, sumBuckets } from './ruleset.js';
export { mergeModules, customModule, typeLabel } from './merge.js';
export { DAYS, PERIODS, termOf, sourcesFor, findSection, sectionCandidates, searchOfferings } from './schedule.js';
export { slotsOf, findConflicts, sortSlots, cleanSlots, customSection, termHint } from './schedule.js';
export { parsePrereq, checkPrereq, prereqTextFor } from './schedule.js';
