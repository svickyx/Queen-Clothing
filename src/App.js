import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop-page/shop-page';
import Header from './components/header/header';
import AccountPage from './pages/account-page/account-page';
import CheckOutPage from './pages/check-out/check-out';

import {auth} from './firebase/firebase.utils';
import {createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user-action';
import { selectCurrentUser } from './redux/user/user-selectors';
     // 引進這個setCurrentUser的時候忘記加{}

// 錯誤： class App extends React.Component(){}之前寫成這樣有帶（）實際上是沒有的
class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          // 注意這裡把setState換成reducer寫好的setCurrentUser，
          // this.setState({currentUser: {id: snapShot.id, ...snapShot.data()}})
          userRef.onSnapshot(snapShot => {
           setCurrentUser ({
                id: snapShot.id,
                ...snapShot.data()
           })  
          })
        }
        // 這是改過之前的 this.setState({setCurrentUser: userAuth})
        setCurrentUser(userAuth)
    })
};


// documentSnapshot 不僅僅可以檢查這個data是不是存在的，還能得到actual property of the object by calling the .data(), 
// which will return a JSON object of the document

  componentWillUnmount (){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component= {HomePage} />
          <Route  path='/shop' component= {ShopPage} />
          {/* 這裡不能放exact path */}
          <Route exact path='/checkout' component= {CheckOutPage} />
          <Route exact path='/signin' render={
            ()=> this.props.currentUser ?
            (<Redirect to='/' />
            ):(
              <AccountPage />
            )
          }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect (mapStateToProps, mapDispatchToProps)(App);
