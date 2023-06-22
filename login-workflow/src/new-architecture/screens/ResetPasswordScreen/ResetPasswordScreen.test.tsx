import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { AuthContextProvider } from '../../contexts';
import { ResetPasswordScreenProps } from './types';
import { defaultProps as authContextProps } from '../../contexts/AuthContext/AuthContextProvider.test';

afterEach(cleanup);

describe('Reset Password Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: ResetPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProps}>
                <BrowserRouter>
                    <ResetPasswordScreen {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Reset Password')).toBeInTheDocument();
    });

    it('should update values when passed as props', () => {
        renderer({ WorkflowCardHeaderProps: { title: 'Test Title' } });

        expect(screen.queryByText('Reset Password')).toBeNull();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should show error dialog, when next button is clicked and error is thrown', () => {
        const { getByLabelText, rerender } = renderer();

        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');

        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        rerender(
            <AuthContextProvider language={'en'} routeConfig={{}} navigate={jest.fn()} actions={jest.fn()}>
                <BrowserRouter>
                    <ResetPasswordScreen />
                </BrowserRouter>
            </AuthContextProvider>
        );

        expect(screen.getByText('Could not reset your password at this time.')).toBeInTheDocument();
    });

    it('should show success screen, when showSuccessScreen prop is true', () => {
        renderer({ showSuccessScreen: true });

        expect(screen.getByText('Your password was successfully reset.')).toBeInTheDocument();
    });

    it('should loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });

        expect(screen.getByTestId('blui-spinner')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');

        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('should call onNext, when Done button is clicked on success screen', () => {
        renderer({
            showSuccessScreen: true,
            slotProps: {
                SuccessScreen: {
                    messageTitle: 'Success',
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: 'Done',
                        onNext: mockOnNext(),
                    },
                },
            },
        });

        expect(screen.getByText('Done')).toBeInTheDocument();
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should dismiss error dialog, when okay button is clicked', () => {
        const { getByLabelText, rerender } = renderer();

        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');

        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        rerender(
            <AuthContextProvider language={'en'} routeConfig={{}} navigate={jest.fn()} actions={jest.fn()}>
                <BrowserRouter>
                    <ResetPasswordScreen WorkflowCardHeaderProps={{ title: 'Test Title' }} />
                </BrowserRouter>
            </AuthContextProvider>
        );

        expect(screen.getByText('Could not reset your password at this time.')).toBeInTheDocument();
        expect(screen.getByText('OKAY')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.click(screen.getByText('OKAY'));
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('should dismiss error dialog, when okay button is clicked', () => {
        const { getByLabelText, rerender } = renderer();

        const passwordField = getByLabelText('New Password');
        const confirmPasswordField = getByLabelText('Confirm New Password');

        fireEvent.change(passwordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(passwordField);
        fireEvent.change(confirmPasswordField, { target: { value: 'Abcd@123' } });
        fireEvent.blur(confirmPasswordField);

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        rerender(
            <AuthContextProvider language={'en'} routeConfig={{}} navigate={jest.fn()} actions={jest.fn()}>
                <BrowserRouter>
                    <ResetPasswordScreen WorkflowCardHeaderProps={{ title: 'Test Title' }} />
                </BrowserRouter>
            </AuthContextProvider>
        );

        expect(screen.getByText('Could not reset your password at this time.')).toBeInTheDocument();
        expect(screen.getByText('OKAY')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.click(screen.getByText('OKAY'));
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});