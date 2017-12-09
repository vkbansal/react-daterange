import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';

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

    computePosition(props: DropdownProps) {
        return {
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
            })()
        };
    }

    render() {
        const classes = cx('rdr-dropdown', {
            'rdr-dropdown--left': this.props.opens === 'left',
            'rdr-dropdown--right': this.props.opens === 'right',
            'rdr-dropdown--center': this.props.opens === 'center',
            'rdr-dropdown--up': this.props.drops === 'up',
            'rdr-dropdown--down': this.props.drops === 'down'
        });

        const dropdown = (
            <div className={classes} style={this.computePosition(this.props)}>
                {this.props.children}
            </div>
        );
        return ReactDOM.createPortal(dropdown, this.root);
    }
}
