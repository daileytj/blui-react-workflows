import React, { ReactElement, useEffect } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography, { TypographyProps } from '@mui/material/Typography';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Theme, SxProps } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import Box, { BoxProps } from '@mui/material/Box';
import { AcceptEulaClasses, AcceptEulaClassKey, getAcceptEulaUtilityClass } from './AcceptEulaClasses';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';

export type AcceptEulaProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaChanged: (accepted: boolean) => void;
    loadEula: () => Promise<void> | void;
    htmlEula?: boolean;
    eulaError?: string;
    agreeTerms?: string;
    eulaControl?: ReactElement;
    termsAndConditionsStyles?: SxProps<Theme>;
    TermsAndConditionsProps?: FormControlLabelProps;
    eulaContentStyles?: SxProps<Theme>;
    EulaContentProps?: BoxProps;
    loaderText?: string;
    LoaderTextProps?: TypographyProps;
    loaderStyles?: SxProps<Theme>;
    classes?: AcceptEulaClasses;
    slots?: { loaderText?: React.ElementType; eulaContent?: React.ElementType; termsAndConditions?: React.ElementType };
    slotProps?: {
        loaderText?: TypographyProps;
        eulaContent?: BoxProps;
        termsAndConditions?: FormControlLabelProps;
    };
};

const useUtilityClasses = (ownerState: AcceptEulaProps): Record<AcceptEulaClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        loaderText: ['loaderText'],
        eulaContent: ['eulaContent'],
        termsAndConditions: ['termsAndConditions'],
    };

    return composeClasses(slots, getAcceptEulaUtilityClass, classes);
};

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaAccepted true if the checkbox should be checked
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 *
 * @param onEulaChanged function to call when the state of the checkbox is changed
 *
 * @param loadEula function to call to retrieve the eulaContent
 *
 * @param htmlEula true if the EULA should be rendered as HTML
 *
 * @param eulaError error message if the EULA fails to load
 *
 * @param agreeTerms to override terms and conditions text
 *
 * @param eulaControl to override the terms and conditions checkbox
 *
 * @param termsAndConditionsStyles to override terms and conditions styles
 *
 * @param TermsAndConditionsProps to pass to the terms and conditions
 *
 * @param eulaContentStyles to override eula content styles
 *
 * @param EulaContentProps to pass to the eula content
 *
 * @param loaderText override the loader content
 *
 * @param LoaderTextProps to pass to the loader content
 *
 * @param loaderStyles to override the loader styles
 *
 * @param slots used for each slot in `ContactSupport`
 *
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const AcceptEula: React.FC<AcceptEulaProps> = (props) => {
    const { t } = useLanguageLocale();
    const {
        eulaAccepted,
        eulaContent,
        onEulaChanged,
        loadEula,
        htmlEula,
        eulaError,
        agreeTerms = t('blui:REGISTRATION.EULA.AGREE_TERMS'),
        eulaControl,
        termsAndConditionsStyles,
        eulaContentStyles,
        EulaContentProps,
        loaderText = t('blui:REGISTRATION.EULA.LOADING'),
        loaderStyles,
        LoaderTextProps,
        TermsAndConditionsProps,
        classes = {},
        slots = {},
        slotProps = {},
    } = props;

    const defaultClasses = useUtilityClasses(props);
    const TermsAndConditions = slots.termsAndConditions ?? FormControlLabel;
    const eulaContentInternals = eulaContent ?? eulaError ?? loaderText;

    useEffect(() => {
        void loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!htmlEula && (
                <Typography
                    sx={{ flex: '1 1 0px', overflow: 'auto', ...loaderStyles }}
                    className={cx(defaultClasses.loaderText, classes.loaderText)}
                    component={slots.loaderText}
                    {...LoaderTextProps}
                    {...slotProps.loaderText}
                >
                    {eulaContentInternals}
                </Typography>
            )}
            {htmlEula && (
                <Box
                    sx={{ flex: '1 1 0px', overflow: 'auto', ...eulaContentStyles }}
                    className={cx(defaultClasses.eulaContent, classes.eulaContent)}
                    component={slots.eulaContent}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContentInternals) }}
                    {...EulaContentProps}
                    {...slotProps.eulaContent}
                ></Box>
            )}
            <TermsAndConditions
                control={
                    eulaControl ?? (
                        <Checkbox
                            color={'primary'}
                            checked={eulaAccepted}
                            disabled={!eulaContent}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                                onEulaChanged(event.target.checked)
                            }
                        />
                    )
                }
                label={agreeTerms}
                sx={{ flex: '0 0 auto', mr: 0, mt: 2, ...termsAndConditionsStyles }}
                className={cx(defaultClasses.termsAndConditions, classes.termsAndConditions)}
                {...TermsAndConditionsProps}
                {...slotProps.termsAndConditions}
            />
        </>
    );
};
