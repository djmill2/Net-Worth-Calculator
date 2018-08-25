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
                "$scope",
                "assetCalculateService",
                AssetInputCashCtrl]);

    function AssetInputCashCtrl(assetResource, $state, $scope, assetCalculateService) {
        var vm = this;
        vm.sumStuff = 0;

        vm.assetCalculateService = assetCalculateService;
        // Get our cash data object from the service
        vm.cashData = assetCalculateService.getCash();

        //vm.assetResource = assetResource;
        assetResource.query(function (data) {
            vm.assets = data;
        });

        $scope.$watch("vm.cashData", function handleChange(newVal, oldVal) {
            console.log('Name changed to ' + newVal);
            vm.sumStuff = newVal.checking +
                newVal.savings + newVal.moneyMarket +
                newVal.savingsBond + newVal.cds + newVal.cashValLifeIns;
        }, true);

        /* Calculate the CASH assets subtotal */
        vm.calcCashSubtotal = function () {
            assetCalculateService.setCash({
                checking: vm.cashData.checking,
                savings: vm.cashData.savings,
                moneyMarket: vm.cashData.moneyMarket,
                savingsBond: vm.cashData.savingsBond,
                cds: vm.cashData.cds,
                cashValLifeIns: vm.cashData.cashValLifeIns
            });
            vm.cashData = {
                checking: vm.cashData.checking,
                savings: vm.cashData.savings,
                moneyMarket: vm.cashData.moneyMarket,
                savingsBond: vm.cashData.savingsBond,
                cds: vm.cashData.cds,
                cashValLifeIns: vm.cashData.cashValLifeIns
            }

            return assetCalculateService.calculateCashSubtotal(vm.cashData.checking,
                vm.cashData.savings, vm.cashData.moneyMarket, vm.cashData.savingsBond,
                vm.cashData.cds, vm.cashData.cashValLifeIns);
        };

    }

}());
