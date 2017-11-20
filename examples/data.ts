// This is automatically generated using './scripts/docs.js', please do not change anything here
export const SingleDatePickerControlDocs = {
    "displayName": "SingleDatePickerControl",
    "description": "",
    "props": {
        "children": {
            "required": false,
            "type": {
                "name": "ReactNode"
            },
            "description": "",
            "defaultValue": null
        },
        "date": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "",
            "defaultValue": null
        },
        "locale": {
            "required": false,
            "type": {
                "name": "{ ordinalNumber: Function; weekday: Function; weekdays: Function; month: Function; months: Functi..."
            },
            "description": "Localization settings (*localize* object from `date-fns`)\n`import { localize } from date-fns/locale/{lang}`",
            "defaultValue": null
        },
        "maxDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The latest date a user may select",
            "defaultValue": null
        },
        "minDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The earliest date a user may select",
            "defaultValue": null
        },
        "onDateChange": {
            "required": false,
            "type": {
                "name": "(day: Date) => void"
            },
            "description": "",
            "defaultValue": null
        },
        "showDropdowns": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "If set as `true`, shows **month** and **year** dropdowns above the calendar",
            "defaultValue": null
        },
        "showISOWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "showWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        }
    }
};

export const SingleDatePickerDocs = {
    "displayName": "SingleDatePicker",
    "description": "",
    "props": {
        "children": {
            "required": false,
            "type": {
                "name": "ReactNode"
            },
            "description": "",
            "defaultValue": null
        },
        "date": {
            "required": false,
            "type": {
                "name": "string | Date"
            },
            "description": "",
            "defaultValue": null
        },
        "drops": {
            "required": false,
            "type": {
                "name": "\"down\" | \"up\""
            },
            "description": "Vertical position of the popup with respect to the input",
            "defaultValue": {
                "value": "\"down\""
            }
        },
        "format": {
            "required": false,
            "type": {
                "name": "string"
            },
            "description": "",
            "defaultValue": null
        },
        "locale": {
            "required": false,
            "type": {
                "name": "{ ordinalNumber: Function; weekday: Function; weekdays: Function; month: Function; months: Functi..."
            },
            "description": "Localization settings (*localize* object from `date-fns`)\n`import { localize } from date-fns/locale/{lang}`",
            "defaultValue": null
        },
        "maxDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The latest date a user may select",
            "defaultValue": null
        },
        "minDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The earliest date a user may select",
            "defaultValue": null
        },
        "onDateChange": {
            "required": false,
            "type": {
                "name": "(day: Date) => void"
            },
            "description": "",
            "defaultValue": null
        },
        "onHide": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "",
            "defaultValue": null
        },
        "onShow": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "",
            "defaultValue": null
        },
        "opens": {
            "required": false,
            "type": {
                "name": "\"left\" | \"right\" | \"center\""
            },
            "description": "Horizontal alignment of the popup with respect to the input",
            "defaultValue": {
                "value": "\"left\""
            }
        },
        "showDropdowns": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "If set as `true`, shows **month** and **year** dropdowns above the calendar",
            "defaultValue": null
        },
        "showISOWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "showWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        }
    }
};

export const DateRangePickerControlDocs = {
    "displayName": "DateRangePickerControl",
    "description": "",
    "props": {
        "children": {
            "required": false,
            "type": {
                "name": "ReactNode"
            },
            "description": "",
            "defaultValue": null
        },
        "endDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The end of the initially selected date range",
            "defaultValue": null
        },
        "individualCalendars": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, the two calendars can be individually advanced and display any month/year.\nWhen disabled, the two calendars displayed will always be for two sequential months\n(i.e. January and February), and both will be advanced when clicking the left or right\narrows above the calendars.",
            "defaultValue": {
                "value": "false"
            }
        },
        "locale": {
            "required": false,
            "type": {
                "name": "{ ordinalNumber: Function; weekday: Function; weekdays: Function; month: Function; months: Functi..."
            },
            "description": "Localization settings (*localize* object from `date-fns`)\n`import { localize } from date-fns/locale/{lang}`",
            "defaultValue": null
        },
        "maxDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The latest date a user may select",
            "defaultValue": null
        },
        "minDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The earliest date a user may select",
            "defaultValue": null
        },
        "onDatesChange": {
            "required": false,
            "type": {
                "name": "(dates: DateRange) => void"
            },
            "description": "Callback when start and/or end dates are changed",
            "defaultValue": null
        },
        "showDropdowns": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "If set as `true`, shows **month** and **year** dropdowns above the calendar",
            "defaultValue": null
        },
        "showISOWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "showWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "startDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The start of the initially selected date range",
            "defaultValue": null
        }
    }
};

