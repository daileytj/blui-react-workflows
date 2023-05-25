import React, { useCallback, useRef, useState } from 'react';
import { LoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cyberSecurityBadge from '../../../assets/images/cybersecurity_certified.png';
import { /*BasicDialog,*/ PasswordTextField } from '../../components';
import Button from '@mui/material/Button';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Close from '@mui/icons-material/Close';
import * as Colors from '@brightlayer-ui/colors';
import { HELPER_TEXT_HEIGHT } from '../../utils/constants';

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 * @param usernameLabel label for the username field
 * @param usernameValidator function used to validate the username
 * @param initialUsernameValue username used to pre-populate the field
 * @param passwordLabel label for the password field
 * @param passwordValidator function used to validate the password
 * @param showRememberMe whether or not to show the 'remember me' checkbox
 * @param rememberMeLabel label for the 'remember me' checkbox
 * @param rememberMeInitialValue whether or not the 'remember me' checkbox should be checked by default
 * @param onRememberMeChanged callback function that is called when the 'remember me' checkbox is changed
 * @param loginButtonLabel label for the login button
 * @param onLogin callback function that is called when the login button is clicked
 * @param showForgotPassword whether or not to show the 'forgot password' link
 * @param forgotPasswordLabel label for the 'forgot password' link
 * @param onForgotPassword callback function that is called when the 'forgot password' link is clicked
 * @param showSelfRegistration whether or not to show the 'self registration' link
 * @param selfRegisterButtonLabel label for the 'self registration' link
 * @param selfRegisterInstructions instructions for the 'self registration' link
 * @param onSelfRegister callback function that is called when the 'self registration' link is clicked
 * @param showContactSupport whether or not to show the 'contact support' link
 * @param contactSupportLabel label for the 'contact support' link
 * @param onContactSupport callback function that is called when the 'contact support' link is clicked
 * @param errorDisplayConfig configuration for how errors should be displayed
 * @param showCyberSecurityBadge whether or not to show the cyber security badge
 * @param projectImage image to display at the top of the screen
 * @param header header to display at the top of the screen
 * @param footer footer to display at the bottom of the screen
 *
 * @category Component
 */

const LinkStyles = (theme?: Theme): SxProps<Theme> => ({
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:visited': {
        color: 'inherit',
    },
    '&:hover': {
        cursor: 'pointer',
    },
});

