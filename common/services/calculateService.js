/**
 * Created by Don on 8/9/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("calculateService",
            calculateService);

    function calculateService() {
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
                subtotalUsed: 0.00,
                totalAsset: 0.00
            },
            currentDebtsData: {
                creditCards: 0.00,
                incomeTaxOwed: 0.00,
                outstandingBills: 0.00
            },
            longTermDebtData: {
                homeMortgage: 0.00,
                homeEquity: 0.00,
                mortgagesRental: 0.00,
                vehiclesLoans: 0.00,
                studentLoans: 0.00,
                lifeInsuranceLoan: 0.00,
                otherLongtermDebt: 0.00
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
        function setCurrentDebt(data) {
            dataObj.currentDebtsData = data;
        }
        function getCurrentDebt() {
            return dataObj.currentDebtsData;
        }
        function setLongTermDebt(data) {
            dataObj.longTermDebtData = data;
        }
        function getLongTermDebt() {
            return dataObj.longTermDebtData;
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
            totalAssets = subtotalCas +
                subtotalInvest +
                subtotalUsed;

            return totalAsset;
        }

        // Current Debts
        function subtotalCurrentDebt(creditCards, incomeTaxOwed, outstandingBills) {
            subtotalCurrentDebt = creditCards +
                incomeTaxOwed +
                outstandingBills;

            return subtotalCurrentDebt;
        }
        // Long-term Debts
        function subtotalLongterm(homeMortgage, homeEquity, mortgagesRental, vehiclesLoans,
                                  studentLoans, lifeInsuranceLoan, otherLongtermDebt) {
            subtotalLongterm = homeMortgage +
                homeEquity +
                mortgagesRental +
                vehiclesLoans +
                studentLoans +
                lifeInsuranceLoan +
                otherLongtermDebt;

            return subtotalLongterm;
        }

        // Total Debts
        function totalDebts(subtotalCurrentDebt, subtotalLongterm) {

            totalDebts = subtotalCurrentDebt + subtotalLongterm;

            return totalDebts;
        }

        // Net Worth
        function netWorth(totalAssets, totalDebts) {

            netWorth = totalAssets - totalDebts;

            return netWorth;
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
            calculateCurrentDebtsSubtotal: subtotalCurrentDebt,
            calculateLongtermDebtSubtotal: subtotalLongterm,
            calculatedTotalDebts: totalDebts,
            calculatedNetWorth: netWorth,
            setCurrentDebt: setCurrentDebt,
            getCurrentDebt: getCurrentDebt,
            setLongTermDebt: setLongTermDebt,
            getLongTermDebt: getLongTermDebt,
            get: get
        }

    }

}());
