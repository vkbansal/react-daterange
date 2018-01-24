import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';
import { getStyleOverrides } from './utils/glamorousUtils';

export { GlamorousComponent, React }; // Required, just for generating type definitions

export interface DropdownProps {
    /**
     * Horizontal alignment of the picker with respect to the input field.
     * @default "left"
     */
    opens: 'left' | 'right' | 'center';
    /**
     * Vertical position of the picker with respect to the input field.
     * @default "down"
     */
    drops: 'down' | 'up';
}

export const Dropdown = glamorous.div<DropdownProps>(
    {
        display: 'flex',
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
    (props) => ({
        top: props.drops === 'down' ? 'calc(100%  + 8px)' : 'auto',
        bottom: props.drops === 'up' ? 'calc(100% + 8px)' : 'auto',
        right: props.opens === 'right' ? 0 : 'auto',
        left: (() => {
            if (props.opens === 'left') {
                return 0;
            }

            if (props.opens === 'center') {
                return '50%';
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

Dropdown.displayName = 'Dropdown';
