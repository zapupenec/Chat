/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState(i18n.language);

  const handleSwitchLanguage = (currentLng) => () => {
    i18n.changeLanguage(currentLng);
    setLng(currentLng);
    localStorage.setItem('lastSelectedLng', currentLng);
  };

  return (
    <DropdownButton variant="light" id="language-switcher" title={t(`languages.${lng}`)}>
      <Dropdown.Item onClick={handleSwitchLanguage('ru')}>{t('languages.ru')}</Dropdown.Item>
      <Dropdown.Item onClick={handleSwitchLanguage('en')}>{t('languages.en')}</Dropdown.Item>
    </DropdownButton>
  );
};
