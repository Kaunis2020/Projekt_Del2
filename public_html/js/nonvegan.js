/* 
 * Larissa: Skript för icke-vegansk mat
 */
var posts = [];
var food = [];

window.addEventListener("load", (event) => {
    getData();
});

function getData() {
    const url = "http://localhost:3000/api/nonvegan";
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
    food = paginated(posts);
    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var foodstr = "";
    var edit = "";
    var trash = "";
    if (food.length > 0)
    {
        str = "<table id='displaytable'><tr><th>id</th><th>Namn</th><th>Kategori</th><th>Pris, SEK</th><th>Innehåll</th><th>Edit</th><th>Delete</th></tr>";

        for (var i = 0; i < food.length; i++) {
            foodstr += "<tr>";
            foodstr += "<td>" + food[i].id + "</td><td>" + food[i].name + "</td><td>" + food[i].category + "</td><td>" + food[i].price + "</td><td>" + food[i].ingredients + "</td>";
            edit = "<td><button class='editbtn' onclick='editFood(" + JSON.stringify(food[i]) + ");'><i class='fa fa-edit' id='edit'></i></button></td>";
            trash = "<td><button class='editbtn' onclick='deleteFood(" + food[i].id + ");'><i class='fa fa-trash-o' id='trash'></i></button></td>";
            foodstr += edit;
            foodstr += trash;
            foodstr += "</tr>";
        }
        str += foodstr;
        str += "</table>";
        elem.innerHTML = str;
    }
}

function deleteFood(foodid)
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/nonvegan/";

    fetch(url + foodid, {method: 'DELETE',
        headers: {
            "authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (response.ok)
                {
                    document.getElementById("loadplace").innerHTML = "";
                    getData();
                }
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

// Redigerar maträtt;
// Skapar formulär med Java Script
function editFood(food)
{
    var elem = document.getElementById("updateplace");
    var str = "<table id='edittable'><tr><th>Nummer </th><td id='id'>" + food.id + "</td><th>Foto </th><td><input type='text' id='photo' required value='" + food.photo + "'></td></tr>";
    var foodstr = "<tr><th>Namn </th><td><input type='text' id='name' required value='" + food.name + "'></td>"
            + "<th>Kategori </th><td><input type='text' id='category' required value='" + food.category + "'></td></tr><tr><th>Typ</th><td id='type'>" + food.type
            + "</td><th>Pris, SEK </th><td><input type='number' id='price' required value='" + food.price + "'></td></tr>"
            + "<tr><th>Innehåll </th>" + "<td><input type='text' minlength='100' id='ingredients' required value='"
            + food.ingredients + "'></td><th>Beskrivning </th><td><textarea rows='3' cols='10' id='description' required >" + food.description + "</textarea></td></tr>";
    str += foodstr;
    str += "</table><br/>";
    var button = "<div class='d-flex justify-content-center'><button class='btn btn-primary' onclick='sendToServer();'><b> SPARA </b></button><br/></div>";
    str += button;
    elem.innerHTML = str;
}

// Sänder editformuläret till server;
function sendToServer()
{
    const url = "http://localhost:3000/protected/food";
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var id = document.getElementById("id").innerText;
    var maintype = document.getElementById("type").innerText;
    var photo = document.getElementById("photo").value;
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    var price = document.getElementById("price").value;
    var ingredients = document.getElementById("ingredients").value;
    var description = document.getElementById("description").value;

    if (!photo || !name || !category || !price || !ingredients || !description)
    {
        return;
    } else
    {
        const formdata = {
            id: id,
            maintype: maintype,
            photo: photo,
            name: name,
            category: category,
            price: price,
            ingredients: ingredients,
            description: description
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
                        throw new Error('Uppdatering misslyckades');
                        return false;
                    }
                    return response.json();
                })
                .then(data => {
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