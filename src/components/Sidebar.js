import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, Divider, IconButton } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = () => {
    const drawerWidth = 240;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ position: 'absolute', top: 16, left: 16 }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#2A2E35',
                        color: 'white',
                    },
                }}
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={open}
                onClose={handleDrawerToggle}
            >
                <Typography variant="h6" sx={{ padding: 2, color: 'white' }}>
                    221746 - RushTax Inc.
                </Typography>
                <Divider />
                <List>
                    {['Clientes', 'Banco', 'Calendario', 'Reportes'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon sx={{ color: 'white' }}>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <Avatar alt="Budi Tanrim" src="/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Budi Tanrim" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
