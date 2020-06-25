<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for generating a goods.xml file with input data from managers.
*/
    session_start();
?>
<?php

//generate item number
function generate_item_number()
{
    return rand(100000,999999);
}

header('Content-Type: text/xml');
if(isset($_GET["itemName"]) && isset($_GET["itemPrice"]) && isset($_GET["itemQuantity"])) //&& isset($_GET["itemDescrip"]))
{
    $itemName = $_GET["itemName"]; //item name
    $itemPrice = $_GET["itemPrice"]; //item price
    $itemQuantity = $_GET["itemQuantity"]; //item quantity
    $itemDescrip = $_GET["itemDescrip"]; //item description
    $itemNumber = generate_item_number(); //item number
    $qtyOnHold = 0;
    $qtySold = 0;


    $xmlfile = '../../data/goods.xml';
    $doc = new DomDocument();//xml dom document as an object

    //if a file does not exist
    if (!file_exists($xmlfile)){ 
        $xslt = $doc->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="../htdocs/Assignment2/goods.xsl"');
        $doc->appendChild($xslt);
		$items = $doc->createElement('items');
		$doc->appendChild($items);
	}
	else { //run the xml file
		$doc->preserveWhiteSpace = FALSE; 
		$doc->load($xmlfile);  
    }
    
    //create an item node 
	$items = $doc->getElementsByTagName('items')->item(0);
	$item = $doc->createElement('item');
    $items->appendChild($item);
    
    //create an item number node
    $itemNumberNode = $doc->createElement('itemNumber');
	$item->appendChild($itemNumberNode);
	$itemNumberVal = $doc->createTextNode($itemNumber);
    $itemNumberNode->appendChild($itemNumberVal);

    // create an item name node
	$itemNameNode = $doc->createElement('itemName');
	$item->appendChild($itemNameNode);
	$itemNameVal = $doc->createTextNode($itemName);
    $itemNameNode->appendChild($itemNameVal);
    
    // create an item price node
	$itemPriceNode = $doc->createElement('itemPrice');
	$item->appendChild($itemPriceNode);
	$itemPriceVal = $doc->createTextNode($itemPrice);
    $itemPriceNode->appendChild($itemPriceVal);

    // create an item quantity node 
	$itemQuantityNode = $doc->createElement('itemQuantity');
	$item->appendChild($itemQuantityNode);
	$itemQuantityVal = $doc->createTextNode($itemQuantity);
    $itemQuantityNode->appendChild($itemQuantityVal);

    // create an item description node
	$itemDescripNode = $doc->createElement('itemDescrip');
	$item->appendChild($itemDescripNode);
	$itemDescripVal = $doc->createTextNode($itemDescrip);
    $itemDescripNode->appendChild($itemDescripVal);

    // create a quantity on hold node
	$qtyOnHoldNode = $doc->createElement('quantityOnHold');
	$item->appendChild($qtyOnHoldNode);
	$qtyOnHoldVal = $doc->createTextNode($qtyOnHold);
    $qtyOnHoldNode->appendChild($qtyOnHoldVal);

    // create a quantity sold node
	$qtySoldNode = $doc->createElement('quantitySold');
	$item->appendChild($qtySoldNode);
	$qtySoldVal = $doc->createTextNode($qtySold);
    $qtySoldNode->appendChild($qtySoldVal);

    //save the xml file
    $doc->formatOutput = true;
    $result = $doc->save($xmlfile); 
    
    $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");
    $xmlTagNumbers = count($xml);
    $xmlItemNum = $xml->item[$xmlTagNumbers -1]->itemNumber;

    //send message to client whether it is failed or succeeded
    if($result == false)
    {
        echo "<p> !Failed to save the item. Try again please.</p>";
    }else
    {
        echo "The item has been listed in the system, and the item number is: $xmlItemNum .";
    }
}



?>