/**
 * Created by Don on 7/30/2018
 */
(function () {
    "use strict";

    var app = angular
                .module("assetResourceMock",
                        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var assets = [
            {"assetId": 1,
                "assetName": "Checking",
                "assetAmount": 0.00,
                "tags": [ "checking" ]
            },
            {"assetId": 2,
                "assetName": "Savings",
                "assetAmount": 0.00,
                "tags": [ "savings" ]
            },
            {"assetId": 3,
                "assetName": "Money Market",
                "assetAmount": 0.00,
                "tags": [ "money market" ]
            },
            {"assetId": 4,
                "assetName": "Savings Bonds",
                "assetAmount": 0.00,
                "tags": [ "savings bonds" ]
            },
            {"assetId": 5,
                "assetName": "CD's",
                "assetAmount": 0.00,
                "tags": [ "cd" ]
            },
            {"assetId": 6,
                "assetName": "Cash value Life Insurance",
                "assetAmount": 0.00,
                "tags": [ "cash value" ]
            },
            {"assetId": 7,
                "assetName": "Subtotal Cash",
                "assetAmount": 0.00,
                "tags": ["subtotal cash"]
            },
            {"assetId": 8,
                "assetName": "Brokerage",
                "tags": [ "brokerage" ]
            },
            {"assetId": 9,
                "assetName": "Other Taxable",
                "tags": [ "otherTaxable" ]
            },
            {"assetId": 10,
                "assetName": "IRA",
                "tags": [ "ira" ]
            },
            {"assetId": 11,
                "assetName": "Roth IRA",
                "tags": [ "roth" ]
            },
            {"assetId": 12,
                "assetName": "401(k) or 403(k)",
                "tags": [ "401k403k" ]
            },
            {"assetId": 13,
                "assetName": "SEP-IRA",
                "tags": [ "sepira" ]
            },
            {"assetId": 14,
                "assetName": "Keogh or other qualified plan",
                "tags": [ "keogh" ]
            },
            {"assetId": 15,
                "assetName": "Pension",
                "tags": [ "pension" ]
            },
            {"assetId": 16,
                "assetName": "Annuity (accumulated value)",
                "tags": [ "cash value" ]
            },
            {"assetId": 17,
                "assetName": "Real Estate (rental property or land)",
                "tags": [ "realestate" ]
            },
            {"assetId": 18,
                "assetName": "Sole proprietorship",
                "tags": [ "sole" ]
            },
            {"assetId": 19,
                "assetName": "Partnership",
                "tags": [ "partnership" ]
            },
            {"assetId": 20,
                "assetName": "C Corporation",
                "tags": [ "c" ]
            },
            {"assetId": 21,
                "assetName": "S Corporation",
                "tags": [ "s" ]
            },
            {"assetId": 22,
                "assetName": "Limited liability company (LLC)",
                "tags": [ "llc" ]
            },
            {"assetId": 23,
                "assetName": "Other Business ownership",
                "tags": [ "otherBusiness" ]
            },
            {"assetId": 24,
                "assetName": "Subtotal Invested",
                "assetAmount": 0.00,
                "tags": ["subtotal invested"]
            },
            {"assetId": 25,
                "assetName": "Principle home",
                "tags": [ "principleHome" ]
            },
            {"assetId": 26,
                "assetName": "Vacation Home",
                "tags": [ "vacationHome" ]
            },
            {"assetId": 27,
                "assetName": "Vehicles (Cars, Trucks Boats)",
                "tags": [ "vehicles" ]
            },
            {"assetId": 28,
                "assetName": "Home Furnishings",
                "tags": [ "homeFurnishings" ]
            },
            {"assetId": 29,
                "assetName": "Art, antiques, coins, collectibles",
                "tags": [ "art" ]
            },
            {"assetId": 30,
                "assetName": "Jewelry, furs",
                "tags": [ "jewelry" ]
            },
            {"assetId": 31,
                "assetName": "Other Use assets",
                "tags": [ "otherUse" ]
            },
            {"assetId": 32,
                "assetName": "Subtotal Use Assets",
                "assetAmount": 0.00,
                "tags": ["subtotal use"]
            },
            {"assetId": 33,
                "assetName": "Total Assets",
                "assetAmount": 0.00,
                "tags": ["total assets"]
            }
        ];

        var assetUrl = "/api/assets";

        $httpBackend.whenGET(assetUrl).respond(assets);

        var editingRegex = new RegExp(assetUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var asset = {"assetId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < assets.length; i++) {
                    if (assets[i].assetId == id) {
                        asset = assets[i];
                        break;
                    }
                }
            }
            return [200, asset, {}];
        });

        // Save functionality
        $httpBackend.whenPOST(assetUrl).respond(function (method, url, data) {
            var asset = angular.fromJson(data);

            if (!asset.assetId) {
                // new asset ID
                asset.assetId = assets[assets.length - 1].assetId + 1;
                assets.push(asset);
            }
            else {
                // Updated asset
                for (var i = 0; i < assets.length; i++) {
                    if (assets[i].assetId == asset.assetId) {
                        assets[i] = asset;
                        break;
                    }
                }
            }
            return [200, asset, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    })
}());