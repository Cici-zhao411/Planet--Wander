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

const CUSTOM_ROUTES_KEY = 'custom-routes';

let customRoutes = [];
try {
  customRoutes = JSON.parse(localStorage.getItem(CUSTOM_ROUTES_KEY) || '[]');
} catch {
  customRoutes = [];
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
  },
  {
    name: '中原文化问根',
    theme: '古都',
    color: '#d4a574',
    stops: ['河南省洛阳市', '河南省郑州市', '河南省开封市']
  },
  {
    name: '黄海之滨',
    theme: '海岸线',
    color: '#d4a574',
    stops: ['山东省日照市']
  }
];

let currentRoutes = [...baseRoutes, ...customRoutes];

// 城市到省份的映射
const cityToProvince = {
  '新疆': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '乌鲁木齐': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '阿勒泰': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '禾木': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '喀纳斯': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '赛里木湖': ['新疆', '新疆维吾尔自治区', '新疆维吾尔'],
  '海南': ['海南', '海南省'],
  '三亚': ['海南', '海南省'],
  '海口': ['海南', '海南省'],
  '云南': ['云南', '云南省'],
  '西双版纳': ['云南', '云南省'],
  '江西': ['江西', '江西省'],
  '景德镇': ['江西', '江西省'],
  '庐山': ['江西', '江西省'],
  '四川': ['四川', '四川省'],
  '成都': ['四川', '四川省'],
  '甘孜': ['四川', '四川省'],
  '阿坝': ['四川', '四川省'],
  '四姑娘山': ['四川', '四川省'],
  '理塘': ['四川', '四川省'],
  '稻城亚丁': ['四川', '四川省'],
  '陕西': ['陕西', '陕西省'],
  '西安': ['陕西', '陕西省'],
  '宁夏': ['宁夏', '宁夏回族自治区', '宁夏回族'],
  '银川': ['宁夏', '宁夏回族自治区', '宁夏回族'],
  '沙坡头': ['宁夏', '宁夏回族自治区', '宁夏回族'],
  '山西': ['山西', '山西省'],
  '太原': ['山西', '山西省'],
  '北京': ['北京', '北京市'],
  '河南': ['河南', '河南省'],
  '洛阳': ['河南', '河南省'],
  '郑州': ['河南', '河南省'],
  '开封': ['河南', '河南省'],
  '湖北': ['湖北', '湖北省'],
  '武汉': ['湖北', '湖北省'],
  '山东': ['山东', '山东省'],
  '日照': ['山东', '山东省'],
  '广东': ['广东', '广东省'],
  '广州': ['广东', '广东省'],
  '浙江': ['浙江', '浙江省'],
  '杭州': ['浙江', '浙江省'],
  '浙北': ['浙江', '浙江省'],
  '普陀山': ['浙江', '浙江省'],
  '江苏': ['江苏', '江苏省'],
  '常州': ['江苏', '江苏省'],
  '无锡': ['江苏', '江苏省'],
  '苏州': ['江苏', '江苏省'],
  '扬州': ['江苏', '江苏省'],
  '南京': ['江苏', '江苏省'],
  '上海': ['上海', '上海市'],
  '安徽': ['安徽', '安徽省'],
  '黄山': ['安徽', '安徽省'],
  '广西': ['广西', '广西壮族自治区', '广西壮族'],
  '桂林': ['广西', '广西壮族自治区', '广西壮族']
};

// 提取去过的省份
function getVisitedProvinces() {
  const provinces = new Set();
  currentRoutes.forEach(route => {
    route.stops.forEach(stop => {
      // 尝试匹配城市或省份名称
      for (const [key, provs] of Object.entries(cityToProvince)) {
        if (stop.includes(key)) {
          provs.forEach(p => provinces.add(p));
        }
      }
    });
  });
  return Array.from(provinces);
}

// 全局变量保存地图实例和原始数据
let chinaMapChart = null;
let originalMapData = [];
let currentHighlightedRoute = null;
let geoFeatures = [];

