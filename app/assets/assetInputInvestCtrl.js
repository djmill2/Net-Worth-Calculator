/**
 * Created by Don on 8/10/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetInputInvestCtrl",
            ["assetResource",
                "$state",
                "assetCalculateService",
                AssetInputInvestCtrl]);
    function AssetInputInvestCtrl(assetResource, $state, assetCalculateService) {
        var vm = this;

        // Invested View
        vm.brokerage = 0.00;
        vm.taOther = 0.00;
        vm.ira = 0.00;
        vm.rothIra = 0.00;
        vm.kb = 0.00;
        vm.sepIra = 0.00;
        vm.keogh = 0.00;
        vm.pension = 0.00;
        vm.annuity = 0.00;
        vm.realEstate = 0.00;
        vm.solePro = 0.00;
        vm.partnership = 0.00;
        vm.cCorporation = 0.00;
        vm.sCorporation = 0.00;
        vm.limitedLC = 0.00;
        vm.boOther = 0.00;

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        vm.assetCalculateService = assetCalculateService;

        /* Calculate the INVESTED assets subtotal */
        vm.calcInvestSubtotal = function() {
            return assetCalculateService.calculateInvestedSubtotal(vm.brokerage,
                vm.taOther, vm.ira, vm.rothIra, vm.kb, vm.sepIra, vm.keogh, vm.pension,
                vm.annuity, vm.realEstate, vm.solePro, vm.partnership, vm.cCorporation,
                vm.sCorporation, vm.limitedLC, vm.boOther);
        };

    }

}());
