import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import './SettingsPage.css';
import SettingsComp from '../../SettingsComp/SettingsComp';


class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            isLoading: false
        }
        this.onLogoutUser = this.onLogoutUser.bind(this, true);
    }

    componentDidMount() {
        if(sessionStorage.getItem("login")){
            
        } else {
            this.setState({
                redirect: true
            })
        }
    }
    
    onLogoutUser = () => {
        // if(window.confirm('Apakah anda ingin Logout ?')) {
            this.setState({
                isLoading: true
            });
            sessionStorage.setItem("login", "");
            sessionStorage.clear();
            localStorage.clear();
            this.setState({
                isLoading: false
            })
            this.setState({
                redirect: true
            })
        // }
    }
    
    render() {

        if(this.state.redirect === true) {
            return <Redirect to={"/login"} />
        }
        return (
            <Fragment>
                <SettingsComp logout={this.onLogoutUser} isLoading={this.state.isLoading} />
            </Fragment>
        )
    }
}

export default Settings;