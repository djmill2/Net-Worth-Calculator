/**
 * Created by Don on 8/10/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("LiabilityAllCtrl",
            ["debtResource",
                "assetResource",
                "$state",
                "assetCalculateService",
                "debtCalculateService",
                LiabilityAllCtrl]);

    function LiabilityAllCtrl(debtResource, $state, debtCalculateService, assetResource, assetCalculateService) {
        var vm = this;

        // Current Debt View
        vm.creditCards = 0.00;
        vm.incomeTaxOwed = 0.00;
        vm.outstandingBills = 0.00;

        // Long-term Debt View
        vm.homeMortgage = 0.00;
        vm.homeEquity = 0.00;
        vm.mortgagesRental = 0.00;
        vm.vehiclesLoans = 0.00;
        vm.studentLoans = 0.00;
        vm.lifeInsuranceLoan = 0.00;
        vm.otherLongtermDebt = 0.00;

        vm.assetResource = assetResource;
        /*assetResource.query(function(data) {
            vm.assets = data;
        });*/
        //vm.debtResource = debtResource;
        debtResource.query(function(data) {
            vm.debts = data;
        });

        vm.assetCalculateService = assetCalculateService;
        vm.debtCalculateService = debtCalculateService;

        /* Calculate the Current Debts subtotal */
        vm.calcCurrentDebtsSubtotal = function() {
            return debtCalculateService.calculateCurrentDebtsSubtotal(vm.checking,
                vm.savings, vm.moneyMarket, vm.savingsBond, vm.cds, vm.cashValLifeIns);
        };

        /* Calculate the Long-term Debt subtotal */
        vm.calcLongtermDebtSubtotal = function() {
            return debtCalculateService.calculateLongtermDebtSubtotal(vm.homeMortgage,
                vm.homeEquity, vm.mortgagesRental, vm.vehiclesLoans, vm.studentLoans,
                vm.lifeInsuranceLoan, vm.otherLongtermDebt);
        };

        /* Calculate the Total Debts */
        vm.calcTotalDebts = function() {
            return debtCalculateService.calculatedTotalDebts(vm.calcCurrentDebtsSubtotal,
                vm.calcLongtermDebtSubtotal)
        };

        /* Calculate Net Worth */
        vm.calcNetWorth = function() {
            return debtCalculateService.calculatedNetWorth(vm.totalAssets,
                vm.totalDebts)
        };
    }

}());
//calcNetWorth