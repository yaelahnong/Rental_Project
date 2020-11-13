import React, { Fragment } from 'react';
import './BotNavComp.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import { useHistory } from "react-router-dom";

const BotNavComp = (props) => {
        
        const value = parseInt(localStorage.getItem("value"));

        let history = useHistory();

        const handleHome = (event) => {
            history.push('/');
        }

        const handleHistory = () => {
            history.push('/history');
        }

        const handleSettings = () => {
            history.push('/settings');
        }
        
        return (
            <Fragment>
                <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    localStorage.setItem("value", newValue);
                }}
                showLabels>
                    <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} onClick={handleHome} />
                    <BottomNavigationAction label="History" icon={<HistoryRoundedIcon />} onClick={handleHistory} />
                    <BottomNavigationAction label="Settings" icon={<SettingsRoundedIcon />} onClick={handleSettings} />
                </BottomNavigation>
            </Fragment>
    
        )
        
}

export default BotNavComp;