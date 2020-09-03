import React from 'react';
import {connect} from 'react-redux';

import {selectCollection} from '../../redux/shop/shop-selector';

import ItemCollection from '../../components/item-collection/item-collection';

import '../collection-page/collection-page.scss';

const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return(
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='item-collection-container'>
                {
                    items.map(item => <ItemCollection key={item.id} item = {item} />)
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);