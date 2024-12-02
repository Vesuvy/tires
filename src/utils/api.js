export async function fetchDisks() {
  const urls = [
    'https://yngmzleen.github.io/Apipostavschiki/brinex_disks.xml',
    'https://yngmzleen.github.io/Apipostavschiki/4tochki_disk.xml',
    'https://yngmzleen.github.io/Apipostavschiki/zapaska_disks.xml'
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const texts = await Promise.all(responses.map(res => res.text()));
    const parser = new DOMParser();
    const products = texts.flatMap((text, index) => {
      const xml = parser.parseFromString(text, 'application/xml');
      return Array.from(xml.querySelectorAll('item')).map(item => ({
        type: ['brinex', '4tochki', 'zapaska'][index],
        name: item.querySelector('name')?.textContent || '',
        article: item.querySelector('article')?.textContent || '',
        cae: item.querySelector('cae')?.textContent || '',
        price: parseFloat(item.querySelector('price')?.textContent || '0'),
        opt: parseFloat(item.querySelector('opt')?.textContent || '0'),
        count: item.querySelector('count')?.textContent || '',
        brand: item.querySelector('brand')?.textContent || '',
        model: item.querySelector('model')?.textContent || '',
        width: item.querySelector('width')?.textContent || '',
        diameter: item.querySelector('diameter')?.textContent || '',
        color: item.querySelector('color')?.textContent || '',
        holes: item.querySelector('holes')?.textContent || '',
        et: item.querySelector('et')?.textContent.match(/\d+/)?.[0] || '',
        diamCenter: item.querySelector('diam_center')?.textContent || '',
        typeDisk: item.querySelector('type')?.textContent || '',
        diamHoles: item.querySelector('diam_holes')?.textContent || '',
        supplier: ['Brinex', '4Tochka', 'Запаска'][index],
      }));
    });
    return products;
  } catch (error) {
    console.error('Error fetching disks:', error);
    return [];
  }
}

export async function fetchTires() {
    const urls = [
      'https://yngmzleen.github.io/Apipostavschiki/4tochki_tyres.xml',
      'https://yngmzleen.github.io/Apipostavschiki/brinex_tyres.xml',
      'https://yngmzleen.github.io/Apipostavschiki/zapaska_tyres.xml'
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const texts = await Promise.all(responses.map(res => res.text()));
      const parser = new DOMParser();
      const products = texts.flatMap((text, index) => {
        const xml = parser.parseFromString(text, 'application/xml');
        return Array.from(xml.querySelectorAll('item')).map(item => ({
          type: ['4tochki', 'brinex', 'zapaska'][index],
          name: item.querySelector('name')?.textContent || '',
          article: item.querySelector('article')?.textContent || '',
          cae: item.querySelector('cae')?.textContent || '',
          price: parseFloat(item.querySelector('price')?.textContent || '0'),
          opt: parseFloat(item.querySelector('opt')?.textContent || '0'),
          count: item.querySelector('count')?.textContent || '',
          brand: item.querySelector('brand')?.textContent || '',
          model: item.querySelector('model')?.textContent || '',
          width: item.querySelector('width')?.textContent || '',
          height: item.querySelector('height')?.textContent || '',
          diameter: item.querySelector('diameter')?.textContent || '',
          season: item.querySelector('season')?.textContent || '',
          supplier: ['4Tochka', 'Brinex', 'Запаска'][index],
          spikes: item.querySelector('spikes')?.textContent === 'шипы'
        }));
      });
      return products;
    } catch (error) {
      console.error('Error fetching tires:', error);
      return [];
    }
  }

export async function fetchTruckTires() {
    const urls = [
      'https://yngmzleen.github.io/Apipostavschiki/zapaska_gruz.xml',
      'https://yngmzleen.github.io/Apipostavschiki/brinex_gruz.xml'
    ];
  
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const texts = await Promise.all(responses.map(res => res.text()));
      const parser = new DOMParser();
      const products = texts.flatMap((text, index) => {
        const xml = parser.parseFromString(text, 'application/xml');
        return Array.from(xml.querySelectorAll('item')).map(item => ({
          type: ['zapaska', 'brinex'][index],
          name: item.querySelector('name')?.textContent || '',
          article: item.querySelector('article')?.textContent || '',
          cae: item.querySelector('cae')?.textContent || '',
          price: parseFloat(item.querySelector('price')?.textContent || '0'),
          opt: parseFloat(item.querySelector('opt')?.textContent || '0'),
          count: item.querySelector('count')?.textContent || '',
          brand: item.querySelector('brand')?.textContent || '',
          model: item.querySelector('model')?.textContent || '',
          width: item.querySelector('width')?.textContent || '',
          height: item.querySelector('height')?.textContent || '',
          diameter: item.querySelector('diameter')?.textContent || '',
          season: item.querySelector('season')?.textContent || '',
          supplier: ['Запаска', 'Brinex'][index],
          spikes: item.querySelector('spikes')?.textContent === 'шипы'
        }));
      });
      return products;
    } catch (error) {
      console.error('Error fetching truck tires:', error);
      return [];
    }
}