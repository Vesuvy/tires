export function filterProducts(products, filters) {
  return products.filter(product => {
    const widthMatch = !filters.width || product.width === filters.width;
    const profileMatch = !filters.profile || product.height === filters.profile;
    const diameterMatch = !filters.diameter || product.diameter.includes(filters.diameter);
    const seasonMatch = !filters.season || product.season.toLowerCase().includes(filters.season.toLowerCase());
    const priceMatch = (!filters.minPrice || product.price >= filters.minPrice) &&
                       (!filters.maxPrice || product.price <= filters.maxPrice);
    return widthMatch && profileMatch && diameterMatch && seasonMatch && priceMatch;
  });
}
  
export function groupProductsByCAE(products) {
  return products.reduce((acc, product) => {
    if (!acc[product.cae]) {
      acc[product.cae] = [];
    }
    acc[product.cae].push(product);
    return acc;
  }, {});
}
  
export function getLastUpdateDate() {
  const now = new Date();
  const nskTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Novosibirsk' }));
  const updateHour = 20;
  const updateMinute = 0;

  let lastUpdateDate = new Date(nskTime);
  if (nskTime.getHours() < updateHour || (nskTime.getHours() === updateHour && nskTime.getMinutes() < updateMinute)) {
    lastUpdateDate.setDate(nskTime.getDate() - 1);
  }
  
  return lastUpdateDate.toLocaleDateString('ru-RU');
}
  
export function populateFilters(products) {
  const widths = new Set();
  const diameters = new Set();
  const holes = new Set();
  const et = new Set();
  const diamCenter = new Set();
  const types = new Set();
  const diamHoles = new Set();

  products.forEach(product => {
    if (product.width) widths.add(product.width);
    if (product.diameter && product.diameter !== '-' && product.diameter !== '0') diameters.add(product.diameter);
    if (product.holes) holes.add(product.holes);
    if (product.et) et.add(product.et); // Используем уже извлеченное число
    if (product.diamCenter) diamCenter.add(product.diamCenter);
    if (product.typeDisk) types.add(product.typeDisk);
    if (product.diamHoles) diamHoles.add(product.diamHoles);
  });

  fillDatalist('diskWidth', widths);
  fillDatalist('diskDiameter', diameters);
  fillDatalist('diskHoles', holes);
  fillDatalist('diskEt', et);
  fillDatalist('diskDiamCenter', diamCenter);
  fillDatalist('diskType', types);
  fillDatalist('diskDiamHoles', diamHoles);
}

// новая 
function fillDatalist(elementId, values) {
  const datalist = document.getElementById(`${elementId}Options`);
  if (!datalist) {
    console.error(`Element with id ${elementId}Options not found`);
    return;
  }

  datalist.innerHTML = '';

  Array.from(values).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(value => {
    if (value) {
      const option = document.createElement('option');
      option.value = value;
      datalist.appendChild(option);
    }
  });
}
/*
function fillDatalist(elementId, values) {
  const datalist = document.getElementById(`${elementId}Options`);
  datalist.innerHTML = '';

  Array.from(values).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(value => {
    if (value) {
      const option = document.createElement('option');
      option.value = value;
      datalist.appendChild(option);
    }
  });
}
  */