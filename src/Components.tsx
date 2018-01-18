import * as React from 'react';
import glamorous, {
    GlamorousComponent,
    CSSProperties,
    StyleFunction,
    ExtraGlamorousProps
} from 'glamorous';

import { DropdownProps } from './Dropdown';

export { GlamorousComponent, React }; // Required, just for generating type definitions

export type StyleableComponents =
    | 'cell'
    | 'day'
    | 'week'
    | 'weeks'
    | 'row'
    | 'month'
    | 'select'
    | 'navButton'
    | 'rangeControlWrapper'
    | 'seperator'
    | 'input'
    | 'closeButton'
    | 'dropdown';

export type StyleOverrides<T = any> = Record<
    StyleableComponents,
    CSSProperties | StyleFunction<CSSProperties, T>
>;

function getStyleOverrides<T>(name: StyleableComponents) {
    return (props: T & ExtraGlamorousProps, ...rest: any[]) => {
        const overrides: CSSProperties | StyleFunction<CSSProperties, T> =
            props.theme && (props.theme as any)[name];

        if (typeof overrides === 'function') {
            return overrides(props, ...rest);
        }

        return overrides || {};
    };
}

export interface CellProps {
    span?: number;
}

export const Cell = glamorous.div<CellProps>(
    {
        display: 'flex',
        height: '38px',
        lineHeight: '38px',
        fontWeight: 'bold',
        fontSize: '14px',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    },
    props => ({
        width: `${(props.span || 1) * 38}px`
    }),
    getStyleOverrides<CellProps>('cell')
);

export interface DayProps {
    selected?: boolean;
    disabled?: boolean;
    inRange?: boolean;
}

export const Day = glamorous.div<DayProps>(
    {
        height: '39px',
        width: '39px',
        lineHeight: '39px',
        margin: '-1px 0 0 -1px',
        fontWeight: 'normal',
        border: '1px solid #ddd',
        cursor: 'pointer',
        background: 'transparent',
        textAlign: 'center',
        fontSize: '14px',
        transition: 'background 0.2s ease-out'
    },
    props => ({
        background: (() => {
            if (props.selected) {
                return 'rgba(0, 202, 255, 1)';
            }

            if (props.inRange) {
                return 'rgba(0, 202, 255, 0.3)';
            }

            return 'transparent';
        })(),
        color: (() => {
            if (props.selected) {
                return '#fff';
            }

            if (props.disabled) {
                return '#ddd';
            }

            return '#222';
        })(),
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        textDecoration: props.disabled ? 'line-through' : 'none',
        '&:hover': {
            background: (() => {
                if (props.disabled) {
                    return 'transparent';
                }

                if (props.selected) {
                    return 'rgba(0, 202, 255, 1)';
                }

                if (props.inRange) {
                    return 'rgba(0, 202, 255, 0.3)';
                }

                return '#ddd';
            })()
        }
    }),
    getStyleOverrides<DayProps>('day')
);

Day.displayName = 'Day';

export const Row = glamorous.div(
    {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%'
    },
    getStyleOverrides('row')
);

Row.displayName = 'Row';

export const Weeks = glamorous.div(getStyleOverrides('weeks'));

Weeks.displayName = 'Weeks';

export const Week = glamorous.div(
    {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        '&:first-child': {
            justifyContent: 'flex-end'
        }
    },
    getStyleOverrides('week')
);

Weeks.displayName = 'Week';

export const NavButton = glamorous.button(
    {
        background: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '18px',
        outline: 'none',
        cursor: 'pointer',
        width: '42px',
        height: '42px',
        lineHeight: '42px'
    },
    getStyleOverrides('navButton')
);

NavButton.displayName = 'NavButton';

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

export const Select = glamorous.select(
    {
        background: 'transparent',
        border: '1px solid #fff',
        outline: 'none',
        boxShadow: 'none',
        '& + &': {
            marginLeft: '4px'
        }
    },
    getStyleOverrides('select')
);

Select.displayName = 'Select';

export const Month = glamorous.div(
    {
        display: 'inline-flex',
        alignItems: 'flex-start',
        flexFlow: 'column',
        padding: '0 16px',
        minHeight: '304px'
    },
    getStyleOverrides('month')
);

Month.displayName = 'Month';

export const RangeControllerWrapper = glamorous.div(
    {
        display: 'flex',
        alignItems: 'flex-start'
    },
    getStyleOverrides('rangeControlWrapper')
);

RangeControllerWrapper.displayName = 'RangeControllerWrapper';

export const Seperator = glamorous.div(
    {
        padding: '0 8px',
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: '#cecece transparent'
    },
    getStyleOverrides('seperator')
);

Seperator.displayName = 'Seperator';

export const Input = glamorous.input(
    {
        display: 'inline-block',
        border: '1px solid #cecece',
        background: '#fff',
        fontSize: '14px',
        lineHeight: '18px',
        padding: '8px'
    },
    getStyleOverrides('input')
);

export const DropdownWrapper = glamorous.div<DropdownProps>(
    {
        position: 'absolute',
        background: '#fff',
        padding: '12px 8px 24px 8px',
        filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1))',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '0',
            border: '8px solid transparent'
        }
    },
    props => ({
        top:
            props.drops === 'down'
                ? `${(props.position.bottom + window.scrollY + 8).toFixed(2)}px`
                : 'auto',
        bottom: props.drops === 'up' ? `${(props.position.top - 8).toFixed(2)}px` : 'auto',
        right: props.opens === 'right' ? `${props.position.right.toFixed(2)}px` : 'auto',
        left: (() => {
            if (props.opens === 'left') {
                return `${props.position.left.toFixed(2)}px`;
            }

            if (props.opens === 'center') {
                return `${(props.position.left + props.position.width / 2).toFixed(2)}px`;
            }

            return 'auto';
        })(),
        '&::before': {
            borderBottomColor: props.drops === 'down' ? '#fff' : 'transparent',
            borderTopColor: props.drops === 'up' ? '#fff' : 'transparent',
            top: props.drops === 'down' ? '-16px' : 'auto',
            bottom: props.drops === 'up' ? '-16px' : 'auto',
            left: (() => {
                if (props.opens === 'left') {
                    return '8px';
                }

                if (props.opens === 'center') {
                    return '50%';
                }

                return 'auto';
            })()
        }
    }),
    getStyleOverrides('dropdown')
);

DropdownWrapper.displayName = 'DropdownWrapper';

export const CalendarHeader = glamorous.div({
    display: 'flex',
    justifyContent: 'flex-end'
});

CalendarHeader.displayName = 'CalendarHeader';

export const CalendarBody = glamorous.div({
    display: 'flex'
});

CalendarBody.displayName = 'CalenderBody';
