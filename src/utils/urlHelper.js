export const getLocaleSlug = (slug, currentLanguage) => {
  const map = {
    '/vehicles': '/araclar',
    '/vehicle': '/arac',
    '/about': '/hakkimizda',
    '/contact': '/iletisim',
    '/rental-terms': '/kiralama-kosullari',
  };
  if (currentLanguage === 'tr') return map[slug] || slug;
  // tr -> en
  const reverse = Object.fromEntries(Object.entries(map).map(([en, tr]) => [tr, en]));
  return reverse[slug] || slug;
};

export const buildVehicleDetailPath = (id, currentLanguage) => {
  const base = currentLanguage === 'tr' ? '/arac' : '/vehicle';
  return `${base}/${id}`;
};


