import { isCounted, normalizeName, toNumber } from './ruleset.js';

export const PROGRAM_GROUP_PREFIX = 'grp.track.';
const PHYSICS_OVERLAP = ['工程光學', '電磁學', '近代物理導論'];

export function programGroups(ruleset) {
  return (ruleset.subjectGroups || []).filter(group => group.id.startsWith(PROGRAM_GROUP_PREFIX));
}

function matches(item, course) {
  return [item.name, ...(item.aliases || [])].some(name =>
    normalizeName(name) === normalizeName(course.name));
}

/** Convert the legacy generic label while leaving existing specific labels alone. */
export function migrateProgramTags(courses, ruleset) {
  const programs = programGroups(ruleset).filter(group =>
    ['tag.track-control', 'tag.track-nano'].includes(group.defaultTag));

  for (const course of courses) {
    if (course.tag !== 'tag.track') continue;
    const core = programs.find(group => group.groups[0].items.some(item => matches(item, course)));
    if (core) {
      course.tag = core.defaultTag;
      continue;
    }
    const electives = programs.filter(group => group.groups[1].items.some(item => matches(item, course)));
    // The shared sensing and actuation elective is filed under nano by default.
    const program = electives.find(group => group.defaultTag === 'tag.track-nano') || electives[0];
    if (program) course.tag = program.defaultTag;
  }
}

export function evaluatePrograms(plan, ruleset) {
  const courses = (plan.courses || []).filter(course => isCounted(course) && toNumber(course.credit) > 0);
  const programs = programGroups(ruleset).map(group => {
    const [core, electives] = group.groups;
    const coreMatches = matchedCourses(core.items, courses, true);
    const requiredKeys = new Set(coreMatches.map(course => course.key));
    const electiveMatches = matchedCourses(electives.items, courses, false)
      .filter(course => !requiredKeys.has(course.key));
    const credits = [...coreMatches, ...electiveMatches].reduce((sum, course) => sum + course.credit, 0);
    const complete = coreMatches.length === core.items.length && electiveMatches.length >= 2 && credits >= 15;

    return {
      id: group.id.slice(PROGRAM_GROUP_PREFIX.length),
      label: group.label,
      core: coreMatches.length,
      coreRequired: core.items.length,
      electives: electiveMatches.length,
      credits,
      missingCore: core.items.filter(item => !coreMatches.some(course => matches(item, course))).map(item => item.name),
      courses: [...coreMatches, ...electiveMatches],
      complete,
      coreMatches,
      electiveMatches,
    };
  });

  const completed = programs.filter(program => program.complete);
  let best = [];
  for (let mask = 1; mask < 2 ** completed.length; mask++) {
    const subset = completed.filter((_, index) => mask & (1 << index));
    if (subset.length > best.length && canAllocate(subset)) best = subset;
  }

  return {
    programs,
    recognized: best.map(program => program.id),
    controlAndNano: ['control', 'nano'].every(id => completed.some(program => program.id === id))
      && canAllocate(completed.filter(program => ['control', 'nano'].includes(program.id))),
  };
}

function matchedCourses(items, courses, core) {
  const matchesByName = new Map();
  for (const item of items) {
    const course = courses.find(course => matches(item, course)
      && (core || toNumber(course.credit) === toNumber(item.credit))
      && (!core || !course.section || /^(?:\d{5}\s*)?PME\b/i.test(course.section)));
    if (course) {
      const key = normalizeName(item.name);
      matchesByName.set(key, { ...course, key, credit: toNumber(course.credit) });
    }
  }
  return [...matchesByName.values()];
}

function canAllocate(programs) {
  const occupied = new Set();
  for (const program of programs) {
    for (const course of program.coreMatches) {
      if (occupied.has(course.key)) return false;
      occupied.add(course.key);
    }
  }

  function allocate(index) {
    if (index === programs.length) return true;
    const program = programs[index];
    const candidates = program.electiveMatches.filter(course => !occupied.has(course.key));
    const coreCredits = program.coreMatches.reduce((sum, course) => sum + course.credit, 0);

    function select(start, count, credits) {
      if (count >= 2 && credits >= 15) return allocate(index + 1);
      for (let i = start; i < candidates.length; i++) {
        const course = candidates[i];
        occupied.add(course.key);
        const fits = select(i + 1, count + 1, credits + course.credit);
        occupied.delete(course.key);
        if (fits) return true;
      }
      return false;
    }

    return select(0, 0, coreCredits);
  }

  return allocate(0);
}

export function physicsProgramCredits(programs, physicsRows) {
  const qualifying = new Set(programs.flatMap(program => program.courses.map(course => course.key)));
  return physicsRows.reduce((sum, row) => {
    const key = normalizeName(row.name);
    return PHYSICS_OVERLAP.includes(key) && qualifying.has(key) ? sum + row.counted : sum;
  }, 0);
}
