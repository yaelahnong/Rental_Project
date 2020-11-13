import React, {Component} from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/user.actions';
import {  Grid, TextField, IconButton, Button, Link, CircularProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Redirect, withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            formLogin: {
                email: '',
                password: '',
            },
            showPassword: false,
            redirect: false,
            open: false,
            isLoading: false,
        }
    }

    componentDidMount() {
        localStorage.setItem("value", 0);
        if(sessionStorage.getItem("login")){
            this.setState({
                redirect: true
            })
        }
    }

    handleChange = (event) => {
        let formLoginNew = {...this.state.formLogin};
        formLoginNew[event.target.name] = event.target.value
        this.setState({
            formLogin: formLoginNew
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.formLogin.email && this.state.formLogin.password) {
            this.onLoginUser();
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    handleForgotPassword = () => {
        this.props.history.push('/forgot-password');
    }

    handleRegister = () => {
        this.props.history.push('/register');
    }


    onLoginUser = async () => {
        this.setState({
            isLoading: true
        });
        try {
            await this.props.dispatch(userLogin(this.state.formLogin)).then((result) => {
                this.setState({
                    isLoading: false
                });
                let data = result.value.data
                if(data.success === true) {
                    sessionStorage.setItem('login', true)
                    sessionStorage.setItem('id_user', data.message.id_user)
                    sessionStorage.setItem('email', data.message.email)
                    sessionStorage.setItem('nama', data.message.nama)
                    sessionStorage.setItem('no_telp', data.message.no_telp)
                    localStorage.setItem('api_token', data.api_token)
                    // localStorage.setItem('api_token', )
                    this.setState({
                        redirect: true
                    })
                } else {
                    this.setState({
                        open: true
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    

    render() {

        if(this.state.redirect === true) {
            return <Redirect to={'/'} />
        }
        
        return (
            <div className="container-login">
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Incorrect Email or Password"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The email or password you entered is incorrect. Please try again.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
                <div className="form-login-user">
                    <form>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    type="email"
                                    onChange={this.handleChange}
                                    name="email"
                                    placeholder="Email"
                                    className="textField"
                                />
                            </Grid>
                        </Grid>  
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    type={this.state.showPassword? 'text' : 'password'}
                                    onChange={this.handleChange}
                                    name="password"
                                    placeholder="Password"
                                    className="textField"
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Button variant="contained" color="primary" onClick={this.handleSubmit} disableElevation style={{textTransform: 'capitalize', fontSize: '16px'}}>
                                {this.state.isLoading ? <CircularProgress color="inherit" size="28px" /> : "Login"}
                            </Button>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item style={{margin: '0 auto'}}>
                                <Link onClick={this.handleForgotPassword} style={{fontWeight: '500'}}>Forgot Password?</Link>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{alignItems: 'center'}}>
                            {/* <Grid item style={{margin: '0 auto', display: 'flex', alignItems: 'center'}}> */}
                                <div style={{ height: '1px', flex: '1', backgroundColor: '#e0e0e0', marginRight: '10px'}}></div>
                                <span id="separator-text" style={{position: 'relative', top: '-2.5px'}}>or</span>
                                <div style={{ height: '1px', flex: '1', backgroundColor: '#e0e0e0', marginLeft: '10px'}}></div>
                            {/* </Grid> */}
                        </Grid>
                        <Grid container spacing={1} style={{display: 'block', paddingTop: '5px'}}>
                            <Grid item style={{margin: '0 auto', display:'block'}}>
                                <Link onClick={this.handleRegister} className="regiser-btn" style={{
                                    fontWeight: 'bold', display: 'block', textDecoration: 'none', backgroundColor: '#4caf50', color: '#FDFEFF', textAlign: 'center', padding: '5px 10px 8px 10px', width: '60%', margin: '0 auto', borderRadius: '4px'
                                }}>Create New Account</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => ({
    user: state.user,
})

export default withRouter(connect(mapStatetoProps)(Login));