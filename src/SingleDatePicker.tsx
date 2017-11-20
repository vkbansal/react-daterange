import * as formatDate from 'date-fns/format';
import * as React from 'react';

import { CalBody, CalHeader, CalendarInput, NavButton } from './Common';
import { Dropdown, DropdownProps } from './Dropdown';
import { DEFAULT_FORMAT, Overwrite, callIfExists, parseDate } from './helpers';
import { SingleDatePickerControl, SingleDatePickerControlProps } from './SingleDatePickerControl';

export type PickedDropDownProps = Partial<Pick<DropdownProps, 'opens' | 'drops'>>;

export type ControlProps = Partial<
    Overwrite<
        SingleDatePickerControlProps,
        {
            date?: string | Date;
        }
    >
>;

export interface SingleDatePickerProps extends PickedDropDownProps, ControlProps {
    onShow?: () => void;
    onHide?: () => void;
    format?: string;
}

export interface SingleDatePickerState {
    date?: Date;
    showDropdown: boolean;
    position: DropdownProps['position'] | null;
}

export class SingleDatePicker extends React.Component<
    SingleDatePickerProps,
    SingleDatePickerState
> {
    private input: HTMLDivElement;

    constructor(props: SingleDatePickerProps) {
        super(props);

        this.state = {
            date: props.date
                ? parseDate(props.date, this.props.format || DEFAULT_FORMAT)
                : undefined,
            position: null,
            showDropdown: false
        };
    }

    handleShowDropdown = () => {
        this.setState<'position' | 'showDropdown'>(state => {
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

            return {
                showDropdown: state.showDropdown,
                position: state.position
            };
        });
    };

    handleDateChange = (date: Date) => {
        this.setState({ date });
        callIfExists(this.props.onDateChange, date);
        this.handleHideDropdown();
    };

    handleHideDropdown = () => {
        this.setState({
            position: null,
            showDropdown: false
        });
    };

    inputRef = (c: HTMLDivElement) => (this.input = c);

    render() {
        const { position, showDropdown, date } = this.state;
        const {
            opens,
            drops,
            format,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            locale
        } = this.props;

        const props = {
            date,
            minDate: minDate ? parseDate(minDate, format) : undefined,
            maxDate: maxDate ? parseDate(maxDate, format) : undefined,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            locale
        };

        return (
            <div>
                <div ref={this.inputRef} style={{ display: 'inline-block' }}>
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        value={date ? formatDate(date, format || DEFAULT_FORMAT) : ''}
                    />
                </div>
                {showDropdown &&
                    position && (
                        <Dropdown
                            opens={opens || 'left'}
                            drops={drops || 'down'}
                            position={position}
                        >
                            <div>
                                <CalHeader>
                                    <NavButton height="32px" onClick={this.handleHideDropdown}>
                                        &times;
                                    </NavButton>
                                </CalHeader>
                                <CalBody>
                                    <SingleDatePickerControl
                                        {...props}
                                        onDateChange={this.handleDateChange}
                                    />
                                </CalBody>
                            </div>
                        </Dropdown>
                    )}
            </div>
        );
    }
}
