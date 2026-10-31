/**
 * ui/views/setup.js — 身分別設定 ＋ 規定科目與語言選修匯入
 *
 * 畢業學分要求由身分別相加而來：主修動機系 129 ＋ 輔系計財 20 ＝ 149。
 * 匯入清單直接從合併後的規則集長出來，每門課自動帶上規則建議的標籤。
 */

import { store } from '../store.js';
import { $, esc, num, toast, delegate } from '../dom.js';
import { MAJORS, IDENTITIES } from '../../rulesets/index.js';
import languageGroups from '../../rulesets/languages-115.js';
import { isActive, typeLabel } from '../../engine/index.js';

let bound = false;

export function renderSetup() {
  const { plan, ruleset } = store;
  const major = MAJORS.find((m) => m.id === plan.majorId);

  /* 草稿或未核對的資料，畫面上要講清楚 */
  const dataWarnings = store.modules
    .filter((m) => m.dataNote)
    .map((m) => `${m.label}：${m.dataNote}`);

  $('#setupBox').innerHTML = `
    <fieldset class="pick-group">
      <legend>主修（114 學年入學）</legend>
      ${MAJORS.map((m) => majorRow(m, m.id === plan.majorId)).join('')}
    </fieldset>

    <fieldset class="pick-group">
      <legend>輔系（最多選一個）</legend>
      <label class="pick-row"><input type="radio" name="minorPick" value="" ${!plan.identityIds.length && !plan.customIdentities.some(c => c.type === 'minor') ? 'checked' : ''}><span class="nm">不修輔系</span></label>
      ${IDENTITIES.map((m) => identityRow(m, plan.identityIds.includes(m.id))).join('')}
      ${plan.customIdentities.filter(c => c.type === 'minor').map((c) => customRow(c)).join('')}
    </fieldset>
    ${plan.customIdentities.some(c => c.type !== 'minor') ? `<fieldset class="pick-group"><legend>其他身分</legend>${plan.customIdentities.filter(c => c.type !== 'minor').map(c => customRow(c)).join('')}</fieldset>` : ''}

    ${
      dataWarnings.length
        ? `<div class="data-warn">${dataWarnings.map((w) => esc(w)).join('<br>')}</div>`
        : ''
    }

    <div class="credit-sum">
      ${store.modules
        .map(
          (m) =>
            `<div class="cs-row"><span>${esc(typeLabel(m.type))}　${esc(m.label)}</span><span class="mono">${num(
              m.totalCredits
            )}</span></div>`
        )
        .join('')}
      <div class="cs-row total"><span>畢業應修學分</span><span class="mono">${num(ruleset.totalCredits)}</span></div>
    </div>


    ${(ruleset.options || [])
      .map(
        (opt) => `
      <label for="opt-${esc(opt.id)}">${esc(opt.label)}</label>
      <select id="opt-${esc(opt.id)}" data-option="${esc(opt.id)}">
        ${opt.choices
          .map(
            (ch) =>
              `<option value="${esc(ch.value)}" ${
                (plan.options[opt.id] || '') === ch.value ? 'selected' : ''
              }>${esc(ch.label)}</option>`
          )
          .join('')}
      </select>`
      )
      .join('')}

    <details class="footnote"><summary>115 學年度資料來源與適用規定</summary>
      <p>主修依指定的 114 入學科目表；輔系依 115 學年度系網現行規定。原修訂日期保留，未改稱 115 新制。</p>
      ${store.modules.filter(m => m.source).map(m => `<p>${esc(m.label)}：${esc(m.source)} ${m.sourceUrl ? `<a href="${esc(m.sourceUrl)}" target="_blank" rel="noopener noreferrer">官方來源</a>` : ''}</p>`).join('')}
      <p><a href="https://curricul.site.nthu.edu.tw/p/406-1208-111356,r7883.php?Lang=zh-tw" target="_blank" rel="noopener noreferrer">115 上學分課程來源</a></p>
      <p>開課時段依 115 上官方快照。115 下僅列已確認的課程階段；正式開課以學校公告為準。</p>
    </details>
  `;

  renderImportPanel();
  if (!bound) bindEvents();
}

/* ── 勾選列 ───────────────────────────────── */
function majorRow(m, checked) {
  const year = m.admissionYear ? `${m.admissionYear} 學年入學` : '';
  return `
    <label class="pick-row${m.draft ? ' draft' : ''}">
      <input type="radio" name="majorPick" value="${esc(m.id)}" ${checked ? 'checked' : ''}>
      <span class="nm">${esc(m.label)}${year ? `<span class="meta">${esc(year)}</span>` : ''}</span>
      ${m.draft ? '<span class="flag-draft">草稿</span>' : ''}
      <span class="mono cr">${m.totalCredits ? num(m.totalCredits) : '—'}</span>
    </label>`;
}

function identityRow(m, checked) {
  return `
    <label class="pick-row">
      <input type="radio" name="minorPick" value="${esc(m.id)}" data-identity="${esc(m.id)}" ${checked ? 'checked' : ''}>
      <span class="nm">${esc(typeLabel(m.type))}　${esc(m.label)}</span>
      <span class="mono cr">＋${num(m.totalCredits)}</span>
    </label>`;
}

