import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">
          {message || t('common.loading')}
        </p>
      </div>
    </div>
  );
};

export default Loading;
