import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
//compose是為了不讓CollectionOverviewContainer被太多層的withRouter, withHOC等約束

import { selectCollectionIsFetching } from '../../redux/shop/shop-selector';
import WithSpinner from '../with-spinner/with-spinner';
import CollectionOverview from '../collection-overview/collection-overview';

const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionIsFetching,
});

// 複雜的寫法： 
//const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview))
//用了compose的寫法：
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;