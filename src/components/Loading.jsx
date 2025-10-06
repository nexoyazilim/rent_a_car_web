import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-container">
      <div className="loading-content">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/loading.gif`}
          alt="Yükleniyor"
          className="loading-gif"
          loading="eager"
          decoding="async"
        />
        <p className="loading-text">
          {message || t('common.loading')}
        </p>
      </div>
    </div>
  );
};

export default Loading;
