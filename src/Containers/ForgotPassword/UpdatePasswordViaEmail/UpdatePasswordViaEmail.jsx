import React, { Component } from 'react';
import { Grid, TextField, Button, FormHelperText, CircularProgress } from '@material-ui/core';
import './UpdatePasswordViaEmail.css';
import Axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import { userLogin } from '../../../redux/actions/user.actions';
import { connect } from 'react-redux';

class UpdatePasswordViaEmail extends Component {

    state = {
        formUpdatePassword: {
            password: '',
            confirmPassword: '',
        },
        email: '',
        error: false,
        isLoading: true,
        updated: false,
        errorMsg: {}
    }

    async componentDidMount() {
        await Axios.get(`http://localhost:8000/reset/${this.props.match.params.token}`)
        .then(response => {
            if( response.data.message === 'Token valid') {
                this.setState({
                    email: response.data.email,
                    updated: false,
                    isLoading: false,
                    error: false,
                });
            } else {
                this.setState({
                    updated: false,
                    isLoading: false,
                    error: true,
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }  

    handleChange = (event) => {
        let formUpdatePasswordNew = {...this.state.formUpdatePassword};
        formUpdatePasswordNew[event.target.name] = event.target.value;
        this.setState({
            formUpdatePassword: formUpdatePasswordNew
        });
    }

    handleSubmit = (event) => {
        if( this.handleValidation() ) {
            event.preventDefault();
            this.onUpdatePassword();
        }
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true;

        if( !this.state.formUpdatePassword['password'] ) {
            isValid = false;
            errorMsg['password'] = "Cannot be empty";
        }

        if( !this.state.formUpdatePassword['confirmPassword'] ) {
            isValid = false;
            errorMsg['confirmPassword'] = "Cannot be empty";
        }

        if( this.state.formUpdatePassword['password'] !== this.state.formUpdatePassword['confirmPassword'] ){
            isValid = false;
            errorMsg['value'] = "Password must be same";
        }
        
        this.setState({
            errorMsg: errorMsg
        });

        return isValid;
    }

    onUpdatePassword = () => {
        Axios.put(`http://localhost:8000/updatePasswordViaEmail/${this.props.match.params.token}`, this.state.formUpdatePassword)
        .then(response => {
            if( response.data.message === 'Password updated') {
                this.onLoginUser();
            } else {
                this.setState({
                    updated: false,
                    error: true,
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    onLoginUser = async () => {
        try {
            await this.props.dispatch(userLogin({email: this.state.email, password: this.state.formUpdatePassword['password']})).then((result) => {
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
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleHome = () => {
        this.props.history.push('/login');
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/'} />
        }

        if(sessionStorage.getItem("login")) {
            return <Redirect to={'/'} />
        }

        if( this.state.error ) {
            return (
                <div className="container-reset-password">
                    <div className="form-reset-password">
                        <Grid container justify="center" direction="column">
                            <Grid item>
                                <h4 style={{ width: '33ch', textAlign: 'center'}}>Problem resetting password. Please send another reset link.</h4>
                            </Grid>
                            <Grid item>
                                <Button onClick={this.handleHome} style={{
                                            fontWeight: 'bold', display: 'block', textDecoration: 'none', backgroundColor: '#4caf50', color: '#FDFEFF', textAlign: 'center', padding: '5px 10px 8px 10px', minWidth: '33ch', margin: '0 auto', borderRadius: '4px', textTransform: 'capitalize'
                                }}>Go Home</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            );
        } else if (this.state.isLoading) {
            return (
                <div style={{display: 'flex', width: '100%', height: '86vh'}}>
                    <div style={{margin: 'auto'}}><CircularProgress /></div>
                </div>
            );
        } else {
            return (
                <div className="container-reset-password">
                    <div className="form-reset-password">
                        <form noValidate autoComplete="off">
                            <Grid container justify="center" direction="column">
                                <Grid item>
                                    <TextField
                                        error={this.state.errorMsg['password'] || this.state.errorMsg['value'] ? true : false }
                                        type="password"
                                        name="password"
                                        label="New Password" 
                                        className="textField"
                                        onChange={this.handleChange}
                                    />
                                    {this.state.errorMsg["password"] || this.state.errorMsg['value'] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["password"] || this.state.errorMsg['value']}</FormHelperText> : '' }
                                </Grid>
                                <Grid item>
                                    <TextField
                                        error={this.state.errorMsg['confirmPassword'] || this.state.errorMsg['value'] ? true : false }
                                        type="password"
                                        name="confirmPassword"
                                        label="Confirm Password" 
                                        className="textField"
                                        onChange={this.handleChange}
                                    />
                                    {this.state.errorMsg["confirmPassword"] || this.state.errorMsg['value'] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["confirmPassword"] || this.state.errorMsg['value']}</FormHelperText> : '' }
                                </Grid>
                            </Grid> 
                            <Grid container spacing={1} alignItems="flex-end" style={{paddingBottom: '18px'}}>
                                <Button onClick={this.handleSubmit} variant="contained" color="primary"  disableElevation style={{textTransform: 'capitalize', fontSize: '16px'}}>Submit</Button>
                            </Grid>
                        </form>

                    </div>
                </div>
            )
        }

    }
}

const mapStatetoProps = (state) => ({
    user: state.user
})

export default withRouter(connect(mapStatetoProps)(UpdatePasswordViaEmail));