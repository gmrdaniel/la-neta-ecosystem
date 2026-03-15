import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './en/common.json'
import enHero from './en/hero.json'
import enWhoIsLaNeta from './en/whoIsLaNeta.json'
import enServices from './en/services.json'
import enPartnerships from './en/partnerships.json'
import enElevn from './en/elevn.json'
import enAdFactory from './en/adFactory.json'

import esCommon from './es/common.json'
import esHero from './es/hero.json'
import esWhoIsLaNeta from './es/whoIsLaNeta.json'
import esServices from './es/services.json'
import esPartnerships from './es/partnerships.json'
import esElevn from './es/elevn.json'
import esAdFactory from './es/adFactory.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        hero: enHero,
        whoIsLaNeta: enWhoIsLaNeta,
        services: enServices,
        partnerships: enPartnerships,
        elevn: enElevn,
        adFactory: enAdFactory,
      },
      es: {
        common: esCommon,
        hero: esHero,
        whoIsLaNeta: esWhoIsLaNeta,
        services: esServices,
        partnerships: esPartnerships,
        elevn: esElevn,
        adFactory: esAdFactory,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })

export default i18n
