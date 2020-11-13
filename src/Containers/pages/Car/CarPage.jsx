import React, {Component, Fragment} from 'react';
import CarComp from '../../CarComp/CarComp';
import { withRouter } from 'react-router';
import { getMobil } from '../../../redux/actions/mobil.actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TopNavComp from '../../../Components/TopNavComp/TopNavComp';
import './CarPage.css';
import CardSkeleton from '../../CarComp/CardSkeleton';

const containerStyles = {
    paddingTop: "10px",
    height: "calc(100vh - 112px)",
    overflowY: "scroll",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#ffffff"
}


class CarPage extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            car: [],
            redirect: false,
            isLoading: false,
        }
    }

    

    componentDidMount() {
        if(sessionStorage.getItem("login")){
            this.onGetCar();
        } else {
            this.setState({
                redirect: true
            })
        }
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onGetCar = async () => {
        this.setState({
            isLoading: true
        })
        try {
            await this.props.dispatch(getMobil(localStorage.getItem('api_token')));
        } catch (error) {
            console.log(error);
        }
        this.setState({
            isLoading: false
        })
    }

    handleDetail = (id) => {
        this.props.history.push(`/car-detail/${id}`)     
    }
    
    render() {
        if(this.state.redirect === true) {
            return <Redirect to={'/login'} />
        }

        // const { car } = this.state 
        const { mobil } = this.props;
        const products = ['1', '2', '3', '4', '5'];
        return (
            <Fragment>
                <TopNavComp title="Car Rental" />
                <div className="main-content" style={containerStyles}>
                    { this.state.isLoading
                    ? products.map((products) => (
                        <CardSkeleton key={products} products={products} />
                    ))
                    : mobil.data_mobil.map((item, index) => {
                            return (
                                <CarComp key={item.id_mobil} data={item} remove={this.handleRemove} update={this.handleUpdate} goDetail={this.handleDetail} />
                            )
                        })
                    }
                </div>
                {/* <BotNavComp /> */}
            </Fragment>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        mobil: state.mobil,
        user: state.user
    }
}

export default withRouter(connect(mapStatetoProps)(CarPage));
