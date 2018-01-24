import * as React from 'react';
import glamorous, { GlamorousComponent, ExtraGlamorousProps } from 'glamorous';

import { getStyleOverrides } from '../utils/glamorousUtils';

export { GlamorousComponent, React, ExtraGlamorousProps }; // Required, just for generating type definitions

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
    (props) => ({
        width: `${(props.span || 1) * 38}px`
    }),
    getStyleOverrides<CellProps>('cell')
);

export interface DayProps {
    selected?: boolean;
    disabled?: boolean;
    inRange?: boolean;
    today?: boolean;
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
    (props) => ({
        background: (() => {
            if (props.selected) {
                return 'rgba(0, 202, 255, 1)';
            }

            if (props.today) {
                return '#e94949';
            }

            if (props.inRange) {
                return 'rgba(0, 202, 255, 0.3)';
            }

            return 'transparent';
        })(),
        color: (() => {
            if (props.selected || props.today) {
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
            })(),
            color: (() => {
                if (props.selected) {
                    return '#fff';
                }

                if (props.disabled) {
                    return '#ddd';
                }

                return '#222';
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

export const Weeks = glamorous.div(
    {
        height: '240px'
    },
    getStyleOverrides('weeks')
);

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

Week.displayName = 'Week';

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
