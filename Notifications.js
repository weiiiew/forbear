import React from 'react';
import Button from '@material-ui/core/Button';
import ChildNotificationPage from './ChildNotificationPage.js';
import inputs from '../../DataNotifications';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../css/Notifications.css';

const styles = theme => ({
  scrollBar:{
      backgroundColor: '#fff',
      boxShadow: 'none',
      margin: 0,
  },
  tabsDivider: {
      borderBottom: '1px solid #e8e8e8',
  },
  tabRoot: {
      minWidth: 5,
      '&:hover': {
          backgroundColor: '#F5F5F5',
      },
  },
  tabContainer: {
      padding: 0,
      margin: 0,
  },
  grow: {
    flexGrow: 1,
  },
})
function TabContainer(props) {
  return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
          {props.children}
      </Typography>
  );
}
  TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class Notifications extends React.Component { 
  state = {
    value: 0,
    studies: inputs.studies,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  }
  toggleSeen = (idValue, key) => {
    let pos = this.state.studies.map(function(e) {return e.studyID; }).indexOf(idValue)
    let temp = this.state[key]
    temp[pos].seen = !temp[pos].seen
    this.setState({
      [key]: temp
    })
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { title } = this.props;
    return (
      <div className="root">
        <h2>Notifications</h2>
        <AppBar position="static" className={classes.scrollBar}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            classes={{ root: classes.tabsDivider }}
          >
            <Tab 
              classes={{root: classes.tabRoot}}
              label={inputs.studies[title]}
            />
            <div className={classes.grow} />
          </Tabs>
          </AppBar>
          {value === 0 && 
            <TabContainer className={classes.tabContainer}>
              <ChildNotificationPage 
                list={this.state.studies}
                toggleBackground={this.toggleSeen}
              />
              
            </TabContainer>
          }
      </div>
    )
  }
} 
  
Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
