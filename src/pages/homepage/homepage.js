import React from 'react';
import  {HomePageContainer} from '../homepage/homepage.style';

import Directory from '../../components/directory/directory';

const HomePage = ()=>{
    return (
        <HomePageContainer>
                <Directory />
        </HomePageContainer>
    )
}

//這裡的HomePageContainer就是用js寫css的例子，創造了一個新的css component, 並且把原先的div用css component代替了，注意要import {在大括號裡面的}

export default HomePage;