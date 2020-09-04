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
    collections => 
    collections ? Object.keys(collections).map(key => collections[key]) 
    : []
)
//這個新的selector是為了把shop_data裡面的object轉化成array, 然後map成一個新的array
//如果碰到錯誤是：cannot convert null/undefine to object, 解決辦法是：
//這裡用到if collections exists, 用Object.keys這些東西，如果不存在，是shop-reducer裡面初始狀態的null狀態，即return an empty array[]

export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
        //這裡？ ： 是為了解決當在collection page的時候，出現錯誤： cannot read property "womens/hats..." of null
    )
);
//這個function的功能是因為在shop page裡面的url, /shop/hats 或者/shop/jackets 後面的urlparams 是string, 但是實際的collection.id是數字，
//為了找到相對應的id 而創造出來的function


//redux-thunk related
export const selectCollectionIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectorCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
    //在shop.collections前面加兩個！！的意思是，如果shop.collection is an empty object {}, !!{} => true, otherwise, 任何其他東西都會是flase, 
    // !![], !!null, !!‘’ => false
)