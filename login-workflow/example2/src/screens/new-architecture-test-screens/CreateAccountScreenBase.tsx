import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { CreateAccountScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const emailValidator = (email: string): boolean | string =>
    new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email';

export const CreateAccountScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Create Account Screen
                    </Typography>
                    <Spacer />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 200 }}
                        onClick={(): void => navigate('/login')}
                    >
                        Go Login Route
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <CreateAccountScreenBase
                    WorkflowCardHeaderProps={{ title: 'Create an Account' }}
                    WorkflowCardInstructionProps={{
                        instructions:
                            'To register for an Eaton account, enter the required information below. You will need to verify your email address to continue.',
                    }}
                    emailValidator={emailValidator}
                    initialValue={''}
                    emailLabel={'Email Address'}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 1,
                        totalSteps: 6,
                    }}
                />
            </Box>
        </Box>
    );
};