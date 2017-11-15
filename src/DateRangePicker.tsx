import format from 'date-fns/format';
import glamorous from 'glamorous';
import defaults from 'lodash.defaults';
import * as React from 'react';

import { CalBody, CalHeader, CalendarInput, NavButton } from './Common';
import {
    DateRange,
    DateRangePickerControl,
    DateRangePickerControlLocale,
    DateRangePickerControlProps
} from './DateRangePickerControl';
import { DropDown, DropDownProps } from './Dropdown';
import { Overwrite, callIfExists, parseDate } from './helpers';

export type PickedDropDownProps = Partial<Pick<DropDownProps, 'opens' | 'drops'>>;

export interface DateRangePickerLocale extends DateRangePickerControlLocale {
    separator: string;
    customRangeLabel: string;
}

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
            locale?: Partial<DateRangePickerLocale>;
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

const defaultLocale: DateRangePickerLocale = {
    format: 'YYYY-MM-DD',
    separator: '',
    customRangeLabel: 'Custom'
};

export class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    private input: HTMLDivElement;

    private locale: DateRangePickerLocale;

    constructor(props: DateRangePickerProps) {
        super(props);

        this.locale = defaults({}, props.locale, defaultLocale);
        const startDate = props.startDate
            ? parseDate(props.startDate, this.locale.format)
            : undefined;
        const endDate = props.endDate ? parseDate(props.endDate, this.locale.format) : undefined;
        this.state = {
            position: null,
            showDropdown: false,
            startDate,
            endDate
        };
    }

    componentWillReceiveProps(nextProps: DateRangePickerProps) {
        this.locale = defaults({}, nextProps.locale, defaultLocale);
        const startDate = nextProps.startDate
            ? parseDate(nextProps.startDate, this.locale.format)
            : undefined;
        const endDate = nextProps.endDate
            ? parseDate(nextProps.endDate, this.locale.format)
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
        const { onDatesChange, opens, drops, minDate, maxDate, ...rest } = this.props;
        const otherProps = {
            minDate: minDate ? parseDate(minDate, this.locale.format) : undefined,
            maxDate: maxDate ? parseDate(maxDate, this.locale.format) : undefined
        };

        return (
            <div>
                <div ref={this.inputRef} style={{ display: 'flex' }}>
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="Start Date"
                        value={startDate ? format(startDate, this.locale.format) : ''}
                    />
                    {this.locale.separator ? (
                        <Seperator>this.locale.separator</Seperator>
                    ) : (
                        <Seperator>&#8594;</Seperator>
                    )}
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        placeholder="End Date"
                        value={endDate ? format(endDate, this.locale.format) : ''}
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
                                        {...rest}
                                        {...otherProps}
                                        startDate={startDate}
                                        endDate={endDate}
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
