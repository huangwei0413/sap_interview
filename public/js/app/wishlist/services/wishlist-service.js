'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST', 'AccountSvc', function(WishlistREST, AccountSvc) {
        
            var WishlistSvc = {
                createWishlist: function (newWishlist) {
                    var accPromise = AccountSvc.getCurrentAccount();
                    accPromise.then(function (successAccount) {
                        var wishlistId = successAccount.id;
                        WishlistREST.Wishlist.one('wishlists', wishlistId).all('wishlistItems').post(newWishlist);
                    });
                },
                
                getWishlist: function () {
                    var accPromise = AccountSvc.getCurrentAccount();
                    return accPromise.then(function (successAccount) {
                        var wishlistId = successAccount.id;
                        var currentWishlist = WishlistREST.Wishlist.one('wishlists', wishlistId).get();
                        return currentWishlist.then(function (response) {
                            if (response.id === wishlistId) {
                                return response.items;
                            }
                        });
                        
                    });
                }
            };
        
            return WishlistSvc;
        }

    ]);

