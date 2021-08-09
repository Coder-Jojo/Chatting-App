import React from 'react'
import {Paper, Typography, Box} from '@material-ui/core'
import {format} from 'timeago.js'

const MessageRight = ({message}) => {

    return (

             <Box className="m-3">
                <Box width="70%" className="float-right">
                    <Paper width="70%" className="bg-primary border rounded-3">
                        <Typography variant="body1" className="p-2 text-white">
                            {message.text}
                        </Typography>
                    </Paper>
                    <div className="float-right">
                    {format(message.createdAt)} 
                    </div>
                </Box>
                
            </Box>
    )
}

export default MessageRight
