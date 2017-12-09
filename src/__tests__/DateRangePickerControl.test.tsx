import { shallow } from 'enzyme';
import * as React from 'react';
import * as format from 'date-fns/format';

import { DateRangePickerControl } from '../DateRangePickerControl';
import { CalendarMonth } from '../CalendarMonth';

describe('<DateRangePickerControl/>', () => {
    const startDate = new Date(2017, 0 /* Jan */, 15, 0, 0, 0, 0); // 2017-01-15
    const endDate = new Date(2017, 2 /* Mar */, 14, 0, 0, 0, 0); // 2017-03-14

    test('by default renders consecutive months', () => {
        const component = shallow(
            <DateRangePickerControl startDate={startDate} endDate={endDate} />
        );

        let monthLeft = component.find(CalendarMonth).at(0);
        let monthRight = component.find(CalendarMonth).at(1);

        // Navigation Buttons
        expect(monthLeft.prop('hideNextButton')).toBe(true);
        expect(monthRight.prop('hidePrevButton')).toBe(true);

        // months
        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201702');

        expect(component).toMatchSnapshot();

        // click on next arrow
        monthRight.prop('onNextClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201702');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201703');

        // click on next arrow
        monthRight.prop('onNextClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201703');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201704');

        // click on prev arrow
        monthLeft.prop('onPrevClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201702');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201703');
    });

    test('`inidividualCalenders` renders seperate months', () => {
        const component = shallow(
            <DateRangePickerControl individualCalendars startDate={startDate} endDate={endDate} />
        );

        let monthLeft = component.find(CalendarMonth).at(0);
        let monthRight = component.find(CalendarMonth).at(1);

        // Navigation Buttons
        expect(monthLeft.prop('hideNextButton')).toBe(false);
        expect(monthRight.prop('hidePrevButton')).toBe(false);

        // months
        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201703');

        expect(component).toMatchSnapshot();

        // click on next arrow in month on the right
        monthRight.prop('onNextClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201704');

        // click on next arrow in month on the left
        monthLeft.prop('onNextClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201702');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201704');

        // click on next arrow in month on the left
        monthLeft.prop('onNextClick')();
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201703');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201704');
    });

    test('renders consecutive months with dropdowns', () => {
        const component = shallow(
            <DateRangePickerControl showDropdowns startDate={startDate} endDate={endDate} />
        );

        let monthLeft = component.find(CalendarMonth).at(0);
        let monthRight = component.find(CalendarMonth).at(1);

        // Navigation Buttons
        expect(monthLeft.prop('hideNextButton')).toBe(true);
        expect(monthRight.prop('hidePrevButton')).toBe(true);

        // months
        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201702');

        expect(component).toMatchSnapshot();

        // change month value in month on the right
        monthRight.prop('onMonthChange')(10);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201710');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201711');

        // change year value in month on the right
        monthRight.prop('onYearChange')(2018);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201810');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201811');

        // change year value in month on the left
        monthLeft.prop('onYearChange')(2019);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201910');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201911');

        // change month value in month on the left
        monthLeft.prop('onMonthChange')(5);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201906');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201907');
    });

    test('`inidividualCalenders` renders seperate months with dropdowns', () => {
        const component = shallow(
            <DateRangePickerControl
                individualCalendars
                showDropdowns
                startDate={startDate}
                endDate={endDate}
            />
        );

        let monthLeft = component.find(CalendarMonth).at(0);
        let monthRight = component.find(CalendarMonth).at(1);

        // Navigation Buttons
        expect(monthLeft.prop('hideNextButton')).toBe(false);
        expect(monthRight.prop('hidePrevButton')).toBe(false);

        // months
        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201703');

        expect(component).toMatchSnapshot();

        // change month value in month on the right
        monthRight.prop('onMonthChange')(10);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201711');

        // change year value in month on the right
        monthRight.prop('onYearChange')(2018);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201701');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201811');

        // change year value in month on the left
        monthLeft.prop('onYearChange')(2018);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201801');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201811');

        // change month value in month on the left
        monthLeft.prop('onMonthChange')(5);
        component.update();

        monthLeft = component.find(CalendarMonth).at(0);
        monthRight = component.find(CalendarMonth).at(1);

        expect(format(monthLeft.prop('month'), 'YYYYMM')).toBe('201806');
        expect(format(monthRight.prop('month'), 'YYYYMM')).toBe('201811');
    });

    // test('date selection works', () => {
    //     const component = shallow(
    //         <DateRangePickerControl showDropdowns startDate={startDate} endDate={endDate} />
    //     );

    //     let monthLeft = component.find(CalendarMonth).at(0);
    //     let monthRight = component.find(CalendarMonth).at(1);
    // });
});
