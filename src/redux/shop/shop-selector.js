import memoize from 'lodash.memoize';
import {createSelector} from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     jackets: 2,
//     sneakers: 3,
//     womens: 4, 
//     mens: 5
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)
//這個新的selector是為了把shop_data裡面的object轉化成array, 然後map成一個新的array

export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
);
//這個function的功能是因為在shop page裡面的url, /shop/hats 或者/shop/jackets 後面的urlparams 是string, 但是實際的collection.id是數字，
//為了找到相對應的id 而創造出來的function
