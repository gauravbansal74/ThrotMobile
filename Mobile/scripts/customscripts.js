	var map;
	var currentPosition;
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var sublocality_level_1 ='';
	var postal_code = '';
	var sublocality_level_2 = '';
	var route = '';
	var premise = '';
	var info = '';
	var info1 = '';
	var ServerURL = 'http://buzzxprs.com/throt/';
	jQuery(window).ready(function(){
		$("#btnInit").click(function(){
		initiate_geolocation();
		});
    });
    function initiate_geolocation() {
		navigator.geolocation.getCurrentPosition(locSuccess, locError);
	}
	function locSuccess(position){
        initialize(position.coords.latitude, position.coords.longitude);
    }
	function locError(error){
        alert("The position or the map could not be loaded.");
    }

            function initialize(lat, lon)
            {
                currentPosition = new google.maps.LatLng(lat, lon);
                var infowindow = new google.maps.InfoWindow();
				var geocoder = new google.maps.Geocoder();
				$.ajax({
                    type: "POST",
					dataType: "json",
                    url: ServerURL+"placesearch.php?lat="+lat+"&lng="+lon+"&radius=5",
                    cache: false
					}) .done(function( msg ) {
					info = msg;
					//set up string for adding <li/>
    var li = "";
	    //container for $li to be added
    $.each(info, function (i, name, distance) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#" id="' + i + '" class="info-go">' + name.name + '</a> <p class="ui-li-aside ui-li-desc">'+ parseFloat(name.distance).toFixed(2) + ' Kms</p></li>';
    });
    //append list to ul
	$("#prof-list").empty();
	$("#prof-list").append('<li data-role="list-divider" data-theme="b" role="heading">Stores</li>');
    $("#prof-list").append(li).promise().done(function () {
        //wait for append to finish - thats why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #details-page
        $(this).on("click", ".info-go", function (e) {
            e.preventDefault();
            //store the information in the next page's data
            $("#details-page").data("info", info[this.id]);
            //change the page # to second page.
            //Now the URL in the address bar will read index.html#details-page
            //where #details-page is the "id" of the second page
            //we're gonna redirect to that now using changePage() method
            $.mobile.changePage("#details-page");
        });

        //refresh list to enhance its styling.
        $(this).listview("refresh");
    });
	});
    }
$(document).on("pagebeforeshow", "#details-page", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");
	var Storeid= info.id;
	$.ajax({
	type: "POST",
	dataType: "json",
	url: ServerURL+"getOffers.php?id="+Storeid,
	cache: false
	}) .done(function( msg ) {
					info1 = msg;
					//set up string for adding <li/>
    var li = "";
	    //container for $li to be added
    $.each(info1, function (id,offername, offerdescription, offerlimit, offerpicture, offernotes) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
		li += '<div data-role="collapsible" data-collapsed="true"> <h3>' + offername.offername + '</h3><p><b>Offer Description</b>:'+offername.offerdescription+'</p><p><b>Limit:</b>'+offername.offerlimit+'</p><p><b>Special Notes:</b>'+offername.offernotes+'</p></div>';
    });
    //append list to ul
	$("#prof-list1").empty();
	//$("#prof-list1").append('<li data-role="list-divider" data-theme="b" role="heading">Offers</li>');
    $("#prof-list1").append(li).promise().done(function () {
        //wait for append to finish - thats why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #details-page
        //refresh list to enhance its styling.
        $(this).collapsibleset("refresh");
    });
	});
});
