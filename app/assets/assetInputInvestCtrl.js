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

        vm.assetCalculateService = assetCalculateService;
        // Get our Invested data object from the service
        vm.investData = assetCalculateService.getInvest();

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        /* Calculate the INVESTED assets subtotal */
        vm.calcInvestSubtotal = function() {
            assetCalculateService.setInvest({
                brokerage: vm.investData.brokerage,
                taOther: vm.investData.taOther,
                ira: vm.investData.ira,
                rothIra: vm.investData.rothIra,
                kb: vm.investData.kb,
                sepIra: vm.investData.sepIra,
                keogh: vm.investData.keogh,
                pension: vm.investData.pension,
                annuity: vm.investData.annuity,
                realEstate: vm.investData.realEstate,
                solePro: vm.investData.solePro,
                partnership: vm.investData.partnership,
                cCorporation: vm.investData.cCorporation,
                sCorporation: vm.investData.sCorporation,
                limitedLC: vm.investData.limitedLC,
                boOther: vm.investData.boOther
            });
            return assetCalculateService.calculateInvestedSubtotal(vm.investData.brokerage,
                vm.investData.taOther, vm.investData.ira, vm.investData.rothIra, vm.investData.kb,
                vm.investData.sepIra, vm.investData.keogh, vm.investData.pension, vm.investData.annuity,
                vm.investData.realEstate, vm.investData.solePro, vm.investData.partnership,
                vm.investData.cCorporation, vm.investData.sCorporation, vm.investData.limitedLC,
                vm.investData.boOther);
        };

    }

}());

