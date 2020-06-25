<?php
/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for matching manager id and password stored in manager.txt in the data folder against given input from mlogin.htm.
*/
    session_start();
?>
<?php

$file = "../../data/manager.txt";

if(isset($_GET['managerId']) && isset($_GET['password']))
{   
  $managerId = $_GET['managerId'];
  $pwd = $_GET['password'];

  if(!file_exists($file))
  {
      echo "<p>No registered managers found</p>";
  }else
  {
    $managers = file($file);
    for($i=0; $i<count($managers); $i++)
    {   
        $manager = explode(",",$managers[$i]);
        if(strcmp($manager[0], $managerId) == 0 && strcmp(trim($manager[1]), $pwd) == 0) 
        {
            echo "<p>Welcome! $managerId </p>";
            
            $_SESSION['managerId'] = $managerId;

            echo "<p>Link to listing: </p>". "<a href='listing.htm'>Go to Listing Section</a>";
            echo "<p>Link to processing: </p>". "<a href='processing.htm'>Go to Processing Section</a>";
            break;
        }else
        {
            if($i == count($managers)-1)
            {
                echo "<p>Id or Password does not exist</p>";
            }
        }
    }
  }
}
//echo strlen(trim($manager[1]));
?>