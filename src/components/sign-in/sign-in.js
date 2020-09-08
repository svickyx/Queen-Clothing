import React from 'react';
import { connect } from 'react-redux';

import '../sign-in/sign-in.scss';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { googleSigninStart, emailSigninStart } from '../../redux/user/user-action';

class SignIn extends React.Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSigninStart } = this.props;
        const {email, password} = this.state;

        emailSigninStart(email, password);

        // try{
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({email: '', password: ''})
        // }catch(error){
        //     console.log('error', error.message)
        // }
        
    }
    // 這裡的submit的作用是為了清空之前填寫好的資料

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    
    // event.target.name就是下面input的property: name， event.target.value是動態的用戶輸入的自己的email/password
    // 這裡先把他們deconstructor出來，然後當onChange的時候state改變成用戶輸入的name = 用戶輸入的value
    // 這裡的兩個handle要寫在這個位置，而不是放在this.state裡面
    // [name]: value這樣的寫法是因為只有這樣寫才能達到[name]是動態的

    render(){
        const { googleSigninStart }= this.props;
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit ={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email}
                    required
                    handleChange = {this.handleChange}
                    label = 'email'
                    />
                    <FormInput
                    name='password' 
                    type='password'
                    value={this.state.password}
                    handleChange = {this.handleChange}
                    label = 'password'
                    />
                    <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick = {googleSigninStart} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                    {/* 這裡添加了一個isGoogleSignIn並且pass給customButton, 為什麼沒有{} */}
                    </div>
                </form>

                {/* 在這個form裡面每一個input的value都是動態的，隨著狀態而改變的，所以他們的input value = {this.state.email/password} 
                而當用戶輸入email/password的時候，通過onChange啟動了handleChange從而改變了state*/}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSigninStart: ()=> dispatch(googleSigninStart()),
    emailSigninStart: (email, password) => dispatch(emailSigninStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);