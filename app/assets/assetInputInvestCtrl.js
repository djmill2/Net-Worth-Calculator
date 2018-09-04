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
                "$scope",
                "assetCalculateService",
                AssetInputInvestCtrl]);

    function AssetInputInvestCtrl(assetResource, $state, $scope, assetCalculateService) {
        var vm = this;
        // Declaring and initializing the variables for this controller
        vm.investSubtotal = 0;

        // Completing the injection of the common services into the controller
        vm.assetCalculateService = assetCalculateService;
        // Get our Invested data object from the service
        vm.investData = assetCalculateService.getInvest();

        vm.assetResource = assetResource;
        // use this when accessing data from assetResource (aka database)
        /* assetResource.query(function (data) {
            vm.assets = data;
        }); */

        // Populate invest subtotal variable
        $scope.$watch("vm.investData", function handleChange(userInputVal) {
            vm.investSubtotal = parseFloat(userInputVal.brokerage) + parseFloat(userInputVal.taOther) +
                parseFloat(userInputVal.ira) + parseFloat(userInputVal.rothIra) + parseFloat(userInputVal.kb) +
                parseFloat(userInputVal.sepIra) + parseFloat(userInputVal.keogh) + parseFloat(userInputVal.pension) +
                parseFloat(userInputVal.annuity) + parseFloat(userInputVal.realEstate) + parseFloat(userInputVal.solePro) +
                parseFloat(userInputVal.partnership) + parseFloat(userInputVal.cCorporation) + parseFloat(userInputVal.sCorporation) +
                parseFloat(userInputVal.limitedLC) + parseFloat(userInputVal.boOther);
            vm.assetCalculateService.setInvest(userInputVal);
        }, true);

        /* Calculate the INVESTED assets subtotal */
        vm.calcInvestSubtotal = function () {
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
            vm.investData = {
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
            };
            return assetCalculateService.calculateInvestedSubtotal(vm.investData.brokerage,
                vm.investData.taOther, vm.investData.ira, vm.investData.rothIra, vm.investData.kb,
                vm.investData.sepIra, vm.investData.keogh, vm.investData.pension, vm.investData.annuity,
                vm.investData.realEstate, vm.investData.solePro, vm.investData.partnership,
                vm.investData.cCorporation, vm.investData.sCorporation, vm.investData.limitedLC,
                vm.investData.boOther);
        };

    }

}());

