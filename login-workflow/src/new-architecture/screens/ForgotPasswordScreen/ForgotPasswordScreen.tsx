import React, { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import { SimpleDialog } from '../../../components';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';
import { LinkStyles } from '../../../styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SuccessScreenBase } from '../SuccessScreen';
import CheckCircle from '@mui/icons-material/CheckCircle';

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
        title = t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
        },
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title,
        },
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
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: description ? (
                <> {description} </>
            ) : (
                <Typography>
                    <Trans
                        i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS_ALT'}
                        values={{ phone: contactPhone, responseTime }}
                    >
                        Please enter your email, we will respond in <b>{responseTime}</b>. For urgent issues please call{' '}
                        <Box component="a" href={`tel:${contactPhone}`} sx={LinkStyles}>
                            {contactPhone}
                        </Box>
                        .
                    </Trans>
                </Typography>
            ),
        },
        WorkflowCardActionsProps: workflowCardActionsProps = {
            onNext: ({ email }): void => {
                setEmailInput(email);
                void handleOnNext(email);
            },
            onPrevious: (): void => {
                navigate(routeConfig.LOGIN);
            },
            showNext: showNextButton,
            showPrevious: showBackButton,
            nextLabel: nextButtonLabel,
            previousLabel: backButtonLabel,
            canGoNext,
            canGoPrevious: canGoBack,
        },
        slotProps = { SuccessScreen: {} },
        slots,
    } = props;

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
                        SuccessScreen:
                            slots && slots.SuccessScreen ? (
                                <slots.SuccessScreen {...slotProps.SuccessScreen} />
                            ) : (
                                <SuccessScreenBase
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
                                    {...slotProps.SuccessScreen}
                                    WorkflowCardHeaderProps={{
                                        title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
                                        ...slotProps.SuccessScreen.WorkflowCardHeaderProps,
                                    }}
                                    WorkflowCardActionsProps={{
                                        showNext: true,
                                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                                        canGoNext: true,
                                        fullWidthButton: true,
                                        ...slotProps.SuccessScreen.WorkflowCardActionsProps,
                                        onNext: (): void => {
                                            navigate(routeConfig.LOGIN);
                                            if (slotProps.SuccessScreen.WorkflowCardActionsProps)
                                                slotProps.SuccessScreen.WorkflowCardActionsProps.onNext();
                                        },
                                    }}
                                />
                            ),
                    }}
                />
            )}
        </>
    );
};
