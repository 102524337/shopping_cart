<?php
    /*
        Author: Junhyek Hyun (102524337)
        File explanation:
        This file is used for loading xml file and xsl file to combine and get ready to send back to the client .
    */
//load xml file
$xmlDoc = new DOMDocument('1.0');
$xmlDoc->formatOutput = true;
$xmlDoc->load("../../data/goods.xml");

//load xsl file
$xslDoc = new DOMDocument('1.0');
$xslDoc->load("goods.xsl");

$proc = new XSLTProcessor();
$proc->importStylesheet($xslDoc);
echo $proc->transformToXML($xmlDoc);

?>