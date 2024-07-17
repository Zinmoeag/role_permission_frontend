import { createContext, PropsWithChildren } from "react";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from "../local/en";
import myTranslation from "../local/my";
import { setLocal, useAppStore } from "../store";

export const locals = {
  en : "en",
  my : "my"
} as const;

export type Locals = typeof locals[keyof typeof locals];

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'my',                              // default language
  resources: {
    en: {
      translation: enTranslation
    },
    my: {
      translation: myTranslation
    }
  }
});

type localizationtype = {
  local : Locals,
  changeLocal : () => void
}


const LocalizationContext = createContext(null);

const LocalizationProvider = ({
    children
} : PropsWithChildren) => {
    return (
        <>
        <LocalizationContext.Provider value={null}>
            <I18nextProvider i18n={i18n}>
                {children}
            </I18nextProvider>
        </LocalizationContext.Provider>
        </>
    )
}

export const useLocalization = ()  : localizationtype => {

  const {t, i18n} = useTranslation();
  const {state : {
    local
  }, dispatch} = useAppStore() as any;


  const changeLocal = () => {
    if(local == locals.en){
      dispatch(setLocal(locals.my))
      i18n.changeLanguage(locals.my)
    }else{
      dispatch(setLocal(locals.en))
      i18n.changeLanguage(locals.en)
    }
  }

  return {
    local,
    changeLocal
  }
}

export default LocalizationProvider;