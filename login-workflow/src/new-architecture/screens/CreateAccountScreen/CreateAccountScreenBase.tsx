import React, { useCallback } from 'react';
import { CreateAccountScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
import TextField from '@mui/material/TextField';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param emailLabel label for the textfield
 * @param initialValue used to pre-populate the email input field
 * @param emailValidator used to test the input for valid formatting
 *
 * @category Component
 */

export const CreateAccountScreenBase: React.FC<React.PropsWithChildren<CreateAccountScreenProps>> = (props) => {
    const {
        emailValidator = (email: string): boolean | string => (email?.length > 2 ? true : 'Please enter a valid email'),
        emailLabel,
        initialValue,
        title,
        instructions,
        ...otherProps
    } = props;

    const actionsProps = {
        divider: otherProps.divider,
        canGoNext: otherProps.canGoNext,
        canGoPrevious: otherProps.canGoPrevious,
        showPrevious: otherProps.showPrevious,
        showNext: otherProps.showNext,
        previousLabel: otherProps.previousLabel,
        nextLabel: otherProps.nextLabel,
        onPrevious: otherProps.onPrevious,
        onNext: otherProps.onNext,
        currentStep: otherProps.currentStep,
        totalSteps: otherProps.totalSteps,
        fullWidthButton: otherProps.fullWidthButton,
        // @TODO: should we extend the rest of the props (CardActionsProps) or should we set this up to take in each sections props separately e.g., workflowCardProps, actionsProps, etc.
    };

    const [emailInput, setEmailInput] = React.useState(initialValue ? initialValue : '');
    const [isEmailValid, setIsEmailValid] = React.useState(emailValidator(initialValue) ?? false);
    const [emailError, setEmailError] = React.useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = React.useState(false);

    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);

            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );

    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions divider instructions={instructions} />
                <TextField
                    type="email"
                    label={emailLabel}
                    fullWidth
                    value={emailInput}
                    onChange={(evt): void => {
                        handleEmailInputChange(evt.target.value);
                    }}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && props.onNext) props.onNext();
                    }}
                    variant="filled"
                    error={shouldValidateEmail && !isEmailValid}
                    helperText={shouldValidateEmail && emailError}
                    onBlur={(): void => setShouldValidateEmail(true)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider></WorkflowCardActions>
        </WorkflowCard>
    );
};
