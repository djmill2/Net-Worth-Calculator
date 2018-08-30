/**
 * Created by Don on 7/30/2018
 */
(function () {
    "use strict";

    var app = angular.module("netWorthCalculator",
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
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html"
                })
                // Assets
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
                .state("debtCurrent", {
                    url: "/liabilities",
                    templateUrl: "app/liabilities/currentDebts.html",
                    controller: "CurrentDebtsCtrl as vm"
                })
                .state("debtLongTerm", {
                    url: "/liabilities",
                    templateUrl: "app/liabilities/longTermDebts.html",
                    controller: "LongTermDebtsCtrl as vm"
                })
        }]
    );

}());