import React, {useEffect, useState} from "react";
import Ticket from "./ticket/Ticket";
import {Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createTicket, getTickets} from "../../actions/ticket";
import {useNavigate} from "react-router-dom";
const Tickets = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.ticket.tickets);
    return (
        <div style={{
            margin:'0 auto'
        }}>
            {
                user.result.status === 'client' &&  (
                    <>
                    <Typography variant={'h6'} align={'center'} sx={{marginBottom:'20px'}}>Your ticket</Typography>
                    <Grid sx={{
                        display: 'flex',
                        alignItems: 'center',
                     }} container alignItems="stretch" spacing={3}>
                        {
                            tickets.map((ticket) => ( ticket.creator === user.result._id && ticket.status !== 'Done' && (<Grid item key={ticket._id} xs={12} sm={12} md={6} lg={3}>
                            <Ticket ticket={ticket} />
                            </Grid>)
                            ))
                        }
                    </Grid>
                    </>
                )

            }
            <Typography variant={'h6'} align={'center'} sx={{marginBottom:'20px'}}>Ticket that you are handling now</Typography>
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
            }} container alignItems="stretch" spacing={3}>

                {tickets.map((ticket) => ( ticket.status === 'Inprogress' && ticket.handledBy.split('&')[0] === user.result._id && (<Grid item key={ticket._id} xs={12} sm={12} md={6} lg={3}>
                        <Ticket ticket={ticket} />
                    </Grid>)
                ))}
            </Grid>
            <Typography variant={'h6'} align={'center'} sx={{marginBottom:'20px'}}>Tickets in progress</Typography>
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
            }} container alignItems="stretch" spacing={3}>

                {tickets.map((ticket) => ( ticket.status === 'Inprogress' && (<Grid item key={ticket._id} xs={12} sm={12} md={6} lg={3}>
                        <Ticket ticket={ticket} />
                    </Grid>)
                ))}
            </Grid>
            <Typography variant={'h6'} align={'center'} sx={{marginBottom:'20px'}}>Tickets in waiting </Typography>
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
            }} container alignItems="stretch" spacing={3}>
                {tickets.map((ticket) => ( ticket.status === 'New' &&
                    (<Grid item key={ticket._id} xs={12} sm={12} md={6} lg={3}>
                        <Ticket ticket={ticket} />
                    </Grid>)
                ))}
            </Grid>
            <Typography variant={'h6'} align={'center'} sx={{marginBottom:'20px'}}>Handled Tickets</Typography>
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
            }} container alignItems="stretch" spacing={3}>
                {tickets.map((ticket) => ( ticket.status === 'Done' &&
                    (<Grid item key={ticket._id} xs={12} sm={12} md={6} lg={3}>
                        <Ticket ticket={ticket} />
                    </Grid>)
                ))}
            </Grid>
        </div>
        )
}
export default Tickets;