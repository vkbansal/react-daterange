import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DropdownWrapper } from './Components';

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

    render() {
        return ReactDOM.createPortal(
            <DropdownWrapper {...this.props}>{this.props.children}</DropdownWrapper>,
            this.root
        );
    }
}
