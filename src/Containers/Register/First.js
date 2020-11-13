import React, { Component } from 'react';
import { Grid, TextField, Button, Link, FormHelperText, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import './Register.css';
import { withRouter } from 'react-router';

class First extends Component {
    state = {
        errorMsg: {}
    }

    continue = event => {
        if(this.handleValidation()) {
            event.preventDefault();
            this.props.nextStep();
        }
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true;
        let nama = this.props.value.nama;
        if(!nama) {
            isValid = false;
            errorMsg["nama"] = "Cannot be empty";
        }

        if(nama.length > 0) {
            if(!nama.match(/^[a-z A-Z]+$/)) {
                isValid = false;
                errorMsg["nama"] = "Only letters!";
            }
        }

        this.setState({
            errorMsg: errorMsg
        });
        return isValid;
    }

    handleLogin = () => {
        this.props.history.push('/login');
    }

    render() {

        return (
            <div className="container-register">
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton edge="start" onClick={() => window.history.back()}>
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Name
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="form-register-user">
                    <form noValidate autoComplete="off">
                        <Grid container>
                            <Grid item>
                                <TextField
                                    error={ this.state.errorMsg["nama"] ? true : false} 
                                    id="standard-basic" 
                                    name="nama"
                                    label="Full Name" 
                                    className="textField"
                                    onChange={this.props.handleChange}
                                />
                                {this.state.errorMsg["nama"] ? <FormHelperText error id="name-helper-text">{this.state.errorMsg["nama"]}</FormHelperText> : '' }
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1} alignItems="flex-end">
                            <Button variant="contained" color="primary" onClick={this.continue} disableElevation style={{textTransform: 'capitalize', fontSize: '16px'}}>Next</Button>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" style={{paddingTop: '10px'}}>
                            <Grid item style={{margin: '0 auto', fontWeight: '500'}}>
                                <Link onClick={this.handleLogin}>Already have an account?</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(First);
