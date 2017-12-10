// This is automatically generated using './scripts/docs.js', please do not change anything here
export const SingleDatePickerControlDocs = {
    "displayName": "SingleDatePickerControl",
    "description": "SingleDatePickerControl component\n@example import { SingleDatePickerControl } from 'react-daterange';\n\nclass MyDatePicker extends React.component {\n   constructor(props) {\n     super(props);\n     this.state = {\n       date: null\n     };\n   }\n\n   handleDateChange = (date) => {\n     this.setState({ date });\n   }\n\n   render() {\n     return (\n       <SingleDatePickerControl\n         onDateChange={this.handleDateChange}\n       />\n     );\n   }\n}",
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
            "description": "The initially selected date",
            "defaultValue": null
        },
        "daysOfWeek": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the days of the week in the calendar.\nNote: first day in the array must be a sunday",
            "defaultValue": {
                "value": "['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"
            }
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
        "monthNames": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the month names in the calendar.",
            "defaultValue": {
                "value": "['January','February','March','April','May','June','July','August','September','October','November','December']"
            }
        },
        "onDateChange": {
            "required": false,
            "type": {
                "name": "(day: Date) => void"
            },
            "description": "Callback for when a date is selected",
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
        "showISOWeek": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, week starts on monday. See [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)",
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
    "description": "SingleDatePicker\n@example import React from 'react';\nimport { SingleDatePicker } from 'react-daterange';\n\n<SingleDatePicker {...props} />",
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
            "description": "The initially selected date",
            "defaultValue": null
        },
        "daysOfWeek": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the days of the week in the calendar.\nNote: first day in the array must be a sunday",
            "defaultValue": {
                "value": "['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"
            }
        },
        "displayFormat": {
            "required": false,
            "type": {
                "name": "(date: Date) => string"
            },
            "description": "A function used to format the date that is displayed .\nIt accepts a `Date` as a param and must return a `string`.\nDefault function displays the date in `YYYY-MM-DD` format.",
            "defaultValue": null
        },
        "drops": {
            "required": false,
            "type": {
                "name": "\"down\" | \"up\""
            },
            "description": "Vertical position of the picker with respect to the input field.",
            "defaultValue": {
                "value": "\"down\""
            }
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
        "monthNames": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the month names in the calendar.",
            "defaultValue": {
                "value": "['January','February','March','April','May','June','July','August','September','October','November','December']"
            }
        },
        "onDateChange": {
            "required": false,
            "type": {
                "name": "(day: Date) => void"
            },
            "description": "Callback for when a date is selected",
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
            "description": "Horizontal alignment of the picker with respect to the input field.",
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
        "showISOWeek": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, week starts on monday. See [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)",
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
    "description": "DateRangePickerControl\n@example import React from 'react';\nimport { DateRangePickerControl } from 'react-daterange';\n\n<DateRangePickerControl {...props} />",
    "props": {
        "children": {
            "required": false,
            "type": {
                "name": "ReactNode"
            },
            "description": "",
            "defaultValue": null
        },
        "daysOfWeek": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the days of the week in the calendar.\nNote: first day in the array must be a sunday",
            "defaultValue": {
                "value": "['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"
            }
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
        "monthNames": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the month names in the calendar.",
            "defaultValue": {
                "value": "['January','February','March','April','May','June','July','August','September','October','November','December']"
            }
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
        "showISOWeek": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, week starts on monday. See [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)",
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
    "description": "DateRangePicker\n@example import React from 'react';\nimport { DateRangePicker } from 'react-daterange';\n\n<DateRangePicker {...props} />",
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
        "daysOfWeek": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the days of the week in the calendar.\nNote: first day in the array must be a sunday",
            "defaultValue": {
                "value": "['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"
            }
        },
        "displayFormat": {
            "required": false,
            "type": {
                "name": "(date: Date) => string"
            },
            "description": "A function used to format the date that are displayed.\nIt accepts a `Date` as a param and must return a `string`.\nDefault function displays the dates in `YYYY-MM-DD` format.",
            "defaultValue": null
        },
        "drops": {
            "required": false,
            "type": {
                "name": "\"down\" | \"up\""
            },
            "description": "Vertical position of the picker with respect to the input field.",
            "defaultValue": {
                "value": "\"down\""
            }
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
        "monthNames": {
            "required": false,
            "type": {
                "name": "string[]"
            },
            "description": "An array of strings, that is used to display the month names in the calendar.",
            "defaultValue": {
                "value": "['January','February','March','April','May','June','July','August','September','October','November','December']"
            }
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
            "description": "Horizontal alignment of the picker with respect to the input field.",
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
        "showISOWeek": {
            "required": false,
            "type": {
                "name": "boolean"
            },
            "description": "When enabled, week starts on monday. See [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)",
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
