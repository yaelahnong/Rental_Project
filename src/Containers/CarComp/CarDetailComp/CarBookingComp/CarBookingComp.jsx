import 'date-fns';
import React, { Fragment, Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid, Button, FormHelperText } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import './CarBookingComp.css';
import { withRouter } from 'react-router';

class CarBookingComp extends Component {
    _isMounted = true;
    constructor() {
        super();
        this.state={
            selectedStartDate: new Date(),
            selectedEndDate: new Date(),
            selectedTime: new Date()
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleStartDateChange = (date) => {
        this.setState({
            selectedStartDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            selectedEndDate: date
        })
    }
    
    handleTimeChange = (time) => {
        this.setState({
            selectedTime: time
        })
    }

    render(){

    // const dateNow = new Date(Date.now());

        return (
            <Fragment>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => window.history.back()} style={{justifyContent: 'center'}}>
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            Booking 
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="booking">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center">
                            <Grid item style={{width: '33ch', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <KeyboardDatePicker
                                    error={this.props.error['date_start'] ? true : false}
                                    margin="normal"
                                    label="Pickup Date"
                                    format="yyyy/MM/dd"
                                    name="date_start"
                                    minDate={moment()}
                                    value={this.props.date_start}
                                    onChange={this.props.startDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    {this.props.error['date_start'] ? <FormHelperText error id="name-helper-text">{this.props.error['date_start']}</FormHelperText> : '' }
                            </Grid>
                            <Grid item style={{width: '33ch', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <KeyboardDatePicker
                                    error={this.props.error['date_end'] || this.props.error['tgl_akhir_penyewaan'] ? true : false}
                                    margin="normal"
                                    label="Rental End Date"
                                    format="yyyy/MM/dd"
                                    name="date_end"
                                    minDate={moment()}
                                    value={this.props.date_end}
                                    onChange={this.props.endDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    {this.props.error['date_end'] || this.props.error['tgl_akhir_penyewaan'] ? <FormHelperText error id="name-helper-text">{this.props.error['date_end'] || this.props.error['tgl_akhir_penyewaan']}</FormHelperText> : '' }
                            </Grid>
                            <Grid item style={{width: '33ch', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <KeyboardTimePicker
                                    error={this.props.error['rental_time'] ? true : false}
                                    margin="normal"
                                    label="Rental Time"
                                    name="rental_time"
                                    value={this.props.rental_time}
                                    format="HH:mm"
                                    onChange={this.props.timeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    />
                                    {this.props.error['rental_time'] 
                                    ? <FormHelperText error id="name-helper-text">{this.props.error['rental_time']}</FormHelperText> 
                                    : <FormHelperText id="name-helper-text">Open from 09:00 AM to 15:00 PM</FormHelperText> }
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <div style={{display: 'flex', flex: '1'}}>
                        <Button variant="contained" onClick={() => {
                            if(this._isMounted) {
                                if(this.props.data.stok_mobil === 0) {
                                    alert('Maaf stok mobil sudah habis');
                                    localStorage.setItem("value", 0);
                                    this.props.history.push('/');
                                } else {
                                    this.props.handleSubmit(this.props.data)
                                }
                            }
                        }} size="medium" style={{backgroundColor: '#FF5E1F', color: '#fff', textTransform: 'capitalize', margin: '0 60px'}}>Book Now</Button>
                    </div>
                </div>
            
            </Fragment>
        )
    }
}

export default withRouter(CarBookingComp);