<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for processing items sent from processing.js. Processing to set quantity on hold and quantity sold values to 0.
        Please consult with readme.doc for further details. 
*/
?>
<?php
header("Content-type: text/xml");

//this is task 4.2
if(!isset($_GET["itemsToBeChanged"]))
{
    echo "No items are available to be processed!";
}else
{
    $itemsToBeChanged = $_GET["itemsToBeChanged"];//an array object of sold items.
    $itemListArr = explode(",", $itemsToBeChanged); //seperate the array elements to store in to the a new array

    $xmlfile = '../../data/goods.xml'; //goods.xml data
    $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

    $j = 0;
    foreach($xml->children() as $nodes)
    {   
        //scan all items in goods.xml using item number against sold items in $itemListArr 
        if($nodes->itemNumber == $itemListArr[$j])
        {   
            $nodes->quantityOnHold = 0; //if found one, quantity on hold sets to 0
            $nodes->quantitySold = 0; //if found one, quantity sold sets to 0 

            //if scanning sold items in $itemListArr is done, it breaks the loop. 
            if(count($itemListArr)-1 == $j)
            {
                break;
            }
        }

        $j++;
    }
    file_put_contents($xmlfile, $xml->saveXML());
    echo "Processed successfully!";
    
}

?>