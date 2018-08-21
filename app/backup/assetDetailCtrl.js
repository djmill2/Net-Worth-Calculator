/**
 * Created by Don on 8/14/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetDetailCtrl",
                    ["asset",
                     AssetDetailCtrl]);

    function AssetDetailCtrl(asset) {
        var vm = this;

        vm.asset = asset;

        vm.title = "Asset Detail: " + vm.asset.assetName;

        if (vm.asset.tags) {
            vm.asset.tagList = vm.asset.tags.toString();
        }
    }
}());
