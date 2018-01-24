import * as React from 'react';
import { ThemeProvider } from 'glamorous';

import {
    Separator,
    Input,
    CalendarHeader,
    CalendarBody,
    CalendarFooter,
    PickerWrapper,
    CloseButton
} from './Components';
import { DateRangePickerControl, DateRangePickerControlProps } from './DateRangePickerControl';
import { Dropdown, DropdownProps } from './Dropdown';
import { RangeSelector, RangeSelectorProps } from './RangeSelector';
import { callIfExists } from './utils/otherUtils';
import { formatDateDefault, DateRange } from './utils/dateUtils';
import { StyleOverrides } from './utils/glamorousUtils';

export type PickedDropdownProps = Partial<Pick<DropdownProps, 'opens' | 'drops'>>;
export type ControlProps = Partial<DateRangePickerControlProps>;
export type PickedRangeSelectorProps = Pick<
    RangeSelectorProps,
    'ranges' | 'showCustomRangeLabel' | 'customRangeLabel'
>;

export interface DateRangePickerProps
    extends PickedDropdownProps,
        ControlProps,
        PickedRangeSelectorProps {
    /**
     * Callback for when the picker is shown
     */
    onShow?(): void;
    /**
     * Callback for when the picker is hidden
     */
    onHide?(): void;
    /**
     * TODO: implement this feature
     */
    onCalendarShow?(): void;
    /**
     * TODO: implement this feature
     */
    onCalenderHide?(): void;
    /**
     * TODO: implement this feature
     */
    alwaysShowCalendars?: boolean;
    /**
     * A function used to format the date that are displayed.
     * It accepts a `Date` as a param and must return a `string`.
     * Default function displays the dates in `YYYY-MM-DD` format.
     */
    displayFormat?(date: Date): string;
    /**
     * The text to be displayed as a separator
     * @default "→"
     */
    separator?: string;
    autoApply?: boolean;
    styleOverrides?: StyleOverrides;
}

export interface DateRangePickerState {
    showDropdown: boolean;
    startDate?: Date;
    endDate?: Date;
    isCustomRangeSelected: boolean;
}

/**
 * DateRangePicker
 *
 * @example
 *
 * import React from 'react';
 * import { DateRangePicker } from 'react-daterange';
 *
 * <DateRangePicker {...props} />
 */
export class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    constructor(props: DateRangePickerProps) {
        super(props);

        this.state = {
            showDropdown: false,
            startDate: props.startDate,
            endDate: props.endDate,
            isCustomRangeSelected: false
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
        this.setState<'showDropdown'>((state) => {
            if (!state.showDropdown) {
                return {
                    showDropdown: true
                };
            }

            return {
                showDropdown: state.showDropdown
            };
        });
    };

    handleHideDropdown = () => {
        this.setState({
            showDropdown: false
        });
    };

    handleDateChange = (dates: DateRange, fromRange?: boolean) => {
        if (this.props.autoApply && dates.endDate && dates.startDate) {
            callIfExists(this.props.onDatesChange, dates);
            this.handleHideDropdown();
        }

        this.setState({ ...dates, isCustomRangeSelected: !fromRange });
    };

    handleCustomRangeSelection = () => {
        this.setState({ isCustomRangeSelected: true, startDate: undefined, endDate: undefined });
    };

    render() {
        const { showDropdown, startDate, endDate, isCustomRangeSelected } = this.state;
        const {
            opens,
            drops,
            displayFormat,
            separator,
            ranges,
            customRangeLabel,
            showCustomRangeLabel,
            minDate,
            maxDate,
            showDropdowns,
            showISOWeek,
            showWeekNumbers,
            alwaysShowCalendars,
            monthNames,
            daysOfWeek,
            styleOverrides = {}
        } = this.props;

        const props = {
            minDate,
            maxDate,
            startDate,
            endDate,
            showDropdowns,
            showISOWeek,
            showWeekNumbers,
            monthNames,
            daysOfWeek
        };

        const formatDate = displayFormat || formatDateDefault;
        const showRanges = ranges && ranges.size > 0;

        return (
            <ThemeProvider theme={styleOverrides}>
                <PickerWrapper>
                    <Input
                        type="text"
                        onFocus={this.handleShowDropdown}
                        placeholder="Start Date"
                        value={startDate ? formatDate(startDate) : ''}
                    />
                    {separator ? (
                        <Separator>{separator}</Separator>
                    ) : (
                        <Separator>&#8594;</Separator>
                    )}
                    <Input
                        type="text"
                        onFocus={this.handleShowDropdown}
                        placeholder="End Date"
                        value={endDate ? formatDate(endDate) : ''}
                    />
                    {showDropdown && (
                        <Dropdown opens={opens || 'left'} drops={drops || 'down'}>
                            <>
                                {showRanges && (
                                    <RangeSelector
                                        ranges={ranges}
                                        customRangeLabel={customRangeLabel}
                                        showCustomRangeLabel={showCustomRangeLabel}
                                        onDatesChange={this.handleDateChange}
                                        onCustomSelect={this.handleCustomRangeSelection}
                                        startDate={startDate}
                                        endDate={endDate}
                                        isCustomRangeSelected={isCustomRangeSelected}
                                    />
                                )}
                                {(!showRanges || alwaysShowCalendars || isCustomRangeSelected) && (
                                    <div>
                                        <CalendarHeader>
                                            <CloseButton onClick={this.handleHideDropdown}>
                                                &times;
                                            </CloseButton>
                                        </CalendarHeader>
                                        <CalendarBody>
                                            <DateRangePickerControl
                                                {...props}
                                                onDatesChange={this.handleDateChange}
                                            />
                                        </CalendarBody>
                                        <CalendarFooter>
                                            <button>Apply</button>
                                            <button>Cancel</button>
                                        </CalendarFooter>
                                    </div>
                                )}
                            </>
                        </Dropdown>
                    )}
                </PickerWrapper>
            </ThemeProvider>
        );
    }
}
