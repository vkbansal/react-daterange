import { CSSProperties, StyleFunction, ExtraGlamorousProps } from 'glamorous';

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
    | 'separator'
    | 'input'
    | 'closeButton'
    | 'dropdown'
    | 'calendarHeader'
    | 'calendarBody'
    | 'calendarFooter'
    | 'pickerWrapper';

export type StyleOverrides<T = any> = Record<
    StyleableComponents,
    CSSProperties | StyleFunction<CSSProperties, T>
>;

export function getStyleOverrides<T>(name: StyleableComponents) {
    return (props: T & ExtraGlamorousProps, ...rest: any[]) => {
        const overrides: CSSProperties | StyleFunction<CSSProperties, T> =
            props.theme && (props.theme as any)[name];

        if (typeof overrides === 'function') {
            return overrides(props, ...rest);
        }

        return overrides || {};
    };
}
