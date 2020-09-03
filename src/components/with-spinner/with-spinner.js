import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from '../with-spinner/with-spinner.style';

const WithSpinner = WarppedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WarppedComponent {...otherProps} />
    )
}
return Spinner;
};

export default WithSpinner;

//render東西需要時間，這個時間需要一個spinner在網頁上loading