import formatDate from 'date-fns/format';
import glamorous from 'glamorous';
import * as React from 'react';

import { CalBody, CalHeader, CalendarInput, NavButton } from './Common';
import {
    DateRange,
    DateRangePickerControl,
    DateRangePickerControlProps
} from './DateRangePickerControl';
import { DropDown, DropDownProps } from './Dropdown';
import { DEFAULT_FORMAT, Overwrite, callIfExists, parseDate } from './helpers';

export type PickedDropDownProps = Partial<Pick<DropDownProps, 'opens' | 'drops'>>;

export interface Range {
    startDate: (today: Date) => Date;
    endDate: (today: Date) => Date;
}

export type ControlProps = Partial<
    Overwrite<
        DateRangePickerControlProps,
        {
            startDate?: string | Date;
            endDate?: string | Date;
        }
    >
>;

export interface DateRangePickerProps extends PickedDropDownProps, ControlProps {
    onShow?: () => void;
    onHide?: () => void;
    onCalendarShow?: () => void;
    onCalenderHide?: () => void;
    ranges?: Record<string, Range>;
    showCustomRangeLabel?: boolean;
    alwaysShowCalendars?: boolean;
    format?: string;
    separator?: string;
    customRangeLabel?: string;
}

export interface DateRangePickerState {
    showDropdown: boolean;
    position: DropDownProps['position'] | null;
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

        const startDate = props.startDate ? parseDate(props.startDate, props.format) : undefined;
        const endDate = props.endDate ? parseDate(props.endDate, props.format) : undefined;
        this.state = {
            position: null,
            showDropdown: false,
            startDate,
            endDate
        };
    }

    componentWillReceiveProps(nextProps: DateRangePickerProps) {
        const startDate = nextProps.startDate
            ? parseDate(nextProps.startDate, nextProps.format)
            : undefined;
        const endDate = nextProps.endDate
            ? parseDate(nextProps.endDate, nextProps.format)
            : undefined;
        this.setState({ startDate, endDate });
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
            format,
            separator,
            // customRangeLabel,
            // showCustomRangeLabel,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            locale
        } = this.props;

        const props = {
            minDate: minDate ? parseDate(minDate, format) : undefined,
            maxDate: maxDate ? parseDate(maxDate, format) : undefined,
            startDate,
            endDate,
            showDropdowns,
            showISOWeekNumbers,
            showWeekNumbers,
            locale
        };

        return (
            <div>
                <div ref={this.inputRef} style={{ display: 'flex' }}>
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="Start Date"
                        value={startDate ? formatDate(startDate, format || DEFAULT_FORMAT) : ''}
                    />
                    {separator ? (
                        <Seperator>{separator}</Seperator>
                    ) : (
                        <Seperator>&#8594;</Seperator>
                    )}
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="End Date"
                        value={endDate ? formatDate(endDate, format || DEFAULT_FORMAT) : ''}
                    />
                </div>
                {showDropdown &&
                    position && (
                        <DropDown
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
                        </DropDown>
                    )}
            </div>
        );
    }
}
