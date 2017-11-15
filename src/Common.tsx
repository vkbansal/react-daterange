import glamorous from 'glamorous';

interface NavButtonProps {
    height?: string;
    width?: string;
}

export const NavButton = glamorous('button')<NavButtonProps>(
    'rdr-nav-button',
    {
        background: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '18px',
        outline: 'none',
        cursor: 'pointer'
    },
    props => ({
        width: props.width || '42px',
        height: props.height || '42px',
        lineHeight: props.height || '42px'
    })
);

NavButton.displayName = 'NavButton';

export const CalendarInput = glamorous('input')('rdr-input', {
    display: 'inline-block',
    border: '1px solid #cecece',
    background: '#fff',
    fontSize: '14px',
    lineHeight: '18px',
    padding: '8px',
    '&:focus': {
        outline: 'none'
    }
});

CalendarInput.displayName = 'CalendarInput';

export const CalHeader = glamorous('div')('rdr-calendar-head', {
    display: 'flex',
    justifyContent: 'flex-end'
});

CalHeader.displayName = 'CalHeader';

export const CalBody = glamorous('div')('rdr-calendar-body', {
    display: 'flex'
});

CalBody.displayName = 'CalBody';
