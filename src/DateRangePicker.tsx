import glamorous from 'glamorous';
import * as React from 'react';

import { CalBody, CalHeader, CalendarInput, NavButton } from './Common';
import {
    DateRange,
    DateRangePickerControl,
    DateRangePickerControlProps
} from './DateRangePickerControl';
import { Dropdown, DropdownProps } from './Dropdown';
import { callIfExists, formatDateDefault } from './helpers';

export type PickedDropDownProps = Partial<Pick<DropdownProps, 'opens' | 'drops'>>;

export interface Range {
    startDate: (today: Date) => Date;
    endDate: (today: Date) => Date;
}

export type ControlProps = Partial<DateRangePickerControlProps>;

/**
 *
 */
export interface DateRangePickerProps extends PickedDropDownProps, ControlProps {
    /**
     * Callback for when the picker is shown
     */
    onShow?: () => void;
    /**
     * Callback for when the picker is hidden
     */
    onHide?: () => void;
    /**
     * TODO: implement this feature
     */
    onCalendarShow?: () => void;
    /**
     * TODO: implement this feature
     */
    onCalenderHide?: () => void;
    /**
     * TODO: implement this feature
     */
    ranges?: Record<string, Range>;
    /**
     * TODO: implement this feature
     */
    showCustomRangeLabel?: boolean;
    /**
     * TODO: implement this feature
     */
    alwaysShowCalendars?: boolean;
    /**
     * A function used to format the date that are displayed.
     * It accepts a `Date` as a param and must return a `string`.
     * Default function displays the dates in `YYYY-MM-DD` format.
     */
    displayFormat?: (date: Date) => string;
    /**
     * The text to be displayed as a separator
     * @default "→"
     */
    separator?: string;
    /**
     * TODO: implement this feature
     */
    customRangeLabel?: string;
}

export interface DateRangePickerState {
    showDropdown: boolean;
    position: DropdownProps['position'] | null;
    startDate?: Date;
    endDate?: Date;
}

const Seperator = glamorous('div')('rdr-seperator', {
    padding: '8px',
    lineHeight: '18px',
    border: '1px solid',
    borderColor: '#cecece transparent'
});

Seperator.displayName = 'Seperator';

export class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    private input: HTMLDivElement;

    constructor(props: DateRangePickerProps) {
        super(props);

        this.state = {
            position: null,
            showDropdown: false,
            startDate: props.startDate,
            endDate: props.endDate
        };
    }

    componentDidUpdate(_: DateRangePickerProps, prevState: DateRangePickerState) {
        if (this.state.showDropdown && !prevState.showDropdown) {
            callIfExists(this.props.onShow);
        } else if (prevState.showDropdown && !this.state.showDropdown) {
            callIfExists(this.props.onHide);
        }
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

    handleHideDropdown = () => {
        this.setState({
            position: null,
            showDropdown: false
        });
    };

    handleDateChange = (dates: DateRange) => {
        if (dates.endDate && dates.startDate) {
            callIfExists(this.props.onDatesChange, dates);
            this.handleHideDropdown();
        }

        this.setState({ ...dates });
    };

    inputRef = (c: HTMLDivElement) => (this.input = c);

    render() {
        const { position, showDropdown, startDate, endDate } = this.state;
        const {
            opens,
            drops,
            displayFormat,
            separator,
            // customRangeLabel,
            // showCustomRangeLabel,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            monthNames,
            daysOfWeek
        } = this.props;

        const props = {
            minDate,
            maxDate,
            startDate,
            endDate,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            monthNames,
            daysOfWeek
        };

        const formatDate = displayFormat || formatDateDefault;

        return (
            <div>
                <div ref={this.inputRef} style={{ display: 'flex' }}>
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="Start Date"
                        value={startDate ? formatDate(startDate) : ''}
                    />
                    {separator ? (
                        <Seperator>{separator}</Seperator>
                    ) : (
                        <Seperator>&#8594;</Seperator>
                    )}
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="End Date"
                        value={endDate ? formatDate(endDate) : ''}
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
                                    <DateRangePickerControl
                                        {...props}
                                        onDatesChange={this.handleDateChange}
                                    />
                                </CalBody>
                            </div>
                        </Dropdown>
                    )}
            </div>
        );
    }
}
