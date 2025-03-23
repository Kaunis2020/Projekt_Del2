/* 
 * Larissa 
 */
const url = "http://localhost:3000/handler/register";
var message = "";

// Registrerar ett nytt konto;
function Register() {
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!fname || !lname || !email || !username || !password)
        return;
    else
    {
        // Form data to be sent in the request body
        const formdata = {
            fname: fname,
            lname: lname,
            email: email,
            username: username,
            password: password
        };

        // Make a POST request using the Fetch API
        fetch(url, {
            method: 'POST',
            headers: {
                "authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
                .then(response => {
                    if (response.ok) {
                        message = "Kontot har sparats i databasen.";
                        var messelem = document.getElementById("message");
                        messelem.innerHTML = message;
                    }
                    return response.json();
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                }
        );
    }
}