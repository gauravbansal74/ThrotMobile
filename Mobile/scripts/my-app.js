var myApp = new Framework7({animateNavBackIcon: true});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true, domCache: true});

var loginurl = 'http://buzzxprs.com/throt/login.php';
var registerurl = 'http://buzzxprs.com/throt/userDetail.php';
var map;
var currentPosition;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var sublocality_level_1 = '';
var postal_code = '';
var sublocality_level_2 = '';
var route = '';
var premise = '';
var info = '';
var info1 = '';
var ServerURL = 'http://buzzxprs.com/throt/';




function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(locSuccess, locError);
}
function locSuccess(position) {
    initialize(position.coords.latitude, position.coords.longitude);



}



function locError(error) {
    alert("The position or the map could not be loaded.");
}


// In page events:
$$(document).on('pageInit', function(e) {
    // Page Data contains all required information about loaded and initialized page 
    var page = e.detail.page;
    
    console.log(page);

    if (page.name === "offer-screen")
    {
        if (localStorage.getItem("phone") === null) {
            mainView.router.load({
                pageName: 'login-screen'
            })
        }
        else
        {
        
        }

    }
     if (page.name === "login-screen")
    {
        if (localStorage.getItem("phone") === null) {
            mainView.router.load({
                pageName: 'login-screen'
            })
        }
        else
        {
           mainView.router.load({
                pageName: 'offer-screen'
            })
        }

    }
    

    else if (page.name == "profile-screen")
    {
        
        if (localStorage.getItem("phone") === null) {
            mainView.router.load({
                pageName: 'login-screen'
            })
        }
        else
        {
            
              var da = {
            phoneNumber: localStorage.getItem("phone"),
            action: "fetchData"

        };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: registerurl,
            data: Object.toparams(da),
            cache: false
        }).done(function(msg) {

            console.log(msg);
        });
        }

     

    }


    else if (page.name === "offer-detail-screen")
    {
         if (localStorage.getItem("phone") === null) {
            mainView.router.load({
                pageName: 'login-screen'
            })
        }
        else
        {
              $.ajax({
            type: "POST",
            dataType: "json",
            url: ServerURL + "getOffers.php?id=" + sessionStorage.getItem("Storeid"),
            cache: false
        }).done(function(msg) {
            info1 = msg;
            //set up string for adding <li/>
            var li = "";
            //container for $li to be added
            $.each(info1, function(id, offername, offerdescription, offerlimit, offerpicture, offernotes) {

                li += '<li class="accordion-item"><a href="#" class="item-content item-link"> <div class="item-inner"><b>' + offername.offername + '</b></div></div></a> <div class="accordion-item-content"><div class="content-block"><br/><b>Offer Description</b>: ' + offername.offerdescription + '<br/><br/><b>Limit: </b>' + offername.offerlimit + '<br/><br/><b>Special Notes: </b>' + offername.offernotes + '</p></div></div></li>';
            });

            $$('#listc ul').html("");
            $$('#listc ul').append(li);
            //set up string for adding <li/>
        });
        
        }
      

    }

});

$$('.btnsignup').on('click', function() {

    var fullName = $("#signupform").find('input[name="fullname"]').val();
    var PhoneNumber = $("#signupform").find('input[name="phonenumber"]').val();
    var password = $("#signupform").find('input[name="password"]').val();
    var confpassword = $("#signupform").find('input[name="confpassword"]').val();
    var countryCode = "91";

    var da = {
        fullName: fullName,
        phoneNumber: PhoneNumber,
        password: password,
        countryCode: countryCode,
        action: "saveData"
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: registerurl,
        data: Object.toparams(da)
    }).done(function(msg) {




        if (msg == "1" || msg == "2")
        {



            myApp.alert('You have successfully signed up.');
            mainView.router.load({
                pageName: 'offer-screen'
            });
            
            myApp.closeModal();

        }
        else
        {
            myApp.alert('Please enter all the details');
        }

    }).error(function(msgerr) {

        myApp.alert('Error' + msgerr);

    });


});

$$('.opensignin').on('click', function() {
    myApp.confirm('Are you sure?', 'Login',
            function() {

                var PhoneNumber = $("#loginform").find('input[name="phone"]').val();
                var password = $("#loginform").find('input[name="password"]').val();

                var da = {
                    phoneNumber: PhoneNumber,
                    password: password
                };
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: loginurl,
                    data: Object.toparams(da)
                }).done(function(msg) {

                    if (msg.loginData.loginSuccess == "1")
                    {
                        localStorage.setItem("phone", PhoneNumber);

                        myApp.alert('You have successfully signed in.');

                        mainView.router.load({
                            pageName: 'offer-screen'
                        })


                    }
                    else
                    {
                        myApp.alert('Please enter correct credentials');
                    }

                }).error(function(msgerr) {

                    myApp.alert('Error' + msgerr);

                });



            },
            function() {

            }
    );
});


Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + obj[key]);
    }
    return p.join('&');
}



angular.module("myapp", [])
        .controller("MyController", function($scope, $http) {
            $scope.myData = {};

            $scope.myData.doClick = function(item, event) {


                var da = {
                    phoneNumber: $scope.user.phone,
                    password: $scope.user.password
                };


                $http({
                    method: "post",
                    url: loginurl,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: Object.toparams(da)
                }).success(function(result) {
                    console.log(result);
                });

            }



            $scope.getoffers = function() {

                initiate_geolocation();


            }



        });


$$('.open-signup').on('click', function() {
    myApp.popup('.popup-signup');
});


function initialize(lat, lon)
{

    currentPosition = new google.maps.LatLng(lat, lon);
    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();




    $.ajax({
        type: "POST",
        dataType: "json",
        url: ServerURL + "placesearch.php?lat=" + lat + "&lng=" + lon + "&radius=5",
        cache: false
    }).done(function(msg) {


        info = msg;

        var li = '';
        //container for $li to be added
        $.each(info, function(i, name, distance) {

            li += '<li class="item-content"><div class="item-inner"><div class="item-title"><a href="#offer-detail-screen" id="' + name.id + '" class="info-go">' + name.name + '</a></div><div class="item-after"><span class="badge">' + parseFloat(name.distance).toFixed(2) + ' Kms</span></div></div></li>';
        });
        //append list to ul


// Append new items
        $$('.list-block ul').append(li);


        $$('.info-go').on('click', function() {
            var Storeid = $(this).attr("id");


            sessionStorage.setItem("Storeid", Storeid);

//mainView.router.load({
//    url: 'newhtml.html#'
//})
        });

    });

}