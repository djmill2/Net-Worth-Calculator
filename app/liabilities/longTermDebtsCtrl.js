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
        // Declaring and initializing the variables for this controller
        vm.longtermDebtSubtotal = 0;
        vm.totalLiability = 0;
        vm.netWorth = 0;

        // Completing the injection of the common services into the controller
        vm.assetCalculateService = assetCalculateService;
        vm.debtCalculateService = debtCalculateService;

        // Get Assets data object from the service
        vm.cashTotalData = assetCalculateService.getCashTotal();
        vm.totalAsset = vm.assetCalculateService.getTotal();
        // Get Debts data object from the common service
        vm.currentDebtsData = debtCalculateService.getCurrentDebt();
        vm.longTermDebtData = debtCalculateService.getLongTermDebt();
        vm.totalDebtData = debtCalculateService.getTotalDebt();
        // processes to use data service
        vm.assetResource = assetResource;
        vm.debtResource = debtResource;

        // Populate long-term debt subtotal variable
        $scope.$watch("vm.longTermDebtData", function handleChange(userInputVal) {
            vm.longtermDebtSubtotal = userInputVal.homeMortgage +
                userInputVal.homeEquity + userInputVal.mortgagesRental + userInputVal.vehiclesLoans +
                userInputVal.studentLoans + userInputVal.lifeInsuranceLoan + userInputVal.otherLongtermDebt;
            vm.debtCalculateService.setLongTermDebt(userInputVal);
            vm.totalLiability = vm.debtCalculateService.getTotal();
        }, true);

        /* Calculate the Long-term Debt subtotal */
        vm.calcLongtermDebtSubtotal = function () {
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
        // populate the total liabilities variable
        $scope.$watch("vm.totalDebtData", function handleChange(totalDebtData) {
            vm.totalLiability = totalDebtData.currentDebtSubtotal + totalDebtData.longtermDebtSubtotal;

        }, true);

        //Calculate the Total Debts
        vm.calcTotalDebts = function () {
            debtCalculateService.setTotalDebt({
                currentDebtSubtotal: vm.currentDebtsData.currentDebtSubtotal,
                longtermDebtSubtotal: vm.longTermDebtData.longtermDebtSubtotal
            });
            vm.totalDebtData = {
                currentDebtSubtotal: vm.currentDebtsData.currentDebtSubtotal,
                longtermDebtSubtotal: vm.longTermDebtData.longtermDebtSubtotal
            };
            return debtCalculateService.calculatedTotalDebts(vm.currentDebtsData.currentDebtSubtotal,
                vm.longTermDebtData.longtermDebtSubtotal)
        };

    }

}());