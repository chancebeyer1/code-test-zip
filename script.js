
// var client = new XMLHttpRequest();
// client.open("GET", "http://api.zippopotam.us/us/91362", true);
// client.onreadystatechange = function() {
// 	if(client.readyState == 4) {
// 		alert(client.responseText);
// 	};
// };

// client.send();

		

function getZipDetails() {
    // Get the User's input
    let zip = document.getElementById("zip-input").value
    
    // Check if input is valid
    if(zip != null && zip.toString().length == 5) {
        // Make request for Zip Data
        var client = new XMLHttpRequest();
        client.open("GET", "http://api.zippopotam.us/us/" + zip, true);
        client.onreadystatechange = function() {
            // If request is good
            if(client.readyState == 4) {
                // If data is in the request, hide form and display data
                if(client.responseText != "{}") {
                    document.getElementById("zip-form").style.display = "none"

                    let zipValue = document.getElementById("zipcode-value")
                    let countryValue = document.getElementById("country-value")
                    let countryAbbrValue = document.getElementById("countryAbbr-value")

                    let response = JSON.parse(client.responseText)
                    
                    
                    zipValue.innerText = response["post code"]
                    countryValue.innerText = response["country"]
                    countryAbbrValue.innerText = response["country abbreviation"]
                    
                    let tableHTML = "<div class='row header'><div class='cell'>City</div><div class='cell'>State</div><div class='cell'>Longitude</div><div class='cell'>Latitude</div></div>"

                    for (let i = 0; i < response.places.length; i++) {
                        const place = response.places[i];
                        tableHTML += "<div class='row'><div class='cell' data-title='City'>" + place["place name"] + "</div><div class='cell' data-title='State'>" + place.state + " <img width='12px' height='12px' src='states/" + place["state abbreviation"] + ".svg'/></div><div class='cell' data-title='Longitude'>" + place.longitude + "</div><div class='cell' data-title='Latitude'>" + place.latitude + "</div></div>"
                    }
                    console.log(tableHTML)

                    let table = document.getElementById("table")
                    table.innerHTML = tableHTML

                    let infoBlock = document.getElementById("zip-info")
                    infoBlock.style.display = "flex"
                }
                else {
                    // No data is given, add error message to form
                    let error = document.getElementById("zip-input-error")
                    error.innerText = "No data for the given zipcode"
                    error.style.display = "flex"
                }
            };
        };
        client.send();
    }
    else {
        // Add error message
        let error = document.getElementById("zip-input-error")
        error.innerText = "Input is invalid. Is it 5 numbers?"
        error.style.display = "flex"
    }
    
}

var input = document.getElementById("zip-input");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("zip-form-btn").click();
  }
})