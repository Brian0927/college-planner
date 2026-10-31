import { normalizeName } from './ruleset.js';

export const GERMAN_BEGINNERS = [['初級德語一', '初級德文一'], ['初級德語二', '初級德文二']];
export const isGermanBeginner = name => GERMAN_BEGINNERS.some(names => names.some(n => normalizeName(n) === normalizeName(name)));

/** 個人方案只調整要求，不增加抵免的虛擬學分。 */
export function resolvePlanRules(plan, ruleset) {
  if (plan.options?.englishRoute !== 'advanced-german') return { plan, ruleset };
  const categories = ruleset.categories.map(cat => ({
    ...cat,
    minCredits: cat.id === 'cat.school' ? cat.minCredits - 2 : cat.minCredits,
    buckets: cat.buckets.map(b => b.id !== 'bkt.english' ? { ...b, tags: b.tags.filter(t => t !== 'tag.english') } : {
      ...b, minCredits: 6,
      tags: [...new Set([...b.tags, 'tag.english'])],
      note: '進階生第二外語方案：同一語言 6 學分。比原英文領域 8 學分少的 2 學分，須以任意課程補足畢業總學分 129；不自動贈予抵免學分。',
      replacement: { groups: GERMAN_BEGINNERS, label: '初級德語一、二替代英文領域' },
    }),
  }));
  const courses = plan.courses.map(c => isGermanBeginner(c.name) ? { ...c, tag: 'tag.english' } : c);
  return { plan: { ...plan, courses }, ruleset: { ...ruleset, categories } };
}

export function normalizePlanCourse(course, options = {}) {
  if (isGermanBeginner(course.name)) {
    if (options.englishRoute === 'advanced-german') course.tag = 'tag.english';
    else if (course.tag === 'tag.english') course.tag = 'tag.major-elective';
  }
  if (/^(大一)?體育/.test(course.name) && (!course.tag || course.tag === 'tag.major-elective')) course.tag = 'tag.pe';
  return course;
}
