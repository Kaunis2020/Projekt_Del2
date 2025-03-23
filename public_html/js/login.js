/* 
 * Larissa
 */

const url = "http://localhost:3000/handler/login";

function Login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username || !password)
        return false;
    else
    {
        const formdata = {
            username: username,
            password: password
        };

        // Make a POST request using the Fetch API
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Inloggningen misslyckades');
                        return false;
                    }
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('token', data.token);
                    setCookie("fname", data.fname, 365);
                    setCookie("username", data.username, 365);
                    window.location.replace("userpage.html");
                    return true;
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error.message;
                    return false;
                }
        );
    }
} 

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}