import React, { Component, Fragment } from 'react';
import CarBookingComp from '../../../../CarComp/CarDetailComp/CarBookingComp/CarBookingComp';
import { Redirect, withRouter } from 'react-router';
import './CarBookingPage.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { getMobilById } from '../../../../../redux/actions/mobil.actions';
import { minStokMobilById } from '../../../../../redux/actions/mobil.actions';
import { postTransaksi } from '../../../../../redux/actions/transaksi.actions';
import { postDetailTransaksi } from '../../../../../redux/actions/detail_transaksi.actions';
import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';


class CarBookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isLoading: false,
            errorMsg: {},
            formTransaction: {
                id_user: 0,
                tgl_order: '',
                total_pembayaran: 0,
                status_pembayaran: 0,
                status_transaksi: 0
            },
            formDetailTransaction: {
                id_mobil: 0,
                tgl_sewa: '',
                tgl_akhir_penyewaan: '',
                status: 0
            },
            date_start: moment().format('YYYY-MM-DD'),
            date_end: moment().format('YYYY-MM-DD'),
            rental_time: moment()
        }
    }
    
    async componentDidMount() {
        if(sessionStorage.getItem("login")){
            const transaction = await Axios.get(`http://localhost:8000/transaksi/${sessionStorage.getItem('id_user')}?api_token=${localStorage.getItem('api_token')}`);
            console.log(transaction);
            if(transaction.data.message.status_transaksi === 0) {
                alert('Harap selesaikan transaksi terlebih dahulu');
                await localStorage.setItem("value", 1);
                this.props.history.push('/history');
            } else {
                this.onGetCarById();
            }
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    onGetCarById = async () => {
        let id = this.props.match.params.carID;
        try {
            await this.props.dispatch(getMobilById(localStorage.getItem('api_token'), id));
        } catch (error) {
            console.log(error);
        }
    }

    handleStartDateChange = (date) => {
        // const date_start_new = new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
        this.setState({
            date_start: date
        })
    }

    handleEndDateChange = (date) => {
        // const date_end_new = new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
        this.setState({
            date_end: date
        })
    }

    handleTimeChange = (time) => {
        // const rental_time_new = new Intl.DateTimeFormat('fr', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(time);
        this.setState({
            rental_time: time
        })
    }

    onSubmit = (data) => {
        // console.log(this.state);
        let harga_mobil = data.harga_mobil;
        const startDate = moment(this.state.date_start);
        const endDate = moment(this.state.date_end);
        const diff = endDate.diff(startDate);
        const diffDuration = moment.duration(diff);
        const formTransactionNew = {...this.state.formTransaction};
        const formDetailTransactionNew = {...this.state.formDetailTransaction};
        
        formTransactionNew['id_user'] = sessionStorage.getItem('id_user');
        formTransactionNew['tgl_order'] = moment().format('YYYY-MM-DD hh:mm:ss');
        formDetailTransactionNew['id_mobil'] = this.props.match.params.carID;
        formDetailTransactionNew['tgl_sewa'] = moment(this.state.date_start).format('YYYY-MM-DD') + ' ' + moment(this.state.rental_time).format('hh:mm:ss');
        formDetailTransactionNew['tgl_akhir_penyewaan'] = moment(this.state.date_end).format('YYYY-MM-DD') + ' ' + moment(this.state.rental_time).format('hh:mm:ss');
        formTransactionNew['total_pembayaran'] = harga_mobil * diffDuration.days();
        this.setState({
            formTransaction: formTransactionNew,
            formDetailTransaction: formDetailTransactionNew
        }, async () => {
            if(this.handleValidation()) {
                this.setState({
                    isLoading: true
                });
                await this.onPostTransaksi();
                await this.onPostDetailTransaksi();
                await this.onMinStokMobilById();
                this.setState({
                    isLoading: false
                });
                alert('Booking Success.');
                // await localStorage.setItem("value", 1);
                this.props.history.push(`/payment/${this.props.match.params.carID}`);
            }
        });
    }

    handleValidation = () => {
        let errorMsg = {};
        let isValid = true;

        if(!this.state.date_start) {
            isValid = false;
            errorMsg['date_start'] = "Cannot be empty";
        }

        if(!this.state.date_end) {
            isValid = false;
            errorMsg['date_end'] = "Cannot be empty";
        }

        if(this.state.formDetailTransaction['tgl_akhir_penyewaan'].length > 0) {
            if(this.state.formDetailTransaction['tgl_akhir_penyewaan'] === this.state.formDetailTransaction['tgl_sewa']) {
                isValid = false;
                errorMsg['tgl_akhir_penyewaan'] = "Cannot be same";
            }
            if(this.state.formDetailTransaction['tgl_akhir_penyewaan'] < this.state.formDetailTransaction['tgl_sewa']) {
                isValid = false;
                errorMsg['tgl_akhir_penyewaan'] = "Invalid Date";
            }
        }

        if(!this.state.rental_time) {
            isValid = false;
            errorMsg['rental_time'] = "Cannot be empty";
        } 
        // if(!this.state.rental_time.isBefore(moment("09:00:00", "HH:mm:ss")) && this.state.rental_time.isAfter(moment("15:00:00", "HH:mm:ss"))) {
        //     isValid = false;
        //     errorMsg['rental_time'] = "Please select between 9:00 and 15:00";   
        // }

        if(!moment(this.state.rental_time, "HH:mm A").isBefore(moment("15:01 PM", "HH:mm A"))) {
            isValid = false;
            errorMsg['rental_time'] = "Please select between 9:00 AM and 15:00 PM";
        } else if(!moment(this.state.rental_time, "HH:mm A").isAfter(moment("08:59 AM", "HH:mm A"))) {
            isValid = false;
            errorMsg['rental_time'] = "Please select between 9:00 AM and 15:00 PM";
        }

        // if(this.state.rental_time.length > 0) {
        //     const minTime = moment("8:59:59", "HH:mm:ss");
        //     const maxTime = moment("15:00:01", "HH:mm:ss");

        //     if (minTime.isBefore(this.state.rental_time) && maxTime.isAfter(this.state.rental_time)) {
                
        //     } else {
        //         isValid = false;
        //         errorMsg['rental_time'] = "Select between 9:00 and 15:00";
        //     }

        // }

        this.setState({
            errorMsg: errorMsg
        });

        return isValid;
    }

    onPostTransaksi = async () => {
        try {
            await this.props.dispatch(postTransaksi(localStorage.getItem('api_token'), this.state.formTransaction));
        } catch (error) {
            console.log(error);
        }
    }

    onPostDetailTransaksi = async () => {
        try {
            await this.props.dispatch(postDetailTransaksi(localStorage.getItem('api_token'), this.state.formDetailTransaction));
        } catch (error) {
            console.log(error);
        }
    }

    onMinStokMobilById = async () => {
        try {
            await this.props.dispatch(minStokMobilById(localStorage.getItem('api_token'), this.props.match.params.carID));
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/login'} />
        }
        const { mobil } = this.props;
        const mobilDetail = mobil.data_detail_mobil ? (
            mobil.data_detail_mobil.map((item, index) => {
                return (
                    <CarBookingComp key={index} data={item} date_start={this.state.date_start} date_end={this.state.date_end} rental_time={this.state.rental_time} handleSubmit={this.onSubmit}
                    startDateChange={this.handleStartDateChange} endDateChange={this.handleEndDateChange} timeChange={this.handleTimeChange} error={this.state.errorMsg} />
                ) 
            })
        ) : ''
        
        return (
            <Fragment>
                {this.state.isLoading ? (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress />
                    </div>
                ) : (mobilDetail) }
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        mobil: state.mobil
    }
}

export default withRouter(connect(mapStatetoProps)(CarBookingPage));