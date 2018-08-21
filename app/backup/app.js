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
                            "assetResourceMock"]);

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
                    abstract: true,
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
                .state("assetsAddData.cash", {
                    url: "/cash",
                    templateUrl: "app/assets/assetInputCashView.html"
                })
                .state("assetsAddData.invest", {
                    url: "/invest",
                    templateUrl: "app/assets/assetInputInvestView.html"
                })
                .state("assetsAddData.use", {
                    url: "/use",
                    templateUrl: "app/assets/assetInputUseView.html"
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
                .state("liabilitiesList", {
                    url: "/liabilities",
                    templateUrl: "app/liabilities/liabilityListView.html",
                    controller: "LiabilityListCtrl as vm"
                })
        }]
    );
}());