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
        vm.currentDebtSubtotal = 0;

        vm.debtCalculateService = debtCalculateService;
        // Get our Current Debts data object from the service
        vm.currentDebtsData = debtCalculateService.getCurrentDebt();

       // vm.debtResource = debtResource;
        debtResource.query(function(data) {
            vm.debts = data;
        });

        $scope.$watch("vm.currentDebtsData", function handleChange(userInputVal) {
            vm.currentDebtSubtotal = userInputVal.creditCards +
                userInputVal.incomeTaxOwed + userInputVal.outstandingBills;
        }, true);

        /* Calculate the Current Debts subtotal */
        vm.calcCurrentDebtsSubtotal = function() {
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