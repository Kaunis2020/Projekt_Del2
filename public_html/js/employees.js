/* 
 *Larissa, visar alla anställda
 */
var posts = [];
var empl = [];

window.addEventListener("load", (event) => {
    getData();
});

function getData() {
    const url = "http://localhost:3000/api/employees";
    fetch(url, {method: 'GET'})
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
    empl = paginated(posts);
    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var emplstr = "";
    var edit = "";
    var trash = "";
    var name = "";
    if (empl.length > 0)
    {
        str = "<table id='displaytable'><tr><th>id</th><th>Namn</th><th>Befattning</th><th class='text-center'>Info</th><th>Telefon</th><th>E-post</th><th style='text-align:right;padding-right:15px;'>Edit</th><th style='text-align:right;'>Delete</th></tr>";

        for (var i = 0; i < empl.length; i++)
        {
            emplstr += "<tr>";
            name = empl[i].fname + " " + empl[i].lname;
            emplstr += "<td>" + empl[i].id + "</td><td>" + name + "</td><td>" + empl[i].position + "</td><td>" + empl[i].info + "</td><td>" + empl[i].jobphone + "</td><td>" + empl[i].jobmail + "</td>";
            edit = "<td><button class='editbtn' onclick='editEmpl(" + JSON.stringify(empl[i]) + ");'><i class='fa fa-edit' id='edit'></i></button></td>";
            trash = "<td><button class='editbtn' onclick='deleteEmpl(" + empl[i].id + ");'><i class='fa fa-trash-o' id='trash'></i></button></td>";
            emplstr += edit;
            emplstr += trash;
            emplstr += "</tr>";
        }
        str += emplstr;
        str += "</table>";
        elem.innerHTML = str;
    }
}

function deleteEmpl(emplid)
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/employee/";

    fetch(url + emplid, {method: 'DELETE',
        headers: {
            "authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (response.ok)
                {
                    empl = [];
                    document.getElementById("loadplace").innerHTML = "";
                    getData();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function editEmpl(empl)
{
    var elem = document.getElementById("updateplace");
    var str = "<table id='edittable'><caption>Anställd nr <span id='id'>" + empl.id + "</span></caption><tr><th>Foto </th>";
    var emplstr = "<td><input type='text' id='photo' required  value='" + empl.photo + "'></td><th>Befattning </th><td><input type='text' id='position' required value='" + empl.position +
            "'></td></tr><tr><th>Förnamn </th><td><input type='text' id='fname' required value='" + empl.fname + "'></td><th>Efternamn </th><td><input type='text' id='lname' required value='" + empl.lname +
            "'></td></tr><tr><th>Telefon </th><td><input type='text' id='jobphone' required value='" + empl.jobphone + "'></td><th>E-post </th><td><input type='text' id='jobmail' required value='" + empl.jobmail +
            "'></td></tr><tr><th>Lön </th><td><input type='number' id='salary' required value='" + empl.salary + "'></td><th>Beskrivning </th><td><textarea rows='3' cols='10' required id='info'>" + empl.info + "</textarea></td></tr>";
    str += emplstr;
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
    var photo = document.getElementById("photo").value;
    var position = document.getElementById("position").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var jobphone = document.getElementById("jobphone").value;
    var jobmail = document.getElementById("jobmail").value;
    var salary = document.getElementById("salary").value;
    var info = document.getElementById("info").value;
    const url = "http://localhost:3000/protected/employee";

    if (!photo || !position || !fname || !lname || !jobphone || !jobmail || !salary || !info)
    {
        return;
    } else {
        const formdata = {
            id: id,
            photo: photo,
            fname: fname,
            lname: lname,
            position: position,
            info: info,
            salary: salary,
            jobphone: jobphone,
            jobmail: jobmail
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