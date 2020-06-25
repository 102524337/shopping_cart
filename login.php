<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for retrieving customer data to match email or password.
*/
?>
<?php
    session_start();

    if(!isset($_GET["emailId"]) && !isset($_GET["password"]))
    {
        echo "<p>You have to enter both id and password</p>";
    }else
    {
        $xmlfile = '../../data/customer.xml';
        $xml = simplexml_load_file($xmlfile) or die("Error: Cannot create object");

        $email = $_GET["emailId"]; //email 
        $pwd = $_GET["password"]; // password
        
        $i = 1;
        $numNodes = count($xml);
        foreach($xml->children() as $nodes)
        {
            if(!($nodes->email == $email) || !($nodes->password == $pwd))
            {   
                if($numNodes == $i)
                {
                     echo "false";
                     break;
                }
                
            }else
            {   $_SESSION["emailId"] = $email;
                $customerId = (string)$nodes->customerId;
                $_SESSION["customerId"] = $customerId;
                echo "true";
                break;
            }
        }
    }

?>