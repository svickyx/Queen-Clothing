import React from 'react';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop-selector';

import CollectionPreview from '../collection-preview/collection-preview';

import '../collection-overview/collection-overview.scss';

const CollectionOverview = ({collections}) => {
    return(
        <div className='collection-overview'>
            {collections.map(({id, ...otherCollectionProps})=>{
                return <CollectionPreview 
                key={id}
                {...otherCollectionProps}
                />
            })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);