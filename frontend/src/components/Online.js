import React, {useState, useEffect} from 'react'
import {List, ListItem, ListItemText, Avatar, Badge, ListItemAvatar, Typography, Divider} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {axios} from './'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);


const Online = ({onlineUsers, currentUserId, setCurrentChat}) => {

  const [online, setOnline] = useState([])
  // console.log(online)

    useEffect(() =>{

      const getAllUsers = async () => {
        try {
          const users = await axios.get('/user')
          setOnline(users.data.filter(user => user._id !== currentUserId && onlineUsers.includes(user._id)))
          
        } catch (error) {
          console.log(error)
        }
      }

      getAllUsers();


    },[onlineUsers, currentUserId])
    
    const classes = useStyles();

    const handleClick = async (receiverId) => {
      // console.log(key, currentUserId)
      try {
        const convo = await axios.get(`/conversations/find/${receiverId}/${currentUserId}`)
        // console.log(convo)
        setCurrentChat(convo.data)
      } catch (error) {
        console.log(error)
      }
    }


    const item = (image, name, userId, key) => {
        return (
            <div key={key}>
                <ListItem key={key} onClick={() => handleClick(userId)}>
                    <ListItemAvatar>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            variant="dot"
                        >
                          <Avatar alt="Remy Sharp" src={image} />
                        </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                </ListItem>
                <Divider variant="inset"  />
                {/* <Divider variant="inset" component="li" /> */}
            </div>
        )
    }

    return (
        <>
            <Typography variant="h5" align="center" className="mt-3">Online</Typography>
            <List className={classes.root}>
                {/* {item("", "jojo")} */}
                {
                  online.map((user, i) => item("", user.username, user._id, i))
                }
            </List>
        </>
    )
}

export default Online
