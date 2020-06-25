<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for when adding button is clicked by customers, the quantity on hold value increases by 1 and quantity value decreases by 1
*/
?>
<?php

$xmlfile = '../../data/goods.xml';
$xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

if(isset($_GET["itemNumber"]))
{
    $itemNum = $_GET["itemNumber"];
    $i = 1;
    $numNodes = count($xml);
    foreach($xml->children() as $nodes)
    {
        if($nodes->itemNumber == $itemNum && $nodes->itemQuantity>0)
        {   
            $nodes->itemQuantity = ($nodes->itemQuantity) - 1;
            $nodes->quantityOnHold = ($nodes->quantityOnHold) + 1;
            echo "true";
            break;
        }else
        {   

           if($numNodes == $i)
           {
                echo "false";
                break;
           }
        }
        $i++;
    }

    file_put_contents($xmlfile, $xml->saveXML());
}

?>