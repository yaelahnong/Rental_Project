import React, { Component } from 'react';
import {  Grid, TextField, Button, FormHelperText } from '@material-ui/core';

class Third extends Component {
    state = {
        errorMsg: {}
    }

    continue = event => {
        if(this.handleValidation()) {
            event.preventDefault();
            this.props.handleSubmit();
        }
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true;
        let phone = this.props.value.no_telp

        if(!phone) {
            errorMsg["no_telp"] = "Cannot be empty";
            isValid = false;
        }

        if(phone.length > 0) {
            if(!phone.match(/^[0-9]+$/)) {
                errorMsg["no_telp"] = "Only numbers";
                isValid = false;
            }
            if(phone.length < 10) {
                errorMsg["no_telp"] = "Phone number is invalid";
                isValid = false;
            }
        }

        this.setState({
            errorMsg: errorMsg
        })

        return isValid;
    }

    back = event => {
        event.preventDefault();
        this.props.prevStep();
    }


    render() {
        // const { values, handleChange } = this.props;

        return (
            <div className="container-register">
                <div className="form-register-user">
                    <form noValidate autoComplete="off">
                        <Grid container>
                            <Grid item>
                                <TextField
                                    error={ this.state.errorMsg["no_telp" ? true : false] }
                                    id="standard-basic" 
                                    name="no_telp"
                                    label="Phone" 
                                    className="textField" 
                                    onChange={this.props.handleChange}
                                />
                                {this.state.errorMsg["no_telp"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["no_telp"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={this.continue} disableElevation style={{textTransform: 'capitalize', fontSize: '16px', width: '33ch'}}>Create Account</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default Third;
