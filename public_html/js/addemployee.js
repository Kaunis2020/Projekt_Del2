/* Skyddade behörigheter med JWT-token;
 * Larissa: Lägger en anställd
 */

const url = "http://localhost:3000/protected/employee";
var message = "";

// Skickar formuläret
function postForm()
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var photo = document.getElementById("photo").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var position = document.getElementById("position").value;
    var info = document.getElementById("info").value;
    var salary = document.getElementById("salary").value;
    var jobphone = document.getElementById("jobphone").value;
    var jobmail = document.getElementById("jobmail").value;
    
      if (!photo || !fname  || !lname  || !position  || !info  || !jobphone  || !jobmail)
    {
        return;
    } else
    {
         const formdata = {
            photo: photo,
            fname: fname,
            lname: lname,
            position:position,
            info: info,
            salary: salary,
            jobphone: jobphone,
            jobmail: jobmail
        };
        fetch(url, {
            method: 'POST',
            headers: {
                "authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })       
          .then(response => {
                    if (!response.ok) {
                        throw new Error('Inläggning misslyckades');
                        return false;
                    }
                    return response.json();
                })
                .then(data => {
                    message = data.message;
                    var messelem = document.getElementById("message");
                    messelem.innerHTML = message;
                    document.getElementById("photo").value = 'default.jpg';
                    document.getElementById("fname").value = '';
                    document.getElementById("lname").value = '';
                    document.getElementById("position").value = '';
                    document.getElementById("info").value = '';
                    document.getElementById("jobphone").value = '';
                    document.getElementById("jobmail").value = '';
                    return true;
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                    return false;
                });
        
    }
}

