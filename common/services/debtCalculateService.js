/**
 * Created by Don on 8/20/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("debtCalculateService",
            debtCalculateService);

    function debtCalculateService() {
        var dataObj = {
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
