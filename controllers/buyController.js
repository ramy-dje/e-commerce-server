const buy = require('../models/buy');

/**
 * buy :
    post : createPurchase(client,seller,product,shippingSupplier,paymentMode)
    get : getClientPurchases(client)=>buy[]
    get : getproductPurchases(product)=>buy[]
    get : getSellerPurchases(seller)=>buy[]
    get : getPurchasesByShippingSupplier(shippingSupplier)=>buy[]
    get : getPurchasesByPaymentMode(paymentMode)=>buy[]
    delete : deletePurshase (id)=>
 */