/**
 * Created by Don on 8/9/2018
 */
(function () {
    "use strict";

    var f = assetCashForm;

    var checking, savings, moneyMarket, savingsBond, cds,
        cashValueLifeIns, subtotalCash, brokerage, taOther, ira, rothira,
        kb, sepira, keogh, pension, annuity, realEstate, solePro, partnership,
        cCorporation, sCorporation, limitedLC, boOther,  subtotalInvested, principleHome,
        vacationHome, vehicles, homeFurnish, art, jewelry, uaOther, subtotalUse, assetsTotal,

        creditCards, estimatedIncomeTax, outstandingBills, subtotalCurrent, homeMortgage, homeEquity,
        mortrent, carLoans, studentLoans, lifeInsLoans, oLongDebt, subtotalLongterm, liabilitiesTotal,
        networth;

    checking = f.checking.value - 0;
    savings = f.savings.value - 0;
    moneyMarket = f.moneyMarket.value - 0;
    savingsBond = f.savingsBond.value - 0;
    cds = f.cds.value - 0;
    cashValueLifeIns = f.cashValueLifeIns.value - 0;
    subtotalCash = f.subtotalCash.value - 0;

    brokerage = f.brokerage.value - 0;
    taOther = f.taOther.value - 0;
    ira = f.ira.value - 0;
    rothira = f.rothIra.value - 0;
    kb = f.kb.value - 0;
    sepira = f.sepIra.value - 0;
    keogh = f.keogh.value - 0;
    pension = f.pension.value - 0;
    annuity = f.annuity.value - 0;
    realEstate = f.realEstate.value - 0;
    solePro = f.solePro.value - 0;
    partnership = f.partnership.value - 0;
    cCorporation = f.cCorporation.value - 0;
    sCorporation = f.sCorporation.value - 0;
    limitedLC = f.limitedLC.value - 0;
    boOther = f.boOther.value - 0;
    subtotalInvested = f.subtotalInvested.value - 0;
    principleHome = f.principleHome.value - 0;
    vacationHome = f.vacationHome.value - 0;
    vehicles = f.vehicles.value - 0;
    homeFurnish = f.homeFurnish.value - 0;
    art = f.art.value - 0;
    jewelry = f.jewelry.value - 0;
    uaOther = f.uaOther.value - 0;
    subtotalUse = f.subtotalUse.value - 0;

    creditCards = f.creditCards.value - 0;
    estimatedIncomeTax = f.estimatedIncomeTax.value - 0;
    outstandingBills = f.outstandingBills.value - 0;
    subtotalCurrent = f.subtotalCurrent.value - 0;
    homeMortgage = f.homeMortgage.value - 0;
    homeEquity = f.homeEquity.value - 0;
    mortrent = f.mortrent.value - 0;
    carLoans = f.carLoans.value - 0;
    studentLoans = f.studentLoans.value - 0;
    lifeInsLoans = f.lifeInsLoans.value - 0;
    oLongDebt = f.oLongDebt.value - 0;
    subtotalLongterm = f.subtotalLongterm.value - 0;
    liabilitiesTotal = f.liabilitiesTotal.value - 0;

    angular
        .module("common.services")
        .factory("assetCalculateService",
            assetCalculateService);

    function assetCalculateService() {
        function subtotalCash(checking, savings, moneyMarket, savingsBond, cds, cashValLifeIns) {
            // Cash and Cash Equivalents
            var subtotalCash = 0;
            if (checking && savings && moneyMarket && savingsBond && cds && cashValLifeIns) {
                subtotalCash = (checking + savings + moneyMarket + savingsBond + cds + cashValLifeIns);
            }
            return subtotalCash;
        }


        function subtotalInvested(brokerage, taOther, ira, rothIra, kb, sepIra, keogh, pension, annuity,
                                  realEstate, solePro, partnership, cCorporation, sCorporation, limitedLC,
                                  boOther) {
            // Invested Assets
            var subtotalInvested = 0;

            if (brokerage && taOther && ira && rothIra && kb && sepIra && keogh &&
                pension && annuity && realEstate && solePro && partnership && cCorporation &&
                sCorporation && limitedLC && boOther) {
                subtotalInvested = (brokerage + taOther + ira + rothIra + kb + sepIra +
                    keogh + pension + annuity + realEstate + solePro + partnership + cCorporation +
                    sCorporation + limitedLC + boOther | currency);
            }

            return subtotalInvested;
        }

        function subtotalUse(principleHome, vacationHome, vehicles, homeFurnish, art, jewelry, uaOther) {
            // Use Assets
            var subtotalUse = 0;

            if (principleHome && vacationHome && vehicles && homeFurnish && art && jewelry && uaOther) {
                subtotalUse = (principleHome + vacationHome + vehicles + homeFurnish + art + jewelry +
                    uaOther | currency);
            }

            return subtotalUse;
        }

        function totalAssets(subtotalCash, subtotalInvested, subtotalUse) {
            // Total Assets
            var totalAssets = 0;

            if (subtotalCash && subtotalInvested && subtotalUse) {
                totalAssets = subtotalCash + subtotalInvested + subtotalUse | currency;
            }

            return totalAssets;
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
