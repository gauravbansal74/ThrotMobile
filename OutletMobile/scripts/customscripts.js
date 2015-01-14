	var map;
	var currentPosition;
	var directionsDisplay = new google.maps.DirectionsRenderer();         
	var directionsService = new google.maps.DirectionsService();
	var sublocality_level_1 ='';
	var postal_code = '';
	var sublocality_level_2 = '';
	var route = '';
	var premise = '';
	jQuery(window).ready(function(){
		$("#btnInit").click(function(){
		$("#OutletRegistration")
		$(':input','#OutletRegistration')
		  .not(':button, :submit, :reset, :hidden')
		  .val('')
		  .removeAttr('checked')
		  .removeAttr('selected');
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
				var infowindow1 = new google.maps.InfoWindow();
				var geocoder = new google.maps.Geocoder();

				geocoder.geocode({ 'latLng': currentPosition }, function (results, status) {
				var result = results[0];
				var formattedAddress = result.formatted_address;
				$("#address").val(formattedAddress);
				$("#latitude").val(lat);
				$("#longitude").val(lon);	
				
			});
                
            }