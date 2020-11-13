import React, { Component, Fragment } from 'react';
import TopNavComp from '../../Components/TopNavComp/TopNavComp';
// import EditIcon from '@material-ui/icons/Edit';
import './SettingsComp.css';
import { CircularProgress } from '@material-ui/core';

const containerStyles = {
    paddingTop: "10px",
    height: "calc(100vh - 112px)",
    overflowY: "scroll",
    boxSizing: "border-box",
    backgroundColor: "#ffffff"
    // display: "flex",
    // flexWrap: "wrap",
}

class SettingsComp extends Component {
    render() {
        return (
            <Fragment>
                <TopNavComp title="Settings" />
                <div className="main-content" style={containerStyles}>
                    <div className="profile">
                        <div className="img">
                            <h3>{sessionStorage.getItem('nama')
                            ? sessionStorage.getItem('nama').substring(0, 1)
                            : ''
                        }</h3>
                        </div>
                        <div className="description">
                            <h2>{sessionStorage.getItem('nama') 
                            ? sessionStorage.getItem('nama')
                            : ''
                        }</h2>
                            <span>+62{sessionStorage.getItem('no_telp') 
                            ? sessionStorage.getItem('no_telp').substring(1, 15)
                            : ''
                        }</span>
                            <span>{sessionStorage.getItem('email') 
                            ? sessionStorage.getItem('email')
                            : ''
                        }</span>
                        </div>
                        {/* <div className="floating-icon"><EditIcon /></div> */}
                    </div>
                    <div className="menu">
                        <button className="btn-logout" onClick={() => this.props.logout()}>
                            {this.props.isLoading ? <CircularProgress color="secondary" /> : "Logout"}
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SettingsComp;