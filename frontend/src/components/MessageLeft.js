import React from 'react'
import { Paper, Typography, Avatar, Box} from '@material-ui/core'
import {format} from 'timeago.js'

const MessageLight = ({image, message}) => {

    return (
        <div className="m-3">
            <Box width="70%" component="span" className="d-flex flex-row">
                <Avatar alt="Remy Sharp" src={image} />
                <Box className="pl-1">
                    <Paper className="bg-secondary">
                        <Typography variant="body1" className="p-2 text-white">
                            {message.text}
                        </Typography>
                    </Paper>
                </Box>
                
            </Box>
            <div>
                {format(message.createdAt)}
            </div>
            {/* <Box width="70%" className="d-flex flex-row-reverse">
                {format(message.createdAt)}
            </Box> */}
        </div>  
    )
}

export default MessageLight
