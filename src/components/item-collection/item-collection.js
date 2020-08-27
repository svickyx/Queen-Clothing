import React from 'react';
import {connect} from 'react-redux';

import '../item-collection/item-collection.scss';

import CustomButton from '../custom-button/custom-button';
import {addCartItem} from '../../redux/cart/cart-action';

const ItemCollection = ({item, addCartItem})=> {
    const {name, price, imageUrl} = item;
    return (
        <div className='item-collection'>
            <div 
            className='image'
            style = {{backgroundImage: `url(${imageUrl})`}}
            />
            <div className='footer'>
                <span className='name'>{name}</span> 
                <span className='price'>{price}</span>
            </div>
            <CustomButton 
            onClick = {()=> addCartItem(item)} inverted>
            Add to cart
            </CustomButton>
        </div>
    )
}

// 1.在這裡的item collection要接收到addCartItem from cart-action,還要接收從collection-preview那裡來的item
// 2.然後通過 const {name, price, imageUrl} = item; 能夠讓接下來的code都能直接使用，不用寫item.name, item.price等
// 3. 在custom-button那裡onClick用的是整個addCartItem function

const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(addCartItem(item))
});

export default connect(null, mapDispatchToProps)(ItemCollection);