function customRow(c) {
  return `
    <label class="pick-row">
      <input type="${c.type === 'minor' ? 'radio' : 'checkbox'}" ${c.type === 'minor' ? 'name="minorPick"' : ''} value="${esc(c.id)}" data-identity="${esc(c.id)}" checked>
      <span class="nm">${esc(typeLabel(c.type))}　${esc(c.label)}</span>
      <span class="mono cr">＋${num(c.credits)}</span>
    </label>`;
}

/* ── 規定科目匯入 ─────────────────────────── */
function renderImportPanel() {
  const { plan, ruleset } = store;
  const groups = [...(ruleset.subjectGroups || []).filter((g) => isActive(g, plan.options)), ...languageGroups];
  const rows = groups.map((g) => renderGroup(g, plan.options)).filter(Boolean).join('');

  $('#importBox').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span class="footnote" style="margin:0">勾選後加入，標籤自動帶入</span>
      <button class="link-btn" id="importToggleAll" type="button">全選 / 取消</button>
    </div>
    <div id="importList" style="max-height:300px;overflow-y:auto;border:1px solid var(--hairline);background:#fff;border-radius:2px">
      ${rows || '<p class="empty-note" style="padding:10px">這些身分沒有列出規定科目。</p>'}
    </div>
    <button class="btn-primary" id="importAddBtn" type="button">＋ 加入勾選的課程</button>
  `;
}

function renderGroup(group, options, depth = 0) {
  const children = (group.groups || []).filter((g) => isActive(g, options));
  const items = group.items || [];
  if (!children.length && !items.length) return '';

  const head = `<div style="font-size:10.5px;font-weight:700;letter-spacing:.05em;color:var(--ink-soft);background:var(--paper-dark);padding:5px 10px;padding-left:${
    10 + depth * 10
  }px;position:sticky;top:0">${esc(group.label)}</div>`;

  const note = group.note ? `<p class="footnote" style="padding:4px 10px">${esc(group.note)}</p>` : '';
  const body = items
    .map((item) => {
      const exists = store.hasCourse(item.name);
      return `
      <label style="display:flex;gap:8px;align-items:flex-start;padding:6px 10px;border-bottom:1px solid var(--hairline);font-size:12.5px;cursor:${
        exists ? 'default' : 'pointer'
      };${exists ? 'opacity:.5' : ''}">
        <input type="checkbox" style="width:auto;margin-top:2px"
               data-name="${esc(item.name)}" data-credit="${item.credit}" data-tag="${esc(item.tag || '')}"
               ${exists ? 'checked disabled' : ''}>
        <span style="flex:1;line-height:1.35">${esc(item.name)}${
        item.note ? `<span style="display:block;font-size:10.5px;color:var(--ink-soft);font-style:italic">${esc(item.note)}</span>` : ''
      }</span>
        <span class="mono" style="font-size:11px;color:var(--ink-soft)">${num(item.credit)}</span>
      </label>`;
    })
    .join('');

  return head + note + body + children.map((g) => renderGroup(g, options, depth + 1)).join('');
}

/* ── 事件 ─────────────────────────────────── */
function bindEvents() {
  bound = true;
  const setup = $('#setupBox');

  setup.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'majorPick') return store.setMajor(t.value);
    if (t.name === 'minorPick') {
      store.selectMinor(t.value);
      return toast(t.value ? '已切換輔系；原有課程保留，舊輔系課程改列主修選修' : '已取消輔系；課程保留');
    }
    if (t.dataset.option) return store.setOption(t.dataset.option, t.value);

    if (t.dataset.identity) {
      const id = t.dataset.identity;
      if (t.checked) {
        store.addIdentity(id);
        return toast('已加入身分，畢業學分要求已更新');
      }
      const n = store.identityCourseCount(id);
      const fb = store.fallbackTag;
      const after = fb ? `改成「${fb.label}」` : '變成未設標籤';
      if (n && !confirm(`有 ${n} 門課掛著這個身分的標籤，取消後它們會${after}（課程本身不會被刪除）。確定取消？`)) {
        t.checked = true;
        return;
      }
      store.removeIdentity(id);
      toast('已移除身分');
    }
  });

  const box = $('#importBox');
  delegate(box, 'click', '#importToggleAll', () => {
    const boxes = [...box.querySelectorAll('input[type=checkbox]:not(:disabled)')];
    const allOn = boxes.every((b) => b.checked);
    boxes.forEach((b) => (b.checked = !allOn));
  });
  delegate(box, 'click', '#importAddBtn', () => {
    const picked = [...box.querySelectorAll('input[type=checkbox]:checked:not(:disabled)')];
    if (!picked.length) return toast('先勾選要加入的課程');

    // 同一門課可能同時列在多個群組（例：工程光學既是物理五選二，也是電控學程選修）。
    // 只加一次，標籤取第一次出現的那個，之後可以在卡片上自己改。
    const seen = new Set();
    const unique = [];
    let skipped = 0;
    picked.forEach((b) => {
      const key = b.dataset.name.replace(/\s+/g, '').toLowerCase();
      if (seen.has(key) || store.hasCourse(b.dataset.name)) return skipped++;
      seen.add(key);
      unique.push({ name: b.dataset.name, credit: Number(b.dataset.credit), tag: b.dataset.tag || null });
    });

    if (!unique.length) return toast('勾選的課程都已經在清單裡了');
    store.addCourses(unique);
    toast(
      skipped
        ? `已加入 ${unique.length} 門課，略過 ${skipped} 門重複的`
        : `已加入 ${unique.length} 門課到待排清單`
    );
  });
}
