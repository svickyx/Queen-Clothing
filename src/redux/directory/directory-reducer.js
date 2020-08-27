const INITIAL_STATE = {
    sections: [
        {
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        linkUrl: 'shop/hats'
        },
        {
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        id: 2,
        linkUrl: 'shop/jackets'
        },
        {
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        id: 3,
        linkUrl: 'shop/sneakers'
        },
        {
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        size: 'large',
        id: 4,
        linkUrl: 'shop/womens'
        },
        {
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        size: 'large',
        id: 5,
        linkUrl: 'shop/mens'
        }
    ]
}

//如果沒有action.type的話就直接這樣寫，把action.type就單純放在這裡
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default directoryReducer;

//把directory裡面的state, 叫section這個state從原來的directory-component裡面拿出來，用directory-reducer代替
// 1. 寫出directory-reducer
// 2. 加入root reducer
// 3. 去directory-component把原來的class directory改為單純的function, 把this.state = {}刪掉
// 4. 因為沒有this.state.sections.map的道理了，所以要把sections deconstructor出來，用到selector
// 5. 最後在用connect連結起來
