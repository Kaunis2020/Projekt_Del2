/* 
 *Larissa, visar alla meddelanden från kunderna
 */
var message = "";
var letters = [];

window.addEventListener("load", (event) => {
    getData();
});

function getData() {
    // Får token från sessionStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/contacts";
    fetch(url, {method: 'GET',
        headers: {
            "authorization": "Bearer " + token,
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
            .then(data => displayTable(message, data))
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function displayTable(mess, posts)
{
    for (var post in posts)
        letters.push(posts[post]);

    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var emplstr = "";
    var trash = "";
    var name = "";
    if (letters.length > 0)
    {
        str = "<table id='displaytable'><tr><th>id</th><th>Datum</th><th>Namn</th><th>Telefon</th><th>E-post</th><th>Rubrik</th><th>Meddelande</th><th>Delete</th></tr>";

        for (var i = 0; i < letters.length; i++) {
            emplstr += "<tr>";
            name = letters[i].fname + " " + letters[i].lname;
            emplstr += "<td>" + letters[i].id + "</td><td>" + letters[i].date + "</td><td>" + name + "</td><td>" + letters[i].phone + "</td><td>" + letters[i].email + "</td><td>" + letters[i].heading + "</td><td id='letter'>" + letters[i].letter + "</td>";
            trash = "<td><button class='editbtn' onclick='deleteLetter(" + letters[i].id + ");'><i class='fa fa-trash-o' id='trash'></i></button></td>";
            emplstr += trash;
            emplstr += "</tr>";
        }
        str += emplstr;
        str += "</table>";
        elem.innerHTML = str;
    } else {
        var elem = document.getElementById("message");
        elem.innerHTML = "Inga meddelanden finns att visa";
    }
}

// Raderar kundernas brev och meddelanden;
function deleteLetter(letterid)
{
    const url = "http://localhost:3000/protected/contact/";

    fetch(url + letterid, {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                {
                    message = "Meddelandet har raderats i databasen.";
                    letters = [];
                    document.getElementById("loadplace").innerHTML = "";
                    getData();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

