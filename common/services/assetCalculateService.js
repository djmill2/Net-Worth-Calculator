/**
 * Created by Don on 8/9/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("assetCalculateService",
            assetCalculateService);

    function assetCalculateService() {
        var dataObj = {
            cashData: {
                checking: 0.00,
                savings: 0.00,
                moneyMarket: 0.00,
                savingsBond: 0.00,
                cds: 0.00,
                cashValLifeIns: 0.00
            },
            investData: {},
            useData: {}
        };

        function setCash(data) {
            dataObj.cashData = data;
        }

        function getCash() {
            return dataObj.cashData;
        }

        function setUse(data) {
            dataObj.useData = data;
        }

        function getUse() {
            return dataObj.useData;
        }

        function get() {
            return dataObj;
        }

        function subtotalCash(checking, savings, moneyMarket, savingsBond, cds, cashValLifeIns) {
            // Cash and Cash Equivalents
            var subtotalCas = 0;
            subtotalCash = checking +
                savings +
                moneyMarket +
                savingsBond +
                cds +
                cashValLifeIns;

            return subtotalCas;
        }


        function subtotalInvested(brokerage, taOther, ira, rothIra, kb, sepIra, keogh, pension, annuity,
            realEstate, solePro, partnership, cCorporation, sCorporation, limitedLC,
            boOther) {
            // Invested Assets

            var subtotalInvest = 0;
            subtotalInvested = brokerage +
                taOther +
                ira +
                rothIra +
                kb +
                sepIra +
                keogh +
                pension +
                annuity +
                realEstate +
                solePro +
                partnership +
                cCorporation +
                sCorporation +
                limitedLC +
                boOther;

            return subtotalInvest;
        }

        function subtotalUse(principleHome, vacationHome, vehicles, homeFurnish, art, jewelry, uaOther) {
            // Use Assets
            var subtotalUsed = 0;
            subtotalUse = principleHome +
                vacationHome +
                vehicles +
                homeFurnish +
                art +
                jewelry +
                uaOther;

            return subtotalUsed;
        }

        function totalAssets(subtotalCas, subtotalInvest, subtotalUsed) {
            // Total Assets
            var totalAsset = 0;
            totalAssets = subtotalCas +
                subtotalInvest +
                subtotalUsed;

            return totalAsset;
        }

        // public API
        return {
            calculateCashSubtotal: subtotalCash,
            calculateInvestedSubtotal: subtotalInvested,
            calculateUseSubtotal: subtotalUse,
            calculatedTotalAssets: totalAssets,
            setCash: setCash,
            getCash: getCash,
            setUse: setUse,
            getUse: getUse,
            get: get
        }

    }

}());
