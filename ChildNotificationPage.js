import React from 'react';
import Avatar from 'react-avatar';
import Dotdotdot from 'react-dotdotdot';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import NotificationType from './NotificationType';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import '../css/Notifications.css';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  content: {
    textDecoration: 'none',
  },
  listItem: {
    minWidth: 'auto',
    margin: 0,
    padding: 0
  },
  icon: {
    color: '#BDBDBD',
    padding: 2,
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:active': {
      color: '#2196F3',
      backgroundColor: 'transparent',
    },
  },
  iconSize: {
    fontSize: "0.6em"
  }
})


class ChildNotificationPage extends React.Component {
  constructor (props) {
    super (props) 
    this.state = {
      visible: 5
    };
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    this.setState((prev) => { 
      return {visible: prev.visible + 5};
    });
  }
    render () {
      const { classes } = this.props;
      return (
        <div className="container">
          {this.props.list.sort(function(a, b){return b.noteTime - a.noteTime}).slice(0,this.state.visible).map((noteData) => 
              <div className={"background" + (noteData.seen ? "Seen" : "Unseen")}>
                <div className={"pageNoteItem"}>
                    <Avatar                   
                        color={Avatar.getRandomColor('sitebase', [
                          '#2196f3', 
                          '#f44336', 
                          '#e91e63', 
                          '#3f51b5', 
                          '#009688',
                          '#ffeb3b',
                          '#ff9800',
                        ])}
                        name={noteData.name}
                        round={true}
                        className="pageAvatar"
                        size="65"
                        src={noteData.avatar}
                      />
                    <Dotdotdot clamp={3} className="pageNoteContent"><NotificationType noteContent={noteData} /></Dotdotdot>
                    <div className="seenIcon">
                        <IconButton 
                          className={classes.icon} 
                          onClick={() => this.props.toggleBackground(noteData.studyID, noteData.key)}
                        >
                          {noteData.seen ? <VisibilityOffIcon className={classes.iconSize} /> : <VisibilityIcon className={classes.iconSize} />}
                        </IconButton> 
                      </div>
                  <div className="pageTimeStamp">
                    <Typography variant="caption">{moment(noteData.noteTime).fromNow()}</Typography>
                  </div>
                </div>
                <div style={{height: "3px", backgroundColor: "#fff"}} />
              </div>
          )}
          {this.state.visible < this.props.list.length &&
          <div className="loadMore">
            <Button color="primary" onClick={() => this.loadMore()}>Load more...</Button>
          </div> }
        </div>
        
      )
    }
} 
ChildNotificationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ChildNotificationPage);