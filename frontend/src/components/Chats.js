import React, {useState, useEffect} from 'react'
import {TextField, Link, Tooltip, Fab, CircularProgress} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {Chat, axios} from './'

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

const Chats = ({userName, currentChat, setCurrentChat}) => {

    const classes = useStyles()

    const [conversations, setConversations] = useState([])
    const [user, setUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [findChat, setFindChat] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        setLoading(true)

        const getConversations = async () => {
            try {
                const res = await axios.get('/conversations/' + user._id)
                setConversations(res.data)
                // console.log(conversations)
            }
            catch (err) {
                console.error(err)
            }
        }

        const getUser = async () => {
            try {
                const res = await axios.get('/user/' + userName)
                setUser(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        const getAllUsers = async () => {
            try {
                const users = await axios.get('/user')
                // console.log(users)
                setAllUsers(users.data)
            } catch (error) {
                console.error(error)
            }
        }

        getUser();

        getConversations();

        getAllUsers();

        setLoading(false)

    }, [user._id, userName])

    const AddNewConversation = async (userName) => {
        const memberId = allUsers.find(user => user.username === userName)
        if(!memberId)
            return;

        try {
            console.log(userName)
            const newConvo = await axios.get('/conversations/find/' + memberId._id + '/' + user._id)
            const checkExist = conversations.find(conversation => conversation._id === newConvo.data._id)
            // console.log(newConvo)
            // console.log(conversations)
            // console.log(checkExist)
            if(!checkExist){
                setConversations([...conversations, newConvo.data])
            }
            // console.log(conversations)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="pr-3">
                <Autocomplete
                    id="combo-box-demo"
                    autoHighlight
                    onChange={(event, newValue) => {
                        setFindChat(newValue);
                      }}
                    options={allUsers.map(u => u.username)}
                    renderInput={(params) => (
                        <div className="d-flex">
                            <TextField {...params} label="Search" margin="normal" 
                                onChange={e => setFindChat(e.target.value)}
                                value={findChat}
                            />             
                            <div onClick={() => AddNewConversation(findChat)}>
                                <Tooltip title="select existing conversation or add new one" aria-label="add" className='mt-3'>
                                    <Fab color="primary">
                                        <AddIcon fontSize='large'/>
                                    </Fab>
                                </Tooltip>
                            </div>
                        </div>
                    )}
                    className=" mt-3"
                />
                
                {loading? (<CircularProgress />) : conversations.length? 
                    conversations.map((c, i) => {
                        return(
                            <Link key={i} onClick={()=> setCurrentChat(c)} className={classes.root}>
                                <Chat conversations={c} currentUser={user} setConversations={setConversations}
                                    convos={conversations}    
                                />
                            </Link>
                        )
                    }) : null
                 }      
            
            <Chat />
        </div>
    )
}

export default Chats
