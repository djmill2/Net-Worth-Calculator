/**
 * Created by Don on 8/20/2018
 */
(function () {
    "use strict";

    var app = angular
        .module("debtResourceMock",
            ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var debts = [
            {
                "debtId": 1,
                "debtName": "Credit Cards",
                "debtAmount": 0.00,
                "tags": ["creditCards"]
            },
            {
                "debtId": 2,
                "debtName": "Estimated Income Tax Owed",
                "debtAmount": 0.00,
                "tags": ["Estimated Income Tax Owed"]
            },
            {
                "debtId": 3,
                "debtName": "Outstanding Bills",
                "debtAmount": 0.00,
                "tags": ["outstanding bills"]
            },
            {
                "debtId": 4,
                "debtName": "Subtotal Current Debts",
                "debtAmount": 0.00,
                "tags": ["Subtotal Current Debts"]
            },
            {
                "debtId": 5,
                "debtName": "Home Mortgage",
                "tags": ["home mortgage"]
            },
            {
                "debtId": 6,
                "debtName": "Home Equity Line",
                "tags": ["home equity line"]
            },
            {
                "debtId": 7,
                "debtName": "Mortgages on rental properties",
                "tags": ["mortgages rental"]
            },
            {
                "debtId": 8,
                "debtName": "Vehicle Loans (Cars, Trucks, Boats)",
                "tags": ["vehicle"]
            },
            {
                "debtId": 9,
                "debtName": "Student Loans",
                "tags": ["student loans"]
            },
            {
                "debtId": 10,
                "debtName": "Life Insurance policy loans",
                "tags": ["life insurance policy loans"]
            },
            {
                "debtId": 11,
                "debtName": "Other long-term debt",
                "tags": ["other long-term debt"]
            },
            {
                "debtId": 12,
                "debtName": "Subtotal Long-term Debts",
                "debtAmount": 0.00,
                "tags": ["subtotal long-term debts"]
            },
            {
                "debtId": 13,
                "debtName": "Total Debts",
                "debtAmount": 0.00,
                "tags": ["total debts"]
            },
            {
                "debtId": 14,
                "debtName": "Net Worth",
                "debtAmount": 0.00,
                "tags": ["net worth"]
            }
        ];

        var debtUrl = "/api/liabilities";

        $httpBackend.whenGET(debtUrl).respond(debts);

        var editingRegex = new RegExp(debtUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var debt = {"debtId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < debts.length; i++) {
                    if (debts[i].debtId == id) {
                        debt = debts[i];
                        break;
                    }
                }
            }
            return [200, debt, {}];
        });

        // Save functionality
        $httpBackend.whenPOST(debtUrl).respond(function (method, url, data) {
            var debt = angular.fromJson(data);

            if (!debt.debtId) {
                // new debt ID
                debt.debtId = debts[debts.length - 1].debtId + 1;
                debts.push(debt);
            }
            else {
                // Updated debt
                for (var i = 0; i < debts.length; i++) {
                    if (debts[i].debtId == debt.debtId) {
                        debts[i] = debt;
                        break;
                    }
                }
            }
            return [200, debt, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    })
}());