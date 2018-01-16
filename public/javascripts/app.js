var app = angular.module("myapp", []);

app.controller("homeCtrl", function($scope, $http) {
    $scope.holdername = window.localStorage.getItem("username");
    $scope.contacts = [];
    $http.get("/contacts/" + $scope.holdername).then((result) => {
        $scope.contacts = result.data.data;
    });

    $scope.addContact = function() {
        if($scope.name == undefined || $scope.email == undefined || $scope.phone == undefined ) {
            alert("Please input valid data");
        } else {
            $http.post("/addcontact", {
                name: $scope.name,
                email: $scope.email,
                number: $scope.phone,
                holder: window.localStorage.getItem("username")
            }).then(response => {
                $scope.contacts = response.data.data;
                console.log(response);
            })
        }
    }
    $scope.delete = function(id) {
        $http.post("/deletecontact", {id: id}).then(result => {
            $scope.contacts = result.data.data;
            console.log(result);
        });
    }
});