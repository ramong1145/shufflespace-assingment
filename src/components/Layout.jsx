import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {makeStyles} from '@mui/styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        appBar: {
            width: 'calc(100% - ${drawerWidth}px)'
        },
        page: {
            width: '100%',
            marginTop: '60px'
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        title: {
            padding: '10px'
        },
        headerTheme: {
            flexGrow: 1
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles();
    
    const menuItems = [
        {
            text: 'Create Recipe',
            icon: <AddCircleOutlinedIcon color='secundary' />, 
            path: '/create'
        }
    ];

    return(
        <div className={classes.root}>
            <AppBar className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.headerTheme}>
                        Recipe List
                    </Typography>
                    <Typography>
                        Logged User
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{paper:classes.drawerPaper}}>
                <img src='https://www.shufflespace.com/images/logo-teal.png' alt='logo' width={drawerWidth} />
                <br />
                <List>
                    {menuItems.map(item => {
                        return(
                            <ListItem button key={item.text} >
                                <ListItemIcon> {item.icon} </ListItemIcon>
                                <ListItemText primary={item.text} /> 
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}>
                    {children}
                </div>
            </div>
        </div>
    )
}
