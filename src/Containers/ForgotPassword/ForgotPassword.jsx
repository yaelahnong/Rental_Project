import React, { Component } from 'react';
import { Grid, TextField, Button, AppBar, Toolbar, IconButton, Typography, FormHelperText, CircularProgress } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import './ForgotPassword.css';
import { withRouter } from 'react-router';
// import { userSendEmail } from '../../redux/actions/user.actions';
// import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

class ForgotPassword extends Component {
    state = {
        formResetPassword: {
            email: ''
        },
        open: false,
        errorMsg: {},
        successMsg: {},
        title: '',
        isLoading: false,
    }

    handleChange = (event) => {
        let formResetPasswordNew = {...this.state.formResetPassword};
        formResetPasswordNew[event.target.name] = event.target.value;
        this.setState({
            formResetPassword: formResetPasswordNew
        });
    }

    handleSubmit = (event) => {
        if(this.handleValidation()) {
            event.preventDefault();
            this.onSendEmail();
        }
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true; 
        if(!this.state.formResetPassword['email']) {
            isValid = false;
            errorMsg["email"] = "Cannot be empty";
        }
        this.setState({
            errorMsg: errorMsg
        });
        return isValid;
    }

    onSendEmail = () => {
        this.setState({
            isLoading: true
        });
        Axios.post('http://localhost:8000/forgot_password', this.state.formResetPassword)
        .then((result) => {
            this.setState({
                isLoading: false
            });
            console.log(result);
            let errorMsg = {};
            let successMsg = {};
            let title = '';
            if(result.data.success === false) {
                errorMsg["email_response"] = result.data.message;
                title = 'Incorrect Email Address'
                this.setState({
                    open: true,
                    errorMsg: errorMsg,
                    title: title
                });
            } else {
                successMsg['email_response'] = result.data.message;
                title = 'Email Sent'
                this.setState({
                    open: true,
                    successMsg: successMsg,
                    title: title
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
        
    }
    // onSendEmail = async () => {
    //     try {
    //         await this.props.dispatch(userSendEmail(this.state.formResetPassword));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {

        return (
            <div className="container-forgot-password">
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => window.history.back()}>
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Email
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.errorMsg["email_response"] || this.state.successMsg['email_response']}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
                <div className="form-forgot-password">
                    <form noValidate autoComplete="off">
                        <Grid container>
                            <Grid item>
                                <TextField
                                    error={this.state.errorMsg['email'] ? true : false }
                                    type="email"
                                    id="standard-basic"
                                    name="email"
                                    label="Email" 
                                    className="textField"
                                    onChange={this.handleChange}
                                />
                                {this.state.errorMsg["email"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["email"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1} alignItems="flex-end">
                            <Button onClick={this.handleSubmit} variant="contained" color="primary"  disableElevation style={{textTransform: 'capitalize', fontSize: '16px'}}>
                                {this.state.isLoading ? <CircularProgress color="inherit" size="28px" /> : 'Send Email'}
                            </Button>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

// const mapStatetoProps = (state) => {
//     return {
//         user: state.user
//     }
// }

// export default withRouter(connect(mapStatetoProps)(ForgotPassword));
export default withRouter(ForgotPassword);
