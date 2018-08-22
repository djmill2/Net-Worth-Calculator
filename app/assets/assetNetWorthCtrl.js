/**
 * Created by Don on 8/10/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetNetWorthCtrl",
                    ["assetResource",
                     "$state",
                     "assetCalculateService",
                        AssetNetWorthCtrl]);
    function AssetNetWorthCtrl(assetResource, $state, assetCalculateService) {
        var vm = this;

        vm.formPersist = assetCalculateService.get();

        // Cash View
        vm.checking = 0.00;vm.savings = 0.00;vm.moneyMarket = 0.00;
        vm.savingsBond = 0.00;vm.cds = 0.00;vm.cashValLifeIns = 0.00;

        // Invested View
        vm.brokerage = 0.00;vm.taOther = 0.00;vm.ira = 0.00;vm.rothIra = 0.00;vm.kb = 0.00;vm.sepIra = 0.00;
        vm.keogh = 0.00;vm.pension = 0.00;vm.annuity = 0.00;vm.realEstate = 0.00;vm.solePro = 0.00;
        vm.partnership = 0.00;vm.cCorporation = 0.00;vm.sCorporation = 0.00;vm.limitedLC = 0.00;
        vm.boOther = 0.00;

        // Use View
        vm.principleHome = 0.00;vm.vacationHome = 0.00;vm.vehicles = 0.00;vm.homeFurnish = 0.00;vm.art = 0.00;
        vm.jewelry = 0.00;vm.uaOther = 0.00;



        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        vm.assetCalculateService = assetCalculateService;

        /* Calculate the CASH assets subtotal */
        vm.calcCashSubtotal = function() {
            return assetCalculateService.calculateCashSubtotal(vm.checking,
                vm.savings, vm.moneyMarket, vm.savingsBond, vm.cds, vm.cashValLifeIns);
        };

        /* Calculate the INVESTED assets subtotal */
        vm.calcInvestSubtotal = function() {
            return assetCalculateService.calculateInvestedSubtotal(vm.brokerage,
                vm.taOther, vm.ira, vm.rothIra, vm.kb, vm.sepIra, vm.keogh, vm.pension,
                vm.annuity, vm.realEstate, vm.solePro, vm.partnership, vm.cCorporation,
                vm.sCorporation, vm.limitedLC, vm.boOther);
        };

        /* Calculate the USE assets subtotal */
        vm.calcUseSubtotal = function() {
            return assetCalculateService.calculateUseSubtotal(vm.principleHome,
                vm.vacationHome, vm.vehicles, vm.homeFurnish, vm.art, vm.jewelry, vm.uaOther);
        };

        /* Calculate the USE assets subtotal */
        vm.calcTotalAssets = function() {
            return assetCalculateService.calculatedTotalAssets(vm.calculateCashSubtotal,
                vm.calculateInvestedSubtotal, vm.calculateUseSubtotal)
        };

    }

}());
