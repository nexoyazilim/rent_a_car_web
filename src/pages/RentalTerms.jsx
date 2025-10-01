import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/rental-terms.css';

const Section = ({ title, children }) => (
  <section style={{ marginTop: '1.5rem' }}>
    <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
    {children}
  </section>
);

const RentalTerms = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rental-terms-page">
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
    </div>
  );
};

export default RentalTerms;


