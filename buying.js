/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for requesting data from goods.xml file in the data folder using ajax.
        The data includes item list and shopping cart that a user adds.
*/

//ajax request
var xhr = false
if(window.XMLHttpRequest)
{
    xhr = new XMLHttpRequest();
} else if(window.ActiveXObject)
{
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

var itemNum;//item number global variable

//shopping cart
function generateShopCart(itemNumber)
{   
    var action = "Add";
    xhr.open("GET", "updateShoppingCart.php?itemNumber=" + itemNumber + "&action=" + encodeURIComponent(action) + "&value=" + Number(new Date), true);
    xhr.onreadystatechange = addUpdateCart;
    xhr.send(null); 
}
//show the updated cart
function addUpdateCart()
{
    if((xhr.readyState == 4) && (xhr.status == 200))
    {   
        console.log(xhr.responseText);
        var cartComponents = xhr.responseXML;

        var cartItems = cartComponents.getElementsByTagName('item');//item

        var itemNumber = cartComponents.getElementsByTagName('itemNumber');
        var itemPrice = cartComponents.getElementsByTagName('price');
        var itemQuantity = cartComponents.getElementsByTagName('quantity'); 

        //create table head
        var table = document.getElementById("table"); 

        if(table.childElementCount == 0)
        {
            var header = table.createTHead();
            var row = header.insertRow(0);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = "Item Number";
            cell2.innerHTML = "Price";
            cell3.innerHTML = "Quantity";
            cell4.innerHTML = "Remove";
        }
        //internet explorer 
        if (window.ActiveXObject)
        {
            for(i = 0; i<cartItems.length; i++)
            {
                if(itemQuantity[i].textContent == 1)
                {
                    //table comes here ...
                    //break;
                }
            }
        }else //non-internet explorer 
        {
            for(var i =0; i<cartItems.length; i++)
            {   
                //if quantity only exists 1 in value
                if(itemQuantity[i].textContent == 1)
                {
                let j = 1;
                var tRow = table.insertRow(j);
                
                var cell1 = tRow.insertCell(0);
			    var cell2 = tRow.insertCell(1);
                var cell3 = tRow.insertCell(2);
                var cell4 = tRow.insertCell(3);
                
                var itemNumberCell = itemNumber[i].textContent;
                var item_price_cell = itemPrice[i].textContent;
                var item_qty_cell = itemQuantity[i].textContent;
                var item_remove = `<button onclick='RemoveItem(${itemNumberCell});'>Remove Item</button>`;

                cell1.innerHTML = itemNumberCell;
                cell2.innerHTML = item_price_cell;
                cell3.innerHTML = item_qty_cell;
                cell4.innerHTML = item_remove;

                j++;
                }else if(1<itemQuantity[i].textContent)
                {   //if quantity already exists, delete a specific row and add new row with added value
                    let j = i+1;
                    table.deleteRow(j);
                   
                    var tRow = table.insertRow(j);
                    
                    var cell1 = tRow.insertCell(0);
                    var cell2 = tRow.insertCell(1);
                    var cell3 = tRow.insertCell(2);
                    var cell4 = tRow.insertCell(3);
                    
                    var itemNumberCell = itemNumber[i].textContent;
                    var item_price_cell = itemPrice[i].textContent;
                    var item_qty_cell = itemQuantity[i].textContent;
                    var item_remove = `<button onclick='RemoveItem(${itemNumberCell}, ${item_price_cell});'>Remove Item</button>`;
    
                    cell1.innerHTML = itemNumberCell;
                    cell2.innerHTML = item_price_cell;
                    cell3.innerHTML = item_qty_cell;
                    cell4.innerHTML = item_remove;
                    j++;
                }

            }

        //confirm button 
        var confirmBtn = document.getElementById("confirm");
        confirmBtn.innerHTML = "<button>confirm purchase</button>";
        confirmBtn.addEventListener('click', function(){
            confirmPurchase(cartComponents);
        });

        //cancel button
        document.getElementById("cancel").innerHTML = `<button>cancel purchase</button>`;
        }  
    }
}

//confirm items 
function confirmPurchase(cartComponentsAsStr)
{
    //xhr.open('GET', "confirmPurchase.php?itemNumber=" + itemNumber + "&itemQuantity=" + encodeURIComponent(itemQuantity) +"&value=" + Number(new Date), true);
    xhr.open('GET', "confirmPurchase.php?cartComponentsAsStrv=" + cartComponentsAsStr +"&value=" + Number(new Date), true);
    xhr.onreadystatechange = function() 
        {
        
            if ((xhr.readyState == 4) && (xhr.status == 200)) 
            {
            var xmlText = xhr.responseText;
            console.log(xmlText);
            
            }
        }
    xhr.send(null);
}

//remove items
function RemoveItem(itemNumberCell, item_price_cell)
{   
    var action = "remove";
    xhr.open("GET", "updateShoppingCart.php?itemNumberCell=" + itemNumberCell + "&item_price_cell=" +item_price_cell +"&action=" + encodeURIComponent(action) + "&value=" + Number(new Date), true);
    xhr.onreadystatechange = addUpdateCart;
    xhr.send(null);
}

//add to cart
function addCart(itemNumber)
{   
    itemNum = itemNumber;
    xhr.open("GET", "updatingInventory.php?itemNumber=" + itemNumber, true);
    xhr.onreadystatechange = updateDataResult;
    xhr.send(null); 
} 

//show result
function updateDataResult()
{
    if((xhr.readyState == 4) &&(xhr.status == 200))
    { 
        
        if(xhr.responseText == "true")
        {
            alert("Item added successfully!");
            generateShopCart(itemNum);//add item to cart
        }else
        {
            alert("Sorry, this item is not available for sale");
        }
        
    }
}

//fetch data from xml and xsl files
function fetchData()
{
        if((xhr.readyState == 4) &&(xhr.status == 200))
        {  //console.log("inside fetchData function");
            var spanTag1 = document.getElementById("tableContent").innerHTML;
            spanTag1.innerHTML = xhr.responseText;
        }
}

//xml request  
function generateReq()
{
    setInterval(function(){
        xhr.open("GET", "buying.php", true);
        xhr.onreadystatechange = function()
        {
            if((xhr.readyState == 4) &&(xhr.status == 200))
            {
                var spanTag1 = document.getElementById("tableContent").innerHTML;
                document.getElementById("tableContent").innerHTML = xhr.responseText;
                //console.log("inside init function");
                fetchData();
            }
        };
        xhr.send(null);
    }, 10000);

}
function init()
{
    xhr.open("GET", "buying.php", true);
    xhr.onreadystatechange = function()
    {
        if((xhr.readyState == 4) &&(xhr.status == 200))
        {
            var spanTag1 = document.getElementById("tableContent").innerHTML;
            document.getElementById("tableContent").innerHTML = xhr.responseText;
            console.log("inside init function");
            generateReq();
        }
    };
    xhr.send(null);
}

//when html page loaded
window.onload = init;