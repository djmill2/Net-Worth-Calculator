/**
 * Created by Don on 8/10/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetInputCashCtrl",
            ["assetResource",
                "$state",
                "assetCalculateService",
                AssetInputCashCtrl]);
    function AssetInputCashCtrl(assetResource, $state, assetCalculateService) {
        var vm = this;

        // Cash View
        vm.checking = 0.00;
        vm.savings = 0.00;
        vm.moneyMarket = 0.00;
        vm.savingsBond = 0.00;
        vm.cds = 0.00;
        vm.cashValLifeIns = 0.00;

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        vm.assetCalculateService = assetCalculateService;

        /* Calculate the CASH assets subtotal */
        vm.calcCashSubtotal = function() {
            return assetCalculateService.calculateCashSubtotal(vm.checking,
                vm.savings, vm.moneyMarket, vm.savingsBond, vm.cds, vm.cashValLifeIns);
        };

    }

}());
