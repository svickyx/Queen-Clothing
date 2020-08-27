import React from 'react';
import '../account-page/account-page.scss';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

const AccountPage = () => {
    return(
        <div className='account-page'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default AccountPage;