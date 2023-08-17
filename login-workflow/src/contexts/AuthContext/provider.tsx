/**
 * @packageDocumentation
 * @module AuthContextProvider
 */

import React, { useEffect } from 'react';
import { AuthContextProviderProps } from './types';
import { AuthContext } from './context';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18nAuthInstance';
import { ErrorContext } from '../ErrorContext';
import { AuthDictionaries } from './AuthDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';

export const AuthContextProvider: React.FC<React.PropsWithChildren<AuthContextProviderProps>> = (props) => {
    const i18nInstance = props.i18n ?? i18next;
    const { children, ...authContextProps } = props;
    const { language, i18n = i18nInstance, errorConfig } = props;

    if (props.i18n) {
        i18n.addResourceBundle('zh', 'bluiAuth', AuthDictionaries.chinese.translation, true, true);
        i18n.addResourceBundle('zh', 'bluiCommon', SharedDictionaries.chinese.translation, true, true);
        i18n.addResourceBundle('en', 'bluiAuth', AuthDictionaries.english.translation, true, true);
        i18n.addResourceBundle('en', 'bluiCommon', SharedDictionaries.english.translation, true, true);
        i18n.addResourceBundle('fr', 'bluiAuth', AuthDictionaries.french.translation, true, true);
        i18n.addResourceBundle('fr', 'bluiCommon', SharedDictionaries.french.translation, true, true);
        i18n.addResourceBundle('pt', 'bluiAuth', AuthDictionaries.portuguese.translation, true, true);
        i18n.addResourceBundle('pt', 'bluiCommon', SharedDictionaries.portuguese.translation, true, true);
        i18n.addResourceBundle('es', 'bluiAuth', AuthDictionaries.spanish.translation, true, true);
        i18n.addResourceBundle('es', 'bluiCommon', SharedDictionaries.spanish.translation, true, true);
    }

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18nInstance}>
            <AuthContext.Provider value={authContextProps}>
                <ErrorContext.Provider value={errorConfig}>{children}</ErrorContext.Provider>
            </AuthContext.Provider>
        </I18nextProvider>
    );
};
