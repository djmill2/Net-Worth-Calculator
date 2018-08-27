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
                "$scope",
                "assetCalculateService",
                "debtCalculateService",
                LongTermDebtsCtrl]);

    function LongTermDebtsCtrl(assetResource, debtResource, $state, $scope, assetCalculateService, debtCalculateService) {
        var vm = this;
        vm.longtermDebtSubtotal = 0;
        vm.totaldebt = 0;
        vm.netWorthT = 0;

        vm.assetCalculateService = assetCalculateService;

        vm.debtCalculateService = debtCalculateService;
        // Get our Current Debts data object from the service
        vm.cashTotalData = assetCalculateService.getCashTotal();
        vm.currentDebtsData = debtCalculateService.getCurrentDebt();
        vm.longTermDebtData = debtCalculateService.getLongTermDebt();
        vm.totalDebtData = debtCalculateService.getTotalDebt();
        vm.netWorthData = debtCalculateService.getNetWorth();

        vm.assetResource = assetResource;
        /*assetResource.query(function(data) {
            vm.assets = data;
        });*/
        vm.debtResource = debtResource;
        /*debtResource.query(function(data) {
            vm.debts = data;
        });*/

        $scope.$watch("vm.longTermDebtData", function handleChange(userInputVal) {
            vm.longtermDebtSubtotal = userInputVal.homeMortgage +
                userInputVal.homeEquity + userInputVal.mortgagesRental + userInputVal.vehiclesLoans +
                userInputVal.studentLoans + userInputVal.lifeInsuranceLoan + userInputVal.otherLongtermDebt;
        }, true);

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
            vm.longTermDebtData = {
                homeMortgage: vm.longTermDebtData.homeMortgage,
                homeEquity: vm.longTermDebtData.homeEquity,
                mortgagesRental: vm.longTermDebtData.mortgagesRental,
                vehiclesLoans: vm.longTermDebtData.vehiclesLoans,
                studentLoans: vm.longTermDebtData.studentLoans,
                lifeInsuranceLoan: vm.longTermDebtData.lifeInsuranceLoan,
                otherLongtermDebt: vm.longTermDebtData.otherLongtermDebt
            };
            return debtCalculateService.calculateLongtermDebtSubtotal(vm.longTermDebtData.homeMortgage,
                vm.longTermDebtData.homeEquity, vm.longTermDebtData.mortgagesRental, vm.longTermDebtData.vehiclesLoans,
                vm.longTermDebtData.studentLoans, vm.longTermDebtData.lifeInsuranceLoan, vm.longTermDebtData.otherLongtermDebt);
        };

        $scope.$watch("vm.totalDebtData", function handleChange(currentDebtSubtotal, longtermDebtSubtotal) {
            vm.totaldebt = currentDebtSubtotal +
                longtermDebtSubtotal;
        }, true);

         //Calculate the Total Debts
        vm.calcTotalDebts = function() {
            debtCalculateService.setTotalDebt({
                currentDebtSubtotal: vm.totalDebtData.currentDebtSubtotal,
                longtermDebtSubtotal: vm.totalDebtData.longtermDebtSubtotal
            });
            vm.totalDebtData = {
                currentDebtSubtotal: vm.totalDebtData.currentDebtSubtotal,
                longtermDebtSubtotal: vm.totalDebtData.longtermDebtSubtotal
            };
            return debtCalculateService.calculatedTotalDebts(vm.currentDebtsData.calcCurrentDebtsSubtotal,
                vm.longTermDebtData.calcLongtermDebtSubtotal)
        };

        $scope.$watch("vm.netWorthData", function handleChange(totalAsset, totalDebt) {
            vm.netWorthT = totalAsset - totalDebt;
        }, true);

        /* Calculate Net Worth */
        vm.calcNetWorth = function() {
            debtCalculateService.setNetWorth({
                totalAsset: vm.netWorthData.totalAsset,
                totalDebt: vm.netWorthData.totalDebt
            });
            vm.netWorthData = {
                totalAsset: vm.netWorthData.totalAsset,
                totalDebt: vm.netWorthData.totalDebt
            };
            return debtCalculateService.calculatedNetWorth(vm.cashTotalData.totalAsset,
                vm.totalDebts)
        };
    }

}());