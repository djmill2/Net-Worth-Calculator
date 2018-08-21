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

        // Use View
        vm.principleHome = 0.00;
        vm.vacationHome = 0.00;
        vm.vehicles = 0.00;
        vm.homeFurnish = 0.00;
        vm.art = 0.00;
        vm.jewelry = 0.00;
        vm.uaOther = 0.00;
        vm.subtotalCas = 0.00;
        vm.subtotalInvest = 0.00;
        vm.subtotalUsed = 0.00;



        //vm.assetResource = assetResource;
        assetResource.query(function(data) {
            vm.assets = data;
        });

        vm.assetCalculateService = assetCalculateService;

        // Calculate the USE assets subtotal */
        vm.calcUseSubtotal = function() {
            return assetCalculateService.calculateUseSubtotal(vm.principleHome,
                vm.vacationHome, vm.vehicles, vm.homeFurnish, vm.art, vm.jewelry, vm.uaOther);
        };

        /* Calculate the USE assets subtotal */
        vm.calcTotalAssets = function() {
            return assetCalculateService.calculatedTotalAssets(vm.subtotalCas,
                vm.subtotalInvest, vm.subtotalUsed)
        };

    }

}());
