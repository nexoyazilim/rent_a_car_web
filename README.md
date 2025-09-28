# Rent A Car - Araç Kiralama Web Uygulaması

Modern React tabanlı, çok dilli araç kiralama web uygulaması.

## 🚀 Teknolojiler

### Frontend Framework
- **React** `^19.1.1` - Modern UI kütüphanesi
- **React DOM** `^19.1.1` - React DOM renderer
- **React Router DOM** `^7.9.2` - Sayfa yönlendirme

### Build Tool
- **Vite** `^7.1.7` - Hızlı build tool ve dev server
- **@vitejs/plugin-react** `^5.0.3` - React plugin

### Çok Dilli Destek
- **i18next** `^25.5.2` - Uluslararasılaştırma framework'ü
- **react-i18next** `^15.7.3` - React için i18n hook'ları
- **i18next-http-backend** `^3.0.2` - HTTP backend

### UI Bileşenleri
- **React Slick** `^0.31.0` - Carousel/slider bileşeni
- **Slick Carousel** `^1.8.1` - CSS carousel stilleri

### Geliştirme Araçları
- **ESLint** `^9.36.0` - Kod kalitesi kontrolü
- **@eslint/js** `^9.36.0` - ESLint JavaScript config
- **eslint-plugin-react-hooks** `^5.2.0` - React hooks kuralları
- **eslint-plugin-react-refresh** `^0.4.20` - React refresh kuralları

### TypeScript Desteği
- **@types/react** `^19.1.13` - React TypeScript tanımları
- **@types/react-dom** `^19.1.9` - React DOM TypeScript tanımları

## 📁 Proje Yapısı

```
rent_a_car_web/
├── public/                 # Statik dosyalar
│   ├── assets/            # Varlıklar (resim, font, vb.)
│   │   ├── css/           # CSS dosyaları
│   │   ├── images/        # Resim dosyaları
│   │   ├── fonts/         # Font dosyaları
│   │   └── i18n/          # Çok dilli dosyalar
│   ├── favicon.svg        # Site ikonu
│   ├── robots.txt         # SEO robot dosyası
│   └── sitemap.xml        # Site haritası
├── src/                   # Kaynak kodlar
│   ├── components/        # Yeniden kullanılabilir bileşenler
│   │   ├── Footer.jsx     # Alt bilgi bileşeni
│   │   ├── Header.jsx     # Üst bilgi bileşeni
│   │   ├── LanguageSwitcher.jsx  # Dil değiştirici
│   │   └── Loading.jsx    # Yükleme bileşeni
│   ├── pages/             # Sayfa bileşenleri
│   │   ├── Home.jsx       # Ana sayfa
│   │   ├── Vehicles.jsx   # Araç listeleme sayfası
│   │   ├── VehicleDetail.jsx # Araç detay sayfası
│   │   ├── Booking.jsx    # Rezervasyon sayfası
│   │   ├── About.jsx      # Hakkında sayfası
│   │   └── Contact.jsx    # İletişim sayfası
│   ├── hooks/             # Custom React hooks
│   │   └── useScrollReveal.js
│   ├── utils/             # Yardımcı fonksiyonlar
│   │   └── urlHelper.js
│   ├── App.jsx            # Ana uygulama bileşeni
│   ├── App.css            # Ana uygulama stilleri
│   ├── main.jsx           # Uygulama giriş noktası
│   ├── index.css          # Global stiller
│   ├── routes.jsx         # Route tanımları
│   └── i18n.js            # Çok dilli yapılandırma
├── node_modules/          # Bağımlılıklar (otomatik oluşur)
├── package.json           # Proje yapılandırması
├── package-lock.json      # Bağımlılık kilidi
├── vite.config.js         # Vite yapılandırması
├── README.md              # Proje dokümantasyonu
└── .gitignore             # Git ignore dosyası
```

### 📂 Klasör Açıklamaları

- **`public/`**: Tarayıcıda doğrudan erişilebilen statik dosyalar
- **`src/components/`**: Yeniden kullanılabilir UI bileşenleri
- **`src/pages/`**: Sayfa düzeyinde bileşenler
- **`src/hooks/`**: Custom React hooks (state yönetimi, API çağrıları vb.)
- **`src/utils/`**: Yardımcı fonksiyonlar ve utilities
- **`src/assets/`**: Proje içi varlıklar (resim, icon vb.)

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Build'i önizle
npm run preview

# Linting
npm run lint
```

## 🌐 Çok Dilli Destek

Proje çok dilli dil desteği sunar:
- Dil dosyaları: `public/assets/i18n/`
- Desteklenen diller: Türkçe, İngilizce
- Dil değiştirme: `LanguageSwitcher` bileşeni
- Varsayılan dil: Türkçe

### Dil Dosyası Yapısı
```json
{
  "navigation": {
    "home": "Ana Sayfa",
    "about": "Hakkında",
    "contact": "İletişim"
  },
  "common": {
    "loading": "Yükleniyor...",
    "error": "Hata oluştu"
  }
}
```

## 📱 Özellikler

- ✅ Responsive tasarım (mobil uyumlu)
- ✅ Çok dilli destek (Türkçe/İngilizce)
- ✅ Modern React hooks kullanımı
- ✅ React Router ile SPA (Single Page Application)
- ✅ Araç kiralama sistemi
- ✅ SEO optimizasyonu
- ✅ Hızlı yükleme (Vite build tool)
- ✅ Responsive tasarım
- ✅ Rezervasyon sistemi
- ✅ Filtreleme ve arama

## 🚀 Deployment

### GitHub Actions ile Otomatik Deploy
Proje GitHub Actions ile otomatik deploy edilir:
- Branch: `main` veya `master`
- Build komutu: `npm run build`
- Deploy: GitHub Pages 

### Manuel Deploy
```bash
# Production build oluştur
npm run build

# Build dosyalarını sunucuya yükle
# dist/ klasörü içeriğini web sunucusuna kopyala
```

### Environment Variables
```bash
# .env dosyası oluştur
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Proje Adı
```

## 🛠️ Geliştirme Rehberi

### Yeni Bileşen Ekleme
```bash
# Yeni bileşen oluştur
mkdir src/components/[BileşenAdı]
touch src/components/[BileşenAdı]/[BileşenAdı].jsx
touch src/components/[BileşenAdı]/[BileşenAdı].css
```

### Yeni Sayfa Ekleme
```bash
# Yeni sayfa oluştur
touch src/pages/[SayfaAdı].jsx
# routes.jsx dosyasına route ekle
```

### Git Workflow
```bash
# Yeni özellik için branch oluştur
git checkout -b feature/[özellik-adı]

# Değişiklikleri commit et
git add .
git commit -m "feat: [özellik açıklaması]"

# Branch'i push et
git push origin feature/[özellik-adı]
```

## 📋 TODO / Gelecek Özellikler

- [ ] [Özellik 1]
- [ ] [Özellik 2]
- [ ] [Özellik 3]
- [ ] [İyileştirme 1]
- [ ] [İyileştirme 2]

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Branch'i push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Geliştirici**: Dogan Senturk
- **Email**: dogan@example.com
- **LinkedIn**: [LinkedIn Profili]
- **GitHub**: [GitHub Profili]

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
