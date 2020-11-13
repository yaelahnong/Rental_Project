import React, { Component, Fragment } from 'react'
// import './CarDetailPage.css';
import { withRouter, Redirect } from 'react-router';
import { getMobilById } from '../../../../redux/actions/mobil.actions';
import { connect } from 'react-redux';
import CarDetailComp from '../../../CarComp/CarDetailComp/CarDetailComp';
import Axios from 'axios';


class CarDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobil: [],
            redirect: false
        }
    }

    state = {
        isLoading: false
    }

    

    componentDidMount() {
        if(sessionStorage.getItem("login")){
            this.onGetCarById();
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    onGetCarById = async () => {
        let id = this.props.match.params.carID;
        this.setState({
            isLoading: true
        });
        try {
            await this.props.dispatch(getMobilById(localStorage.getItem('api_token'), id));
        } catch (error) {
            console.log(error);
        }
        this.setState({
            isLoading: false,
        });
    }
   
    handleBack = () => {
        this.props.history.push('/')
        // window.location.href = "/"
    }

    handleBooking = async (id) => {
        try {
            await this.getTransactionById(id);
        } catch (error) {
            
        }
    }

    getTransactionById = (id) => {
        Axios.get(`http://localhost:8000/transaksi/${sessionStorage.getItem('id_user')}?api_token=${localStorage.getItem('api_token')}`)
        .then( async (result) => {
            if(result.data.message.status_transaksi === 0) {
                alert('Harap selesaikan transaksi terlebih dahulu');
                await localStorage.setItem("value", 1);
                this.props.history.push('/history');
            } else {
                this.props.history.push(`/booking/${id}`)
            }
        });
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/login'} />
        }

        const { mobil } = this.props
        const mobilDetail = mobil.data_detail_mobil ? (
            mobil.data_detail_mobil.map((item, index) => {
                return (
                    <CarDetailComp key={index} data={item} goBack={this.handleBack} goBooking={this.handleBooking} />
                ) 
            })
        ) : (
            // <SkeletonLoader />
            <Fragment></Fragment>
        )


        return (
           <Fragment>
               {this.state.isLoading ? (
                //    <SkeletonLoader />
                <p></p>
               ) : (mobilDetail)}
           </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        mobil: state.mobil
        
    }
}

export default withRouter(connect(mapStatetoProps)(CarDetail));