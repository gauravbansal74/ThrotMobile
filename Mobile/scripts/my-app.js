var myApp = new Framework7({animateNavBackIcon: true});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true, domCache: true, animateNavBackIcon: true});

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
var availofferurl = 'availOffer.php';
var showwallet = 'showWallet.php';
var redeemOffer = 'redeemOffer.php';




function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(locSuccess, locError);
}
function locSuccess(position) {
    initialize(position.coords.latitude, position.coords.longitude);



}



function locError(error) {

    myApp.alert('The position or the map could not be loaded.', 'Throt', function() {



    });

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
            var deals = "You have availed " + sessionStorage.getItem("deals") + " deals till now!";


            myApp.addNotification({
                title: 'Deals',
                message: deals
            });
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

                    li += '<li class="accordion-item"><a href="#" class="item-content item-link"> <div class="item-inner"><b>' + offername.offername + '</b></div></div></a> <div class="accordion-item-content"><div class="content-block"><br/><b>Offer Description</b>: ' + offername.offerdescription + '<br/><br/><b>Limit: </b>' + offername.offerlimit + '<br/><br/><b>Special Notes: </b>' + offername.offernotes + '<br/><br/><a href="#" class="avail-offer button button-big active" offerid=' + offername.offerid + '>Avail Offer</a></p></div></div></li>';
                });

                $$('#listc ul').html("");
                $$('#listc ul').append(li);
                //set up string for adding <li/>
            });

        }


    }

    else if (page.name === "wallet-screen")
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
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: ServerURL + showwallet,
                data: Object.toparams(da),
                cache: false
            }).done(function(msg) {
                info1 = msg;

                //set up string for adding <li/>
                var li = "";

                if (info1 == "")
                {
                    li = "<div>You havent availed any deal today, please avail!</div>";
                    $$('#listwallet ul').html("");
                    $$('#listwallet ul').append(li);

                    myApp.alert('You havent availed any deal today, please avail!', 'Throt', function() {

                        mainView.router.load({
                            pageName: 'offer-screen'
                        })

                    });



                }
                else
                {


                    //container for $li to be added
                    $.each(info1, function(id, offername, offerdescription, offerlimit, offerpicture, offernotes) {


                        if (offername.redeemed == "1")
                        {

                            li += '<a href="#" transaction=' + offername.transaction_code + ' class="item-link item-content"><div class="item-media"><img src="..." width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + offername.offername + '</div></div><div class="item-subtitle">' + offername.outletname + '</div></div></a></li>';

                        }
                        else
                        {

                            li += '<a href="#" transaction=' + offername.transaction_code + ' class="redeem-offer item-link item-content"><div class="item-media"><img src="..." width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + offername.offername + '</div></div><div class="item-subtitle">' + offername.outletname + '</div> <div class="item-text link">Redeem Offer</div></div></a></li>';
                        }

                    });

                    $$('#listwallet ul').html("");
                    $$('#listwallet ul').append(li);

                }




            });

        }


    }


    else if (page.name == "profile-screen")
    {

        var da = {
            phoneNumber: localStorage.getItem("phone"),
            action: "fetchData"
        };

        $.ajax({
            type: "POST",
            dataType: "json",
            url: registerurl,
            data: Object.toparams(da)
        }).done(function(msg) {




            $("#profileform").find('input[name="fullname"]').val(msg[0].fullName);
            $("#profileform").find('input[name="phonenumber"]').val(msg[0].phoneNumber);
            $("#profileform").find('input[name="password"]').val(msg[0].password);
//            $("#profileform").find('input[name="confpassword"]').val(msg[0].password);
            $("#profileform").find('input[name="email"]').val(msg[0].email);

        }).error(function(msgerr) {

            myApp.alert('Error' + msgerr, 'Throt', function() {

            });



        });

    }

});


$$(document).on('pageReinit', function(e) {
    // Page Data contains all required information about loaded and initialized page 
    var page = e.detail.page;



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
                data: Object.toparams(da)
            }).done(function(msg) {




                $("#profileform").find('input[name="fullname"]').val(msg[0].fullName);
                $("#profileform").find('input[name="phonenumber"]').val(msg[0].phoneNumber);
                $("#profileform").find('input[name="password"]').val(msg[0].password);

                $("#profileform").find('input[name="email"]').val(msg[0].email);

            }).error(function(msgerr) {

                myApp.alert('Error' + msgerr, 'Throt', function() {

                });


            });

        }



    }

    else if (page.name === "wallet-screen")
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
            };
            $.ajax({
                type: "POST",
                dataType: "json",
                url: ServerURL + showwallet,
                data: Object.toparams(da),
                cache: false
            }).done(function(msg) {
                info1 = msg;

                //set up string for adding <li/>
                var li = "";

                if (info1 == "")
                {
                    li = "<div>You havent availed any deal today, please avail!</div>";
                    $$('#listwallet ul').html("");
                    $$('#listwallet ul').append(li);

                    myApp.alert('You havent availed any deal today, please avail!', 'Throt', function() {

                        mainView.router.load({
                            pageName: 'offer-screen'
                        })

                    });



                }
                else
                {


                    //container for $li to be added
                    $.each(info1, function(id, offername, offerdescription, offerlimit, offerpicture, offernotes) {


                        if (offername.redeemed == "1")
                        {

                            li += '<a href="#" transaction=' + offername.transaction_code + ' class="item-link item-content"><div class="item-media"><img src="..." width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + offername.offername + '</div></div><div class="item-subtitle">' + offername.outletname + '</div></div></a></li>';

                        }
                        else
                        {

                            li += '<a href="#" transaction=' + offername.transaction_code + ' class="redeem-offer item-link item-content"><div class="item-media"><img src="..." width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + offername.offername + '</div></div><div class="item-subtitle">' + offername.outletname + '</div> <div class="item-text link">Redeem Offer</div></div></a></li>';
                        }

                    });

                    $$('#listwallet ul').html("");
                    $$('#listwallet ul').append(li);

                }




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

        }


    }

});

