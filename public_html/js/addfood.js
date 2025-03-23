/* 
 * Larissa: Lägger in maträtter
 */

// Skyddade behörigheter med JWT-token;
const url = "http://localhost:3000/protected/food";
var message = "";

// Skickar formuläret
function postForm()
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    var maintype = document.getElementById("maintype").value;
    var photo = document.getElementById("photo").value;
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    var price = document.getElementById("price").value;
    var ingredients = document.getElementById("ingredients").value;
    var description = document.getElementById("description").value;
    
      if (!photo  ||  !name || !category || !price   || !ingredients  || !description )
    {
        return;
    } else
    {
         const formdata = {
            photo: photo,
            maintype: maintype,
            name: name,
            category: category,
            price: price,
            ingredients: ingredients,
            description : description
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
                    document.getElementById("name").value = '';
                    document.getElementById("category").value = '';
                    document.getElementById("ingredients").value = '';
                    document.getElementById("description").value = '';
                    return true;
                })
                .catch(error => {
                    var elem = document.getElementById("message");
                    elem.innerHTML = error;
                    return false;
                });
    } 
}

