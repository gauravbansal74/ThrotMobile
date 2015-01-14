		jQuery(window).ready(function(){
			var map;
            var currentPosition;
            var directionsDisplay = new google.maps.DirectionsRenderer();         
            var directionsService = new google.maps.DirectionsService();
            function initialize(lat, lon)
            {
                currentPosition = new google.maps.LatLng(lat, lon);

                /* map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
 */				
                directionsDisplay.setMap(map);
                //directionsDisplay.setPanel($("#instructions-content"));

/*                  var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Current position"
                });
 */		
/* 				        To find distance between users location and outlet distance
						var latLngA = new google.maps.LatLng(17.413332,78.4234847);
						var latLngB = new google.maps.LatLng(17.419236,78.448324);
						var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
						alert(distance/1000); */
                var infowindow = new google.maps.InfoWindow();
				var infowindow1 = new google.maps.InfoWindow();
				var geocoder = new google.maps.Geocoder();
				var sublocality_level_1 ='';
				var postal_code = '';
				var sublocality_level_2 = '';
				var route = '';
				var premise = '';
				geocoder.geocode({ 'latLng': currentPosition }, function (results, status) {
				var result = results[0];
/* 				var addResult = result.formatted_address;
				alert (addResult); */
				for (var i = 0, len = result.address_components.length; i < len; i++) {
					var ac = result.address_components[i];
					if (ac.types.indexOf('postal_code') >= 0) {
						postal_code = ac.long_name;
						$("#postal_code").val(postal_code);					

					}
					if (ac.types.indexOf('sublocality_level_1') >= 0) {
						sublocality_level_1 = ac.long_name;
						$("#sublocality_level_1").val(sublocality_level_1);					
						
					}
					if (ac.types.indexOf('sublocality_level_2') >= 0) {
						sublocality_level_2 = ac.long_name;
						$("#sublocality_level_2").val(sublocality_level_2);					
					}
					if (ac.types.indexOf('route') >= 0) {
						route = ac.long_name;
						$("#route").val(route);
						}
					if (ac.types.indexOf('premise') >= 0) {
						premise = ac.long_name;
						$("#premise").val(premise);
					}					
					
				}
				$("#latitude").val(lat);
				$("#longitude").val(lon);	
				
			/* 	$(".locationRules").html("</br>You are currently in: " +"<b>" + postal_code + "" +sublocality_level_1+""+sublocality_level_2+""+route+""+premise+ "</br> Lattitude: " + lat +"</br> Longitude:" + lon); */
			});
/*                 google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon + " City: "+ state);
                    infowindow.open(map, currentPositionMarker);
                }); */
            }
			

            function locError(error) 
            {
                alert("The position or the map could not be loaded.");
            }

            function locSuccess(position) 
            {
                initialize(position.coords.latitude, position.coords.longitude);
            }
	
                navigator.geolocation.getCurrentPosition(locSuccess, locError);
                $("#directions-button").click(function(){
                    var targetDestination = $("#target-dest").val();

                    if (currentPosition && currentPosition != '' && targetDestination && targetDestination != '')
                    {
                        var request = {
                            origin:currentPosition, 
                            destination:targetDestination,
                            travelMode: google.maps.DirectionsTravelMode["DRIVING"]
                        };

                        directionsService.route(request, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setPanel(document.getElementById("instructions-content"));
                                directionsDisplay.setDirections(response); 

                                // For debuging reasons uncomment
                                /*
                                var myRoute = response.routes[0].legs[0];
                                for (var i = 0; i < myRoute.steps.length; i++) {
                                  alert(myRoute.steps[i].instructions);
                                }*/
                            }
							$("#instructions-content").removeClass('ui-collapsible-collapsed');
                        });
                    }
                    else
                    {
                        alert("The target destination is empty or the current position could not be located.");
                    }
                }); 
            });