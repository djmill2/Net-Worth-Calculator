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
        // Declaring and initializing the variables for this controller
        vm.cashSubtotal = 0;

        // Completing the injection of the common services into the controller
        vm.assetCalculateService = assetCalculateService;

        // Get our Cash data object from the service
        vm.cashData = assetCalculateService.getCash();

        vm.assetResource = assetResource;
        // use this when accessing data from assetResource (aka database)
        /* assetResource.query(function (data) {
            vm.assets = data;
        }); */

        // Populate cash subtotal variable
        $scope.$watch("vm.cashData", function handleChange(userInputVal) {
            vm.cashSubtotal = userInputVal.checking +
                userInputVal.savings + userInputVal.moneyMarket +
                userInputVal.savingsBond + userInputVal.cds + userInputVal.cashValLifeIns;
            vm.assetCalculateService.setCash(userInputVal);
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
            };
            return assetCalculateService.calculateCashSubtotal(vm.cashData.checking,
                vm.cashData.savings, vm.cashData.moneyMarket, vm.cashData.savingsBond,
                vm.cashData.cds, vm.cashData.cashValLifeIns);

        };

    }

}());
