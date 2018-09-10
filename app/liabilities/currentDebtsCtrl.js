/**
 * Created by Don on 8/22/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("CurrentDebtsCtrl",
            ["debtResource",
                "$state",
                "$scope",
                "debtCalculateService",
                "$filter",
                CurrentDebtsCtrl]);

    function CurrentDebtsCtrl(debtResource, $state, $scope, debtCalculateService, $filter) {
        var vm = this;
        // Declaring and initializing the variables for this controller
        vm.currentDebtSubtotal = 0;

        // Completing the injection of the common services into the controller
        vm.debtCalculateService = debtCalculateService;
        // Get our Current Debts data object from the service
        vm.currentDebtsData = debtCalculateService.getCurrentDebt();
        // processes to use data service
        vm.debtResource = debtResource;

        // Populate current debt subtotal variable
        $scope.$watch("vm.currentDebtsData", function handleChange(userInputVal) {
            vm.currentDebtSubtotal = parseFloat(userInputVal.creditCards.replace(/,/g, '')) +
                parseFloat(userInputVal.incomeTaxOwed.replace(/,/g, '')) + parseFloat(userInputVal.outstandingBills.replace(/,/g, ''));
            vm.debtCalculateService.setCurrentDebt(userInputVal);
        }, true);

        // Check on Focus if user inputs have a value and set to empty if not
        vm.handleZeroOnFocus = function (amount) {
            if (amount === 0 || amount === '0' || amount === '0.00') {
                return '';
            } else {
                return amount.replace(/,/g, '');
            }
        };

        vm.returnOnBlur = function (amount) {
            if (amount === '') {
                return 0;
            } else if (amount.indexOf(',') !== -1) {
                var newAmount = amount.replace(/,/g, '');
                return $filter('number')(newAmount)
            } else {
                return $filter('number')(amount);
            }
        };

        /* Calculate the Current Debts subtotal */
        vm.calcCurrentDebtsSubtotal = function () {
            debtCalculateService.setCurrentDebt({
                creditCards: vm.currentDebtsData.creditCards,
                incomeTaxOwed: vm.currentDebtsData.incomeTaxOwed,
                outstandingBills: vm.currentDebtsData.outstandingBills
            });
            vm.currentDebtsData = {
                checking: vm.currentDebtsData.creditCards,
                savings: vm.currentDebtsData.incomeTaxOwed,
                moneyMarket: vm.currentDebtsData.outstandingBills,
            };
            return debtCalculateService.calcCurrentDebtsSubtotal(vm.currentDebtsData.creditCards,
                vm.currentDebtsData.incomeTaxOwed, vm.currentDebtsData.outstandingBills);
        };

    }

}());