import React, { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import { CheckCircle } from '@mui/icons-material';
import { SimpleDialog } from '../../../components';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase } from '../SuccessScreen';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';
import Typography from '@mui/material/Typography';
import { LinkStyles } from '../../styles';

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig } = useAuthContext();

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(props.showSuccessScreen);

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const handleOnNext = useCallback(
        async (email: string): Promise<void> => {
            try {
                setIsLoading(true);
                await actions().forgotPassword(email);
                setShowSuccessScreen(true);
                setIsLoading(false);
            } catch (e) {
                setShowErrorDialog(true);
            }
        },
        [setIsLoading, setShowErrorDialog, actions]
    );

    const {
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        contactPhone = '1-800-123-4567',
        initialEmailValue,
        description,
        responseTime = 'one business day',
        emailValidator = (email: string): boolean | string =>
            new RegExp(EMAIL_REGEX).test(email) ? true : t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR'),
        showBackButton = true,
        backButtonLabel = t('bluiCommon:ACTIONS.BACK'),
        nextButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        canGoNext,
        canGoBack,
        showNextButton = true,
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardInstructionProps = {
        instructions: description ? (
            <> {description(responseTime)} </>
        ) : (
            <Typography>
                <Trans
                    i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS_ALT'}
                    values={{ phone: contactPhone, responseTime }}
                >
                    Please enter your email, we will respond in <b>{responseTime}</b>. For urgent issues please call{' '}
                    <Typography component="a" href={`tel:${contactPhone}`} sx={LinkStyles}>
                        {contactPhone}
                    </Typography>
                    .
                </Trans>
            </Typography>
        ),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        showNext: showNextButton,
        showPrevious: showBackButton,
        nextLabel: nextButtonLabel,
        previousLabel: backButtonLabel,
        canGoNext,
        canGoPrevious: canGoBack,
        ...WorkflowCardActionsProps,
        onNext: (data: any): void => {
            setEmailInput(data.email);
            void handleOnNext(data.email);
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    const errorDialog = (
        <SimpleDialog
            title={t('bluiCommon:MESSAGES.ERROR')}
            body={t('bluiAuth:FORGOT_PASSWORD.ERROR')}
            open={showErrorDialog}
            onClose={(): void => {
                setShowErrorDialog(false);
                setIsLoading(false);
            }}
        />
    );

    return (
        <>
            {showErrorDialog ? (
                errorDialog
            ) : (
                <ForgotPasswordScreenBase
                    WorkflowCardBaseProps={workflowCardBaseProps}
                    WorkflowCardHeaderProps={workflowCardHeaderProps}
                    WorkflowCardInstructionProps={workflowCardInstructionProps}
                    WorkflowCardActionsProps={workflowCardActionsProps}
                    emailLabel={emailLabel}
                    initialEmailValue={initialEmailValue}
                    emailValidator={emailValidator}
                    showSuccessScreen={showSuccessScreen}
                    slots={{
                        SuccessScreen: () => (
                            <SuccessScreenBase
                                WorkflowCardHeaderProps={{ title: t('bluiAuth:HEADER.FORGOT_PASSWORD') }}
                                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 5 }} />}
                                messageTitle={t('bluiCommon:MESSAGES.EMAIL_SENT')}
                                message={
                                    <Trans
                                        i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'}
                                        values={{ email: emailInput }}
                                    >
                                        Link has been sent to <b>{emailInput}</b>.
                                    </Trans>
                                }
                                WorkflowCardActionsProps={{
                                    showNext: true,
                                    nextLabel: t('bluiCommon:ACTIONS.DONE'),
                                    canGoNext: true,
                                    fullWidthButton: true,
                                    onNext: (): void => {
                                        navigate(routeConfig.LOGIN);
                                    },
                                }}
                                {...props}
                            />
                        ),
                    }}
                />
            )}
        </>
    );
};
