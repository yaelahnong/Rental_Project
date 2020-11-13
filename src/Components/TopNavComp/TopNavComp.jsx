import React, { Fragment } from 'react';
import './TopNavComp.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Button, Popover } from '@material-ui/core';

const TopNavComp = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            <div className="header" style ={{ display: 'flex', alignItems: 'center'}}>
                <h3>{props.title}</h3>
                {
                    props.icon === "help"
                    ? <div className="help" style={{position: 'absolute', right: '10px'}}>
                        <Button onClick={handleClick} style={{minWidth: 'unset', borderRadius: '100%'}}>
                            <HelpOutlineIcon style={{color: '#fff'}} />
                        </Button>
                        <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                            <div style={{padding: '10px'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{width: '12px', height: '12px', backgroundColor: '#eeeeee', border: '1px solid #000', boxSizing: 'border-box'}}></div>
                                    <span style={{marginLeft: '7px', fontSize: '14px'}}>Waiting to be processed</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{width: '12px', height: '12px', backgroundColor: '#ffffff', border: '1px solid #000', boxSizing: 'border-box'}}></div>
                                    <span style={{marginLeft: '7px', fontSize: '14px'}}>Confirmed</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{width: '12px', height: '12px', backgroundColor: '#0194F3'}}></div>
                                    <span style={{marginLeft: '7px', fontSize: '14px'}}>Completed</span>
                                </div>
                            </div>
                        </Popover>
                    </div>
                    : ''
                }
            </div>
        </Fragment>
    )
}

export default TopNavComp;