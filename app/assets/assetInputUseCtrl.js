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
                "$scope",
                "assetCalculateService",
                AssetInputUseCtrl]);

    function AssetInputUseCtrl(assetResource, $state, $scope, assetCalculateService) {
        var vm = this;
        // Declaring and initializing the variables for this controller
        vm.useSubtotal = 0;
        vm.totalAsset = 0;

        // Completing the injection of the common services into the controller
        vm.assetCalculateService = assetCalculateService;
        // Get our Use data objects from the service
        vm.cashData = assetCalculateService.getCash();
        vm.investData = assetCalculateService.getInvest();
        vm.useData = assetCalculateService.getUse();
        // Get our Cash Total data object from the service
        vm.cashTotalData = assetCalculateService.getCashTotal();

        vm.assetResource = assetResource;
        // use this when accessing data from assetResource (aka database)
        /* assetResource.query(function (data) {
            vm.assets = data;
        }); */

        // Populate USE subtotal variable
        $scope.$watch("vm.useData", function handleChange(userInputVal) {
            vm.useSubtotal = parseFloat(userInputVal.principleHome) +
                parseFloat(userInputVal.vacationHome) + parseFloat(userInputVal.vehicles) + parseFloat(userInputVal.homeFurnish) +
                parseFloat(userInputVal.art) + parseFloat(userInputVal.jewelry) + parseFloat(userInputVal.uaOther);
            vm.assetCalculateService.setUse(userInputVal);
            vm.totalAsset = vm.assetCalculateService.getTotal();
        }, true);

        // Calculate the USE assets subtotal */
        vm.calcUseSubtotal = function () {
            assetCalculateService.setUse({
                principleHome: vm.useData.principleHome,
                vacationHome: vm.useData.vacationHome,
                vehicles: vm.useData.vehicles,
                homeFurnish: vm.useData.homeFurnish,
                art: vm.useData.art,
                jewelry: vm.useData.jewelry,
                uaOther: vm.useData.uaOther
            });
            vm.useData = {
                principleHome: vm.useData.principleHome,
                vacationHome: vm.useData.vacationHome,
                vehicles: vm.useData.vehicles,
                homeFurnish: vm.useData.homeFurnish,
                art: vm.useData.art,
                jewelry: vm.useData.jewelry,
                uaOther: vm.useData.uaOther
            };
            return assetCalculateService.calculateUseSubtotal(vm.useData.principleHome,
                vm.useData.vacationHome, vm.useData.vehicles, vm.useData.homeFurnish,
                vm.useData.art, vm.useData.jewelry, vm.useData.uaOther);
        };

        // Populate asset total variable
        $scope.$watch("vm.cashTotalData", function handleChange(cashTotalData) {
            vm.totalAsset = cashTotalData.cashSubtotal + cashTotalData.investSubtotal + cashTotalData.useSubtotal;
        }, true);

        /* Calculate the Total assets  */
        vm.calcTotalAssets = function () {
            assetCalculateService.setCashTotal({
                cashSubtotal: vm.cashData.cashSubtotal,
                investSubtotal: vm.investData.investSubtotal,
                useSubtotal: vm.useData.useSubtotal
            });
            vm.cashTotalData = {
                cashSubtotal: vm.cashData.cashSubtotal,
                investSubtotal: vm.investData.investSubtotal,
                useSubtotal: vm.useData.useSubtotal
            };
            return assetCalculateService.calculatedTotalAssets(vm.cashData.cashSubtotal,
                vm.investData.investSubtotal, vm.useData.useSubtotal);
        };

    }

}());
