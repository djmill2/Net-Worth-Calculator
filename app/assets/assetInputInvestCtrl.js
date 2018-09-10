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
                "$filter",
                AssetInputInvestCtrl]);

    function AssetInputInvestCtrl(assetResource, $state, $scope, assetCalculateService, $filter) {
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
            vm.investSubtotal = parseFloat(userInputVal.brokerage.replace(/,/g, '')) + parseFloat(userInputVal.taOther.replace(/,/g, '')) +
                parseFloat(userInputVal.ira.replace(/,/g, '')) + parseFloat(userInputVal.rothIra.replace(/,/g, '')) +
                parseFloat(userInputVal.kb.replace(/,/g, '')) + parseFloat(userInputVal.sepIra.replace(/,/g, '')) +
                parseFloat(userInputVal.keogh.replace(/,/g, '')) + parseFloat(userInputVal.pension.replace(/,/g, '')) +
                parseFloat(userInputVal.annuity.replace(/,/g, '')) + parseFloat(userInputVal.realEstate.replace(/,/g, '')) +
                parseFloat(userInputVal.solePro.replace(/,/g, '')) + parseFloat(userInputVal.partnership.replace(/,/g, '')) +
                parseFloat(userInputVal.cCorporation.replace(/,/g, '')) + parseFloat(userInputVal.sCorporation.replace(/,/g, '')) +
                parseFloat(userInputVal.limitedLC.replace(/,/g, '')) + parseFloat(userInputVal.boOther.replace(/,/g, ''));
            vm.assetCalculateService.setInvest(userInputVal);
        }, true);

        // Check on Focus if user inputs have a value and set to empty if not
        vm.handleZeroOnFocus = function (amount) {
            if (amount === 0 || amount === '0' || amount === '0.00') {
                return '';
            } else {
                return amount.replace(/,/g, '');
            }
        };

        vm.returnOnBlur = function (amount) {
            if (amount === '') {
                return '0';
            } else if (amount.indexOf(',') !== -1) {
                var newAmount = amount.replace(/,/g, '');
                return $filter('number')(newAmount)
            } else {
                return $filter('number')(amount);
            }
        };

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

