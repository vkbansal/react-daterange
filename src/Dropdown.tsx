import glamorous from 'glamorous';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface DropdownProps {
    position: {
        top: number;
        bottom: number;
        left: number;
        width: number;
        right: number;
        height: number;
    };
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

const DropdownWrapper = glamorous('div')<DropdownProps>(
    'rdr-dropdown',
    {
        position: 'absolute',
        background: '#fff',
        padding: '4px 8px 24px 8px',
        filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1))',
        '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
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
            top: props.drops === 'down' ? '-16px' : 'auto',
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
    })
);

export class Dropdown extends React.Component<DropdownProps> {
    private root: HTMLDivElement;

    constructor(props: DropdownProps) {
        super(props);

        this.root = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.root);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
        delete this.root;
    }

    render() {
        const dropdown = <DropdownWrapper {...this.props}>{this.props.children}</DropdownWrapper>;
        return ReactDOM.createPortal(dropdown, this.root);
    }
}
