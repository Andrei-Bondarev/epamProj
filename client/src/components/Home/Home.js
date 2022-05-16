import React, {useEffect, useState} from "react";
import {createTicket, endhandlingTicket, getTickets, handleTicket} from "../../actions/ticket";
import Tickets from "../tickets/Tickets";
import {useDispatch} from "react-redux";
import {AppBar, Button, Container, Grid, Grow, Toolbar, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth',{replace:true});
    }
    const handleClick = async (e) => {
        e.preventDefault();
        if( user.result.status === 'client'){
            dispatch(createTicket({creatorName: user?.result?.name}));
        }else if(user.result.status === 'operator'){
            dispatch(endhandlingTicket({name: user.result.name,userId: user.result._id}));
            dispatch(handleTicket({name: user.result.name,userId: user.result._id}));
        }

        window.location.reload();
    }
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [currentId,setCurrentId] = useState(0);
    useEffect(() => {
        dispatch(getTickets());
    }, [currentId, dispatch]);
    return(
        <>
            <AppBar position='static' color='inherit' sx={{
                borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 50px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {
                        user.result.status === 'client' ? <Button onClick={handleClick} variant={'contained'}>Create ticket</Button> : <Button onClick={handleClick} variant={'contained'}>Handle next ticket</Button>
                    }

                </div>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '400px',
                }}>
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight:'20px'
                    }} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Grow in>
                <Container maxWidth={'xl'}>
                    <Grid sx={{
                        margin: '0 auto',
                        flexDirection:'row',
                        '@media (max-width:600px)': {
                            flexDirection:'column-reverse',
                        }
                    }} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid alignSelf={'center'} sx={{
                            margin: '0 auto'
                        }} item xs={12} sm={6} md={9}>
                            <Tickets/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>

    )
}
export default Home;