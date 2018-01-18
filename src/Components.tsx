import * as React from 'react';
import glamorous, {
    GlamorousComponent,
    CSSProperties,
    StyleFunction,
    ExtraGlamorousProps
} from 'glamorous';

export { GlamorousComponent, React }; // Required, just for generating type definitions

export type StyleOverrides<T = any> = Record<
    'day' | 'week' | 'row' | 'month',
    CSSProperties | StyleFunction<CSSProperties, T>
>;

function getStyleOverrides<T>(name: string) {
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
    justifyContent?: CSSProperties['justifyContent'];
}

export const Cell = glamorous.div<CellProps>(
    {
        display: 'flex',
        height: '38px',
        lineHeight: '38px',
        fontWeight: 'bold',
        fontSize: '14px',
        alignItems: 'center',
        textAlign: 'center'
    },
    props => ({
        width: `${(props.span || 1) * 38}px`,
        justifyContent: props.justifyContent || 'center'
    })
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

export const Row = glamorous.div({
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%'
});

Row.displayName = 'Row';

export const Weeks = glamorous.div({});

Weeks.displayName = 'Weeks';

export const Week = glamorous.div({
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    '&:first-child': {
        justifyContent: 'flex-end'
    }
});

Weeks.displayName = 'Week';

export const NavButton = glamorous.button({
    background: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    fontsize: '18px',
    outline: 'none',
    cursor: 'pointer',
    width: '42px',
    height: '42px',
    lineHeight: '42px'
});

NavButton.displayName = 'NavButton';

export const Select = glamorous.select({
    background: 'transparent',
    border: 'none',
    outline: 'none'
});
