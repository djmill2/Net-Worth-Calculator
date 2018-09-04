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
                CurrentDebtsCtrl]);

    function CurrentDebtsCtrl(debtResource, $state, $scope, debtCalculateService) {
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
            vm.currentDebtSubtotal = parseFloat(userInputVal.creditCards) +
                parseFloat(userInputVal.incomeTaxOwed) + parseFloat(userInputVal.outstandingBills);
            vm.debtCalculateService.setCurrentDebt(userInputVal);
        }, true);

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