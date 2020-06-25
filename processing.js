/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for adding a table and table rows according to requested data. 
*/

//ajax objects
var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//request xml 
function xhrRequest()
{
	xhr.open('GET', "processing.php", true);
	xhr.onreadystatechange = fetch;
	xhr.send(null);
}

//get xml data from processing.php
function fetch()
{	
	if ((xhr.readyState == 4) && (xhr.status == 200)) 
	{
		var xmlDoc = xhr.responseXML;

		//console.log(xmlDoc.getElementsByTagName('itemName')[0].textContent);
		makeRequest(xmlDoc);
	}
}

//use xml document object for processing table
function makeRequest(xmlDoc)
{
	var itemNumber = xmlDoc.getElementsByTagName('itemNumber');
    var itemName = xmlDoc.getElementsByTagName('itemName');
    var itemPrice = xmlDoc.getElementsByTagName('itemPrice');
	var itemQuantity = xmlDoc.getElementsByTagName('itemQuantity'); 
	var qtyOnHold = xmlDoc.getElementsByTagName('quantityOnHold'); 
	var qtySold = xmlDoc.getElementsByTagName('quantitySold'); 
	var motherItem = xmlDoc.getElementsByTagName('item'); //mother element of above elements
	
	var itemNumberArr = [];

	var table = document.getElementById("table");
	var header = table.createTHead();
	var row = header.insertRow(0);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);

	cell1.innerHTML = "Item Number";
	cell2.innerHTML = "Name";
	cell3.innerHTML = "Price";
	cell4.innerHTML = "Quantity";
	cell5.innerHTML = "Quantity on Hold";
	cell6.innerHTML = "Quantity Sold";

	//console.log(motherItem);
	
	for(let i = 0; i<motherItem.length ; i++)
    {	
		//if item is sold out
		if(qtySold[i].textContent > 0)
		{
			let j = 1;
			var tRow = table.insertRow(j);

			var cell1 = tRow.insertCell(0);
			var cell2 = tRow.insertCell(1);
			var cell3 = tRow.insertCell(2);
			var cell4 = tRow.insertCell(3);
			var cell5 = tRow.insertCell(4);
			var cell6 = tRow.insertCell(5);

			var itemNum = itemNumber[i].textContent;
			var item_name = itemName[i].textContent;
			var item_price = itemPrice[i].textContent; 
			var item_qty = itemQuantity[i].textContent; 
			var item_qty_hold = qtyOnHold[i].textContent;
			var item_sold = qtySold[i].textContent; 

			cell1.innerHTML = itemNum;
			cell2.innerHTML = item_name;
			cell3.innerHTML = item_price;
			cell4.innerHTML = item_qty;
			cell5.innerHTML = item_qty_hold;
			cell6.innerHTML = item_sold;

			itemNumberArr.push(itemNum);

			j++
		}else 
		{ //if item is not sold out
			document.getElementById("warningMsg").innerHTML = "<strong>All Items are not sold Or already processed</strong>";
		}
	}
	//document.getElementById("btn").innerHTML = `<button onclick='process(${xmlDoc});'>Process</button>`;
	var btn = document.getElementById("btn");
	btn.innerHTML = "<button>Process</button>"
	btn.addEventListener('click', function(){
		
		alterXmlVAlues(itemNumberArr);
	});		
}

function alterXmlVAlues(itemsToBeChanged)
{
	xhr.open('GET', "processingXml.php?itemsToBeChanged=" + itemsToBeChanged + "&value=" + Number(new Date), true);
	xhr.onreadystatechange = xmlProcessedResult;
	xhr.send(null);
}

function xmlProcessedResult()
{
	if ((xhr.readyState == 4) && (xhr.status == 200)) 
	{	
		document.getElementById("processingMsg").innerHTML = `<strong>${xhr.responseText}</strong>`;
	}
}

//init function invoked when loading is completed. Invoke xhrRequest function
function init()
{
	xhrRequest();
}

window.onload = init;
