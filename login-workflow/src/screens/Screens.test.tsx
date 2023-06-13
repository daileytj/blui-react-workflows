import React from 'react';
import 'regenerator-runtime/runtime';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewEulaSubscreen } from './subScreens/ViewEulaSubscreen';
import { AccountDetails } from './subScreens/AccountDetails';
import { CreateAccount } from './subScreens/CreateAccount';
import { CreatePassword } from './subScreens/CreatePassword';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { VerifyEmail } from './subScreens/VerifyEmail';
import { ContactSupportSubscreen } from './subScreens/ContactSupportSubscreen';
import { AccountUIActionContext, AuthUIContextProvider, SecurityContextProvider, translations } from '../auth-shared';
import { ForgotPassword } from './ForgotPassword';
// import { InviteRegistrationPager } from './InviteRegistrationPager';
import { BrowserRouter } from 'react-router-dom';
import { RoutingContext } from '../contexts/RoutingContext';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
// import { SelfRegistrationPager } from './SelfRegistrationPager';
import { Splash } from './Splash';
// import { RoutingContext } from '../contexts/RoutingContext';
// import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as BLUIThemes from '@brightlayer-ui/react-themes';

const theme = createTheme(BLUIThemes.blue);
afterEach(cleanup);

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-auth-i18nextLng',
        },
        whitelist: ['en'],
        ns: ['app', 'blui'],
        defaultNS: 'app',
        fallbackNS: 'blui',
        resources: {
            en: {
                blui: translations.english.translation,
                app: {},
            },
        },
    });

describe('ViewEulaSubscreen tests', () => {
    it('renders without crashing', () => {
        const onEulaCheckboxChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <ViewEulaSubscreen
                    eulaAccepted={false}
                    loadEula={(): void => {}}
                    onEulaCheckboxChanged={onEulaCheckboxChanged}
                />
            </ThemeProvider>
        );
    });
});

describe('AccountDetails tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();
        const onDetailsChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
                    <AccountDetails onDetailsChanged={onDetailsChanged} />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('CreateAccount tests', () => {
    it('renders without crashing', () => {
        const onEmailChanged = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <CreateAccount onEmailChanged={onEmailChanged} />
            </ThemeProvider>
        );
    });
});

describe('CreatePassword tests', () => {
    it('renders without crashing', () => {
        const onPasswordChanged = jest.fn();
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
                    <CreatePassword onPasswordChanged={onPasswordChanged} />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('ExistingAccountComplete tests', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <ExistingAccountComplete />
            </ThemeProvider>
        );
    });
});

describe('RegistrationComplete tests', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <RegistrationComplete
                    firstName={'Betty'}
                    lastName={'White'}
                    email={'potentiallyImmortal@email.com'}
                    organization={'Not Your Typical Granny Inc.'}
                />
            </ThemeProvider>
        );
    });
});

describe('VerifyEmail tests', () => {
    it('renders without crashing', () => {
        const onVerifyCodeChanged = jest.fn();
        const onResendVerificationEmail = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <VerifyEmail
                    onVerifyCodeChanged={onVerifyCodeChanged}
                    onResendVerificationEmail={onResendVerificationEmail}
                />
            </ThemeProvider>
        );
    });
});

describe('ContactSupportSubscreen tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
                    <ContactSupportSubscreen />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

jest.mock('../auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('../auth-shared'),
    useAccountUIActions: jest.fn().mockReturnValue(() => {}),
}));

describe('ForgotPassword tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AccountUIActionContext.Provider value={{ actions: accountUIActions, dispatch: accountUIDispatch }}>
                    <AuthUIContextProvider
                        authActions={authUIActions}
                        registrationActions={registrationUIActionsLegacy}
                    >
                        <ForgotPassword />
                    </AuthUIContextProvider>
                </AccountUIActionContext.Provider>
            </ThemeProvider>
        );
    });
});

jest.mock('../auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('../auth-shared'),
    useSecurityState: jest.fn().mockReturnValue({}),
}));

describe('Login tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();
        const accountUIActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const accountUIDispatch = jest.fn();

        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };

        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                        <SecurityContextProvider>
                            <AccountUIActionContext.Provider
                                value={{ actions: accountUIActions, dispatch: accountUIDispatch }}
                            >
                                <AuthUIContextProvider
                                    authActions={authUIActions}
                                    registrationActions={registrationUIActionsLegacy}
                                >
                                    <Login />
                                </AuthUIContextProvider>
                            </AccountUIActionContext.Provider>
                        </SecurityContextProvider>
                    </RoutingContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    });
});

type QueryParams = {
    code?: string;
    email?: string;
    search?: string;
};

jest.mock('../hooks/useQueryString', () => ({
    useQueryString: (): QueryParams => ({ search: 'test-search', code: 'test', email: 'test@email.com' }),
}));

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn().mockReturnValue(jest.fn()),
    useLocation: jest.fn().mockReturnValue('test-location'),
}));

jest.mock('../auth-shared', () => ({
    // @ts-ignore
    ...jest.requireActual('../auth-shared'),
    useRegistrationUIActionsLegacy: jest.fn().mockReturnValue(() => ({
        actions: {
            loadEULA: jest.fn(),
            requestRegistrationCode: jest.fn(),
            validateUserRegistrationRequest: jest.fn(),
            completeRegistration: jest.fn(),
        },
        dispatch: jest.fn().mockReturnValue(() => {}),
    })),
}));

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('InviteRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const root = createRoot(div);
//         const authUIActions = jest.fn();
//         const registrationUIActionsLegacy = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         root.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
//                         <InviteRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>
//         );
//         root.unmount();
//     });
// });

// @TODO: Fix "Error: Uncaught [TypeError: registrationActions.dispatch is not a function]"

// describe('SelfRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const root = createRoot(div);
//         const authUIActions = jest.fn();
//         const registrationUIActionsLegacy = jest.fn();

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         root.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
//                         <SelfRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>
//         );
//         root.unmount();
//     });
// });

describe('Splash tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActionsLegacy}>
                    <Splash />
                </AuthUIContextProvider>
            </ThemeProvider>
        );
    });
});

describe('ResetPassword tests', () => {
    it('renders without crashing', () => {
        const authUIActions = jest.fn();
        const registrationUIActionsLegacy = jest.fn();
        const defaultRoutes = {
            LOGIN: '/login',
            FORGOT_PASSWORD: '/forgot-password',
            RESET_PASSWORD: '/reset-password',
            REGISTER_INVITE: '/register/invite',
            REGISTER_SELF: '/register/create-account',
            SUPPORT: '/support',
        };
        const authActions = {
            initiateSecurity: jest.fn(),
            logIn: jest.fn(),
            forgotPassword: jest.fn(),
            verifyResetCode: jest.fn(),
            setPassword: jest.fn(),
            changePassword: jest.fn(),
        };
        const authDispatch = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <RoutingContext.Provider value={{ routes: defaultRoutes }}>
                        <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
                            <AuthUIContextProvider
                                authActions={authUIActions}
                                registrationActions={registrationUIActionsLegacy}
                            >
                                <ResetPassword />
                            </AuthUIContextProvider>
                        </AccountUIActionContext.Provider>
                    </RoutingContext.Provider>
                </BrowserRouter>
            </ThemeProvider>
        );
    });
});
