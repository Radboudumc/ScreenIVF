app.controller("mainController", function ($scope, $http) {
    $scope.defaultLanguage = "nl-NL";
    $scope.showDisclaimer = true;
    $scope.load = function() {
        var lang = localStorage.getItem("language");
        if (lang === null)
            $scope.setLanguage($scope.defaultLanguage);
        else
            $scope.setLanguage(lang);

        $("body").fadeIn(1000);
    };

    $scope.setLanguage = function(lang) {
        localStorage.setItem("language", lang);
        $http.get("app/languages/" + lang + ".json")
            .then(
                function(success) {
                    $scope.text = angular.fromJson(success.data);
                },
                function(error) {
                    $scope.setLanguage($scope.defaultLanguage);
                });

        $("#navbar-collapse").collapse("hide");
    };
  
    $scope.depressie = function () {
        var value;
        try {
            value =
                $scope.screen.dep01 / 1 +
                $scope.screen.dep02 / 1 +
                $scope.screen.dep03 / 1 +
                $scope.screen.dep04 / 1 +
                $scope.screen.dep05 / 1 +
                $scope.screen.dep06 / 1 +
                $scope.screen.dep07 / 1;
        } catch (err) {
            value = null;
        }
        if (isNaN(value))
            value = null;
        return value;
    };
    $scope.depressieAtRisk = function() { return $scope.depressie() >= 4; };
    $scope.angst = function () {
        var value;
        try {
            value =
                (4 - $scope.screen.anx01 / 1) +
                (4 - $scope.screen.anx02 / 1) +
                (0 + $scope.screen.anx03 / 1) +
                (4 - $scope.screen.anx04 / 1) +
                (0 + $scope.screen.anx05 / 1) +
                (4 - $scope.screen.anx06 / 1) +
                (4 - $scope.screen.anx07 / 1) +
                (0 + $scope.screen.anx08 / 1) +
                (0 + $scope.screen.anx09 / 1) +
                (0 + $scope.screen.anx10 / 1);
        } catch (err) {
            value = null;
        }
        if (isNaN(value))
            value = null;
        return value;
    };
    $scope.angstAtRisk = function() { return $scope.angst() >= 24; };
    $scope.acceptatie = function () {
        var value;
        try {
            value = $scope.screen.acc02 / 1 +
                $scope.screen.acc03 / 1 +
                $scope.screen.acc07 / 1 +
                $scope.screen.acc09 / 1 +
                $scope.screen.acc10 / 1 +
                $scope.screen.acc12 / 1;
        } catch (err) {
            value = null;
        }
        if (isNaN(value))
            value = null;
        return value;
    };
    $scope.acceptatieAtRisk = function() { return $scope.acceptatie() <= 11; };
    $scope.hulpeloosheid = function () {
        var value;
        try {
            value = $scope.screen.acc01 / 1 +
                $scope.screen.acc04 / 1 +
                $scope.screen.acc05 / 1 +
                $scope.screen.acc06 / 1 +
                $scope.screen.acc08 / 1 +
                $scope.screen.acc11 / 1;
        } catch (err) {
            value = null;
        }
        if (isNaN(value))
            value = null;
        return value;
    };
    $scope.hulpeloosheidAtRisk = function() { return $scope.hulpeloosheid() >= 14; };
    $scope.socialesteun = function () {
        var value;
        try {
            value = $scope.screen.soc1 / 1 +
                $scope.screen.soc2 / 1 +
                $scope.screen.soc3 / 1 +
                $scope.screen.soc4 / 1 +
                $scope.screen.soc5 / 1;
        } catch (err) {
            value = null;
        }
        if (isNaN(value))
            value = null;
        return value;
    };
    $scope.socialesteunAtRisk = function() { return $scope.socialesteun() <= 15; };

    $scope.atRisk = function() {
        if ($scope.depressieAtRisk())
            return true;
        if ($scope.angstAtRisk())
            return true;
        if ($scope.acceptatieAtRisk())
            return true;
        if ($scope.hulpeloosheidAtRisk())
            return true;
        if ($scope.socialesteunAtRisk())
            return true;
        return false;
    };

    $scope.currentStep = 0;
    $scope.gotoStep = function(step) {
        if (step > $scope.currentStep)
            return;
        $scope.currentStep = step;
    };

});
