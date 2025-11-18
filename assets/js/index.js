// 首页 JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

const loopTrack = document.querySelector('[data-loop-track]');
const galleryAddBtn = document.getElementById('gallery-add-btn');
const galleryAddInput = document.getElementById('gallery-add-input');
const GALLERY_KEY = 'loop-gallery-photos';
const STORY_KEY = 'gallery-photo-stories';
let storyStore = {};
try {
  storyStore = JSON.parse(localStorage.getItem(STORY_KEY) || '{}');
} catch (err) {
  storyStore = {};
}

const attachStoryHandlers = () => {
  if (!loopTrack) return;
  const items = loopTrack.querySelectorAll('.masonry-item');
  items.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    const key = img.getAttribute('src');
    item.dataset.storyKey = key;
    let overlay = item.querySelector('.story-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'story-overlay';
      item.appendChild(overlay);
    }
    const storyText = storyStore[key];
    overlay.textContent = storyText || '点击添加故事';
    item.classList.toggle('has-story', Boolean(storyText));

    if (!item.dataset.storyBound) {
      item.addEventListener('click', () => {
        const current = storyStore[key] || '';
        const next = prompt('写下这张照片的故事：', current);
        if (next === null) return;
        if (!next.trim()) {
          delete storyStore[key];
        } else {
          storyStore[key] = next.trim();
        }
        localStorage.setItem(STORY_KEY, JSON.stringify(storyStore));
        attachStoryHandlers();
      });
      item.dataset.storyBound = 'true';
    }
  });
};

const heroCard = document.getElementById('hero-card-photo');
const heroUpload = document.getElementById('hero-card-upload');
const heroInput = document.getElementById('hero-card-input');
const heroEdit = document.getElementById('hero-card-edit');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-description');
const HERO_KEY = 'hero-card-photo';
const HERO_TEXT_KEY = 'hero-card-text';

if (loopTrack) {
  const baseGalleryHTML = loopTrack.innerHTML;
  const storedPhotos = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]');
  const renderPhoto = ({ src, label }) => `
    <figure class="masonry-item">
      <img src="${src}" alt="${label}">
      <span>${label}</span>
    </figure>`;
  const updateLoop = () => {
    const persisted = storedPhotos.map(renderPhoto).join('');
    const combined = baseGalleryHTML + persisted;
    loopTrack.innerHTML = combined + combined;
    attachStoryHandlers();
  };
  updateLoop();

  if (galleryAddBtn && galleryAddInput) {
    galleryAddBtn.addEventListener('click', () => galleryAddInput.click());
    galleryAddInput.addEventListener('change', () => {
      const [file] = galleryAddInput.files || [];
      if (!file) return;
      const defaultLabel = file.name.replace(/\.[^/.]+$/, '');
      const label = prompt('为这张照片写个注释：', defaultLabel || '旅途影像') || '旅途影像';
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target?.result;
        if (!data) return;
        storedPhotos.push({ src: data, label });
        localStorage.setItem(GALLERY_KEY, JSON.stringify(storedPhotos));
        updateLoop();
      };
      reader.readAsDataURL(file);
    });
  }
}

if (heroCard && heroUpload && heroInput && heroEdit && heroTitle && heroDesc) {
  const cachedHero = localStorage.getItem(HERO_KEY);
  if (cachedHero) {
    heroCard.style.setProperty('--hero-photo', `url(${cachedHero})`);
    heroCard.style.backgroundImage = `var(--hero-photo)`;
  }
  const cachedText = JSON.parse(localStorage.getItem(HERO_TEXT_KEY) || '{}');
  if (cachedText.title) heroTitle.textContent = cachedText.title;
  if (cachedText.desc) heroDesc.textContent = cachedText.desc;
  heroUpload.addEventListener('click', () => heroInput.click());
  heroInput.addEventListener('change', () => {
    const [file] = heroInput.files || [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      if (!data) return;
      heroCard.style.backgroundImage = `url(${data})`;
      localStorage.setItem(HERO_KEY, data);
    };
    reader.readAsDataURL(file);
  });
  heroEdit.addEventListener('click', () => {
    const newTitle = prompt('输入足迹标题：', heroTitle.textContent) || heroTitle.textContent;
    const newDesc = prompt('输入足迹描述：', heroDesc.textContent) || heroDesc.textContent;
    heroTitle.textContent = newTitle;
    heroDesc.textContent = newDesc;
    localStorage.setItem(HERO_TEXT_KEY, JSON.stringify({ title: newTitle, desc: newDesc }));
  });
}

