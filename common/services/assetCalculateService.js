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
            investData: {
                brokerage: 0.00,
                taOther: 0.00,
                ira: 0.00,
                rothIra: 0.00,
                kb: 0.00,
                sepIra: 0.00,
                keogh: 0.00,
                pension: 0.00,
                annuity: 0.00,
                realEstate: 0.00,
                solePro: 0.00,
                partnership: 0.00,
                cCorporation: 0.00,
                sCorporation: 0.00,
                limitedLC: 0.00,
                boOther: 0.00
            },
            useData: {
                principleHome: 0.00,
                vacationHome: 0.00,
                vehicles: 0.00,
                homeFurnish: 0.00,
                art: 0.00,
                jewelry: 0.00,
                uaOther: 0.00
            },
            cashTotalData: {
                subtotalCas: 0.00,
                subtotalInvest: 0.00,
                subtotalUsed: 0.00
            }
        };
        function setCash(data) {
            dataObj.cashData = data;
        }
        function getCash() {
            return dataObj.cashData;
        }
        function setInvest(data) {
            dataObj.investData = data;
        }
        function getInvest() {
            return dataObj.investData;
        }
        function setUse(data) {
            dataObj.useData = data;
        }
        function getUse() {
            return dataObj.useData;
        }
        function setCashTotal(data) {
            dataObj.cashTotalData = data;
        }
        function getCashTotal() {
            return dataObj.cashTotalData;
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


        function subtotalInvested(brokerage, taOther, ira, rothIra, kb, sepIra, keogh,
            pension, annuity, realEstate, solePro, partnership, cCorporation,
            sCorporation, limitedLC, boOther) {
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
            totalAssets = cashData.subtotalCas +
                investData.subtotalInvest +
                useData.subtotalUsed;

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
            setInvest: setInvest,
            getInvest: getInvest,
            setUse: setUse,
            getUse: getUse,
            setCashTotal: setCashTotal,
            getCashTotal: getCashTotal,
            get: get
        }

    }

}());
