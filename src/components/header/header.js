import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import '../header/header.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import {selectCartHidden} from '../../redux/cart/cart-selector';
import {selectCurrentUser} from '../../redux/user/user-selectors';
import { signoutStart } from '../../redux/user/user-action';


const Header = ({currentUser, hidden, signoutStart}) => {
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
              <Logo className='logo'/> 
            </Link>
            <div className='option-container'>
                <Link className='option' to='/shop'>SHOP</Link>
                <Link className='option' to='/contact'>CONTACT</Link>
                {currentUser ? (
                <div className='option' onClick = { signoutStart }>SIGN OUT</div>
                ):(
                <Link className='option' to='/signin'>SIGN IN</Link>
                )}
                {/* 在header裡面出現sign in/sign out, 也就是header要通過currentUser 這個state的改變來改變他的display
                這裡第一個用<div>的原因是為了不要margin, padding等，後續在custom button裡面專門css */}
                <CartIcon />
            </div>
            { hidden ? null : <CartDropdown /> }           
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signoutStart: ()=> dispatch(signoutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//把寫好的cart-reducer跟cart drop down結合，實現點擊icon會出現dropdown, 再點擊會消失dropdown
// 1. 通過mapstatetoprops實現，把state.cart.hidden帶進來（這個是root-reducer那裡來的）
// 因為分開寫太麻煩，所以把user和cart放在一起寫 user: {currentUser} 是代入了state.user.currentUser的另一種寫法
// 2. 接著把hidden放進Header的()裡去
// 3. 通過? : 實現收起出現的目的 { hidden ? null : <CartDropdown /> } 如果hidden is true, render null, if it's false, render <CartDropdown />