// 渲染路线列表
function renderRouteList() {
  const routeList = document.getElementById('route-list');
  if (!routeList) return;
  routeList.innerHTML = '';

  currentRoutes.forEach(route => {
    const item = document.createElement('div');
    item.className = 'route-list-item';
    item.innerHTML = `
      <span class="tag">${route.theme}</span>
      <h4>${route.name}</h4>
      <p>${route.stops.join(' · ')}</p>
    `;

    item.addEventListener('click', () => {
      if (currentHighlightedRoute === route) {
        resetMapHighlight();
        item.classList.remove('active');
        currentHighlightedRoute = null;
      } else {
        document.querySelectorAll('.route-list-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        highlightRouteProvinces(route);
        currentHighlightedRoute = route;
      }
    });

    routeList.appendChild(item);
  });
}

// 新增路线
function addNewRoute() {
  const name = prompt('输入路线名称：');
  if (!name) return;
  const theme = prompt('输入路线主题（如 海岸线 / 山岳 / 古都 等）：', '自定义') || '自定义';
  const stopsInput = prompt('输入途经的省/市，用逗号或空格分隔：', '北京, 河北');
  if (!stopsInput) return;
  const stops = stopsInput.split(/[,，\s]+/).map(s => s.trim()).filter(Boolean);
  if (!stops.length) return;

  const newRoute = {
    name: name.trim(),
    theme: theme.trim(),
    color: '#d4a574',
    stops
  };
  customRoutes.push(newRoute);
  localStorage.setItem(CUSTOM_ROUTES_KEY, JSON.stringify(customRoutes));
  currentRoutes = [...baseRoutes, ...customRoutes];

  // 重新渲染
  renderRouteList();
  currentHighlightedRoute = null;
  resetMapHighlight();
  refreshMapVisited();
  document.querySelectorAll('.route-list-item').forEach(el => el.classList.remove('active'));
}

// 根据路线获取对应的省份
function getProvincesForRoute(route) {
  const provinces = new Set();
  route.stops.forEach(stop => {
    for (const [key, provs] of Object.entries(cityToProvince)) {
      if (stop.includes(key)) {
        provs.forEach(p => provinces.add(p));
      }
    }
  });
  return Array.from(provinces);
}

// 重新计算地图默认着色（全部已访问状态）
function refreshMapVisited() {
  if (!chinaMapChart || !geoFeatures.length) return;
  const visitedProvinces = getVisitedProvinces();
  const mapData = geoFeatures.map(feature => {
    const name = feature.properties.name;
    const isVisited = visitedProvinces.some(p => {
      const nameLower = name.toLowerCase();
      const pLower = p.toLowerCase();
      return nameLower.includes(pLower) || pLower.includes(nameLower) ||
             name === p || name.replace(/省|市|自治区|维吾尔|回族|壮族/g, '') === p.replace(/省|市|自治区|维吾尔|回族|壮族/g, '');
    });
    return {
      name,
      itemStyle: {
        areaColor: isVisited ? '#d4a574' : '#e8e5e0',
        borderColor: isVisited ? '#b8864f' : 'rgba(212, 165, 116, 0.3)',
        borderWidth: isVisited ? 1 : 0.5
      }
    };
  });
  originalMapData = mapData;
  const option = chinaMapChart.getOption();
  option.series[0].data = mapData;
  chinaMapChart.setOption(option);
}

// 高亮显示指定路线的省份
function highlightRouteProvinces(route) {
  if (!chinaMapChart) return;
  
  const routeProvinces = getProvincesForRoute(route);
  const option = chinaMapChart.getOption();
  const visitedProvinces = getVisitedProvinces();
  
  // 更新地图数据
  const newData = originalMapData.map(item => {
    const name = item.name;
    const isVisited = visitedProvinces.some(p => {
      const nameLower = name.toLowerCase();
      const pLower = p.toLowerCase();
      return nameLower.includes(pLower) || pLower.includes(nameLower) || 
             name === p || name.replace(/省|市|自治区|维吾尔|回族|壮族/g, '') === p.replace(/省|市|自治区|维吾尔|回族|壮族/g, '');
    });
    
    // 检查是否属于当前路线
    const isInRoute = routeProvinces.some(p => {
      const nameLower = name.toLowerCase();
      const pLower = p.toLowerCase();
      return nameLower.includes(pLower) || pLower.includes(nameLower) || 
             name === p || name.replace(/省|市|自治区|维吾尔|回族|壮族/g, '') === p.replace(/省|市|自治区|维吾尔|回族|壮族/g, '');
    });
    
    let areaColor = '#e8e5e0';
    let borderColor = 'rgba(212, 165, 116, 0.3)';
    let borderWidth = 0.5;
    
    if (isInRoute) {
      // 高亮显示路线相关省份（使用更深的金黄色）
      areaColor = '#b8864f';
      borderColor = '#d4a574';
      borderWidth = 2.5;
    } else if (isVisited) {
      // 已访问但不在当前路线（变暗显示）
      areaColor = 'rgba(212, 165, 116, 0.3)';
      borderColor = 'rgba(184, 134, 79, 0.3)';
      borderWidth = 0.5;
    } else {
      // 未访问省份（更暗）
      areaColor = '#d4d0c8';
      borderColor = 'rgba(212, 165, 116, 0.2)';
      borderWidth = 0.5;
    }
    
    return {
      name: name,
      itemStyle: {
        areaColor: areaColor,
        borderColor: borderColor,
        borderWidth: borderWidth
      }
    };
  });
  
  option.series[0].data = newData;
  chinaMapChart.setOption(option);
}

// 重置地图显示所有已访问省份
function resetMapHighlight() {
  if (!chinaMapChart) return;
  
  const visitedProvinces = getVisitedProvinces();
  const newData = originalMapData.map(item => {
    const name = item.name;
    const isVisited = visitedProvinces.some(p => {
      const nameLower = name.toLowerCase();
      const pLower = p.toLowerCase();
      return nameLower.includes(pLower) || pLower.includes(nameLower) || 
             name === p || name.replace(/省|市|自治区|维吾尔|回族|壮族/g, '') === p.replace(/省|市|自治区|维吾尔|回族|壮族/g, '');
    });
    
    return {
      name: name,
      itemStyle: {
        areaColor: isVisited ? '#d4a574' : '#e8e5e0',
        borderColor: isVisited ? '#b8864f' : 'rgba(212, 165, 116, 0.3)',
        borderWidth: isVisited ? 1 : 0.5
      }
    };
  });
  
  const option = chinaMapChart.getOption();
  option.series[0].data = newData;
  chinaMapChart.setOption(option);
}

// 初始化地图
function initChinaMap() {
  const mapContainer = document.getElementById('china-map');
  const routeList = document.getElementById('route-list');
  const routeAddBtn = document.getElementById('route-add-btn');
  if (!mapContainer || !routeList) return;

  const visitedProvinces = getVisitedProvinces();
  
  // 使用ECharts创建地图
  chinaMapChart = echarts.init(mapContainer);
  
  // 注册地图数据
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    .then(response => response.json())
    .then(geoJson => {
      echarts.registerMap('china', geoJson);
      
      geoFeatures = geoJson.features;
      // 准备地图数据
      const mapData = [];
      geoFeatures.forEach(feature => {
        const name = feature.properties.name;
        // 匹配省份名称（支持多种格式）
        const isVisited = visitedProvinces.some(p => {
          const nameLower = name.toLowerCase();
          const pLower = p.toLowerCase();
          return nameLower.includes(pLower) || pLower.includes(nameLower) || 
                 name === p || name.replace(/省|市|自治区|维吾尔|回族|壮族/g, '') === p.replace(/省|市|自治区|维吾尔|回族|壮族/g, '');
        });
        mapData.push({
          name: name,
          value: isVisited ? 1 : 0
        });
      });
      
      // 保存原始地图数据
      originalMapData = mapData;
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.value === 1) {
              return params.name + '<br/>已访问';
            }
            return params.name + '<br/>未访问';
          }
        },
        visualMap: {
          min: 0,
          max: 1,
          left: 'left',
          top: 'bottom',
          text: ['已访问', '未访问'],
          inRange: {
            color: ['#e8e5e0', '#d4a574']
          },
          calculable: false,
          show: false
        },
        series: [{
          name: '中国地图',
          type: 'map',
          map: 'china',
          roam: true,
          zoom: 1.2,
          emphasis: {
            label: {
              show: true,
              color: '#2c2416'
            },
            itemStyle: {
              areaColor: '#b8864f',
              borderColor: '#d4a574',
              borderWidth: 2
            }
          },
          itemStyle: {
            areaColor: '#e8e5e0',
            borderColor: 'rgba(212, 165, 116, 0.3)',
            borderWidth: 0.5
          },
          data: mapData.map(item => ({
            name: item.name,
            itemStyle: {
              areaColor: item.value === 1 ? '#d4a574' : '#e8e5e0',
              borderColor: item.value === 1 ? '#b8864f' : 'rgba(212, 165, 116, 0.3)',
              borderWidth: item.value === 1 ? 1 : 0.5
            }
          }))
        }]
      };
      
      chinaMapChart.setOption(option);
      renderRouteList();
      resetMapHighlight();
      
      // 响应式调整
      window.addEventListener('resize', () => {
        chinaMapChart.resize();
      });
      
      // 点击地图空白处重置高亮
      chinaMapChart.on('click', function(params) {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          // 如果点击的是省份，不做处理（保持当前高亮）
          return;
        }
        // 点击空白处时重置
        if (currentHighlightedRoute) {
          resetMapHighlight();
          document.querySelectorAll('.route-list-item').forEach(el => el.classList.remove('active'));
          currentHighlightedRoute = null;
        }
      });
    })
    .catch(error => {
      console.error('加载地图数据失败:', error);
      // 如果加载失败，显示错误信息
      mapContainer.innerHTML = '<p style="text-align: center; color: var(--muted-color); padding: 2rem;">地图加载失败，请检查网络连接</p>';
    });

  // 渲染路线列表
  baseRoutes.forEach((route, index) => {
    const item = document.createElement('div');
    item.className = 'route-list-item';
    item.innerHTML = `
      <span class="tag">${route.theme}</span>
      <h4>${route.name}</h4>
      <p>${route.stops.join(' · ')}</p>
    `;
    
    item.addEventListener('click', () => {
      // 如果点击的是当前已激活的路线，则重置
      if (currentHighlightedRoute === route) {
        resetMapHighlight();
        item.classList.remove('active');
        currentHighlightedRoute = null;
      } else {
        // 高亮显示当前路线的省份
        document.querySelectorAll('.route-list-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        highlightRouteProvinces(route);
        currentHighlightedRoute = route;
      }
    });
    
    routeList.appendChild(item);
  });
}

// 页面加载完成后初始化地图
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChinaMap);
} else {
  initChinaMap();
}

// 绑定新增路线按钮
const routeAddBtn = document.getElementById('route-add-btn');
if (routeAddBtn) {
  routeAddBtn.addEventListener('click', addNewRoute);
}

