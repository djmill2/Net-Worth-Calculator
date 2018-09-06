/**
 * Created by Don on 8/20/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("debtCalculateService",
            debtCalculateService);

    // Declare objects with keys and values
    function debtCalculateService() {
        var dataObj = {
            currentDebtsData: {
                creditCards: '0',
                incomeTaxOwed: '0',
                outstandingBills: '0'
            },
            longTermDebtData: {
                homeMortgage: '0',
                homeEquity: '0',
                mortgagesRental: '0',
                vehiclesLoans: '0',
                studentLoans: '0',
                lifeInsuranceLoan: '0',
                otherLongtermDebt: '0'
            },
            totalDebtData: {
                currentDebtSubtotal: 0,
                longtermDebtSubtotal: 0,
                debtsTotal: 0
            },
        };

        // Reusable method for subtotal calculations
        function calcSubTotal(obj) {
            var debtsSubTotal = 0;
            for (var prop in obj) {
                debtsSubTotal += parseFloat( obj[prop] );
            }
            return debtsSubTotal;
        }

        // Reusable method for total calculations
        function calcTotal(obj) {
            var debtsTotal = 0;
            for (var prop in obj.totalDebtData) {
                if (prop.indexOf('debtsTotal') === -1) {
                    debtsTotal += parseFloat( obj.totalDebtData[prop] );
                }
            }
            return debtsTotal;
        }

        // Declaring the various GETTER and SETTER Methods
        function getTotal() {
            dataObj.totalDebtData.debtsTotal = calcTotal(dataObj);
            return dataObj.totalDebtData.debtsTotal;
        }

        function setCurrentDebt(data) {
            dataObj.currentDebtsData = data;
            dataObj.totalDebtData.currentDebtSubtotal = calcSubTotal(data);
        }

        function getCurrentDebt() {
            return dataObj.currentDebtsData;
        }

        function setLongTermDebt(data) {
            dataObj.longTermDebtData = data;
            dataObj.totalDebtData.longtermDebtSubtotal = calcSubTotal(data);
        }

        function getLongTermDebt() {
            return dataObj.longTermDebtData;
        }

        function setTotalDebt(data) {
            dataObj.totalDebtData = data;
        }

        function getTotalDebt() {
            return dataObj.totalDebtData;
        }


        function get() {
            return dataObj;
        }

        // Long-term Debts calculations
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

        // Total Debts calculation
        function totalDebts(subtotalCurrentDebt, subtotalLongterm) {

            totalDebts = subtotalCurrentDebt + subtotalLongterm;

            return totalDebts;
        }

        // public API
        return {
            calculateLongtermDebtSubtotal: subtotalLongterm,
            calculatedTotalDebts: totalDebts,
            setCurrentDebt: setCurrentDebt,
            getCurrentDebt: getCurrentDebt,
            setLongTermDebt: setLongTermDebt,
            getLongTermDebt: getLongTermDebt,
            setTotalDebt: setTotalDebt,
            getTotalDebt: getTotalDebt,
            get: get,
            getTotal: getTotal,
        }

    }

}());