$$(document).on('click', '.avail-offer', function(event) {


    var offerid = $(this).attr("offerid");

    var da = {
        outletid: sessionStorage.getItem("Storeid"),
        offerid: offerid,
        phoneNumber: localStorage.getItem("phone"),
        userid: localStorage.getItem("userid")
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: ServerURL + availofferurl,
        data: Object.toparams(da)
    }).done(function(msg) {




        if (msg == "1")
        {

            myApp.alert('Offer availed successfully.', 'Throt', function() {

            });


        }
        else if (msg == "0")
        {
            myApp.alert('You have already availed this offer.', 'Throt', function() {

            });


        }

        else
        {
            myApp.alert('Some error', 'Throt', function() {

            });

        }

    }).error(function(msgerr) {

        myApp.alert('Error' + msgerr, 'Throt', function() {



        });


    });



});


$$(document).on('click', '.redeem-offer', function(event) {


    var transaction = $(this).attr("transaction");

    var da = {
        transactioncode: transaction,
        phoneNumber: localStorage.getItem("phone")
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: ServerURL + redeemOffer,
        data: Object.toparams(da)
    }).done(function(msg) {


        console.log(msg);

        if (msg == "1")
        {


            myApp.alert('Offer redeemed successfully.', 'Throt', function() {



            });





        }
        else
        {
            myApp.alert('Some error.', 'Throt', function() {



            });

        }

    }).error(function(msgerr) {
        myApp.alert('Error' + msgerr, 'Throt', function() {



        });


    });



});



$$('.back-page').on('click', function() {

    mainView.router.load({
        pageName: 'offer-screen',
        ignoreCache: true
    })

    mainView.router.refreshPage({
        pageName: 'offer-screen'
    })


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




            mainView.router.load({
                pageName: 'offer-screen'
            });

            myApp.closeModal();

        }
        else
        {
            myApp.alert('Please enter all the details', 'Throt', function() {



            });

        }

    }).error(function(msgerr) {
        myApp.alert('Error' + msgerr, 'Throt', function() {



        });



    });


});


$$('.btnsave').on('click', function() {

    var fullName = $("#profileform").find('input[name="fullname"]').val();
    var PhoneNumber = $("#profileform").find('input[name="phonenumber"]').val();
    var password = $("#profileform").find('input[name="password"]').val();
    var email = $("#profileform").find('input[name="email"]').val();
    var countryCode = "91";

    var da = {
        fullName: fullName,
        phoneNumber: PhoneNumber,
        password: password,
        email: email,
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

//            myApp.alert('Data Saved');

        }
        else
        {
            myApp.alert('Please enter all the details', 'Throt', function() {

            });

        }

    }).error(function(msgerr) {

        myApp.alert('Error' + msgerr, 'Throt', function() {

        });


    });


});


$$('.opensignin').on('click', function() {


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
            localStorage.setItem("userid", msg.loginData.id);
            sessionStorage.setItem("deals", msg.loginData.dealsAvailed);

            mainView.router.load({
                pageName: 'offer-screen'
            })


        }
        else if (msg.loginData.loginSuccess == "0")
        {
            myApp.alert('Please enter correct credentials', 'Throt', function() {

            });

        }

        else
        {

        }

    }).error(function(msgerr) {

        myApp.alert('Error' + msgerr, 'Throt', function() {

        });




    });


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






        });


$$('.getoffers').on('click', function() {

    initiate_geolocation();

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

            li += '<li class="info-go item-content" id="' + name.id + '"><div class="item-inner"><div class="item-title">' + name.name + '</div><div class="item-after"><span class="badge">' + parseFloat(name.distance).toFixed(2) + ' Kms</span></div></div></li>';
        });
        //append list to ul


// Append new items
        $$('#lisplace ul').html("");
        $$('#lisplace ul').append(li);



    });

}

$$(document).on('click', '.info-go', function(event) {
    var Storeid = $(this).attr("id");


    sessionStorage.removeItem("Storeid");
    sessionStorage.setItem("Storeid", Storeid);

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

            li += '<li class="accordion-item"><a href="#" class="item-content item-link"> <div class="item-inner"><b>' + offername.offername + '</b></div></div></a> <div class="accordion-item-content"><div class="content-block"><br/><b>Offer Description</b>: ' + offername.offerdescription + '<br/><br/><b>Limit: </b>' + offername.offerlimit + '<br/><br/><b>Special Notes: </b>' + offername.offernotes + '<br/><br/><a href="#" class="avail-offer button button-big active" offerid=' + offername.offerid + '>Avail Offer</a></p></div></div></li>';
        });

        $$('#listc ul').html("");
        $$('#listc ul').append(li);
        //set up string for adding <li/>
    });



    mainView.router.load({
        pageName: 'offer-detail-screen'
    })
});
