import React from 'react';
import { Route } from 'react-router-dom';
// 錯誤： Route要帶 {}
import {connect} from 'react-redux';

import { firestore, convertCollectionsSnopshotToMap } from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop-actions';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection-page/collection-page';
import  WithSpinner  from "../../components/with-spinner/with-spinner";

//因為shop_data裡面的數據都已經被轉移到firebase裡面了，那需要把firebase的數據跟reducer連結起來，需要用到shop_data數據的components' nearest parent
//component is shop-page.js，所以要在這裡fetch firebase
//第一步，把ShopPage改為class function


// const ShopPage = ({match}) => {
//    return(
//         <div className='shop-page'>
//             <Route exact path = {`${match.path}`} component={CollectionOverview} /> 
//             <Route path = {`${match.path}/:collectionId`} component={CollectionPage}   /> 
//          </div>
//     )
// }


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
    state = {
        loading: true
    };
    //簡化版的constructor, super等
    
    unsubscribeFromSnapshot = null;
//這裡參考app.js的didMount
    componentDidMount(){
        const {updateCollections} = this.props
        const collectionRef = firestore.collection('collections');


//get().then()是另外一種snopshot的替代法，在沒辦法用firebase或者另外有server的前提下用這樣的方法
        // collectionRef.get().then(snopshot => {
        //     const collectionsMap = convertCollectionsSnopshotToMap(snopshot);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // })

        collectionRef.onSnapshot(async snopshot => {
            const collectionsMap = convertCollectionsSnopshotToMap(snopshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }
    //這裡用上convertCollectionsSnopshotToMap這個function了之後，就可以在網頁裡看到我們得到了an array of object裡面包含了我們需要的所有有用的東西
    //最後的collectionsMap就是shop_data的最終版本，現在要把這些在前台的數據放在reducer裡面

    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route 
                    exact 
                    path = {`${match.path}`} 
                    render={(props)=> (
                        <CollectionOverviewWithSpinner isLoading={loading} {...props}  />
                    )}
                />
                <Route 
                    path = {`${match.path}/:collectionId`} 
                    render={(props)=> (
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    )}
                /> 
            </div>
        )
    }
}

const mapDispatchToMap = dispatch => ({
    updateCollections: collectionsMap => 
        dispatch(updateCollections(collectionsMap))
});

//mapDispatchToMap 這一步的最終結果是在shop-reducer裡面有了一個新的collection,裡面有原本在shop_data的東西,
//這樣資料就被通過fire base儲存在後端了，並且隨時根據後端的資料更新來更新前端的東西


export default connect(null, mapDispatchToMap)(ShopPage);