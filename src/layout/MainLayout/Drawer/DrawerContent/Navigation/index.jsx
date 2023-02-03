import { Box, Typography } from '@mui/material';
import menuItem from './MenuItem';
import { ListItemButton, ListItemIcon, ListItemText } from '../../../../../../node_modules/@mui/material/index';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    const navGroups = menuItem.menu.map((item, index) => {
        const Icon = item.icon;
        const itemIcon = item.icon ? <Icon style={{ fontSize: '1rem' }} /> : false;

        const handleClick = (url) => {
            navigate(url);
        };

        return (
            <ListItemButton onClick={() => handleClick(item.url)} key={index}>
                <ListItemIcon
                    sx={{
                        bgcolor: 'primary.lighter',
                        '&:hover': {
                            bgcolor: 'primary.lighter'
                        }
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="h5" sx={{ color: 'text.primary' }}>
                            {item.label}
                        </Typography>
                    }
                />
            </ListItemButton>
        );
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
