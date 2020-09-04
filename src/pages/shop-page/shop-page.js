import React from 'react';
import { Route } from 'react-router-dom';
// 錯誤： Route要帶 {}
import {connect} from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop-actions';

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection-page/collection-page-container';

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



class ShopPage extends React.Component {
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    //     collectionRef.onSnapshot(async snopshot => {
    //         const collectionsMap = convertCollectionsSnopshotToMap(snopshot);
    //         updateCollections(collectionsMap);
    //         this.setState({loading: false});
    //     });
    // }
    //這裡用上convertCollectionsSnopshotToMap這個function了之後，就可以在網頁裡看到我們得到了an array of object裡面包含了我們需要的所有有用的東西
    //最後的collectionsMap就是shop_data的最終版本，現在要把這些在前台的數據放在reducer裡面

    render(){
        const {match} = this.props;
        return(
            <div className='shop-page'>
                <Route 
                    exact 
                    path = {`${match.path}`} 
                    component = {CollectionOverviewContainer}
                />
                <Route 
                    path = {`${match.path}/:collectionId`} 
                    component = {CollectionPageContainer}
                /> 
            </div>
        )
    }
}


const mapDispatchToMap = dispatch => ({
    fetchCollectionsStartAsync: ()=> dispatch(fetchCollectionsStartAsync())
});

//mapDispatchToMap 這一步的最終結果是在shop-reducer裡面有了一個新的collection,裡面有原本在shop_data的東西,
//這樣資料就被通過fire base儲存在後端了，並且隨時根據後端的資料更新來更新前端的東西


export default connect(null, mapDispatchToMap)(ShopPage);