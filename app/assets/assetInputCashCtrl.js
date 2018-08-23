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
<<<<<<< HEAD
        // Get our cash data object from the service
=======
        // Get our Cash data object from the service
>>>>>>> master
        vm.cashData = assetCalculateService.getCash();

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

<<<<<<< HEAD

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
=======
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
>>>>>>> master
                vm.cashData.cds, vm.cashData.cashValLifeIns);
        };

    }

}());
