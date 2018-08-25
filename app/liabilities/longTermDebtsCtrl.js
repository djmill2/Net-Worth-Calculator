/**
 * Created by Don on 8/10/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("LongTermDebtsCtrl",
            ["assetResource",
                "debtResource",
                "$state",
                "assetCalculateService",
                "debtCalculateService",
                LongTermDebtsCtrl]);

    function LongTermDebtsCtrl(assetResource, debtResource, $state, assetCalculateService, debtCalculateService) {
        var vm = this;

        vm.assetCalculateService = assetCalculateService;


        vm.debtCalculateService = debtCalculateService;
        // Get our Current Debts data object from the service
        vm.cashTotalData = assetCalculateService.getCashTotal();
        vm.currentDebtsData = debtCalculateService.getCurrentDebt();
        vm.longTermDebtData = debtCalculateService.getLongTermDebt();

        vm.assetResource = assetResource;
        /*assetResource.query(function(data) {
            vm.assets = data;
        });*/
        vm.debtResource = debtResource;
        /*debtResource.query(function(data) {
            vm.debts = data;
        });*/

        /* Calculate the Long-term Debt subtotal */
        vm.calcLongtermDebtSubtotal = function() {
            debtCalculateService.setLongTermDebt({
                homeMortgage: vm.longTermDebtData.homeMortgage,
                homeEquity: vm.longTermDebtData.homeEquity,
                mortgagesRental: vm.longTermDebtData.mortgagesRental,
                vehiclesLoans: vm.longTermDebtData.vehiclesLoans,
                studentLoans: vm.longTermDebtData.studentLoans,
                lifeInsuranceLoan: vm.longTermDebtData.lifeInsuranceLoan,
                otherLongtermDebt: vm.longTermDebtData.otherLongtermDebt
            });
            return debtCalculateService.calculateLongtermDebtSubtotal(vm.longTermDebtData.homeMortgage,
                vm.longTermDebtData.homeEquity, vm.longTermDebtData.mortgagesRental, vm.longTermDebtData.vehiclesLoans,
                vm.longTermDebtData.studentLoans, vm.longTermDebtData.lifeInsuranceLoan, vm.longTermDebtData.otherLongtermDebt);
        };

         //Calculate the Total Debts
        vm.calcTotalDebts = function() {
            return debtCalculateService.calculatedTotalDebts(vm.currentDebtsData.calcCurrentDebtsSubtotal,
                vm.longTermDebtData.calcLongtermDebtSubtotal)
        };

        /* Calculate Net Worth */
        vm.calcNetWorth = function() {
            return debtCalculateService.calculatedNetWorth(vm.cashTotalData.totalAsset,
                vm.totalDebts)
        };
    }

}());