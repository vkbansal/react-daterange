export type DateOrString = Date | string;

export interface Locale {
    format: string;
    separator: string;
    applyLabel: string;
    cancelLabel: string;
    fromLabel: string;
    toLabel: string;
    customRangeLabel: string;
    weekLabel: string;
    daysOfWeek: Array<string>;
    monthNames: Array<string>;
    firstDay: number;
}

export interface Ranges {
    [key: string]: [(today: Date) => Date , (today: Date) => Date];
}

export interface DateRangePickerProps {
    /**
     * The start of the initially selected date range
     */
    startDate?: DateOrString;
    /**
     * The end of the initially selected date range
     */
    endDate?: DateOrString;
    /**
     * The earliest date a user may select
     */
    minDate?: DateOrString;
    /**
     *  The latest date a user may select
     */
    maxDate?: DateOrString;
    /**
     * The maximum span between the selected start and end dates.
     * Can have any property you can add to a moment object (i.e. days, months)
     */
    dateLimit?: object;
    /**
     * Show year and month select boxes above calendars to jump to a specific month and year
     */
    showDropdowns?: boolean;
    showWeekNumbers?: boolean; // Show localized week numbers at the start of each week on the calendars
    showISOWeekNumbers?: boolean; // Show ISO week numbers at the start of each week on the calendars
    timePicker?: boolean; // Allow selection of dates with times, not just dates
    timePickerIncrement?: number; // Increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30)
    timePicker24Hour?: boolean; // Use 24-hour instead of 12-hour times, removing the AM/PM selection
    timePickerSeconds?: boolean; // Show seconds in the timePicker
    /**
     * Set predefined date ranges the user can select from.
     * Each key is the label for the range, and its value
     * an array with two dates representing the bounds of the range
     */
    ranges?: Ranges;
    /**
     * Displays an item labeled "Custom Range" at the end of
     * the list of predefined ranges, when the ranges option is used.
     * This option will be highlighted whenever the current date range
     * selection does not match one of the predefined ranges.
     * Clicking it will display the calendars to select a new range.
     */
    showCustomRangeLabel?: boolean;
    /**
     * Normally, if you use the ranges option to specify pre-defined date ranges,
     * calendars for choosing a custom date range are not shown until the user clicks "Custom Range".
     * When this option is set to true, the calendars for choosing a custom date range are always shown instead.
     */
    alwaysShowCalendars?: boolean;
    /**
     * Whether the picker appears aligned to the left,
     * to the right, or centered under the HTML element it's attached to
     */
    opens?: 'left' | 'right' | 'center';
    /**
     * Whether the picker appears below (default) or above the HTML element it's attached to
     */
    drops?: 'down' | 'up';
    // buttonClasses: (array) // CSS class names that will be added to all buttons in the picker
    // applyClass: (string) // CSS class string that will be added to the apply button
    // cancelClass: (string) // CSS class string that will be added to the cancel button
    /**
     * Allows you to provide localized strings for buttons and labels,
     * customize the date format, and change the first day of week for the calendars.
     */
    locale?: Partial<Locale>;
    /**
     * Show only a single calendar to choose one date, instead of a range picker with two calendars;
     * the start and end dates provided to your callback will be the same single date chosen
     */
    singleDatePicker?: boolean;
    /**
     * Hide the apply and cancel buttons,
     * and automatically apply a new date range
     * as soon as two dates or a predefined range is selected
     */
    autoApply?: boolean;
    /**
     * By default, the two calendars displayed will always be
     * for two sequential months (i.e. January and February),
     * and both will be advanced when clicking the left or
     * right arrows above the calendars.
     * When enabled, the two calendars can be individually
     * advanced and display any month/year.
     */
    individualCalendars?: boolean;
    // isInvalidDate: (function) // A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
    // isCustomDate: (function) // A function that is passed each date in the two calendars before they are displayed, and may return a string or array of CSS class names to apply to that date's calendar cell.
    autoUpdateInput?: boolean; // Indicates whether the date range picker should automatically update the value of an <input> element it's attached to at initialization and when the selected dates change.
    onShow?: () => void; // Triggered when the picker is shown
    onHidehide?: () => void; // Triggered when the picker is hidden
    onCalendarShow?: () => void; // Triggered when the calendar(s) are shown
    onCalenderHide?: () => void; // Triggered when the calendar(s) are hidden
    onApply?: () => void; // Triggered when the apply button is clicked, or when a predefined range is clicked
    onCancel?: () => void; // Triggered when the cancel button is clicked
}

export interface DateRangePickerState {
    startDate?: Date;
    endDate?: Date;
    monthLeft: Date;
    monthRight: Date;
    selectionActive: boolean;
}
