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

        vm.assetCalculateService = assetCalculateService;
        // Get our cash data object from the service
        vm.cashData = assetCalculateService.getCash();

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });


        /* Calculate the CASH assets subtotal */
        vm.calcCashSubtotal = function() {
            assetCalculateService.setCash({
                    checking: vm.cashData.checking,
                    savings: vm.cashData.savings,
                    moneyMarket: vm.cashData.moneyMarket,
                    savingsBond: vm.cashData.savingsBond,
                    cds: vm.cashData.cds,
                    cashValLifeIns: vm.cashData.cashValLifeIns
            });
            return assetCalculateService.calculateCashSubtotal(vm.cashData.checking,
                vm.cashData.savings, vm.cashData.moneyMarket, vm.cashData.savingsBond, 
                vm.cashData.cds, vm.cashData.cashValLifeIns);
        };

    }

}());
