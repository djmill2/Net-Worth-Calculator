/**
 * Created by Don on 7/30/2018
 */
(function () {
    "use strict";

    var  app = angular.module("netWorthCalculator",
                            ["common.services",
                            "ui.router",
                            "ui.mask",
                            "ui.bootstrap",
                            "assetResourceMock",
                            "debtResourceMock"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Please contact the Help Desk! \n Message: " +
                            exception.message;
                        $delegate(exception, cause);
                        alert(exception.message);
                    };
                }]);
    });

    app.config(["$stateProvider",
                "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })
                // Assets
                .state("assetsAddData", {
                    url: "/assets/addData/:assetId",
                    templateUrl: "app/assets/assetAddDataView.html",
                    controller: "AssetAddDataCtrl as vm",
                    resolve: {
                        assetResource: "assetResource",

                        asset: function (assetResource, $stateParams) {
                            var assetId = $stateParams.assetId;
                            return assetResource.get({ assetId: assetId }).$promise;
                        }
                    }
                })
                .state("allAssets", {
                    url: "/assets",
                    templateUrl: "app/assets/allAssets.html",
                    controller: "AssetNetWorthCtrl as vm"
                })
                .state("assetList", {
                    url: "/backup",
                    templateUrl: "app/backup/assetListView.html",
                    controller: "AssetListCtrl as vm"
                })
                .state("assetsCashData", {
                    url: "/assets/cash",
                    templateUrl: "app/assets/assetInputCashView.html",
                    controller: "AssetInputCashCtrl as vm"
                })
                .state("assetsInvestedData", {
                    url: "/assets/invested",
                    templateUrl: "app/assets/assetInputInvestView.html",
                    controller: "AssetInputInvestCtrl as vm"
                })
                .state("assetsUseData", {
                    url: "/assets/use",
                    templateUrl: "app/assets/assetInputUseView.html",
                    controller: "AssetInputUseCtrl as vm"
                })
                .state("assetDetail", {
                    url: "/assets/:assetId",
                    templateUrl: "app/assets/assetDetailView.html",
                    controller: "AssetDetailCtrl as vm",
                    resolve: {
                        assetResource: "assetResource",

                        asset: function (assetResource, $stateParams) {
                            var assetId = $stateParams.assetId;
                            return assetResource.get({ assetId: assetId }).$promise;
                        }
                    }
                })
                .state("allLiabilities", {
                    url: "/liabilities",
                    templateUrl: "app/liabilities/allLiabilities.html",
                    controller: "LiabilityAllCtrl as vm"
                })
        }]
    );


}());