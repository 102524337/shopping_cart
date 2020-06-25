<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for storing shopping cart items with the session that contains customer id. So, when customer increases and decreases the value, 
        the system remembers them. 
*/
?>
<?php
    session_start();
    header('Content-Type: text/xml');
    
    $qty;
    $price = "";

    $customerId = "";
    $sessionKey = "";

    //$itemNumber = ""; // When add button is pressed value is stored
    $removeItemNum;//when remove button is pressed, value is stored.

    $action = $_GET["action"];
    $value;

    if(!isset($_SESSION["customerId"]))
    {
        echo "You must login first to update your shopping cart";
    }else
    {   
        $customerId = $_SESSION["customerId"];
        $sessionKey = $customerId."cart";

        if(!isset($_SESSION[$sessionKey]))
        {   
            $_SESSION[$sessionKey] = "";
        }
        $cart = $_SESSION[$sessionKey];

        //when add 
        if($action == "Add")
        {   
            $itemNumber;
            if(isset($_GET["itemNumber"]))
            {
                $itemNumber = $_GET["itemNumber"];
            }
            if(!isset($cart[$itemNumber]))//fist time 
            {
                $xmlfile = '../../data/goods.xml';
                $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

                foreach($xml->children() as $nodes)
                {
                    if($nodes->itemNumber == $itemNumber && $nodes->itemQuantity>0)
                    {   
                        $qty = 1; 
                        $value = array(); 
                        $price = (string)$nodes->itemPrice;

                        $value['qty'] = $qty;
                        $value['price'] = $price;
                        $cart[$itemNumber] = $value;
                        $_SESSION[$sessionKey] = $cart;

                        echo (toXml($cart));
                    }
                }
            }else //from second time
            {   
                $xmlfile = '../../data/goods.xml';
                $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

                foreach($xml->children() as $nodes)
                {
                    if($nodes->itemNumber == $itemNumber && $nodes->itemQuantity>0)
                    {   
                        $prICE = (string)$nodes->itemPrice;
                        $value = $cart[$itemNumber];
                        $value["qty"] = $value["qty"] + 1;
                        $value["price"] = $prICE * $value["qty"];
                        $cart[$itemNumber] = $value;
                        $_SESSION[$sessionKey] = $cart;

                        echo (toXml($cart));

                    }
                }
            }
        }else //when remove 
        {   
            if(isset($_GET["item_price_cell"]))
            {
                $removeItemNum = $_GET["itemNumberCell"];
                $item_price_cell = $_GET["item_price_cell"];
            }
            $xmlfile = '../../data/goods.xml';
            $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

            foreach($xml->children() as $nodes)
            {
                if($nodes->itemNumber == $removeItemNum && $nodes->itemQuantity>0)
                {   
                    $PRICE = (string)$nodes->itemPrice;
                    $value = $cart[$removeItemNum];
                    $value["qty"] = $value["qty"] - 1;
                    $value["price"] = $PRICE * $value["qty"];
                    $cart[$removeItemNum] = $value;
                    $_SESSION[$sessionKey] = $cart;

                    echo (toXml($cart));
                }
            }
        }
    }


function toXml($MDA)
{
    $doc = new DomDocument('1.0');
    $cart = $doc->createElement('cart');
    $cart = $doc->appendChild($cart);

    if($MDA != "")
    {
        foreach ($MDA as $item => $item_components)
        {
            $itemNode = $doc->createElement('item');
            $cart->appendChild($itemNode);

            $item_number = $doc ->createElement('itemNumber');
            $item_number = $itemNode ->appendChild($item_number);
            $value1 = $doc->createTextNode($item);
            $value1 = $item_number->appendChild($value1);

            $quantity = $doc->createElement('quantity');
            $quantity = $itemNode->appendChild($quantity);
            $value2 = $doc->createTextNode($item_components['qty']);
            $value2 = $quantity->appendChild($value2);

            $price = $doc->createElement('price');
            $price = $itemNode->appendChild($price);
            $value3 = $doc->createTextNode($item_components['price']);
            $value3 = $price ->appendChild($value3);
        }
    }
    $strXml = $doc->saveXML(); 
    return $strXml;
}
?>