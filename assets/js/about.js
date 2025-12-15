// 个人简介页 JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

// ---- 个人简介文案：持久化到 localStorage ----
const BIO_KEY = 'about-bio-text';
const bioToggle = document.getElementById('bio-edit-toggle');
const bioText = document.querySelector('[data-bio]');
if (bioToggle && bioText) {
  // 载入缓存
  const cachedBio = localStorage.getItem(BIO_KEY);
  if (cachedBio) {
    bioText.textContent = cachedBio;
  }

  let editingBio = false;
  const syncBioState = () => {
    bioText.setAttribute('contenteditable', editingBio);
    bioToggle.textContent = editingBio ? '完成编辑' : '开启编辑';
    bioToggle.classList.toggle('active', editingBio);
  };

  const saveBio = () => {
    const value = bioText.textContent.trim();
    localStorage.setItem(BIO_KEY, value);
  };

  bioToggle.addEventListener('click', () => {
    editingBio = !editingBio;
    syncBioState();
    if (editingBio) {
      bioText.focus();
    } else {
      saveBio();
    }
  });

  bioText.addEventListener('blur', () => {
    if (editingBio) saveBio();
  });
}

// ---- 核心标签：持久化到 localStorage ----
const BADGES_KEY = 'about-badges';
const badgeContainer = document.querySelector('[data-badges]');
const badgeAddBtn = document.getElementById('badge-add-btn');
const badgeDeleteBtn = document.getElementById('badge-delete-btn');

const readBadgesFromDOM = () =>
  Array.from(badgeContainer.querySelectorAll('.badge')).map(b => b.textContent.trim());

const saveBadges = () => {
  if (!badgeContainer) return;
  const tags = readBadgesFromDOM();
  localStorage.setItem(BADGES_KEY, JSON.stringify(tags));
};

const renderBadgesFromStore = () => {
  if (!badgeContainer) return;
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(BADGES_KEY) || '[]');
  } catch {
    stored = [];
  }
  if (!stored.length) return;

  // 清除现有 badge，只保留操作按钮容器
  badgeContainer
    .querySelectorAll('.badge')
    .forEach(b => b.remove());

  const actions = badgeContainer.querySelector('.badge-actions');
  stored.forEach(text => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = text;
    badgeContainer.insertBefore(badge, actions);
  });
};

if (badgeContainer && badgeAddBtn && badgeDeleteBtn) {
  // 初始渲染
  renderBadgesFromStore();

  badgeAddBtn.addEventListener('click', () => {
    const tag = prompt('输入新的标签内容：');
    if (!tag) return;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = tag.trim();
    badgeContainer.insertBefore(badge, badgeContainer.querySelector('.badge-actions'));
    saveBadges();
  });

  badgeDeleteBtn.addEventListener('click', () => {
    const badges = badgeContainer.querySelectorAll('.badge');
    if (!badges.length) return;
    const names = Array.from(badges).map((b, idx) => `${idx + 1}. ${b.textContent}`).join('\n');
    const index = prompt(`输入要删除的标签序号：\n${names}`);
    const idx = Number(index);
    if (!idx || idx < 1 || idx > badges.length) return;
    badges[idx - 1].remove();
    saveBadges();
  });
}

// ---- 头像：持久化到 localStorage（已实现） ----
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

// ---- 卡片内容（旅行装备 / 记录方式 / 正在关注）：持久化到 localStorage ----
const CARD_KEY_PREFIX = 'about-card-';
const editableCards = document.querySelectorAll('[data-editable-card]');
editableCards.forEach((card, index) => {
  const button = card.querySelector('.card-edit');
  const content = card.querySelector('p');
  if (!button || !content) return;

  const storageKey = `${CARD_KEY_PREFIX}${index}`;

  // 载入缓存
  const cached = localStorage.getItem(storageKey);
  if (cached) {
    content.textContent = cached;
  }

  let editing = false;
  const sync = () => {
    content.setAttribute('contenteditable', editing);
    button.textContent = editing ? '完成编辑' : '开启编辑';
    button.classList.toggle('active', editing);
  };

  const saveCard = () => {
    localStorage.setItem(storageKey, content.textContent.trim());
  };

  button.addEventListener('click', () => {
    editing = !editing;
    sync();
    if (editing) {
      content.focus();
    } else {
      saveCard();
    }
  });

  content.addEventListener('blur', () => {
    if (editing) saveCard();
  });
});

