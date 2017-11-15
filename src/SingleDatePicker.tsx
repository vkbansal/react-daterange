import format from 'date-fns/format';
import defaults from 'lodash.defaults';
import * as React from 'react';

import { CalBody, CalHeader, CalendarInput, NavButton } from './Common';
import { DropDown, DropDownProps } from './Dropdown';
import { Overwrite, callIfExists, parseDate } from './helpers';
import {
    SingleDatePickerControl,
    SingleDatePickerControlLocale,
    SingleDatePickerControlProps
} from './SingleDatePickerControl';

type PickedDropDownProps = Partial<Pick<DropDownProps, 'opens' | 'drops'>>;

export interface SingleDatePickerLocale extends SingleDatePickerControlLocale {}

type ControlProps = Partial<
    Overwrite<
        SingleDatePickerControlProps,
        {
            date?: string | Date;
            locale?: Partial<SingleDatePickerLocale>;
        }
    >
>;

export interface SingleDatePickerProps extends PickedDropDownProps, ControlProps {
    onShow?: () => void;
    onHide?: () => void;
}

export interface SingleDatePickerState {
    date?: Date;
    showDropdown: boolean;
    position: DropDownProps['position'] | null;
}

const defaultLocale: SingleDatePickerLocale = {
    format: 'YYYY-MM-DD'
};

export class SingleDatePicker extends React.Component<
    SingleDatePickerProps,
    SingleDatePickerState
> {
    private input: HTMLDivElement;

    private locale: SingleDatePickerLocale;

    constructor(props: SingleDatePickerProps) {
        super(props);

        this.locale = defaults({}, props.locale, defaultLocale);

        this.state = {
            date: props.date ? parseDate(props.date, this.locale.format) : undefined,
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
        const { onDateChange, opens, drops, date: propDate, ...rest } = this.props;

        return (
            <div>
                <div ref={this.inputRef} style={{ display: 'inline-block' }}>
                    <CalendarInput
                        onFocus={this.handleShowDropdown}
                        value={date ? format(date, this.locale.format) : ''}
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
                                    <SingleDatePickerControl
                                        date={date}
                                        {...rest}
                                        onDateChange={this.handleDateChange}
                                    />
                                </CalBody>
                            </div>
                        </DropDown>
                    )}
            </div>
        );
    }
}
