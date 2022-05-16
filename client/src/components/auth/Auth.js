import React, {useState} from "react";
import {Avatar, Grid, Button, Container, Paper, Typography, TextField,} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from "./input";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {signin,signup} from '../../actions/auth.js'
const initialState = { firstName: '', lastName: '', phone: '', password: '', confirmedPassword: ''}

const Auth = () => {
    const [isSignUp,setIsSignUp] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value,setValue] = useState('');
    const [valid,setValid] = useState(true);
    const [formData,setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }
    const handleValidation = (e) => {

        let reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        setValid(e.target.value.match(reg));
        setValue(e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const switchMode = () => {
        setIsSignUp((p) => !p);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    return(
        <Container component="main" maxWidth={"xs"}>
            <Paper sx={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
            }} elevation={3}>
                <Avatar sx={{
                    backgroundColor: '#d9427f'
                }}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant={"h5"}>{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
                <form style={{
                    width: '100%',
                    marginTop: '20px'
                }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label={"First Name"} handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label={"Last Name"} handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            value={value}
                            onChange={(e) => handleValidation(e)}
                            error={!valid}
                            required={true}
                            fullWidth
                            sx={{
                                marginLeft: '15px',
                                marginTop:'10px'
                            }}
                        />
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name={'confirmPassword'} label={'Repeat password'} handleChange={handleChange} type={'password'}/>}
                    </Grid>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} sx={{
                        marginTop:'15px'
                    }}>{isSignUp ? 'Sign up' : 'Sign in'}</Button>
                    <Grid container justify={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign in' : 'Don`t have any account? Sign up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;