export const DateRangePickerDocs = {
    "displayName": "DateRangePicker",
    "description": "",
    "props": {
        "alwaysShowCalendars": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "children": {
            "required": false,
            "type": {
                "name": "ReactNode"
            },
            "description": "",
            "defaultValue": null
        },
        "customRangeLabel": {
            "required": false,
            "type": {
                "name": "string"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "drops": {
            "required": false,
            "type": {
                "name": "\"down\" | \"up\""
            },
            "description": "Vertical position of the popup with respect to the input",
            "defaultValue": {
                "value": "\"down\""
            }
        },
        "endDate": {
            "required": false,
            "type": {
                "name": "string | Date"
            },
            "description": "The end of the initially selected date range",
            "defaultValue": null
        },
        "format": {
            "required": false,
            "type": {
                "name": "string"
            },
            "description": "The format used to parse date strings",
            "defaultValue": {
                "value": "\"YYYY-MM-DD\""
            }
        },
        "individualCalendars": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, the two calendars can be individually advanced and display any month/year.\nWhen disabled, the two calendars displayed will always be for two sequential months\n(i.e. January and February), and both will be advanced when clicking the left or right\narrows above the calendars.",
            "defaultValue": {
                "value": "false"
            }
        },
        "locale": {
            "required": false,
            "type": {
                "name": "{ ordinalNumber: Function; weekday: Function; weekdays: Function; month: Function; months: Functi..."
            },
            "description": "Localization settings (*localize* object from `date-fns`)\n`import { localize } from date-fns/locale/{lang}`",
            "defaultValue": null
        },
        "maxDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The latest date a user may select",
            "defaultValue": null
        },
        "minDate": {
            "required": false,
            "type": {
                "name": "Date"
            },
            "description": "The earliest date a user may select",
            "defaultValue": null
        },
        "onCalendarShow": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "onCalenderHide": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "onDatesChange": {
            "required": false,
            "type": {
                "name": "(dates: DateRange) => void"
            },
            "description": "Callback when start and/or end dates are changed",
            "defaultValue": null
        },
        "onHide": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "Callback for when the picker is hidden",
            "defaultValue": null
        },
        "onShow": {
            "required": false,
            "type": {
                "name": "() => void"
            },
            "description": "Callback for when the picker is shown",
            "defaultValue": null
        },
        "opens": {
            "required": false,
            "type": {
                "name": "\"left\" | \"right\" | \"center\""
            },
            "description": "Horizontal alignment of the popup with respect to the input",
            "defaultValue": {
                "value": "\"left\""
            }
        },
        "ranges": {
            "required": false,
            "type": {
                "name": "Record<string, Range>"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "separator": {
            "required": false,
            "type": {
                "name": "string"
            },
            "description": "The text to be displayed as a separator",
            "defaultValue": {
                "value": "\"→\""
            }
        },
        "showCustomRangeLabel": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "showDropdowns": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "If set as `true`, shows **month** and **year** dropdowns above the calendar",
            "defaultValue": null
        },
        "showISOWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "showWeekNumbers": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "TODO: implement this feature",
            "defaultValue": null
        },
        "startDate": {
            "required": false,
            "type": {
                "name": "string | Date"
            },
            "description": "The start of the initially selected date range",
            "defaultValue": null
        }
    }
};
