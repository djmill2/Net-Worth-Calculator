/**
 * Created by Don on 7/30/2018
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("assetResource",
                ["$resource",
                  assetResource]);

    function assetResource($resource) {
        return $resource("/api/assets/:assetId")
        // return $resource("/api/assets/:assetId") // sets up communication with the server
    }

}());