/**
 * Created by Don on 8/8/2018
 */
(function () {
    "use strict";

    angular
        .module("netWorthCalculator")
        .controller("AssetAddDataCtrl",
            ["asset",
                "$state",
                "assetCalculateService",
                AssetAddDataCtrl]);

        function AssetAddDataCtrl(asset, $state, assetCalculateService) {
        var vm = this;

        vm.asset = asset;

            // used to assign page name to the edit and add pages
            if (vm.asset && vm.asset.assetId) {
                vm.title = "Add: " + vm.asset.assetName;
            }
            else {
                vm.title = "New Asset"
            }

            // calculate Cash Subtotal
            vm.asset.assetAmount = assetCalculateService.calculateCashSubtotal(
                vm.asset.checking, vm.asset.savings, vm.asset.moneyMarket, vm.asset.savingsBond,
                vm.asset.cds, vm.asset.cashValLifeIns
            );

            // used to open the date picker eventS
            vm.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = !vm.opened;
            };
        vm.submit = function () {
            vm.asset.$save(function (data) {
                    toastr.success("Save Successful");
                }
            );
        };

        vm.cancel = function () {
            $state.go('assetList');
        }

    }
}());