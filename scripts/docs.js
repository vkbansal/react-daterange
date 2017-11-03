const docgen = require('react-docgen-typescript');
const path = require('path');
const fs = require('fs');

const files = {
    SingleDatePickerControl: path.resolve(__dirname, '../src/SingleDatePickerControl.tsx'),
    SingleDatePicker: path.resolve(__dirname, '../src/SingleDatePicker.tsx'),
    DateRangePickerControl: path.resolve(__dirname, '../src/DateRangePickerControl.tsx'),
    DateRangePicker: path.resolve(__dirname, '../src/DateRangePicker.tsx'),
    CalendarMonth: path.resolve(__dirname, '../src/CalendarMonth.tsx'),
    Dropdown: path.resolve(__dirname, '../src/Dropdown.tsx')
};

let parser = docgen.withDefaultConfig();

let CalendarMonthDocs = parser
    .parse(files.CalendarMonth)
    .find(comp => comp.displayName === 'CalendarMonth');

let DropdownDocs = parser.parse(files.Dropdown).find(comp => comp.displayName === 'Dropdown');

let SingleDatePickerControlDocs = parser
    .parse(files.SingleDatePickerControl)
    .find(comp => comp.displayName === 'SingleDatePickerControl');

/**
 * Hack for getting decscription for inherited props
 */
for (let name in SingleDatePickerControlDocs.props) {
    let prop = SingleDatePickerControlDocs.props[name];

    if (!prop.description && CalendarMonthDocs.props[name]) {
        Object.assign(prop, CalendarMonthDocs.props[name], {
            type: prop.type,
            required: prop.required
        });
    }
}

let SingleDatePickerDocs = parser
    .parse(files.SingleDatePicker)
    .find(comp => comp.displayName === 'SingleDatePicker');

/**
 * Hack for getting decscription for inherited props
 */
for (let name in SingleDatePickerDocs.props) {
    let prop = SingleDatePickerDocs.props[name];

    if (!prop.description) {
        if (SingleDatePickerControlDocs.props[name]) {
            Object.assign(prop, SingleDatePickerControlDocs.props[name], {
                type: prop.type,
                required: prop.required
            });
        } else if (DropdownDocs.props[name]) {
            Object.assign(prop, DropdownDocs.props[name], {
                type: prop.type,
                required: prop.required
            });
        }
    }
}

let DateRangePickerControlDocs = parser
    .parse(files.DateRangePickerControl)
    .find(comp => comp.displayName === 'DateRangePickerControl');

/**
 * Hack for getting decscription for inherited props
 */
for (let name in DateRangePickerControlDocs.props) {
    let prop = DateRangePickerControlDocs.props[name];

    if (!prop.description && CalendarMonthDocs.props[name]) {
        Object.assign(prop, CalendarMonthDocs.props[name], {
            type: prop.type,
            required: prop.required
        });
    }
}

let DateRangePickerDocs = parser
    .parse(files.DateRangePicker)
    .find(comp => comp.displayName === 'DateRangePicker');

/**
 * Hack for getting decscription for inherited props
 */
for (let name in DateRangePickerDocs.props) {
    let prop = DateRangePickerDocs.props[name];

    if (!prop.description) {
        if (DateRangePickerControlDocs.props[name]) {
            Object.assign(prop, DateRangePickerControlDocs.props[name], {
                type: prop.type,
                required: prop.required
            });
        } else if (DropdownDocs.props[name]) {
            Object.assign(prop, DropdownDocs.props[name], {
                type: prop.type,
                required: prop.required
            });
        }
    }
}

function sortProps(docs) {
    let keys = Object.keys(docs.props).sort();

    let orderedProps = keys.reduce((p, c) => {
        p[c] = docs.props[c];

        return p;
    }, {});

    return Object.assign(docs, {
        props: orderedProps
    });
}

const data = `// This is automatically generated using './scripts/docs.js', please do not change anything here
export const SingleDatePickerControlDocs = ${JSON.stringify(
    sortProps(SingleDatePickerControlDocs),
    null,
    4
)};

export const SingleDatePickerDocs = ${JSON.stringify(sortProps(SingleDatePickerDocs), null, 4)};

export const DateRangePickerControlDocs = ${JSON.stringify(
    sortProps(DateRangePickerControlDocs),
    null,
    4
)};

export const DateRangePickerDocs = ${JSON.stringify(sortProps(DateRangePickerDocs), null, 4)};
`;

fs.writeFileSync(path.resolve(__dirname, '../examples/data.ts'), data, 'utf8');
