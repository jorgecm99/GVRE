import React, { useState } from 'react';
import './priceBar.scss';
import { Slider } from '@mui/material';

const PriceBar = () => {
    
    const [price, setPrice] = useState([0,50]);

    const handleInput = (e, data) => {
        setPrice(data);
        console.log(price)
    };

    return (
        <div className='slider'>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={price}
                onChange={handleInput}
                valueLabelDisplay='auto'
                disableSwap
            />
        </div>
    )
}

export default PriceBar
