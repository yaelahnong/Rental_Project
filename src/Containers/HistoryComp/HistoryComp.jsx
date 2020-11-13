import { Button } from '@material-ui/core';
import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import './HistoryComp.css';


const priceStyles = {
    margin: '0px',
    boxSizing: 'border-box',
    fontSize: '1.1rem',
    color: '#666666',
    fontWeight: '700'
}

const HistoryComp = (props) => {

    const row = props.data;

    return (
        <Fragment>
            {row.status_pembayaran === 1 && row.status_transaksi === 1 
            ?   (<div className="history">
                    <div className="history-top">
                        <table cellSpacing="0" cellPadding="10">
                            <tbody>
                                <tr>
                                    <td>Transaction Code</td>
                                    <td>:</td>
                                    <td>{row.kode_transaksi}</td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_sewa}</td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_pengembalian}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="history-bottom">
                        <p>Rp. {row.total}</p>
                        <p>Completed</p>
                    </div>
                </div>
            ) : row.status_pembayaran === 1 && row.status_transaksi === 0 ? (<div className="history history-1">
                    <div className="history-top">
                        <table cellSpacing="0" cellPadding="10">
                            <tbody>
                                <tr>
                                    <td>Transaction Code</td>
                                    <td>:</td>
                                    <td>{row.kode_transaksi}</td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_sewa}</td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_pengembalian}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="history-bottom">
                        <p></p>
                        <p>Confirmed</p>
                    </div>
                </div>
            ) : (<div className="history history-2">
                    <div className="history-top">
                        <table cellSpacing="0" cellPadding="10">
                            <tbody>
                                <tr>
                                    <td>Transaction Code</td>
                                    <td>:</td>
                                    <td>{row.kode_transaksi}</td>
                                </tr>
                                <tr>
                                    <td>Start Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_sewa}</td>
                                </tr>
                                <tr>
                                    <td>End Date</td>
                                    <td>:</td>
                                    <td>{row.tgl_pengembalian}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="history-bottom">
                        <div className="price">
                            <p style={{fontSize: '14px', fontWeight: '600', color: '#03121A'}}>Price</p>
                            <p className="product-price" style={priceStyles}>
                                Rp <NumberFormat value={row.total_pembayaran} displayType={'text'} thousandSeparator={true} />
                            </p>
                        </div>
                        <div className="btn-cancel" style={{marginTop: '4px'}}>
                            <Button onClick={() => {if(window.confirm('Confirm transaction cancellation')){props.onCancel(row)};}} variant="contained" size="medium" style={{width: '100px', backgroundColor: '#666666', color: '#fff', textTransform: 'capitalize'}}>Cancel</Button>
                        </div>
                    </div>
                </div>)
            }
        </Fragment>
    )
}

export default HistoryComp;
