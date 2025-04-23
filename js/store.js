// variable section project //

let $ = document ;

let itemsListStore = [
    { img: 'Images/Album 1.png', name: "Album Art Fandu", price: 14.99, id: 1,num: 1},
    { img: 'Images/Album 2.png', name: "Album Art Robert", price: 15.99, id: 2,num: 1},
    { img: 'Images/Album 3.png', name: "Album Art Sandy", price: 12.99, id: 3,num: 1},
    { img: 'Images/Album 4.png', name: "Album Art Alby", price: 8.99, id: 4,num: 1}
] ;

let itemShopContainer = $.getElementById('itemShopContainer') ;
let cardProduct = $.getElementById('cardProduct') ;
let totalPrice = $.getElementById('totalPrice') ;

let itemsListCard = [] ;
let addProductCardBtns ;
let numItemCard ;



// startFunction section project //

startItemShop(itemsListStore) ;
addProductCardBtns = $.querySelectorAll('.addProductCard') ;
addProductCardBtns.forEach(adderProductCard) ;


// function section project //

function startItemShop(itemsList) {
    // function for item shop create //
    
    let containerItem = $.createElement('div') ;
    containerItem.className = 'shop-items'
    
    itemsList.forEach(function (item) {
        
        containerItem.insertAdjacentHTML('afterbegin', '<div class="shop-item"><span class="shop-item-title">' + item.name + '</span><img class="shop-item-image" src="' + item.img + '" /><div class="shop-item-details"><span class="shop-item-price">' + item.price + '</span><button class="btn btn-primary shop-item-button addProductCard" type="button" data-id="' + item.id + '">ADD TO CART</button></div></div>')
        
    });    
    
    itemShopContainer.append(containerItem)
    
}    

function adderProductCard(btn) {
    // function for add product card //

    btn.addEventListener('click', function (event) {

        let idProduct = event.target.dataset.id

        let isbullean = itemsListCard.some(function (item) {

            return idProduct == item.id
            
        })

        if (isbullean) {

            alert('!!')
            
        } else {

            itemsListStore.forEach(function (item) {

                if (item.id == idProduct) {
    
                    
                    let containerItem = $.createElement('div') ;
                    containerItem.className = 'cart-row'
                    
                    containerItem.insertAdjacentHTML('afterbegin', '<div class="cart-item cart-column"><img class="cart-item-image" src="' + item.img + '" width="100" height="100"><span class="cart-item-title">' + item.name + '</span></div><span class="cart-price cart-column">' + item.price + '</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" type="number" value="1" min="1" max="10" data-id="' + item.id + '"><button class="btn btn-danger btn-remove" id="L' +item.id + '" type="button" data-id="' + item.id + '">REMOVE</button></div>')
                    cardProduct.append(containerItem)
                    
                    itemsListCard.push(item)
                    itemsListCard = [...itemsListCard]
                    
                    numItemCard = $.querySelectorAll('.cart-quantity-input')

                    let idd = 'L' + item.id ;

                    let removeBtns = $.getElementById(idd) ;
                    
                    sumPrice(itemsListCard)
                    numProduct(numItemCard)
                    removeProductAdd(removeBtns)
                    console.log(itemsListCard)


                    
                }
                
            })

        }

    })    

}

function sumPrice(item) {

    let priceSum = 0

    item.forEach(function (item) {
        
        priceSum += item.price * item.num;

    })

    totalPrice.innerHTML = '$' + priceSum ;
    
}

function numProduct(input) {

    input.forEach(function (targetInput) {

        targetInput.addEventListener('change', function (event) {
            
            let idProduct = targetInput.dataset.id

            itemsListCard.forEach(function (item) {
                
                if (item.id == idProduct) {
    
                    item.num = targetInput.value
    
                    sumPrice(itemsListCard)
                    
                }

            })

        })
        
    })
    
}

function removeProductAdd(btns) {

    console.log('f')
    btns.addEventListener('click', function (event) {

        event.target.parentElement.parentElement.remove()

        let idProduct = event.target.dataset.id

        
        let index = itemsListCard.findIndex(function (item) {
            
            return item.id == idProduct
            
        })
        
        itemsListCard.forEach(function (item) {
            
            if (item.id == idProduct) {
                item.num = 1
            }
            
        })

        console.log(itemsListCard.splice(index,1))

        sumPrice(itemsListCard)
    })
    
}

