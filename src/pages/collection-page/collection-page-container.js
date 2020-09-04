import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CollectionPage from './collection-page';
import WithSpinner from '../../components/with-spinner/with-spinner';

import { selectorCollectionLoaded } from '../../redux/shop/shop-selector';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectorCollectionLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;

//container的意義主要是pass props to component, it does not render anything

