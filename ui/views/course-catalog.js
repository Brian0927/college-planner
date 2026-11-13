import { OFFERINGS } from '../../offerings/index.js';
import { programGroups } from '../../engine/programs.js';
import { isActive, normalizeName } from '../../engine/index.js';
import languageGroups from '../../rulesets/languages-115.js';

const flowYears = {
  control: {
    2: ['電路學', '電子學一', '電子電路實驗一'],
    3: ['電子學二', '控制系統一', '控制系統二', '邏輯設計與應用', '系統動態分析', '電磁學', '電動機械'],
    4: ['微算機導論', '電子電路分析', '數位控制系統', '聲學陣列信號處理', '微奈米系統之感測與致動', '非線性控制系統', '線性系統理論', '生醫微系統'],
  },
  nano: {
    1: ['應用力學一'],
    2: ['材料力學', '微系統概論', '固體與奈微米力學導論'],
    3: ['高等材料力學', '微機電系統導論', '近代物理導論', '有限單元法導論', '振動學', '奈米科技與應用'],
    4: ['奈米結構力學', '奈米工程', '微奈米製造技術'],
  },
};

const yearByName = new Map();
for (const offering of OFFERINGS.filter(offering => offering.dept === 'PME')) {
  for (const course of offering.courses) {
    const level = /PME\s*([1-8])\d{5}/.exec(course.no)?.[1];
    if (level) yearByName.set(normalizeName(course.name), Math.min(Number(level), 4));
  }
}

function yearMatches(item, program, year) {
  if (!year) return true;
  const names = [item.name, ...(item.aliases || [])].map(normalizeName);
  const flow = flowYears[program] || {};
  const suggested = Object.keys(flow).find(level => flow[level].some(name => names.includes(normalizeName(name))));
  return Number(suggested || names.map(name => yearByName.get(name)).find(Boolean) || (item.note?.includes('研究所') ? 4 : 0)) === Number(year);
}

export function catalogGroups(plan, ruleset) {
  const { track, catalogYear } = plan.options;
  const programs = programGroups(ruleset);
  const standard = (ruleset.subjectGroups || []).filter(group => !programs.includes(group) && isActive(group, plan.options));
  const department = standard.find(group => group.id === 'grp.dept');
  const trackRows = programs.filter(group => !track || group.id.endsWith('.' + track)).map(group => {
    const id = group.id.split('.').at(-1);
    const supportingNames = Object.values(flowYears[id] || {}).flat();
    const supporting = (department?.items || []).filter(item =>
      [item.name, ...(item.aliases || [])].some(name => supportingNames.includes(name)) && yearMatches(item, id, catalogYear));
    const groups = group.groups.map(child => ({ ...child, items: child.items.filter(item => yearMatches(item, id, catalogYear)) }));
    if (supporting.length && (track || catalogYear)) groups.unshift({ label: '流程圖中的系定必修', items: supporting });
    return { ...group, groups };
  });
  if (catalogYear || track) return trackRows;
  return [...standard, ...trackRows, ...languageGroups, ...generalEducationGroups()];
}

function generalEducationGroups() {
  const areas = new Map();
  const ge = OFFERINGS.find(offering => offering.dept === 'GE' && offering.semester === '115-1');
  for (const course of ge?.courses || []) {
    if (course.placeholder || course.credit <= 0 || /日[語文]|法[語文]/.test(course.name)) continue;
    for (const category of course.geCategories || []) {
      if (category.dimension || !category.area || !category.group) continue;
      const label = category.area + '・' + category.group;
      if (!areas.has(label)) areas.set(label, new Map());
      const tag = /藝術.*操作/.test(label) ? 'tag.ge-arts-practice' : 'tag.ge-general';
      areas.get(label).set(course.name, { name: course.name, credit: course.credit, tag });
    }
  }
  return [{ label: '多元選修通識（115 上開課快照）', groups: [...areas].map(([label, items]) => ({ label, items: [...items.values()] })) }];
}
