import glamorous from 'glamorous';

interface NavButtonProps {
    height?: string;
    width?: string;
}

export const NavButton = glamorous('button')<NavButtonProps>(
    {
        background: 'transparent',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '18px',
        outline: 'none'
    },
    props => ({
        width: props.width || '42px',
        height: props.height || '42px',
        lineHeight: props.height || '42px'
    })
);

NavButton.displayName = 'NavButton';
