/**
 * Created by Don on 8/18/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetInputUseCtrl",
            ["assetResource",
                "$state",
                "assetCalculateService",
                AssetInputUseCtrl]);
    function AssetInputUseCtrl(assetResource, $state, assetCalculateService) {
        var vm = this;

        vm.assetCalculateService = assetCalculateService;
        // Get our Use data object from the service
        vm.useData = assetCalculateService.getUse();

        // Get our Cash Total data object from the service
        vm.cashTotalData = assetCalculateService.getCashTotal();

        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        // Calculate the USE assets subtotal */
        vm.calcUseSubtotal = function() {
            assetCalculateService.setUse({
                principleHome: vm.useData.principleHome,
                vacationHome: vm.useData.vacationHome,
                vehicles: vm.useData.vehicles,
                homeFurnish: vm.useData.homeFurnish,
                art: vm.useData.art,
                jewelry: vm.useData.jewelry,
                uaOther: vm.useData.uaOther,
            });
            return assetCalculateService.calculateUseSubtotal(vm.useData.principleHome,
                vm.useData.vacationHome, vm.useData.vehicles, vm.useData.homeFurnish,
                vm.useData.art, vm.useData.jewelry, vm.useData.uaOther);
        };

        /* Calculate the Cash Total assets  */
       vm.calcTotalAssets = function() {
            assetCalculateService.setCashTotal({
                subtotalCas: vm.cashTotalData.subtotalCas,
                subtotalInvest: vm.cashTotalData.subtotalInvest,
                subtotalUsed: vm.cashTotalData.subtotalUsed
            });
            return assetCalculateService.calculatedTotalAssets(vm.cashTotalData.subtotalCas,
                vm.cashTotalData.subtotalInvest, vm.cashTotalData.subtotalUsed);
        };

    }

}());
