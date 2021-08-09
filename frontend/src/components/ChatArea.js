import React, {useState, useEffect} from 'react'
import {Container, Grid} from '@material-ui/core'
import queryString from 'query-string'
import end from './end'
import axios from 'axios'
import {io} from 'socket.io-client'

import Chatbox from './Chatbox' 
import Online from './Online'
import Chats from './Chats'

let socket

const ChatArea = ({location}) => {
    const {user} = queryString.parse(location.search)

    const [currentChat, setCurrentChat] = useState(null)
    const [me, setMe] = useState({})
    const [onlineUsers, setOnlineUsers] = useState([])
    // const [socket, setSocket] = useState(null)

    // const endpoint = 'http://localhost:5000'
    const endpoint = 'https://jojo-chatting.herokuapp.com'

    useEffect(() => {

       socket = io(endpoint)

    //    console.log(socket)

    //    socket.emit('join', {user}, () => {

    //    })

       return () => {
        socket.emit('disconnect')
        socket.off()
        }

    }, [location.search, endpoint])
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(end + '/user/' + user)
                setMe(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        getUser();
    }, [user])

    useEffect(() => {
        socket.emit('addUser', me._id)
        socket.on('getUsers', users => {
            // console.log('textuser', users)
            setOnlineUsers(users.map(user => user.userId))
        })

    }, [me])

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={0}>
                <Grid item sm={3}>
                    <Chats userName={user} currentChat={currentChat} setCurrentChat={setCurrentChat} />
                </Grid>
                <Grid item sm={6}>
                    <Chatbox userName={user} currentChat={currentChat} setCurrentChat={setCurrentChat} user={me} 
                        socket={socket}
                    />
                </Grid>
                <Grid item sm={3}>
                    <Online onlineUsers={onlineUsers} currentUserId={me._id} setCurrentChat={setCurrentChat} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatArea
