// 首页 JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

const loopTrack = document.querySelector('[data-loop-track]');
const galleryAddBtn = document.getElementById('gallery-add-btn');
const galleryAddInput = document.getElementById('gallery-add-input');
const GALLERY_KEY = 'loop-gallery-photos';
const STORY_KEY = 'gallery-photo-stories';
const PHOTO_DESCRIPTION_KEY = 'gallery-photo-descriptions';
let storyStore = {};
let descriptionStore = {};
try {
  storyStore = JSON.parse(localStorage.getItem(STORY_KEY) || '{}');
  descriptionStore = JSON.parse(localStorage.getItem(PHOTO_DESCRIPTION_KEY) || '{}');
} catch (err) {
  storyStore = {};
  descriptionStore = {};
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
    overlay.textContent = storyText || '点击查看详情';
    item.classList.toggle('has-story', Boolean(storyText));
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
    attachPhotoClickHandlers();
  };
  
  // 为所有照片绑定点击事件
  const attachPhotoClickHandlers = () => {
    if (!loopTrack) return;
    const items = loopTrack.querySelectorAll('.masonry-item');
    items.forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;
      const key = img.getAttribute('src');
      const title = item.querySelector('span')?.textContent || '行程片段';
      
      // 只绑定一次点击事件
      if (!item.dataset.clickBound) {
        item.addEventListener('click', () => {
          openPhotoModal(key, img.src, title);
        });
        item.dataset.clickBound = 'true';
      }
    });
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
  // 加载保存的背景图片
  const cachedHero = localStorage.getItem(HERO_KEY);
  if (cachedHero) {
    heroCard.style.setProperty('--hero-photo', `url(${cachedHero})`);
    heroCard.style.backgroundImage = `linear-gradient(140deg, rgba(255, 252, 245, 0.85), rgba(254, 250, 240, 0.75)), url(${cachedHero})`;
  }
  
  // 加载保存的文本内容
  const cachedText = JSON.parse(localStorage.getItem(HERO_TEXT_KEY) || '{}');
  if (cachedText.title) heroTitle.textContent = cachedText.title;
  if (cachedText.desc) heroDesc.textContent = cachedText.desc;
  
  // 上传背景图片
  heroUpload.addEventListener('click', () => heroInput.click());
  heroInput.addEventListener('change', () => {
    const [file] = heroInput.files || [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      if (!data) return;
      // 更新CSS变量和背景图片
      heroCard.style.setProperty('--hero-photo', `url(${data})`);
      heroCard.style.backgroundImage = `linear-gradient(140deg, rgba(255, 252, 245, 0.85), rgba(254, 250, 240, 0.75)), url(${data})`;
      // 保存到本地存储
      localStorage.setItem(HERO_KEY, data);
    };
    reader.readAsDataURL(file);
  });
  
  // 编辑文本内容
  heroEdit.addEventListener('click', () => {
    const newTitle = prompt('输入足迹标题：', heroTitle.textContent) || heroTitle.textContent;
    const newDesc = prompt('输入足迹描述：', heroDesc.textContent) || heroDesc.textContent;
    heroTitle.textContent = newTitle;
    heroDesc.textContent = newDesc;
    localStorage.setItem(HERO_TEXT_KEY, JSON.stringify({ title: newTitle, desc: newDesc }));
  });
}

// 照片详情模态框功能
const photoModal = document.getElementById('photo-modal');
const photoModalClose = document.getElementById('photo-modal-close');
const photoModalImg = document.getElementById('photo-modal-img');
const photoModalTitle = document.getElementById('photo-modal-title');
const photoDescriptionContent = document.getElementById('photo-description-content');
const photoEditBtn = document.getElementById('photo-edit-btn');

let currentPhotoKey = null;
let isEditingDescription = false;

function openPhotoModal(key, imgSrc, title) {
  currentPhotoKey = key;
  photoModalImg.src = imgSrc;
  photoModalTitle.textContent = title || '行程片段';
  
  // 加载景点介绍
  const description = descriptionStore[key] || '';
  if (description) {
    photoDescriptionContent.innerHTML = description;
    photoDescriptionContent.classList.remove('placeholder');
  } else {
    photoDescriptionContent.innerHTML = '<p class="placeholder">点击"编辑"按钮添加景点介绍...</p>';
    photoDescriptionContent.classList.add('placeholder');
  }
  
  photoDescriptionContent.setAttribute('contenteditable', 'false');
  isEditingDescription = false;
  photoEditBtn.textContent = '编辑';
  
  photoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
  // 如果正在编辑，保存内容
  if (isEditingDescription) {
    saveDescription();
  }
  
  photoModal.classList.remove('active');
  document.body.style.overflow = '';
  currentPhotoKey = null;
}

function saveDescription() {
  if (!currentPhotoKey) return;
  
  const content = photoDescriptionContent.textContent.trim();
  if (content && content !== '点击"编辑"按钮添加景点介绍...') {
    descriptionStore[currentPhotoKey] = photoDescriptionContent.innerHTML;
    localStorage.setItem(PHOTO_DESCRIPTION_KEY, JSON.stringify(descriptionStore));
  } else {
    delete descriptionStore[currentPhotoKey];
    localStorage.setItem(PHOTO_DESCRIPTION_KEY, JSON.stringify(descriptionStore));
  }
}

if (photoModalClose) {
  photoModalClose.addEventListener('click', closePhotoModal);
}

if (photoModal) {
  photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal || e.target.classList.contains('photo-modal-overlay')) {
      closePhotoModal();
    }
  });
  
  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
      closePhotoModal();
    }
  });
}

if (photoEditBtn && photoDescriptionContent) {
  photoEditBtn.addEventListener('click', () => {
    if (!isEditingDescription) {
      // 开始编辑
      isEditingDescription = true;
      photoDescriptionContent.setAttribute('contenteditable', 'true');
      photoDescriptionContent.classList.remove('placeholder');
      if (photoDescriptionContent.textContent.trim() === '点击"编辑"按钮添加景点介绍...') {
        photoDescriptionContent.innerHTML = '';
      }
      photoDescriptionContent.focus();
      photoEditBtn.textContent = '保存';
    } else {
      // 保存编辑
      saveDescription();
      isEditingDescription = false;
      photoDescriptionContent.setAttribute('contenteditable', 'false');
      photoEditBtn.textContent = '编辑';
      
      // 如果没有内容，显示占位符
      if (!photoDescriptionContent.textContent.trim()) {
        photoDescriptionContent.innerHTML = '<p class="placeholder">点击"编辑"按钮添加景点介绍...</p>';
        photoDescriptionContent.classList.add('placeholder');
      }
    }
  });
  
  // 失去焦点时自动保存
  photoDescriptionContent.addEventListener('blur', () => {
    if (isEditingDescription) {
      saveDescription();
    }
  });
}