export const LoginScreenBase: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const {
        usernameLabel,
        usernameValidator,
        initialUsernameValue,
        passwordLabel,
        passwordValidator,
        showRememberMe,
        rememberMeLabel,
        rememberMeInitialValue,
        onRememberMeChanged,
        loginButtonLabel,
        onLogin,
        showForgotPassword,
        forgotPasswordLabel,
        onForgotPassword,
        showSelfRegistration,
        selfRegisterButtonLabel,
        selfRegisterInstructions,
        onSelfRegister,
        showContactSupport,
        contactSupportLabel,
        onContactSupport,
        errorDisplayConfig,
        showCyberSecurityBadge,
        projectImage,
        header,
        footer,
    } = props;

    const theme = useTheme();

    const [username, setUsername] = React.useState<string>(initialUsernameValue || '');
    const [password, setPassword] = React.useState<string>('');
    const [rememberMe, setRememberMe] = React.useState<boolean>(rememberMeInitialValue || false);

    const [shouldValidateUsername, setShouldValidateUsername] = React.useState<boolean>(false);
    const [shouldValidatePassword, setShouldValidatePassword] = React.useState<boolean>(false);

    const passwordField = useRef<any>(null);

    const [isUsernameValid, setIsUsernameValid] = useState(usernameValidator ? usernameValidator(username) : true);
    const [isPasswordValid, setIsPasswordValid] = useState(passwordValidator ? passwordValidator(password) : true);

    const [usernameError, setUsernameError] = useState(isUsernameValid === true ? '' : isUsernameValid);
    const [passwordError, setPasswordError] = useState(isPasswordValid === true ? '' : isPasswordValid);

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [showErrorMessageBox, setShowErrorMessageBox] = React.useState(true);
    // const [debugMode, setDebugMode] = React.useState(false);

    const handleUsernameInputChange = useCallback(
        (value: string) => {
            setUsername(value);
            const validatorResponse = usernameValidator(value);

            setIsUsernameValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setUsernameError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [usernameValidator]
    );

    const handlePasswordInputChange = useCallback(
        (value: string) => {
            setPassword(value);
            const validatorResponse = passwordValidator(value);

            setIsPasswordValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setPasswordError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [passwordValidator]
    );

    const handleLogin = (): void => {
        if (onLogin) onLogin(username, password);
    };

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    const handleRememberMeChanged = (value: boolean): void => {
        if (onRememberMeChanged) {
            onRememberMeChanged(value);
            setRememberMe(value);
        }
    };

    const shouldValidate = (): boolean => shouldValidateUsername || shouldValidatePassword;

    const isFormValid = (): boolean =>
        typeof isUsernameValid === 'boolean' &&
        isUsernameValid &&
        typeof isPasswordValid === 'boolean' &&
        isPasswordValid;

    const handleLoginSubmit = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        setHasAcknowledgedError(false);
        if (e.key === 'Enter' && isFormValid()) {
            handleLogin();
        }
    };

    const errorDisplayConfigProps = {
        ...errorDisplayConfig,
        usernameError,
        passwordError,
        shouldValidate,
        isFormValid,
    };

    // const ErrorDialog = (): JSX.Element => {
    //     const dialogTitle = errorDisplayConfigProps?.dialogErrorConfig?.title || 'Error!';

    //     const dialogBody =
    //         errorDisplayConfigProps?.dialogErrorConfig?.content ||
    //         (typeof usernameError === 'string' && usernameError) ||
    //         (typeof passwordError === 'string' && passwordError) ||
    //         'An error has occurred.';

    //     const isOpen =
    //         !hasAcknowledgedError &&
    //         ((typeof usernameError === 'boolean' && !isUsernameValid) ||
    //             (typeof passwordError === 'boolean' && !isPasswordValid));

    //     return (
    //         <BasicDialog
    //             title={dialogTitle}
    //             body={dialogBody}
    //             open={isOpen}
    //             onClose={(): void => {
    //                 errorDisplayConfig?.dialogErrorConfig?.onAcknowledgeError();
    //                 setHasAcknowledgedError(true);
    //             }}
    //         />
    //     );
    // };

    const errorMessageBox: JSX.Element =
        (errorDisplayConfig?.mode === 'message-box' || errorDisplayConfig?.mode === 'both') && !hasAcknowledgedError ? (
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: errorDisplayConfigProps?.backgroundColor || theme.palette.error.main,
                    borderRadius: 4,
                    p: 2,
                    color: errorDisplayConfigProps?.fontColor || Colors.white[50],
                    mb: 2,
                    mt: errorDisplayConfigProps?.position !== 'bottom' ? 0 : -1,
                }}
            >
                {errorDisplayConfigProps?.dismissible !== false && (
                    <Close
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                            float: 'right',
                        }}
                        onClick={(): void => {
                            setShowErrorMessageBox(false);
                        }}
                    />
                )}
                {errorDisplayConfigProps?.error && typeof errorDisplayConfigProps?.error === 'string' && (
                    <Typography variant="body2">{errorDisplayConfigProps.error}</Typography>
                )}
                {errorDisplayConfigProps?.error &&
                    typeof errorDisplayConfigProps?.error === 'boolean' &&
                    !isUsernameValid && <Typography variant="body2">{usernameError}</Typography>}
                {errorDisplayConfigProps?.error &&
                    typeof errorDisplayConfigProps?.error === 'boolean' &&
                    !isPasswordValid && <Typography variant="body2">{passwordError}</Typography>}
            </Box>
        ) : (
            <></>
        );

    return (
        <>
            <WorkflowCard>
                <WorkflowCardBody sx={{ py: { xs: 4, sm: 4, md: 4 }, px: { xs: 4, sm: 8, md: 8 } }}>
                    {header}
                    <Box sx={{ display: 'flex', maxWidth: '100%', mb: 6.75 }}>{projectImage}</Box>
                    {showErrorMessageBox && errorDisplayConfig?.position === 'top' && errorMessageBox}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                mb:
                                    username.length > 0 && !isUsernameValid && shouldValidateUsername
                                        ? 4
                                        : `${(parseInt(theme.spacing(4)) + HELPER_TEXT_HEIGHT).toString()}px`,
                                [theme.breakpoints.down('sm')]: {
                                    mb:
                                        username.length > 0 && !isUsernameValid && shouldValidateUsername
                                            ? 3
                                            : `${(parseInt(theme.spacing(3)) + HELPER_TEXT_HEIGHT).toString()}px`,
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                id="username"
                                label={usernameLabel || 'Username'}
                                name="username"
                                variant="filled"
                                value={username}
                                error={shouldValidateUsername && !isUsernameValid}
                                helperText={shouldValidateUsername && !isUsernameValid ? usernameError : ''}
                                onChange={(e): void => handleUsernameInputChange(e.target.value)}
                                onSubmit={(e: any): void => {
                                    if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                                }}
                                onBlur={(): void => setShouldValidateUsername(true)}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                mb:
                                    username.length > 0 && !isPasswordValid && shouldValidatePassword
                                        ? 2
                                        : `${(parseInt(theme.spacing(2)) + HELPER_TEXT_HEIGHT).toString()}px`,
                            }}
                        >
                            <PasswordTextField
                                fullWidth
                                inputRef={passwordField}
                                id="password"
                                name="password"
                                label={passwordLabel || 'Password'}
                                variant="filled"
                                value={password}
                                error={shouldValidatePassword && !isPasswordValid}
                                helperText={shouldValidatePassword && !isPasswordValid ? passwordError : ''}
                                onChange={(e: any): void => handlePasswordInputChange(e.target.value)}
                                onSubmit={(e: any): void => handleLoginSubmit(e.target.value)}
                                onBlur={(): void => setShouldValidatePassword(true)}
                            />
                        </Box>
                    </Box>
                    {showErrorMessageBox && errorDisplayConfig?.position === 'bottom' && errorMessageBox}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 1,
                            mb: 5,
                            flexWrap: 'nowrap',
                            [theme.breakpoints.down('sm')]: {
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        {showRememberMe && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: -1.5,
                                    mr: 1,
                                    [theme.breakpoints.down('sm')]: {
                                        mr: 0,
                                    },
                                }}
                            >
                                <Checkbox
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={(e: any): void => handleRememberMeChanged(e.target.checked)}
                                />
                                <Typography variant="body1">{rememberMeLabel || 'Remember Me'}</Typography>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                            <Button
                                onClick={handleLogin}
                                disabled={!isFormValid()}
                                variant="contained"
                                color="primary"
                                sx={{ width: showRememberMe ? 150 : '100%' }}
                            >
                                {loginButtonLabel || 'Log In'}
                            </Button>
                        </Box>
                    </Box>

                    {showForgotPassword && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                            <Typography variant="body2" sx={LinkStyles(theme)} onClick={handleForgotPassword}>
                                {forgotPasswordLabel || 'Forgot your password?'}
                            </Typography>
                        </Box>
                    )}

                    {showSelfRegistration && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                marginTop: 4,
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="body2">{selfRegisterInstructions || 'Need an account?'}</Typography>
                            <Typography variant="body2" sx={LinkStyles(theme)} onClick={handleSelfRegister}>
                                {selfRegisterButtonLabel || 'Register now!'}
                            </Typography>
                        </Box>
                    )}

                    {showContactSupport && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, textAlign: 'center' }}>
                            <Typography variant="body2" sx={LinkStyles(theme)} onClick={handleContactSupport}>
                                {contactSupportLabel || 'Contact Support'}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>

                    {showCyberSecurityBadge && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <img src={cyberSecurityBadge} alt="Cyber Security Badge" style={{ width: '100px' }} />
                        </Box>
                    )}
                </WorkflowCardBody>
            </WorkflowCard>
            {/* <ErrorDialog /> */}
        </>
    );
};
