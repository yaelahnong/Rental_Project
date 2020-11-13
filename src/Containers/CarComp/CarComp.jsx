import React, {Component, Fragment} from 'react';
import './CarComp.css';
import PersonIcon from '@material-ui/icons/Person';
// import TravelIcon from '@material-ui/icons/CardTravelOutlined'
import NumberFormat from 'react-number-format';
// import { Button } from '@material-ui/core';


class Product extends Component {
    render() {
        const row = this.props.data;
        return (
            <Fragment>
                <div className="product" onClick={() => this.props.goDetail(row.id_mobil)}>
                    <div className="product-left">
                        <div className="product-img">
                            <img src={require(`../../img/${row.foto_mobil}`)} alt="car" />
                        </div>
                        <div className="product-info">
                            <div className="transmission">
                                <p>{row.transmisi_mobil}</p>
                            </div>
                            <div className="car-seat">
                                <PersonIcon color="action" style={{ fontSize: '16px' }} />
                                <p>{row.kapasitas_mobil}</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-right">
                        <div className="right-top">
                            <h5 className="product-name">{row.merk_mobil} {row.nama_mobil}</h5>
                            <p>Without Driver</p>
                        </div>
                        <div className="pricing">
                            <p className="product-price">
                                Rp <NumberFormat value={row.harga_mobil} displayType={'text'} thousandSeparator={true} />
                            </p> / day
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Product;