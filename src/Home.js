import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import ForgotPassword from './Containers/ForgotPassword/ForgotPassword';
import CarPage from './Containers/pages/Car/CarPage';
import CarDetailPage from './Containers/pages/Car/CarDetailPage/CarDetailPage';
import CarBookingPage from './Containers/pages/Car/CarDetailPage/CarBookingPage/CarBookingPage';
import SettingsPage from './Containers/pages/Settings/SettingsPage';
import HistoryPage from './Containers/pages/History/HistoryPage';
import './Home.css';
import BotNavComp from './Components/BotNavComp/BotNavComp';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import UpdatePasswordViaEmail from './Containers/ForgotPassword/UpdatePasswordViaEmail/UpdatePasswordViaEmail';
import PageNotFound from './img/pagenotfound.svg';
import PaymentPage from './Containers/pages/Car/CarDetailPage/CarBookingPage/PaymentPage/PaymentPage';

const NoMatch = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', alignItems: 'center'}}>
            <div style={{width: '200px'}}>
                <img src={PageNotFound} alt="Page not found" />
            </div>
            <div style={{padding: '20px'}}>
                <h2>Page not found</h2>
            </div>
            <div>
                <p style={{fontSize: '18px', color: '#7b7d89'}}>Looks like this page does not exist</p>
            </div>
        </div>
    )
}

class Home extends Component {
        
    componentDidMount() {
        // const elem = document.getElementById('startingLoader');
        // window.onload = () => {
        //   if (elem) {
        //   elem.remove();
        //   }
        // };
      }

      handleTitle = (event) => {
        console.log(event)
      }

    render() {
        return (
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Router>
                        <div className="container">
                                <Switch>
                                    <Route path="/" exact>
                                        <CarPage />
                                        <BotNavComp />
                                    </Route>
                                    <Route path="/car-detail/:carID">
                                        <CarDetailPage />
                                    </Route>
                                    <Route path="/booking/:carID">
                                        <CarBookingPage />
                                    </Route>
                                    <Route path="/payment/:carID">
                                        <PaymentPage />
                                    </Route>
                                    <Route path="/settings">
                                        <SettingsPage />
                                        <BotNavComp />
                                    </Route>
                                    <Route path="/history">
                                        <HistoryPage />
                                        <BotNavComp />
                                    </Route>
                                    <Route path="/forgot-password">
                                        <ForgotPassword />
                                    </Route>
                                    <Route path="/reset-password/:token">
                                        <UpdatePasswordViaEmail />
                                    </Route>
                                    <Route path="/login">
                                        <Login />
                                    </Route>
                                    <Route path="/register">
                                        <Register />
                                    </Route>
                                    <Route>
                                        <NoMatch />
                                    </Route>
                                </Switch>
                        </div>
                    </Router>
                </ThemeProvider>
            </Fragment>
        )
    }
}

export default Home;