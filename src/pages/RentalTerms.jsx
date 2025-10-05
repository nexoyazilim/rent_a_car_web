import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import '../styles/rental-terms.css';

const Section = ({ title, children }) => (
  <section style={{ marginTop: '1.5rem' }}>
    <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
    {children}
  </section>
);

const RentalTerms = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getCurrentFlag } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rental-terms-page">
      {/* Breadcrumb Hero */}
      <section className="vvsg breadcrumbs_common breadcrumbs_style5 breadcrumbs-hero">
        <div className="overlay" />
        <div className="container">
          <div className="breadcrumbs_content">
            <h3 className="breadcrumbs-title">{t('navigation.rental_terms')}</h3>
          </div>
        </div>
      </section>

      <div className="rental-terms-container">
        <h1 className="rental-terms-title">{t('navigation.rental_terms')}</h1>
        <p className="rental-terms-intro">
          {t('rental.terms_intro', { defaultValue: 'Kiralama koşulları ve genel hükümler aşağıda listelenmiştir. Rezervasyon öncesi lütfen okuyunuz.' })}
        </p>

      <div className="rt-section">
        <Section title={t('rental.eligibility_title', { defaultValue: 'Kiralama Uygunluğu' })}>
        <ul>
          <li>{t('rental.term_age', { defaultValue: 'Sürücü yaşı en az 21 olmalıdır.' })}</li>
          <li>{t('rental.term_license', { defaultValue: 'Geçerli sürücü belgesi en az 2 yıllık olmalıdır.' })}</li>
          <li>{t('rental.term_additional_driver', { defaultValue: 'Ek sürücüler sözleşmede belirtilmeli ve aynı şartları sağlamalıdır.' })}</li>
        </ul>
        </Section>
        {/* Language Switcher */}
        <div className="language-switcher">
          <button className="language-button" aria-label="Dil değiştir">
            <span className="flag">{getCurrentFlag()}</span>
          </button>
          <div className="language-dropdown">
            <button 
              className={`language-option ${currentLanguage === 'tr' ? 'active' : ''}`}
              onClick={() => changeLanguage('tr')}
            >
              <span className="flag">🇹🇷</span>
              <span className="language-name">Türkçe</span>
            </button>
            <button 
              className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              <span className="flag">🇺🇸</span>
              <span className="language-name">English</span>
            </button>
            <button 
              className={`language-option ${currentLanguage === 'ar' ? 'active' : ''}`}
              onClick={() => changeLanguage('ar')}
            >
              <span className="flag">🇸🇦</span>
              <span className="language-name">العربية</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rt-section">
        <Section title={t('rental.documents_title', { defaultValue: 'Gerekli Belgeler' })}>
        <ul>
          <li>{t('rental.docs_id', { defaultValue: 'Geçerli kimlik/pasaport' })}</li>
          <li>{t('rental.docs_license', { defaultValue: 'Geçerli sürücü belgesi' })}</li>
          <li>{t('rental.docs_credit_card', { defaultValue: 'Depozito için sürücü adına kredi kartı' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.payment_title', { defaultValue: 'Ödeme ve Depozito' })}>
        <ul>
          <li>{t('rental.term_deposit', { defaultValue: 'Depozito için kredi kartı gereklidir.' })}</li>
          <li>{t('rental.term_payment', { defaultValue: 'Ödemeler peşin olarak tahsil edilir; kur dönüşümleri ödeme günündeki bankanız kuruna tabidir.' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.insurance_title', { defaultValue: 'Sigorta ve Sorumluluk' })}>
        <ul>
          <li>{t('rental.term_insurance_basic', { defaultValue: 'Araçlar zorunlu trafik sigortası ve temel hasar güvencesi ile kiralanır.' })}</li>
          <li>{t('rental.term_insurance_excess', { defaultValue: 'Muafiyet tutarı kullanıcı sorumluluğundadır; ek güvencelerle düşürülebilir.' })}</li>
          <li>{t('rental.term_accident_report', { defaultValue: 'Hasar durumunda kaza tespit tutanağı ve alkol raporu zorunludur.' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.usage_title', { defaultValue: 'Kullanım Şartları' })}>
        <ul>
          <li>{t('rental.term_mileage', { defaultValue: 'Günlük kilometre limiti sözleşmede belirtilir; aşım ek ücrete tabidir.' })}</li>
          <li>{t('rental.term_fuel', { defaultValue: 'Yakıt politikası, aracı teslim ettiğiniz seviyeye göre değerlendirilir.' })}</li>
          <li>{t('rental.term_fines', { defaultValue: 'Trafik cezaları ve OGS/HGS ücretleri kiracıya aittir.' })}</li>
          <li>{t('rental.term_smoking', { defaultValue: 'Araç içinde sigara içilmesi yasaktır.' })}</li>
          <li>{t('rental.term_geo', { defaultValue: 'Araçların yurt dışına çıkarılması şirket onayına tabidir.' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.pickup_title', { defaultValue: 'Teslim Alma & İade' })}>
        <ul>
          <li>{t('rental.term_pickup_window', { defaultValue: 'Rezervasyon saatinden itibaren 1 saat ücretsiz bekleme süresi uygulanır.' })}</li>
          <li>{t('rental.term_late_return', { defaultValue: 'Geç iade günlük ücret üzerinden ek ücrete tabidir.' })}</li>
          <li>{t('rental.term_cleaning', { defaultValue: 'Aşırı kirlenme durumlarında detaylı temizlik ücreti talep edilir.' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.cancellation_title', { defaultValue: 'İptal ve Değişiklik' })}>
        <ul>
          <li>{t('rental.term_cancel_free', { defaultValue: 'Teslim saatinden 24 saat öncesine kadar ücretsiz iptal.' })}</li>
          <li>{t('rental.term_cancel_fee', { defaultValue: 'Son 24 saatte yapılan iptallerde 1 günlük ücret kesilebilir.' })}</li>
        </ul>
        </Section>
      </div>

      <div className="rt-section">
        <Section title={t('rental.contact_title', { defaultValue: 'İletişim' })}>
          <p>{t('rental.contact_help', { defaultValue: 'Herhangi bir sorunuz için bizimle WhatsApp üzerinden iletişime geçebilirsiniz.' })}</p>
        </Section>
      </div>
      </div>

      {/* Fixed WhatsApp Button */}
      <div className="fixed-social">
        <a href="https://wa.me/+905555555555" target="_blank" className="whatsapp" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>

      
    </div>
  );
};

export default RentalTerms;
