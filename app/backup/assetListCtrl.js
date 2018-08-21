/**
 * Created by Don on 7/30/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetListCtrl",
                    ["assetResource",
                        AssetListCtrl]);

    function AssetListCtrl(assetResource) {
        var vm = this;  // model defined on the "this"

        assetResource.query(function(data) {
           vm.assets = data;
        });
    }
}());