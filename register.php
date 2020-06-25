<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for generating customer id and store all inputs requested from register.js as an xml format.
        Cross check done if email already exists. Return an appropriate message to the client.
*/
?>
<?php
header('Content-Type: text/xml');

//when submitted
if(isset($_GET["email"]) && isset($_GET["pwd"]) && isset($_GET["Fname"]) && isset($_GET["Lname"]))
{   
    $phone = "";
    if(isset($_GET["phone"]))
    {
        $phone = $_GET["phone"];
    }

    $email = $_GET["email"];
    $pwd = $_GET["pwd"];
    $Fname = $_GET["Fname"];
    $Lname = $_GET["Lname"];
    $customer_id = generateId();

    //xml file with a name, customer.xml
    $xmlfile = '../../data/customer.xml';

    $doc = new DOMDocument();

    //if a file does not exist, create customers node
    if (!file_exists($xmlfile)){ 
		$customers = $doc->createElement('customers');
		$doc->appendChild($customers);
	}
	else { //load the file 
		$doc->preserveWhiteSpace = FALSE; 
		$doc->load($xmlfile);  
	}

    //create customer node under customers node
    $customers = $doc->getElementsByTagName('customers')->item(0);
    $customer = $doc->createElement('customer');
    $customers->appendChild($customer);

    //create nodes under customers
    $customer_id_node = $doc->createElement('customerId');
    $customer->appendChild($customer_id_node);
    $customer_id_val = $doc->createTextNode($customer_id);
    $customer_id_node->appendChild($customer_id_val);

    $emailNode = $doc->createElement("email");
    $customer->appendChild($emailNode);
    $emailVal = $doc->createTextNode($email);
    $emailNode->appendChild($emailVal);

    $pwdNode = $doc->createElement("password");
    $customer->appendChild($pwdNode);
    $pwdVal = $doc->createTextNode($pwd);
    $pwdNode->appendChild($pwdVal);

    $FnameNode = $doc->createElement("FirstName");
    $customer->appendChild($FnameNode);
    $FnameVal = $doc->createTextNode($Fname);
    $FnameNode->appendChild($FnameVal);

    $LnameNode = $doc->createElement("LastName");
    $customer->appendChild($LnameNode);
    $LnameVal = $doc->createTextNode($Lname);
    $LnameNode->appendChild($LnameVal);

    $phoneNode = $doc->createElement("phone");
    $customer->appendChild($phoneNode);
    $phoneVal = $doc->createTextNode($phone);
    $phoneNode->appendChild($phoneVal);

    //save the xml file
	$doc->formatOutput = true;
    $doc->save($xmlfile);  
    
    echo "registered successfully!";
}else
{//check if email exists
    $xmlfile = '../../data/customer.xml';
	$xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

    $email;
    if(isset($_GET["email"]))
    {
        $email = $_GET["email"];
    }

    foreach($xml->children() as $nodes)
    {
        if($nodes->email == $email)
        {
            echo "false";
            break;
        }else
        {
            echo "true";
            break;
        }
    }

}

function generateId()
{
    return rand(100000,999999);
}

?>