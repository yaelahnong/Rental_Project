import React, { Fragment } from 'react';
import './CarComp.css';
import Skeleton from '@material-ui/lab/Skeleton';

const CardSkeleton = () => {
    return (
        <Fragment>
                <div className="product">
                    <div className="product-left">
                        <div>
                            <Skeleton animation="wave" variant="rect" width={150} height={75} />
                        </div>
                        <div>
                            <div>
                                <Skeleton animation="wave" width={150} style={{marginTop: '5px'}} />
                            </div>
                        </div>
                    </div>
                    <div className="product-right">
                        <div>
                            <Skeleton animation="wave" width={160} />
                            <Skeleton animation="wave" width={100} style={{marginTop: '5px'}} />
                        </div>
                        <div>
                            <Skeleton animation="wave" width={160} style={{marginTop: '8px'}} /> 
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default CardSkeleton;
