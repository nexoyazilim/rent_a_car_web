# Rent A Car - Araç Kiralama Web Uygulaması

Modern, çok dilli (TR/EN/AR) React + Vite tabanlı araç kiralama web uygulaması. GitHub Pages üzerinde yayınlanacak şekilde yapılandırılmıştır.

## 🚀 Yığın

- React `^19`
- React Router DOM `^7`
- Vite `^7`
- i18next, react-i18next, i18next-http-backend
- React Slick, Slick Carousel
- ESLint (opsiyonel geliştirme)

## 📁 Proje Yapısı (özet)

```
public/
  assets/
    images/           # görseller (favicon için logo.png burada)
    i18n/             # çeviri JSON dosyaları (tr/en/ar)
  favicon.svg         # alternatif favicon (kullanılmıyor olabilir)
src/
  components/         # Header, Footer, Loading
  pages/              # Home, Vehicles, VehicleDetail, About, Contact, RentalTerms
  hooks/              # useLanguage, useScrollReveal
  App.jsx             # layout (Header/Footer + içerik)
  main.jsx            # Router + Routes + basename
  i18n.js             # i18next konfigürasyonu
vite.config.js        # base: '/rent_a_car_web/'
```

## ▶️ Geliştirme

```bash
npm ci           # veya npm install
npm run dev      # http://localhost:3000
npm run build    # production build (dist/)
npm run preview  # build önizleme
```

## 🌐 Çeviri (i18n)

- Çeviri dosyaları: `public/assets/i18n/{tr,en,ar}.json`
- Yükleme yolu: `i18n.js` içinde `loadPath: ${import.meta.env.BASE_URL}assets/i18n/{{lng}}.json`
- Yeni bir metin için JSON’a anahtar ekleyin ve ilgili bileşende `t('path.key')` kullanın.
- DefaultValue kullanımı kaldırıldı; tüm metinler JSON’dan gelir.

## 📦 Build & Yayın (GitHub Pages)

1) `vite.config.js` içinde base değeri repo adına göre set edilidir:
   - `base: '/rent_a_car_web/'`
2) Router base adı otomatik alınır:
   - `BrowserRouter basename={import.meta.env.BASE_URL}` (bkz. `src/main.jsx`)
3) SPA için 404 yönlendirmesi:
   - `postbuild`: `dist/index.html` → `dist/404.html`, `dist/.nojekyll`
4) Favicon:
   - `index.html`: `<link rel="icon" type="image/png" sizes="32x32" href="/rent_a_car_web/assets/images/logo.png">`
5) GitHub Actions ile yayın:
   - `.github/workflows/gh-pages.yml` (Node 20, build, artifact, deploy)
   - Repo Settings → Pages → Source: GitHub Actions

### Manuel tetikleme

```bash
git commit --allow-empty -m "chore: redeploy"
git push origin main # veya yedek
```

## ❗ Sık Karşılaşılan Sorunlar

- Beyaz ekran veya `/src/main.jsx` 404:
  - Canlı kaynakta derlenmiş bundle `<script src="/rent_a_car_web/assets/index-*.js">` olmalı.
  - Sert yenile (Cmd+Shift+R) ve tarayıcı önbelleğini temizle.
  - Pages kaynağı “GitHub Actions” olmalı; docs/ seçili olmamalı.

- Görsel/i18n 404’leri:
  - Kodda absolute `/assets/...` yerine `import.meta.env.BASE_URL` ile başlayan yollar kullanıldı.
  - `public/assets/i18n/*.json` dosyalarının varlığını kontrol edin.

- Yenilemede 404 flash:
  - `App.jsx` içinde kısa süreli `Loading` gösterimi var; GH Pages SPA yenilemesindeki gecikmeyi maskelemek için.

## 📌 Başlıca Özellikler

- Çok dilli içerik (TR/EN/AR)
- Araç listeleme ve detay sayfaları
- Modern responsive arayüz
- SEO meta etiketleri
- GH Pages uyumlu SPA yönlendirme

## 📝 Lisans

MIT

---

Her türlü iyileştirme/öneri/PR’a açığız. Beğendiysen yıldız vermeyi unutma! ⭐
