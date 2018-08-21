/**
 * Created by Don on 8/20/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("debtResource",
            ["$resource",
                debtResource]);

    function debtResource($resource) {
        return $resource("/api/liabilities/:debtId")
        // return $resource("/api/assets/:assetId") // sets up communication with the server
    }

}());