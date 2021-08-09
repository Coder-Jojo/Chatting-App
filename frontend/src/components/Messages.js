import React from 'react'
import {Box} from '@material-ui/core'
import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

const Messages = ({message, own}) => {
    return (
        <Box>
            {
                own?<MessageRight message={message} /> : <MessageLeft message={message} />
                
            }
            
        </Box>
    )
}

export default Messages
