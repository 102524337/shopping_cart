<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for loading an xml file and making it as an object to send back to processing.js
*/   
        header("Content-type: text/xml");

        $xmlfile = '../../data/goods.xml'; //this is the real data

       $xml = simplexml_load_file($xmlfile);
        echo $xml->saveXML();
?>