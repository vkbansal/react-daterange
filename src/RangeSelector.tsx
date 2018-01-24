import * as React from 'react';
import glamorous, { GlamorousComponent } from 'glamorous';

import { isSameDay, RangeFunctions, DateRange } from './utils/dateUtils';

export const RangeWrapper = glamorous.div({
    display: 'inline-flex',
    flexFlow: 'column',
    paddingTop: '50px'
});

RangeWrapper.displayName = 'RangeWrapper';

export interface RangeNameProps {
    selected?: boolean;
}

export const RangeName = glamorous.div<RangeNameProps>(
    {
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '8px',
        minWidth: '150px',
        cursor: 'pointer'
    },
    (props) => ({
        backgroundColor: props.selected ? 'rgba(0, 202, 255, 1)' : '#eee',
        color: props.selected ? '#fff' : 'initial',
        '&:hover': {
            backgroundColor: props.selected ? 'rgba(0, 202, 255, 1)' : 'rgba(0, 202, 255, 0.8)',
            color: '#fff'
        }
    })
);

RangeName.displayName = 'Range';

export interface RangeSelectorProps {
    ranges?: Map<string, RangeFunctions>;
    /**
     * TODO: implement this feature
     */
    customRangeLabel?: string;
    /**
     * TODO: implement this feature
     */
    showCustomRangeLabel?: boolean;
    /**
     * Callback when start and/or end dates are changed
     *
     * @param {Object} dates
     * @param {Date} dates.startDate
     * @param {Date | undefined} dates.endDate
     */
    onDatesChange?(dates: DateRange, fromRange?: boolean): void;
    startDate?: Date;
    endDate?: Date;
    onCustomSelect?(): void;
    isCustomRangeSelected?: boolean;
}

export class RangeSelector extends React.Component<RangeSelectorProps> {
    private hasMatch = false;

    handleRangeSelect = (range: RangeFunctions) => () => {
        if (typeof this.props.onDatesChange === 'function') {
            const today = new Date();
            this.props.onDatesChange(
                {
                    startDate: range.startDate(today),
                    endDate: range.endDate(today)
                },
                true
            );
        }
    };

    isSelected = (range: RangeFunctions): boolean => {
        const today = new Date();
        const { startDate, endDate } = this.props;

        if (startDate && endDate) {
            const selected =
                isSameDay(startDate, range.startDate(today)) &&
                isSameDay(endDate, range.endDate(today));
            this.hasMatch = this.hasMatch || selected;

            return selected;
        }

        return false;
    };

    render() {
        const {
            ranges,
            showCustomRangeLabel,
            customRangeLabel = 'Custom',
            onCustomSelect,
            isCustomRangeSelected
        } = this.props;

        if (!ranges || ranges.size === 0) return null;

        const data = [...ranges];

        return (
            <RangeWrapper>
                {data.map(([name, range], i) => {
                    return (
                        <RangeName
                            key={i}
                            selected={this.isSelected(range)}
                            onClick={this.handleRangeSelect(range)}
                        >
                            {name}
                        </RangeName>
                    );
                })}
                {showCustomRangeLabel && (
                    <RangeName
                        selected={!this.hasMatch && isCustomRangeSelected}
                        onClick={onCustomSelect}
                    >
                        {customRangeLabel}
                    </RangeName>
                )}
            </RangeWrapper>
        );
    }
}

export { GlamorousComponent };
