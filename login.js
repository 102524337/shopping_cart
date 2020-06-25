/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for ajax requeset to store email and password of customers.
*/

//Ajax object
var xhr = false;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//input data from login.htm
var emailId;
var password;
var errMsg = "";

//validate function for input data from login.htm
function validate()
{
    emailId = document.getElementById("emailId").value;
    password = document.getElementById("password").value;

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(emailId == "" || password == "")
    {
        errMsg += "id or password is empty!\n";
    }
    if(!emailId.match(mailFormat))
    {
        errMsg += "id does not match!\n";
    }
    if(!password.match(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/))
    {
        errMsg += "password should be alphabetic with at least one symbol and number in a range from 6 to 20";
    }

    if(errMsg == "")
    {
        xmlProcessing();
    }else
    {   
        window.location.reload();
        alert(errMsg);
    }
    
}


//XML request
function xmlProcessing()
{
    xhr.open("GET", "login.php?emailId=" + emailId + "&password=" + encodeURIComponent(password) + "&id=" + Number(new Date), true);
    xhr.onreadystatechange = fetchData;
    xhr.send(null);
}

function fetchData()
{
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        //match
        if(xhr.responseText == "true")
        {
            document.getElementById("succMsg").innerHTML = "Login success!";
            setTimeout(function(){
                window.location.replace("https://mercury.swin.edu.au/cos80021/s102524337/Assignment2/buying.htm");
            },1000); //redirect to buying.htm
        }else
        {// not match
            document.getElementById("succMsg").innerHTML = "Login Failure!";
            console.log(xhr.responseText);
        }

	}
}