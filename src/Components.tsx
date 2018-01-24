import * as React from 'react';
import glamorous, { GlamorousComponent, ExtraGlamorousProps } from 'glamorous';
import { getStyleOverrides } from './utils/glamorousUtils';

export { GlamorousComponent, React, ExtraGlamorousProps }; // Required, just for generating type definitions

export const PickerWrapper = glamorous.div(
    {
        display: 'flex',
        position: 'relative',
        alignItems: 'stretch'
    },
    getStyleOverrides('pickerWrapper')
);

PickerWrapper.displayName = 'PickerWrapper';

export const Input = glamorous.input(
    {
        display: 'inline-block',
        border: '1px solid #cecece',
        background: '#fff',
        fontSize: '14px',
        lineHeight: '18px',
        padding: '8px',
        '&:focus': {
            outline: 'none',
            borderColor: 'rgba(0, 202, 255, 1)'
        }
    },
    getStyleOverrides('input')
);

export const Separator = glamorous.div(
    {
        padding: '0 8px',
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: '#cecece transparent'
    },
    getStyleOverrides('separator')
);

Separator.displayName = 'Separator';

export const CalendarHeader = glamorous.div(
    {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    getStyleOverrides('calendarHeader')
);

CalendarHeader.displayName = 'CalendarHeader';

export const CalendarBody = glamorous.div(
    {
        display: 'flex'
    },
    getStyleOverrides('calendarBody')
);

CalendarBody.displayName = 'CalenderBody';

export const CalendarFooter = glamorous.div(
    {
        display: 'flex',
        marginTop: '8px'
    },
    getStyleOverrides('calendarFooter')
);

CalendarFooter.displayName = 'CalendarFooter';

export const CloseButton = glamorous.button(
    {
        background: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '18px',
        outline: 'none',
        cursor: 'pointer',
        width: '32px',
        height: '16px',
        lineHeight: '16px'
    },
    getStyleOverrides('closeButton')
);

CloseButton.displayName = 'CloseButton';
