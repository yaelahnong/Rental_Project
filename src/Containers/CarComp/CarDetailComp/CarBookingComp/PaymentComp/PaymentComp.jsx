import React, { Fragment } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, ListItem, List, Divider } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';

const PaymentComp = (props) => {
    const row = props.data
    return (
        <Fragment>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => { 
                        localStorage.setItem("value", 1); 
                        props.history.push('/history');
                    }} style={{justifyContent: 'center'}}>
                        <ArrowBackIosRoundedIcon />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Complete Transaction 
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="payment">
                <List>
                    <ListItem style={{justifyContent: 'space-between'}}>
                        <div>
                            <Typography variant="h6" style={{fontSize: '16px', fontWeight: 'bold', color: '#101010'}}>Bank Transfer</Typography>   
                        </div>
                        <div>
                            <img src={require(`../../../../../img/mandiri.png`)} width="60px" alt="" />
                        </div>
                    </ListItem>
                    <Divider variant="middle" style={{marginTop: '8px', marginBottom: '8px'}} />
                    <ListItem>
                        <div>
                            <Typography style={{fontSize: '12px', color: 'rgba(0,0,0,0.54)', fontWeight: '600'}}>Account Number</Typography>
                            <Typography style={{fontSize: '16px', color: '#101010', fontWeight: '600'}}>123 456 789101112</Typography>
                            <Typography style={{fontSize: '12px', color: '#101010', fontWeight: '400', letterSpacing: '0.5px'}}>MARINO IMOLA</Typography>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div>
                            <Typography style={{fontSize: '12px', color: 'rgba(0,0,0,0.54)', fontWeight: '600'}}>Down Payment</Typography>
                            <Typography style={{fontSize: '16px', color: '#101010', fontWeight: '600'}}>
                                Rp<NumberFormat style={{fontSize: '16px', color: '#101010', fontWeight: '700'}} value={row.harga_mobil * 0.5} displayType={'text'} thousandSeparator={true} />
                            </Typography>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div>
                            <Typography style={{fontSize: '12px', color: 'rgba(0,0,0,0.54)', fontWeight: '600'}}>Due Date</Typography>
                            <Typography style={{fontSize: '16px', fontWeight: '600'}}>Sunday, 10 Jan 2021 01:50 WIB</Typography>
                        </div>
                    </ListItem>
                    {/* <Divider style={{padding: '4px', marginTop: '8px', marginBottom: '8px'}} /> */}
                </List>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="outlined" color="primary" style={{maxWidth: '93%', marginTop: '20px'}} onClick={() => window.print()}>Save to Device</Button>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" rel="index,follow" color="primary" style={{maxWidth: '93%', marginTop: '20px'}} onClick={() => {
                        localStorage.setItem("value", 1); 
                        props.history.push('/history');
                    }}>Go to History</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(PaymentComp);