import React, {Fragment, useEffect} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import NumberFormat from 'react-number-format';
import './CarDetailComp.css';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import { withRouter } from 'react-router';
import useIsMounted from 'ismounted';

const containerStyles = {
    paddingTop: "10px",
    height: "calc(100vh - 112px)",
    overflowY: "scroll",
    boxSizing: "border-box",
    backgroundColor: "#ffffff"
    // display: "flex",
    // flexWrap: "wrap",
}

const priceStyles = {
    margin: '0px',
    boxSizing: 'border-box',
    fontSize: '1.1rem',
    color: '#FF5E1F',
    fontWeight: '700'
}

const RentalRequirements = ({row}) => {
    return (
        <div className="requirements first" style={{display: 'flex', alignItems: 'center'}}>
            <CheckOutlinedIcon style={{fontSize: '19px'}} />
            <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>{row.syarat}</p>
        </div>
    )
}

// const Separator = () => {
//     return <div style={{height: '1px', backgroundColor: '#eaeaea', margin: '10px 0'}}></div> 
// }


const CarDetailComp = (props) => {
        const isMounted = useIsMounted();

        useEffect(() => {
            
            
        }, [isMounted])
        const row = props.data;
        const requirements = props.requirements;
        
        return (
            <Fragment>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => props.goBack()}>
                        <ArrowBackIosRoundedIcon />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        {row.merk_mobil} {row.nama_mobil} 
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="main-content" style={containerStyles}>
                <div className="car-img-full-width" style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={require(`../../../img/${row.foto_mobil}`)} alt=""/>
                </div>
                <div className="car-name" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '12px'}}>
                    <h3 style={{marginBottom: '7px'}}>{row.merk_mobil} {row.nama_mobil}</h3>
                    <span style={{ padding: '5px 20px', border: '1px solid #eaeaea', borderRadius: '20px', fontSize: '13px'}}>{row.jenis_mobil}</span>
                </div>
                {/* CAR INFO */}
                <div className="car-info" style={{display: 'flex', flexWrap: 'wrap', padding: '12px'}}>
                    <div className="car-info-card">
                        <div className="car-info-card-heading">
                            <h4 style={{color: '#03121A'}}>Car Info</h4>
                        </div>
                        <div className="car-info-card-body" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between',marginTop: '16px'}}>
                            <div className="info-passengers" style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                                <BuildOutlinedIcon style={{fontSize: '19px'}} />
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px'}}>{row.transmisi_mobil} Transmission</p>
                            </div>
                            <div className="info-passengers" style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                                <PersonOutlineIcon style={{fontSize: '19px'}} />
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px'}}>Max {row.kapasitas_mobil} Passengers</p>
                            </div>
                            <div className="info-passengers" style={{display: 'flex', alignItems: 'center', marginBottom: '12px'}}>
                                <DirectionsCarOutlinedIcon style={{fontSize: '19px'}} />
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px'}}>Year {row.tahun_mobil} or newer</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* RENTAL INFO */}
                <div className="rental-info" style={{display: 'flex', flexWrap: 'wrap', padding: '12px'}}>
                    <div className="rental-info-card">
                        <div className="rental-info-card-heading">
                            <h4 style={{color: '#03121A'}}>Rental Info</h4>
                        </div>
                        <div className="rental-info-card-title" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between',marginTop: '16px'}}>
                            <div className="rental-info-card-body-heading">
                                <h5 style={{marginBottom: '12px', fontSize: '14px'}}>Policy</h5>
                            </div>
                        </div>
                        <div className="rental-info-card-description" style={{display: 'flex', flexDirection: 'column'}}>
                                <div className="policy" style={{display: 'flex'}}>
                                            <div className="requirements-list-icon" style={{ }}>
                                                <AssignmentOutlinedIcon style={{fontSize: '19px', padding: '5px'}} />
                                            </div>
                                            <div className="requirement-list-text" style={{flex: 1}}>
                                                <div className="requirements-title">
                                                    <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>Rental Requirements</p>
                                                </div>
                                            {
                                                requirements && requirements.map(item => {
                                                    return (
                                                        <RentalRequirements key={item.id_syarat} row={item} />
                                                    )
                                                })
                                            }
                                                {/* <div className="requirements second" style={{display: 'flex', alignItems: 'center'}}>
                                                    <CheckOutlinedIcon style={{fontSize: '19px'}} />
                                                    <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>Driver's License</p>
                                                </div>
                                                <div className="requirements third" style={{display: 'flex', alignItems: 'center'}}>
                                                    <CheckOutlinedIcon style={{fontSize: '19px'}} />
                                                    <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>ID Card (KTP or Passport)</p>
                                                </div>
                                                <div className="requirements fourth" style={{display: 'flex', alignItems: 'center'}}>
                                                    <CheckOutlinedIcon style={{fontSize: '19px'}} />
                                                    <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>Social Media Account</p>
                                                </div> */}
                                            </div>
                                        </div>

                            <div className="policy" style={{display: 'flex'}}>
                                <div className="requirements-list-icon" style={{ }}>
                                    <LocalGasStationOutlinedIcon style={{fontSize: '19px', padding: '5px'}} />
                                </div>
                                <div className="requirement-list-text" style={{flex: 1}}>
                                    <div className="requirements-title">
                                        <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>Return the fuel as received</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="rental-info-card-description" style={{display: 'flex'}}> */}
                        {/* </div> */}
                    </div>
                </div>
                {/* RENTAL PICKUP */}
                <div className="rental-pickup" style={{display: 'flex', flexWrap: 'wrap', padding: '12px'}}>
                    <div className="rental-pickup-card">
                        <div className="rental-pickup-card-title" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between',marginTop: '16px'}}>
                            <div className="rental-pickup-card-body-heading" style={{width: '100%'}}>
                                <h5 style={{marginBottom: '12px', fontSize: '14px'}}>Picking up your car</h5>
                            </div>
                            <div className="rental-pickup-card-body-description" style={{width: '100%'}}>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>1. Make sure to read the rental and driver requirements, then book for your rental (50% Down Payment).</p>
                            </div>
                            <div className="rental-pickup-card-body-description" style={{width: '100%'}}>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>2. Go to Rental Office and then make payment.</p>
                            </div>
                            <div className="rental-pickup-card-body-description" style={{width: '100%'}}>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>3. After your payment is confirmed, fulfill all of the rental requirements.</p>
                            </div>
                            <div className="rental-pickup-card-body-description" style={{width: '100%'}}>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>4. Once the requirements have been verified, check the car's condition together with the staff.</p>
                            </div>
                            <div className="rental-pickup-card-body-description" style={{width: '100%'}}>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#03121A', paddingLeft: '5px', lineHeight: '30px'}}>5. Read and sign the rental agreement and you'll be good to go.</p>
                            </div>
                        </div>
                        <div className="rental-pickup-card-description" style={{display: 'flex'}}>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-area" style={{display: 'flex', alignItems: 'center', padding: '0 10px'}}>
                <div className="pricing" style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <p style={{fontSize: '14px', fontWeight: '600', color: '#03121A'}}>Price starting from</p>
                    <p className="product-price" style={priceStyles}>
                        Rp <NumberFormat value={row.harga_mobil} displayType={'text'} thousandSeparator={true} />
                    </p>
                </div>
                <div className="btn-continue" style={{}}>
                    <Button onClick={() => {
                        if(isMounted.current) {
                            if(row.stok_mobil === 0) {
                                alert('Maaf stok mobil sudah habis');
                                localStorage.setItem("value", 0);
                                props.history.push('/');
                            } else {
                                props.goBooking(row.id_mobil)
                            }
                        }
                    }} variant="contained" size="medium" style={{backgroundColor: '#FF5E1F', color: '#fff', textTransform: 'capitalize'}}>Continue</Button>
                </div>
            </div>
        </Fragment>
        )
}

export default withRouter(CarDetailComp);