// 累计旅行路线页 JavaScript
document.getElementById('year').textContent = new Date().getFullYear();

const notesField = document.getElementById('route-notes');
const saveBtn = document.getElementById('save-notes');
const STORAGE_KEY = 'route-notes';
if (notesField && saveBtn) {
  notesField.value = localStorage.getItem(STORAGE_KEY) || '';
  saveBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, notesField.value);
    saveBtn.textContent = '已保存';
    setTimeout(() => (saveBtn.textContent = '保存到本地'), 1500);
  });
}

const baseRoutes = [
  {
    name: '阿勒泰纬度',
    theme: '北疆 · 2025',
    color: '#58d5ff',
    stops: ['新疆阿勒泰地区', '禾木', '喀纳斯', '赛里木湖', '乌鲁木齐']
  },
  {
    name: '海南环线',
    theme: '海岸线',
    color: '#ff9b6a',
    stops: ['三亚', '海口']
  },
  {
    name: '南纬21°',
    theme: '雨林',
    color: '#27d3a5',
    stops: ['云南省西双版纳']
  },
  {
    name: '景德镇手作小径',
    theme: '瓷都',
    color: '#f5c84c',
    stops: ['江西省景德镇']
  },
  {
    name: '天府生活线',
    theme: '都市圈',
    color: '#b784f2',
    stops: ['四川省成都市']
  },
  {
    name: '川西折线',
    theme: '高原',
    color: '#ff5f8f',
    stops: ['甘孜藏族自治州', '阿坝州藏族自治州', '四姑娘山', '理塘', '稻城亚丁']
  },
  {
    name: '长安坐标',
    theme: '古都',
    color: '#4cb3ff',
    stops: ['陕西省西安市']
  },
  {
    name: '黄河弧线',
    theme: '塞上',
    color: '#ffa94d',
    stops: ['宁夏回族自治区银川市', '沙坡头']
  },
  {
    name: '太原烟火',
    theme: '晋风',
    color: '#7dd3ff',
    stops: ['山西省太原市']
  },
  {
    name: '北方中轴',
    theme: '轴线',
    color: '#97a0ff',
    stops: ['北京']
  },
  {
    name: '汉江呼吸',
    theme: '江湖',
    color: '#2dc6ff',
    stops: ['湖北省武汉市']
  },
  {
    name: '岭南光谱',
    theme: '湾区',
    color: '#ff7bd1',
    stops: ['广东省广州市']
  },
  {
    name: '浙北秘径',
    theme: '峡谷',
    color: '#3be0b8',
    stops: ['浙北大峡谷', '杭州']
  },
  {
    name: '江南串门',
    theme: '运河',
    color: '#ffa8a8',
    stops: ['常州', '无锡', '苏州', '扬州']
  },
  {
    name: '沪宁都市带',
    theme: '长三角',
    color: '#8ef7ff',
    stops: ['上海', '南京']
  },
  {
    name: '华东两座山',
    theme: '山岳',
    color: '#f78888',
    stops: ['安徽黄山', '庐山']
  },
  {
    name: '普陀朝圣',
    theme: '海岛',
    color: '#e4b0ff',
    stops: ['普陀山']
  },
  {
    name: '漓江星图',
    theme: '喀斯特',
    color: '#56e39f',
    stops: ['广西壮族自治区桂林市']
  }
];

