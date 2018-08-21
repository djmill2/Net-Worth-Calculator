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
        // Current Debts
        function subtotalCurrent(creditCards, incomeTaxOwed, outstandingBills) {
            subtotalCurrent = creditCards +
                incomeTaxOwed +
                outstandingBills;

            return subtotalCurrent;
        }

        // Long-term Debts
        function subtotalLongterm(homeMortgage, homeEquity, mortgagesRental, vehiclesLoans, lifeInsuranceLoan, otherLongtermDebt) {
            subtotalLongterm = homeMortgage +
                homeEquity +
                mortgagesRental +
                vehiclesLoans +
                lifeInsuranceLoan +
                otherLongtermDebt;

            return subtotalLongterm;
        }

        // Total Debts
        function totalDebts(subtotalCurrent, subtotalLongterm) {

            totalDebts = subtotalCurrent + subtotalLongterm;

            return totalDebts;
        }

        // Net Worth
        function netWorth(totalAssets, totalDebts) {

            netWorth = totalAssets - totalDebts;

            return netWorth;
        }
        // public API
        return {
            calculateCurrentDebtsSubtotal: subtotalCurrent,
            calculateLongtermDebtSubtotal: subtotalLongterm,
            calculatedTotalDebts: totalDebts,
            calculatedNetWorth: netWorth
        }

    }

}());
