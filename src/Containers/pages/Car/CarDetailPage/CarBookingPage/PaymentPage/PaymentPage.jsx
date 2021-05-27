import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getMobilById } from '../../../../../../redux/actions/mobil.actions';
import PaymentComp from '../../../../../CarComp/CarDetailComp/CarBookingComp/PaymentComp/PaymentComp';

class PaymentPage extends Component {
    componentDidMount() {
        this.onGetCarById();
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

    render() {
        const { mobil } = this.props;
        // const paymentDetail = mobil.data_detail_mobil ?
        // mobil.data_detail_mobil.map((item, index) => {
        //     return (
        //         <PaymentComp />
        //     )
        // }) : ''
        const detailMobil = mobil.data_detail_mobil ? mobil.data_detail_mobil.map((item, index) => {
            return (
                <PaymentComp key={index} data={item} />
            )
        }) : '';
        // console.log(detailMobil ? detailMobil.harga_mobil: '');

        return (
            <>
                {detailMobil}
            </>     
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        mobil: state.mobil
    }
}

export default withRouter(connect(mapStatetoProps)(PaymentPage));