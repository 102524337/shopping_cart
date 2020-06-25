/*
    Author: Junhyek Hyun (102524337)
    File explanation:
        This file is used for ajax request to store input values from register.htm.
        Input Validation done. 
*/
//Ajax object
var xhr = false;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

//data from register.htm
var email;
var pwd;
var pwdConfirmed;
var Fname;
var Lname;
var phone;

var isEmail;
//validation of user input
var errMsg = "";
var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function validate()
{   
    //data from register.htm
    email = document.getElementById("email").value;
    pwd = document.getElementById("pwd").value;
    pwdConfirmed = document.getElementById("confirmedPwd").value;
    Fname = document.getElementById("Fname").value;
    Lname = document.getElementById("Lname").value;
    phone = document.getElementById("phone").value;
    isEmail;
    xmlEmailChecker();
    if(!(email.match(mailFormat)))
    {
        errMsg += "Email you have entered was not a valid format. do not forget the extension like .com and .net\n";
    }
    if(isEmail == "false")
    {   
        errMsg += "Email you have entered already exists. Please try with another one\n";
    }

    if(!pwd.match(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/))
    {
        errMsg += "Password you have entered was not a valid format. Enter chracters between 8 and 15.\n";
    }
    if(pwd !== pwdConfirmed)
    {
        errMsg += "Password does not match. Confirmation should be the same as the password you entered\n";
    }
    if(!Fname.match('^[A-Za-z]+$'))
    {
        errMsg += "First Name you have entered was not a valild format\n";
    }
    if(!Lname.match('^[A-Za-z]+$'))
    {
        errMsg += "Last Name you have entered was not a valid format\n";
    }
    //!phone.match(/^0[0-9 ]{9,10}$/) || !phone.match(/^[(][0]{1}[0-9]{1}[)][0-9 ]\d{8}$/)
    if(phone.length>0)
    {
        if(!phone.match(/^[0-9]{10}$/))
        {   console.log(phone);
            errMsg += "phone number you have entered was not a vaid format. (Try 10 digits)\n";
        }
    }

    if(errMsg == "")
    {
        xmlProcessing();
    }else
    {
       alert(errMsg);
    }
}

//XML request
function xmlProcessing()
{
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var Fname = document.getElementById("Fname").value;
    var Lname = document.getElementById("Lname").value;
    var phone = "";

    //if phone number is entered by user.
    if(document.getElementById("phone").value != "" || document.getElementById("phone").value != null)
    {
        phone = document.getElementById("phone").value;
    }

    xhr.open("GET", "register.php?email=" + email + "&pwd=" + encodeURIComponent(pwd)  + "&Fname=" + encodeURIComponent(Fname) + "&Lname=" + encodeURIComponent(Lname) +
                    "&phone=" + encodeURIComponent(phone) + "&id=" + Number(new Date), true);
    xhr.onreadystatechange = fetchData;
    xhr.send(null);
}

function fetchData()
{
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        document.getElementById("succMsg").innerHTML = xhr.responseText + "<a href='buyonline.htm'>Go Back</a>";

	}
}

//check if email exists
function xmlEmailChecker()
{       
    xhr.open("GET", "register.php?email=" + email, false);
    xhr.onreadystatechange = testXml;
    xhr.send(null);
}
function testXml()
{
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        var xmlDoc = xhr.responseText;
        console.log(xmlDoc);
        isEmail = xmlDoc;
    }
}