import ShopActionTypes from '../shop/shop-types';

export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COllECTIONS,
    payload: collectionsMap
})