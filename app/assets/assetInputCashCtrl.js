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
                "$filter",
                AssetInputCashCtrl]);

    function AssetInputCashCtrl(assetResource, $state, $scope, assetCalculateService, $filter) {
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
            vm.cashSubtotal = parseFloat(userInputVal.checking) +
                parseFloat(userInputVal.savings) + parseFloat(userInputVal.cash) + parseFloat(userInputVal.moneyMarket) +
                parseFloat(userInputVal.savingsBond) + parseFloat(userInputVal.cds) + parseFloat(userInputVal.cashValLifeIns);
            vm.assetCalculateService.setCash(userInputVal);
        }, true);

        // Check on Focus if checking has a value and set to empty if not
        vm.handleZeroOnFocus = function( amount ) {
            if (amount === 0 || amount === '0') {
                return '';
            } else {
                return amount;
            }
        }

        vm.returnOnBlur = function( amount ) {
            if (amount === '') {
                return 0;
            } else {
                return $filter('number')(amount);
            }
        }

        /* Calculate the CASH assets subtotal */
        vm.calcCashSubtotal = function () {
            assetCalculateService.setCash({
                checking: vm.cashData.checking,
                savings: vm.cashData.savings,
                cash: vm.cashData.cash,
                moneyMarket: vm.cashData.moneyMarket,
                savingsBond: vm.cashData.savingsBond,
                cds: vm.cashData.cds,
                cashValLifeIns: vm.cashData.cashValLifeIns
            });
            vm.cashData = {
                checking: vm.cashData.checking,
                savings: vm.cashData.savings,
                cash: vm.cashData.cash,
                moneyMarket: vm.cashData.moneyMarket,
                savingsBond: vm.cashData.savingsBond,
                cds: vm.cashData.cds,
                cashValLifeIns: vm.cashData.cashValLifeIns
            };
            return assetCalculateService.calculateCashSubtotal(vm.cashData.checking,
                vm.cashData.savings, vm.cashData.cash, vm.cashData.moneyMarket, vm.cashData.savingsBond,
                vm.cashData.cds, vm.cashData.cashValLifeIns);

        };

    }

}());
