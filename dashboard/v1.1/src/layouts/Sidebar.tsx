import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccessAlarm as AccessAlarmIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  NetworkCheck as NetworkCheckIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  // root class
  root: {
    display: 'flex'
  },
  // Nested lists
  nested: {
    paddingLeft: theme.spacing(4),
    margin: '10px 0',
    backgroundColor: '#DCDCDC'
  },
  // Drawer styles
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  // SettingsIcon
  settings: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  }
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose(): void;
}

const Sidebar: FC<SidebarProps> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();

  // Sidebar element
  const [testListOpen, setTestListOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const showTestList = () => {
    setTestListOpen(!testListOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const menuItems = (
    <div>
      <ListItem
        button={true}
        selected={selectedIndex === 0}
        onClick={(event: any) => handleListItemClick(event, 0)}
        component={Link}
        to="/"
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button={true}
        selected={selectedIndex === 1}
        onClick={(event: any) => handleListItemClick(event, 1)}
        component={Link}
        to="/monitoring"
      >
        <ListItemIcon>
          <AccessAlarmIcon />
        </ListItemIcon>
        <ListItemText primary="Monitoring" />
      </ListItem>
      <ListItem button={true} selected={selectedIndex >= 3}>
        <ListItemIcon>
          <NetworkCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Tests" onClick={showTestList} />
        {open ? (
          <ExpandLessIcon onClick={showTestList} />
        ) : (
          <ExpandMoreIcon onClick={showTestList} />
        )}
      </ListItem>
      {/* Nested List */}
      <Collapse in={testListOpen} timeout="auto" unmountOnExit={true}>
        <List component="div" disablePadding={true}>
          <ListItem
            button={true}
            selected={selectedIndex === 3}
            onClick={(event: any) => handleListItemClick(event, 3)}
            component={Link}
            to="/ping"
            className={classes.nested}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Ping" />
          </ListItem>
          <ListItem
            button={true}
            selected={selectedIndex === 4}
            onClick={(event: any) => handleListItemClick(event, 4)}
            component={Link}
            to="/floodping"
            className={classes.nested}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="FloodPing" />
          </ListItem>
          <ListItem
            button={true}
            selected={selectedIndex === 5}
            onClick={(event: any) => handleListItemClick(event, 5)}
            component={Link}
            to="/jitter"
            className={classes.nested}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Jitter" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        button={true}
        selected={selectedIndex === 2}
        onClick={(event: any) => handleListItemClick(event, 2)}
        component={Link}
        to="/configurations"
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Config" />
      </ListItem>
    </div>
  );

  return (
    <div className={classes.root}>
      <Router>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{menuItems}</List>
        </Drawer>
      </Router>
    </div>
  );
};

export default Sidebar;
