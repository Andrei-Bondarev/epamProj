import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

const Ticket = ({ticket}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const backColor = ticket.creator === user.result._id ? '#9baed3' : 'white';
    return(
        <Card sx={{
            minWidth: 275,
            backgroundColor: backColor
        }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Created at:{ticket.createdAt}
                </Typography>
                <Typography variant="h5" component="div">
                    Ticket for {ticket.creatorName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Status: {ticket.status}
                </Typography>
                {
                    ticket.status !== 'New' && (
                    <Typography variant="body2">
                         Handled by: {ticket.handledBy.split('&')[1]}
                    </Typography>
                    )
                }
            </CardContent>
        </Card>
    )
}
export default Ticket;



