import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContextProvider';
// eslint-disable-next-line arrow-body-style
export const DebugScreen = (): JSX.Element => {
    const { setIsAuthenticated } = useApp();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Login!!!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <EmptyState
                    icon={<Event fontSize={'inherit'} />}
                    title={'Login Screen Placeholder'}
                    description={'You should only be able to access this if you are NOT authenticated'}
                    actions={
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => {
                                    navigate('/login');
                                    setIsAuthenticated(false);
                                }}
                            >
                                Login Screen (Full)
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/login-screen-base')}
                            >
                                Login Screen (Base)
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/auth-provider-test')}
                            >
                                Auth ContextProvider
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/registration-provider-test')}
                            >
                                Registration ContextProvider
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/verify-code-test')}
                            >
                                Verify Code Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/contact-us')}
                            >
                                Contact Us
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/registration-workflow')}
                            >
                                Registration Workflow
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/set-password')}
                            >
                                Set Password
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/reset-password')}
                            >
                                Reset Password
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/success-screen')}
                            >
                                Success Screen Base
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/create-password')}
                            >
                                Create Password
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/guarded')}
                            >
                                Go Guarded Route
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/account-details-screen-test')}
                            >
                                Test Account Details Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/create-account')}
                            >
                                Create Account
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/change-password-dialog')}
                            >
                                Change Password Dialog
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/forgot-password')}
                            >
                                Forgot Password
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/eula-screen-test')}
                            >
                                Eula Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/reset-password-full-screen')}
                            >
                                Reset Password Full Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/forgot-password-full-screen')}
                            >
                                Forgot Password Full Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/contact-support-full-screen')}
                            >
                                Contact Support Full Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, m: 2 }}
                                onClick={(): void => navigate('/existing-account-success-screen')}
                            >
                                Existing Account Success Screen
                            </Button>
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};