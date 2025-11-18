// 个人简介页 JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

const timeline = document.querySelector('[data-timeline]');
const toggle = document.getElementById('timeline-edit-toggle');
const addBtn = document.getElementById('timeline-add');
if (timeline && toggle && addBtn) {
  let editing = false;
  const setState = () => {
    timeline.setAttribute('contenteditable', editing);
    toggle.textContent = editing ? '完成编辑' : '开启编辑';
    toggle.classList.toggle('active', editing);
    addBtn.disabled = !editing;
  };
  toggle.addEventListener('click', () => {
    editing = !editing;
    setState();
  });
  addBtn.addEventListener('click', () => {
    if (!editing) {
      editing = true;
      setState();
    }
    const node = document.createElement('div');
    node.className = 'timeline-item';
    node.innerHTML = '<h3>新旅程 · 待命名</h3><p>在此记录新的线路、年份与地点。</p>';
    timeline.appendChild(node);
    node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

const bioToggle = document.getElementById('bio-edit-toggle');
const bioText = document.querySelector('[data-bio]');
if (bioToggle && bioText) {
  let editingBio = false;
  const syncBioState = () => {
    bioText.setAttribute('contenteditable', editingBio);
    bioToggle.textContent = editingBio ? '完成编辑' : '开启编辑';
    bioToggle.classList.toggle('active', editingBio);
  };
  bioToggle.addEventListener('click', () => {
    editingBio = !editingBio;
    syncBioState();
    if (editingBio) {
      bioText.focus();
    }
  });
}

const badgeContainer = document.querySelector('[data-badges]');
const badgeAddBtn = document.getElementById('badge-add-btn');
const badgeDeleteBtn = document.getElementById('badge-delete-btn');
if (badgeContainer && badgeAddBtn && badgeDeleteBtn) {
  badgeAddBtn.addEventListener('click', () => {
    const tag = prompt('输入新的标签内容：');
    if (!tag) return;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = tag.trim();
    badgeContainer.insertBefore(badge, badgeContainer.querySelector('.badge-actions'));
  });

  badgeDeleteBtn.addEventListener('click', () => {
    const badges = badgeContainer.querySelectorAll('.badge');
    if (!badges.length) return;
    const names = Array.from(badges).map((b, idx) => `${idx + 1}. ${b.textContent}`).join('\n');
    const index = prompt(`输入要删除的标签序号：\n${names}`);
    const idx = Number(index);
    if (!idx || idx < 1 || idx > badges.length) return;
    badges[idx - 1].remove();
  });
}

const portraitTrigger = document.getElementById('portrait-trigger');
const portraitInput = document.getElementById('portrait-input');
const portraitImg = document.getElementById('portrait-img');
if (portraitTrigger && portraitInput && portraitImg) {
  const PORTRAIT_KEY = 'profile-portrait-data';
  const cached = localStorage.getItem(PORTRAIT_KEY);
  if (cached) {
    portraitImg.src = cached;
  }
  portraitTrigger.addEventListener('click', () => portraitInput.click());
  portraitInput.addEventListener('change', () => {
    const [file] = portraitInput.files || [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      if (!data) return;
      portraitImg.src = data;
      localStorage.setItem(PORTRAIT_KEY, data);
    };
    reader.readAsDataURL(file);
  });
}

const editableCards = document.querySelectorAll('[data-editable-card]');
editableCards.forEach(card => {
  const button = card.querySelector('.card-edit');
  const content = card.querySelector('p');
  if (!button || !content) return;
  let editing = false;
  const sync = () => {
    content.setAttribute('contenteditable', editing);
    button.textContent = editing ? '完成编辑' : '开启编辑';
    button.classList.toggle('active', editing);
  };
  button.addEventListener('click', () => {
    editing = !editing;
    sync();
    if (editing) content.focus();
  });
});

