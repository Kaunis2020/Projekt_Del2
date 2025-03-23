/* 
 * Larissa
 */
var posts = [];
var users = [];

window.addEventListener("load", (event) => {
    getData();
});

function getData() {
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/handler/users";
    fetch(url, {method: 'GET',
        headers: {
            "authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (!response.ok)
                {
                    throw new Error(response.message);
                }
                return response.json();
            })
            .then(data => {
                posts = data;
                setValues();
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function displayTable()
{
    // beräknar paginering
    users = paginated(posts);
    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var emplstr = "";
    var add = "";
    var edit = "";
    var trash = "";
    if (users.length > 0)
    {
        str = "<table id='displaytable'><tr><th>id</th><th>Förnamn</th><th>Efternamn</th><th>E-post</th><th>Användarnamn</th><th>Add</th><th>Edit</th><th>Delete</th></tr>";

        for (var i = 0; i < users.length; i++)
        {
            emplstr += "<tr>";
            emplstr += "<td>" + users[i].id + "</td><td>" + users[i].fname + "</td><td>" + users[i].lname + "</td><td>" + users[i].email + "</td><td>" + users[i].username + "</td>";
            add = "<td><a class='btn btn-outline-primary btn-sm' href='register.html' target='_blank' role='button'><i class='fa fa-plus fa-2x' aria-hidden='true'></i></a></td>";
            edit = "<td><button class='editbtn' onclick='editUser(" + JSON.stringify(users[i]) + ");'><i class='fa fa-edit' id='edit'></i></button></td>";
            trash = "<td><button class='editbtn' onclick='deleteUser(" + users[i].id + ");'><i class='fa fa-trash-o' id='trash'></i></button></td>";
            emplstr += add;
            emplstr += edit;
            emplstr += trash;
            emplstr += "</tr>";
        }
        str += emplstr;
        str += "</table>";
        elem.innerHTML = str;
    }
}

function deleteUser(userid) {
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/handler/user/";

    fetch(url + userid, {method: 'DELETE',
        headers: {
            "authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (response.ok)
                {
                    users = [];
                    document.getElementById("loadplace").innerHTML = "";
                    getData();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function editUser(user) {
    var elem = document.getElementById("updateplace");
    var str = "<table id='edittable'><caption>Användare nr <span id='id'>" + user.id + "</span></caption><tr>";
    var usstr = "<tr><th>Förnamn </th><td><input type='text' id='fname' required value='" + user.fname + "'></td><th>Efternamn </th><td><input type='text' id='lname' required value='" + user.lname +
            "'></td></tr>" + "<th>E-post </th><td><input type='text' id='email' required value='" + user.email + "<tr><th>Användarnamn</th><td><input type='text' id='username' required value='" +
            user.username + "'></td></tr>";
    str += usstr;
    str += "</table><br/>";
    var button = "<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='sendToServer();'><b> SPARA </b></button><br/></div>";
    str += button;
    elem.innerHTML = str;
}

function sendToServer()
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var id = document.getElementById("id").innerText;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    const url = "http://localhost:3000/handler/user";

    if (!fname || !lname || !email || !username)
    {
        return;
    } else {
        const formdata = {
            id: id,
            fname: fname,
            lname: lname,
            email: email,
            username: username
        };

        fetch(url, {
            method: 'PUT',
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
                }).then(data => {
                   document.getElementById("message").innerHTML = data.message;
                   document.getElementById("updateplace").innerHTML = "";
                   getData();
                   return true;
        })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                    return false;
                });
    }
}