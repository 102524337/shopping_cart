/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for requesting and getting response from logout.php. It shows session value of customers and managers.
*/
//ajax objects
var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//get data from logout.php 
function fetchData()
{
    if((xhr.readyState == 4) && (xhr.status ==200))
    {   
        var sessionValue = xhr.responseText;
        document.getElementById("logoutMsg").innerHTML = "Thank you" + " " + sessionValue; 
    }
}

//init method proceeds ajax request
function init()
{
    xhr.open("GET", "logout.php", true);
    xhr.onreadystatechange = fetchData; 
    xhr.send(null); 
}

//when page is loaded invoke init function
window.onload = init;