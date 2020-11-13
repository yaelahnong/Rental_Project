import React, { Component } from 'react';
import {  Grid, TextField, Button, IconButton, AppBar, Toolbar, Typography, FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff, ArrowBackIos } from '@material-ui/icons';
import Axios from 'axios';


class Second extends Component {
    state = {
        showPassword: false,
        showPasswordConfirm: false,
        errorMsg: {}
    }

    continue = event => {
        // if(this.handleValidation()) {
        //     event.preventDefault();
        //     this.props.nextStep();
        // }
        this.handleValidation()
        .then(isValid => {
            if(isValid > 0) {
                // event.preventDefault();
                this.props.nextStep();
            }
        })
    }

    handleValidation = () => {
        return new Promise((resolve) => {
            this.getUserByMail(result => {
                const callBackEmail = result;
                
                let errorMsg = {};
                let isValid = true;
                let email = this.props.value.email;
                let password = this.props.value.password;
                let passwordConfirm = this.props.value.passwordConfirm;
        
                if(!email) {
                    errorMsg["email"] = "Cannot be empty";
                    isValid = false;
                }
                if(email.length > 0) {
                    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                        errorMsg["email"] = "Email is invalid";
                        isValid = false;
                    }
                    if(this.props.value.email === callBackEmail) {
                        errorMsg["email"] = "Email is taken. Try another";
                        isValid = false;
                    }
                }
                
                if(!password) {
                    errorMsg["password"] = "Cannot be empty";
                    isValid = false;
                }
        
                if(!passwordConfirm) {
                    errorMsg["passwordConfirm"] = "Cannot be empty";
                    isValid = false;
                }
        
                if(password !== passwordConfirm) {
                    errorMsg["passwordConfirm"] = "Must match the previous entry";
                    isValid = false;
                }
        
                this.setState({
                    errorMsg: errorMsg
                })
                resolve(isValid)
                

            })
        })
    }

    getUserByMail = (callBack) => {
        Axios.post('http://localhost:8000/getUserByMail', {
            email: this.props.value.email
        }).then((result) => {
            callBack(result.data.message);
        }).catch(() => {
            callBack(false);
        })
    }

    back = event => {
        event.preventDefault();
        this.props.prevStep();
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleClickShowPasswordConfirm = () => {
        this.setState({
            showPasswordConfirm: !this.state.showPasswordConfirm
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-register">
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.back}>
                            <ArrowBackIos />
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Account
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="form-register-user">
                    <form noValidate autoComplete="off">
                    <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    error={ this.state.errorMsg["email"] ? true : false }
                                    type="email"
                                    onChange={this.props.handleChange}
                                    name="email"
                                    placeholder="E-Mail"
                                    className="textField"
                                />
                                {this.state.errorMsg["email"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["email"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid>  
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    error={ this.state.errorMsg["password"] ? true : false }
                                    type={this.state.showPassword? 'text' : 'password'}
                                    onChange={this.props.handleChange}
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
                                {this.state.errorMsg["password"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["password"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    error={ this.state.errorMsg["passwordConfirm"] ? true : false }
                                    type={this.state.showPasswordConfirm? 'text' : 'password'}
                                    onChange={this.props.handleChange}
                                    name="passwordConfirm"
                                    placeholder="Repeat Password"
                                    className="textField"
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPasswordConfirm}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    }}
                                />
                                {this.state.errorMsg["passwordConfirm"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["passwordConfirm"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" style={{justifyContent: 'flex-end'}}>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={this.continue} disableElevation style={{textTransform: 'capitalize', fontSize: '16px', width: '16ch'}}>Next</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default Second;
