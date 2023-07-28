import React, { useCallback, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
import { AccountDetailsScreenProps } from './types';
import ErrorManager from '../../components/Error/ErrorManager';

export const AccountDetailsScreenBase: React.FC<AccountDetailsScreenProps> = (props) => {
    const {
        firstNameLabel,
        initialFirstName,
        firstNameValidator,
        firstNameTextFieldProps,
        lastNameLabel,
        initialLastName,
        lastNameValidator,
        lastNameTextFieldProps,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const firstNameRef = useRef<any>(null);
    const lastNameRef = useRef<any>(null);

    const [firstNameInput, setFirstNameInput] = React.useState(initialFirstName ? initialFirstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialLastName ? initialLastName : '');

    const [shouldValidateFirstName, setShouldValidateFirstName] = React.useState(false);
    const [shouldValidateLastName, setShouldValidateLastName] = React.useState(false);

    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');

    const [showFirstNameError, setShowFirstNameError] = React.useState(false);
    const [showLastNameError, setShowLastNameError] = React.useState(false);

    const [isFirstNameValid, setIsFirstNameValid] = React.useState(false);
    const [isLastNameValid, setIsLastNameValid] = React.useState(false);
    const [isFormValid, setIsFormValid] = React.useState(false);

    const validateFirstName = useCallback(
        (firstName: string) => {
            const validatorResponse = firstNameValidator(firstName);

            setIsFirstNameValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setShowFirstNameError(typeof validatorResponse === 'boolean' ? false : true);
            setFirstNameError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [firstNameValidator, setIsFirstNameValid, setShowFirstNameError, setFirstNameError]
    );

    const validateLastName = useCallback(
        (lastName: string) => {
            const validatorResponse = lastNameValidator(lastName);

            setIsLastNameValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setShowLastNameError(typeof validatorResponse === 'boolean' ? false : true);
            setLastNameError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [lastNameValidator, setIsLastNameValid, setShowLastNameError, setLastNameError]
    );

    const onFirstNameChange = useCallback(
        (firstName: string) => {
            setFirstNameInput(firstName);
            if (firstNameValidator) {
                validateFirstName(firstName);
            } else {
                setIsFirstNameValid(true);
            }
        },
        [firstNameValidator, validateFirstName]
    );

    const onLastNameChange = useCallback(
        (lastName: string) => {
            setLastNameInput(lastName);
            if (lastNameValidator) {
                validateLastName(lastName);
            } else {
                setIsLastNameValid(true);
            }
        },
        [lastNameValidator, validateLastName]
    );

    useEffect(() => {
        if (firstNameInput && lastNameInput) {
            if (firstNameValidator) {
                validateFirstName(firstNameInput);
            }
            if (lastNameValidator) {
                validateLastName(lastNameInput);
            }
            setIsFormValid(isFirstNameValid && isLastNameValid);
        }
    }, [
        firstNameInput,
        lastNameInput,
        firstNameValidator,
        lastNameValidator,
        validateFirstName,
        validateLastName,
        setIsFormValid,
        isFirstNameValid,
        isLastNameValid,
    ]);

    useEffect(() => {
        if (firstNameInput.length > 0) {
            setShouldValidateFirstName(true);
            onFirstNameChange(firstNameInput);
        }
        if (lastNameInput.length > 0) {
            setShouldValidateLastName(true);
            onLastNameChange(lastNameInput);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <ErrorManager {...errorDisplayConfig}>
                    <TextField
                        id="first"
                        fullWidth
                        variant="filled"
                        {...firstNameTextFieldProps}
                        inputRef={firstNameRef}
                        label={firstNameLabel}
                        value={firstNameInput}
                        onChange={(e): void => onFirstNameChange(e.target.value)}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && lastNameRef.current) lastNameRef.current.focus();
                        }}
                        error={shouldValidateFirstName && showFirstNameError}
                        helperText={shouldValidateFirstName && firstNameError}
                        sx={{
                            mb: { md: 0, sm: 1, xs: 4 },
                        }}
                        onBlur={(): void => setShouldValidateFirstName(true)}
                    />
                    <TextField
                        id="last"
                        fullWidth
                        variant="filled"
                        sx={{
                            mt: { md: 4, sm: 3 },
                        }}
                        {...lastNameTextFieldProps}
                        inputRef={lastNameRef}
                        label={lastNameLabel}
                        value={lastNameInput}
                        onChange={(e): void => onLastNameChange(e.target.value)}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && isFormValid && actionsProps.canGoNext) actionsProps.onNext();
                        }}
                        error={shouldValidateLastName && showLastNameError}
                        helperText={shouldValidateLastName && lastNameError}
                        onBlur={(): void => setShouldValidateLastName(true)}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                canGoNext={actionsProps.canGoNext && isFirstNameValid && isLastNameValid}
                divider
            />
        </WorkflowCard>
    );
};
