import glamorous from 'glamorous';
import * as React from 'react';

import { NavButton } from './Common';
import { DateRangePickerControl } from './DateRangePickerControl';
import { DropDown, DropDownProps } from './Dropdown';

const CalHeader = glamorous('div')({
    display: 'flex',
    justifyContent: 'flex-end'
});

CalHeader.displayName = 'CalHeader';

const CalBody = glamorous('div')({
    display: 'flex'
});

type PickedDropDownProps = Pick<DropDownProps, 'opens' | 'drops'>;

export interface DateRangePickerProps extends Partial<PickedDropDownProps> {}

export interface DateRangePickerState {
    showDropdown: boolean;
    position: DropDownProps['position'] | null;
}

export class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    private input: HTMLInputElement;

    constructor(props: DateRangePickerProps) {
        super(props);

        this.state = {
            position: null,
            showDropdown: false
        };
    }

    handleShowDropdown = () => {
        this.setState((state: DateRangePickerState): Partial<DateRangePickerState> => {
            if (!state.showDropdown) {
                const {
                    top,
                    bottom,
                    left,
                    width,
                    right,
                    height
                } = this.input.getBoundingClientRect();
                return {
                    position: { top, bottom, left, width, right, height },
                    showDropdown: true
                };
            }

            return {};
        });
    };

    handleHideDropdown = () => {
        this.setState({
            position: null,
            showDropdown: false
        });
    };

    handleDateChange = () => {
        this.handleHideDropdown();
    };

    inputRef = (c: HTMLInputElement) => (this.input = c);

    render() {
        const { position, showDropdown } = this.state;

        return (
            <div>
                <input ref={this.inputRef} onFocus={this.handleShowDropdown} />
                {showDropdown &&
                    position && (
                        <DropDown
                            opens={this.props.opens || 'left'}
                            drops={this.props.drops || 'down'}
                            position={position}
                        >
                            <div>
                                <CalHeader>
                                    <NavButton height="32px" onClick={this.handleHideDropdown}>
                                        &times;
                                    </NavButton>
                                </CalHeader>
                                <CalBody>
                                    <DateRangePickerControl onDatesChange={this.handleDateChange} />
                                </CalBody>
                            </div>
                        </DropDown>
                    )}
            </div>
        );
    }
}
