import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import './HistoryPage.css';
import { connect } from 'react-redux';
import { getViewDetailTransaksiById } from '../../../redux/actions/v_detail_transaksi.actions';
import { deleteTransaksi } from '../../../redux/actions/transaksi.actions';
import { deleteDetailTransaksi } from '../../../redux/actions/detail_transaksi.actions';
import HistoryComp from '../../HistoryComp/HistoryComp';
import TopNavComp from '../../../Components/TopNavComp/TopNavComp';
import { LinearProgress } from '@material-ui/core';
import { addStokMobilById } from '../../../redux/actions/mobil.actions';

const containerStyles = {
    paddingTop: "10px",
    height: "calc(100vh - 112px)",
    overflowY: "scroll",
    boxSizing: "border-box",
    // display: "flex",
    // flexWrap: "wrap",
    backgroundColor: "#ffffff"
}

const containerLoading = {
    height: "calc(100vh - 112px)",
    overflowY: "scroll",
    boxSizing: "border-box",
    // display: "flex",
    // flexWrap: "wrap",
    backgroundColor: "#ffffff"
}


class HistoryPage extends Component {
    _isMounted = false;

    state = {
        redirect: false,
        isLoading: false,
        isDeleted: false
    }


    componentDidMount() {
        this._isMounted = true;
        if(sessionStorage.getItem("login")){
            this.onGetViewDetailTransaksi();
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onGetViewDetailTransaksi = async () => {
        this.setState({
            isLoading: true
        });
        try {
            await this.props.dispatch(getViewDetailTransaksiById(localStorage.getItem('api_token'), sessionStorage.getItem('id_user')));
        } catch (error) {
            console.log(error);
        }
        this.setState({
            isLoading: false
        });
    }



    onDeleteHistory = async (data) => {
        try {
            if(data.kode_transaksi && data.id_detail_transaksi) {
                await this.deleteTransaksi(data.kode_transaksi);
                await this.deleteDetailTransaksi(data.id_detail_transaksi);
                await this.onAddStokMobilById(data.id_mobil);
            }
            await this.onGetViewDetailTransaksi();
        } catch (error) {
            console.log(error);
        }
    }

    onAddStokMobilById = async (id) => {
        try {
            const stok = await this.props.dispatch(addStokMobilById(localStorage.getItem('api_token'), id))
            console.log('UPDATE STOK: ', stok);
        } catch (error) {
            console.log(error);
        }
    }

    deleteTransaksi = async (kode_transaksi) => {
        try {
            await this.props.dispatch(deleteTransaksi(localStorage.getItem('api_token'), kode_transaksi));
        } catch (error) {
            console.log(error);
        }
    }

    deleteDetailTransaksi = async (id_detail_transaksi) => {
        try {
            await this.props.dispatch(deleteDetailTransaksi(localStorage.getItem('api_token'), id_detail_transaksi));
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to={"/login"} />
        }

        const { view_detail_transaksi } = this.props;
        const viewDetailTransaksi = view_detail_transaksi.data_view_detail_transaksi.message ? (
            view_detail_transaksi.data_view_detail_transaksi.message.map((item, index) => {
                return (
                    <HistoryComp key={index} data={item} onCancel={this.onDeleteHistory} />
                )
            })
        ) : (
            <p></p>
        )
        
        return (
            <Fragment>
                <TopNavComp title="History" icon="help" />
                <div className="main-content" style={this.state.isLoading ? containerLoading : containerStyles}>
                    {
                        this.state.isLoading 
                        ? <LinearProgress color="secondary" /> 
                        : viewDetailTransaksi
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        view_detail_transaksi: state.view_detail_transaksi
    }
}

export default connect(mapStatetoProps)(HistoryPage);