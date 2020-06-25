<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for getting request from logout.js file to send a session value of manager or customer
*/
?>
<?php
session_start();

//check if session is available (it should be available)
if(isset($_SESSION['managerId']))
{
    echo $_SESSION['managerId'];
    unset($_SESSION['managerId']);
}elseif(isset($_SESSION['customerId']))
{
    echo $_SESSION['customerId'];
    unset($_SESSION['customerId']);
}
else
{
    echo "You have already logged out OR session is either expired or corrupted.";
    unset($_SESSION['managerId']);
}

?>