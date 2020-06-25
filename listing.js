/*
    Author: Junhyek Hyun (102524337)
    File explanation:
    This file is used for requesting inputs in ajax manner. Validating all inputs
*/

//ajax objects
var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//input data fields
var itemName;
var itemPrice;
var itemQuantity;
var itemDescrip;
var errMsg = "";

//validation for input entered by user
function validation()
{
    itemName = document.getElementById("itemName").value;
    itemPrice = document.getElementById("itemPrice").value;
    itemQuantity = document.getElementById("itemQuantity").value;
    itemDescrip = document.getElementById("itemDescrip").value;
    
    if(itemName == undefined || itemPrice == undefined || itemQuantity == undefined || itemName == "" || itemPrice == "" || itemQuantity =="")
    {
        errMsg += "item name, price, quantity should not be empty. Please enter data\n"
    }
    if(!itemName.match(/^[a-zA-Z0-9 ]*$/))
    {
        errMsg += "Name shuold be alphabetical or/and numbers\n";
    }
    if(!itemPrice.match(/^[0-9]+$/))
    {
        errMsg += "Price should be a number\n";
    }
    if(!itemQuantity.match(/^[0-9]+$/))
    {
        errMsg += "Quantity should be a number\n";
    }

    if(errMsg == "")
    {
        xmlProcessing();
    }else
    {
        alert(errMsg);
    }

}

//reset the input fields
function reset()
{
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemDescrip").value = "";
}

//xml request
function xmlProcessing()
{
    xhr.open("GET", "listing.php?itemName=" + itemName + "&itemPrice=" + encodeURIComponent(itemPrice) + "&itemQuantity=" + encodeURIComponent(itemQuantity) + 
                    "&itemDescrip=" + encodeURIComponent(itemDescrip),true);
    
    xhr.onreadystatechange = fetchData; 
    xhr.send(null); 
}

//get data from xml
function fetchData()
{
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        var serverMsg = xhr.responseText;
        document.getElementById("successOrFailureMsg").innerHTML = serverMsg;
	}
}