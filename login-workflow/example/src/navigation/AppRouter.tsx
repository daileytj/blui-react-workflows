/* eslint-disable */
import React from 'react';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ReactRouterAuthGuard,
    ReactRouterGuestGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
    ResetPasswordScreen,
    RegistrationWorkflow,
    EulaScreen,
    AccountDetailsScreen,
    CreateAccountScreen,
    VerifyCodeScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from '../screens/Login';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from './Routing';
import { ExampleHome } from '../screens/ExampleHome';
import i18nAppInstance from '../translations/i18n';
import { ChangePassword } from '../components/ChangePassword';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { Home } from '@mui/icons-material';

export const AppRouter: React.FC = () => {
    const navigate = useNavigate();
    const app = useApp();
    const { email, rememberMe } = app.loginData;

    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(app)}
                        language={app.language}
                        navigate={navigate}
                        routeConfig={routes}
                        i18n={i18nAppInstance}
                        rememberMeDetails={{ email: rememberMe ? email : '', rememberMe: rememberMe }}
                    >
                        <Outlet />
                    </AuthContextProvider>
                }
            >
                <Route
                    path={'/login'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <Login />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/forgot-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ForgotPasswordScreen
                                WorkflowCardInstructionProps={{
                                    instructions: 'Test Instruction',
                                    divider: false,
                                }}
                                WorkflowCardHeaderProps={{
                                    avatar: <Home />,
                                }}
                                WorkflowCardBaseProps={{
                                    loading: true,
                                    backgroundImage: EatonLogo,
                                }}
                                WorkflowCardActionsProps={{
                                    nextLabel: 'Go',
                                    fullWidthButton: true,
                                    showPrevious: false,
                                    divider: true,
                                }}
                            />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/contact-support'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ContactSupportScreen
                                WorkflowCardInstructionProps={{
                                    instructions: 'Test Instruction',
                                    divider: false,
                                }}
                                WorkflowCardHeaderProps={{
                                    avatar: <Home />,
                                }}
                                WorkflowCardBaseProps={{
                                    loading: true,
                                    backgroundImage: EatonLogo,
                                }}
                                WorkflowCardActionsProps={{
                                    nextLabel: 'Go',
                                    fullWidthButton: true,
                                    showPrevious: false,
                                    divider: false,
                                }}
                            />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/reset-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ResetPasswordScreen
                                WorkflowCardInstructionProps={{
                                    instructions: 'Test Instruction',
                                    divider: false,
                                }}
                                WorkflowCardHeaderProps={{
                                    avatar: <Home />,
                                }}
                                WorkflowCardBaseProps={{
                                    loading: true,
                                    backgroundImage: EatonLogo,
                                }}
                                WorkflowCardActionsProps={{
                                    nextLabel: 'Go',
                                    fullWidthButton: true,
                                    showPrevious: false,
                                    divider: false,
                                }}
                            />
                        </ReactRouterGuestGuard>
                    }
                />
                {/* USER APPLICATION ROUTES */}
                <Route
                    element={
                        <>
                            <Outlet />
                            {app.showChangePasswordDialog && <ChangePassword />}
                        </>
                    }
                >
                    <Route
                        path={'/homepage'}
                        element={
                            <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                                <ExampleHome />
                            </ReactRouterAuthGuard>
                        }
                    />
                    <Route path={'/'} element={<Navigate to={'/homepage'} replace />} />
                </Route>
                <Route
                    path={'*'}
                    element={
                        <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                            <Navigate to={'/login'} />
                        </ReactRouterAuthGuard>
                    }
                />
            </Route>
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={app.language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions()}
                        i18n={i18nAppInstance}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow>
                            {/* Eula Screen */}
                            {/* <EulaScreen 
                        WorkflowCardInstructionProps={{
                            instructions: 'Test Instruction',
                            divider: true,
                        }}
                        WorkflowCardHeaderProps={{
                            avatar: <Home/>,
                            title: 'Test Title',
                        }}
                        WorkflowCardBaseProps={{
                            loading: true,
                            backgroundImage: EatonLogo,
                        }}
                        WorkflowCardActionsProps={{
                            nextLabel: 'Go',
                            fullWidthButton: true,
                            showPrevious: false,
                            divider: true,
                        }}
                    /> */}
                            {/* AccountDetailsScreen */}
                            {/* <AccountDetailsScreen
                        WorkflowCardInstructionProps={{
                            instructions: 'Test Instruction',
                            divider: false,
                        }}
                        WorkflowCardHeaderProps={{
                            avatar: <Home/>
                        }}
                        WorkflowCardBaseProps={{
                            loading: false,
                            backgroundImage: EatonLogo,
                        }}
                        WorkflowCardActionsProps={{
                            nextLabel: 'Go',
                            fullWidthButton: true,
                            showPrevious: false,
                            divider: false,
                        }}
                    /> */}
                            {/* CreateAccountScreen */}
                            {/* <CreateAccountScreen
                        WorkflowCardInstructionProps={{
                            instructions: 'Test Instruction',
                            divider: false,
                        }}
                        WorkflowCardHeaderProps={{
                            avatar: <Home/>
                        }}
                        WorkflowCardBaseProps={{
                            loading: false,
                            backgroundImage: EatonLogo,
                        }}
                        WorkflowCardActionsProps={{
                            nextLabel: 'Go',
                            fullWidthButton: true,
                            showPrevious: false,
                            divider: false,
                        }}
                    /> */}
                            {/* Verify code Screen */}
                            <VerifyCodeScreen
                                WorkflowCardInstructionProps={{
                                    instructions: 'Test Instruction',
                                    divider: false,
                                }}
                                WorkflowCardHeaderProps={{
                                    avatar: <Home />,
                                }}
                                WorkflowCardBaseProps={{
                                    loading: true,
                                    backgroundImage: EatonLogo,
                                }}
                                WorkflowCardActionsProps={{
                                    nextLabel: 'Go',
                                    fullWidthButton: true,
                                    showPrevious: false,
                                    divider: false,
                                }}
                            />
                        </RegistrationWorkflow>
                    }
                />
                <Route path={'/register-by-invite'} element={<RegistrationWorkflow isInviteRegistration />} />
            </Route>
        </Routes>
    );
};
