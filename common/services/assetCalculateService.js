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
            calculatedTotalAssets: totalAssets
        }

    }

}());
