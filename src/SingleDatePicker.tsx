import * as React from 'react';
import { ThemeProvider } from 'glamorous';

import { StyleOverrides, CloseButton, Input, CalendarHeader, CalendarBody } from './Components';
import { Dropdown, DropdownProps } from './Dropdown';
import { callIfExists, formatDateDefault } from './helpers';
import { SingleDatePickerControl, SingleDatePickerControlProps } from './SingleDatePickerControl';

export type PickedDropDownProps = Partial<Pick<DropdownProps, 'opens' | 'drops'>>;

export type ControlProps = Partial<SingleDatePickerControlProps>;

export interface SingleDatePickerProps extends PickedDropDownProps, ControlProps {
    /**
     * Callback for when the picker is shown
     */
    onShow?: () => void;
    /**
     * Callback for when the picker is hidden
     */
    onHide?: () => void;
    /**
     * A function used to format the date that is displayed .
     * It accepts a `Date` as a param and must return a `string`.
     * Default function displays the date in `YYYY-MM-DD` format.
     */
    displayFormat?: (date: Date) => string;
    styleOverrides?: StyleOverrides;
}

export interface SingleDatePickerState {
    date?: Date;
    showDropdown: boolean;
    position: DropdownProps['position'] | null;
}

/**
 * SingleDatePicker
 *
 * @example
 *
 * import React from 'react';
 * import { SingleDatePicker } from 'react-daterange';
 *
 * <SingleDatePicker {...props} />
 */
export class SingleDatePicker extends React.Component<
    SingleDatePickerProps,
    SingleDatePickerState
> {
    private input: HTMLDivElement;

    constructor(props: SingleDatePickerProps) {
        super(props);

        this.state = {
            date: props.date,
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
            displayFormat,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeek,
            showWeekNumbers,
            monthNames,
            daysOfWeek,
            styleOverrides = {}
        } = this.props;

        const props = {
            date,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeek,
            showWeekNumbers,
            monthNames,
            daysOfWeek
        };

        const formatDate = displayFormat || formatDateDefault;

        return (
            <ThemeProvider theme={styleOverrides}>
                <>
                    <div ref={this.inputRef} style={{ display: 'inline-block' }}>
                        <Input
                            type="text"
                            onFocus={this.handleShowDropdown}
                            value={date ? formatDate(date) : ''}
                        />
                    </div>
                    {showDropdown &&
                        position && (
                            <Dropdown
                                opens={opens || 'left'}
                                drops={drops || 'down'}
                                position={position}
                            >
                                <>
                                    <CalendarHeader>
                                        <CloseButton onClick={this.handleHideDropdown}>
                                            &times;
                                        </CloseButton>
                                    </CalendarHeader>
                                    <CalendarBody>
                                        <SingleDatePickerControl
                                            {...props}
                                            onDateChange={this.handleDateChange}
                                        />
                                    </CalendarBody>
                                </>
                            </Dropdown>
                        )}
                </>
            </ThemeProvider>
        );
    }
}
