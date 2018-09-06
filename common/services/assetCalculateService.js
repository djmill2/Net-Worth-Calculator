/**
 * Created by Don on 8/9/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("assetCalculateService",
            assetCalculateService);

    // Declare objects with keys and values
    function assetCalculateService() {
        var dataObj = {
            cashData: {
                checking: '0',
                savings: '0',
                cash: '0',
                moneyMarket: '0',
                savingsBond: '0',
                cds: '0',
                cashValLifeIns: '0'
            },
            investData: {
                brokerage: '0',
                taOther: '0',
                ira: '0',
                rothIra: '0',
                kb: '0',
                sepIra: '0',
                keogh: '0',
                pension: '0',
                annuity: '0',
                realEstate: '0',
                solePro: '0',
                partnership: '0',
                cCorporation: '0',
                sCorporation: '0',
                limitedLC: '0',
                boOther: '0'
            },
            useData: {
                principleHome: '0',
                vacationHome: '0',
                vehicles: '0',
                homeFurnish: '0',
                art: '0',
                jewelry: '0',
                uaOther: '0'
            },
            cashTotalData: {
                cashSubtotal: 0,
                investSubtotal: 0,
                useSubtotal: 0,
                assetsTotal: 0
            }
        };

        // Reusable method for subtotal calculations
        function calcSubTotal(obj) {
            var assetsSubTotal = 0;
            for (var prop in obj) {
                assetsSubTotal += parseFloat( obj[prop] );
            }
            return assetsSubTotal;
        }

        // Reusable method for total calculations
        function calcTotal(obj) {
            var assetsTotal = 0;
            for (var prop in obj.cashTotalData) {
                if (prop.indexOf('assetsTotal') === -1) {
                    assetsTotal += parseFloat( obj.cashTotalData[prop] );
                }
            }
            return assetsTotal;
        }

        // Declaring the various GETTER and SETTER Methods
        function getTotal() {
            dataObj.cashTotalData.assetsTotal = calcTotal(dataObj);
            return dataObj.cashTotalData.assetsTotal;
        }

        function setCash(data) {
            dataObj.cashData = data;
            dataObj.cashTotalData.cashSubtotal = calcSubTotal(data);
        }

        function getCash() {
            return dataObj.cashData;
        }

        function setInvest(data) {
            dataObj.investData = data;
            dataObj.cashTotalData.investSubtotal = calcSubTotal(data);
        }

        function getInvest() {
            return dataObj.investData;
        }

        function setUse(data) {
            dataObj.useData = data;
            dataObj.cashTotalData.useSubtotal = calcSubTotal(data);
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

        // Cash subtotal calculations
        function subtotalCash(checking, savings, cash, moneyMarket, savingsBond, cds, cashValLifeIns) {
            // Cash and Cash Equivalents
            var cashSubtotal = 0;
            subtotalCash = checking +
                savings +
                cash +
                moneyMarket +
                savingsBond +
                cds +
                cashValLifeIns;

            return cashSubtotal;
        }

        // Invested subtotal calculations
        function subtotalInvested(brokerage, taOther, ira, rothIra, kb, sepIra, keogh,
                                  pension, annuity, realEstate, solePro, partnership, cCorporation,
                                  sCorporation, limitedLC, boOther) {
            // Invested Assets
            var investSubtotal = 0;
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

            return investSubtotal;
        }

        // Use subtotal calculations
        function subtotalUse(principleHome, vacationHome, vehicles, homeFurnish, art, jewelry, uaOther) {
            // Use Assets
            var useSubTotal = 0;
            subtotalUse = principleHome +
                vacationHome +
                vehicles +
                homeFurnish +
                art +
                jewelry +
                uaOther;

            return useSubtotal;
        }

        // Total assets calculation
        function totalAssets(cashSubtotal, investSubtotal, useSubtotal) {
            // Total Assets
            var totalAsset = 0;
            totalAssets = cashSubtotal +
                investSubtotal +
                useSubtotal;

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
            get: get,
            getTotal: getTotal
        }

    }

}());
