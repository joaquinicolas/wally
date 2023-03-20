import Icon from '@mui/material/Icon';

const CurrIcon = (props: {
    curr: string
}) => {
    return (
        <Icon
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
            }}
        >
            {
                props.curr == 'USD' ?
                    '$' :
                    '€'
            }
        </Icon>
    );
};

export default CurrIcon;
