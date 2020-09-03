import React from 'react';
import { withRouter } from 'react-router-dom';

import '../collection-preview/collection-preview.scss';

import ItemCollection from '../item-collection/item-collection';

const CollectionPreview = ({title, items, history, match, routeName})=> {
    return(
        <div className='collection-preview'>
            <h1 className='title' onClick={() => history.push(`${match.path}/${routeName}`)}>
                {title.toUpperCase()}
            </h1>
            <div className='item-preview' key={items.id}>
                {items
                    .filter((item, index) => index < 4)
                    .map((item) => {
                    return <ItemCollection key={item.id} item = {item} />
                    })
                }
            </div>
        </div>
    )
}

export default withRouter(CollectionPreview);

//在這裡從colelctionpreview pass to item-collection的東西是整個item（在map括號裡）, 然後在item-collection裡面再deconstructor一下
//為什麼分為collection-overview 然後再加一層collection-preview是因為如果這樣preview就是獨立管理要預覽顯示幾個item的獨立部門。這樣如果以後要做出任何調整，
//比如從顯示4個變成顯示8個/2個，都可以直接再這裡管理