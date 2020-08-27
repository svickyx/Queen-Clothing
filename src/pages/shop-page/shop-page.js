import React from 'react';
import { Route } from 'react-router-dom';
// 錯誤： Route要帶 {}

import CollectionOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection-page/collection-page';


const ShopPage = ({match}) => {
   return(
        <div className='shop-page'>
            <Route exact path = {`${match.path}`} component={CollectionOverview} /> 
            <Route path = {`${match.path}/:collectionId`} component={CollectionPage}   /> 
         </div>
    )
}

export default ShopPage;