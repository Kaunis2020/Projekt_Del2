/* 
 * Larissa
 */
var posts = [];
var orders = [];
// Visar kund och orderitems för varje order
var orderIsSet = false;
var customerIsSet = false;
var word = "visa";

window.addEventListener("load", (event) => {
    getData();
});

function getData() {
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/orders";
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
    orders = paginated(posts);
    var elem = document.getElementById("loadplace");
    //rensar innehåll;
    elem.innerHTML = "";
    var str = "";
    var emplstr = "";
    var trash = "";
    if (orders.length > 0)
    {
        str = "<table id='displaytable'><tr><th>Order-id</th><th>Kund-id</th><th>Datum</th><th>Service</th><th>Bordsplacering</th><th>Adress</th><th>Antal personer</th><th>Belopp, SEK</th><th>Delete</th></tr>";

        for (var i = 0; i < orders.length; i++) {
            emplstr += "<tr>";
            emplstr += "<td class='clickme' onclick='viewOrder(" + orders[i].order_id + ", event);'>" + word + "</td><td class='clickme' onclick='viewCustomer(" + orders[i].customer_id + ", event);'>" + "visa" + "</td><td>" + orders[i].visitdate + "</td><td>" + orders[i].servicetype + "</td><td>"
                    + orders[i].tabletype + "</td><td>" + orders[i].address + "</td><td>" + orders[i].persons + "</td><td>" + orders[i].ordertotal + "</td>";
            trash = "<td><button class='editbtn' title='trash' onclick='deleteOrder(" + JSON.stringify(orders[i]) + ");'><i class='fa fa-trash-o' id='trash'></i></button></td>";
            emplstr += trash;
            emplstr += "</tr>";
        }
        str += emplstr;
        str += "</table>";
        elem.innerHTML = str;
    } else {
        var elem = document.getElementById("message");
        elem.innerHTML = "Inga beställningar finns att visa";
    }
}

// Raderar beställning;
// Steg 1: Raderar alla Orderitems med visst orderID;
// Steg 2: Raderar viss order med visst orderID;
// Steg 3: Raderar viss kund med visst kundID;
function deleteOrder(orderobj)
{
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/order";
    const formdata = {
        order_id: orderobj.order_id,
        customer_id: orderobj.customer_id
    };
    fetch(url, {method: 'DELETE',
        headers: {
            "authorization": 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.message);
                    return false;
                }
                return response.json();
            })
            .then(data => {
                var elem = document.getElementById("message");
                elem.innerHTML = data.message;
                getData();
            })
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
                return false;
            });

}

function viewOrder(orderid, event)
{
    var target = event.target;
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/order/";
    fetch(url + orderid, {method: 'GET',
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
            .then(data => displayItems(data, target))
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function displayItems(posts, target) {
    if (word === "dölj") {
        document.getElementById("updateplace").innerHTML = "";
        word = "visa";
        target.innerHTML = word;
        target.style.color = "blue";
        orderIsSet = false;
        return;
    }
    if (!orderIsSet)
    {
        var elem = document.getElementById("updateplace");
        //rensar innehåll;
        elem.innerHTML = "";
        var emplstr = "";
        var str = "";
        if (posts.length > 0) {
            str = "<table id='itemtable'><tr><th>Order-id</th><th>Nr</th><th>Namn</th><th>Kategori</th><th>Typ</th><th>Pris, SEK</th><th>Antal</th><th>Belopp, SEK</th></tr>";
            for (var i = 0; i < posts.length; i++) {
                emplstr += "<tr>";
                emplstr += "<td>" + posts[i].order_id + "</td><td>" + posts[i].item_id + "</td><td>" + posts[i].name + "</td><td>" + posts[i].category + "</td><td>" + posts[i].type
                        + "</td><td>" + posts[i].price + "</td><td>" + posts[i].quantity + "</td><td>" + posts[i].subtotal + "</td></tr>";
            }
            str += emplstr;
            str += "</table>";
            elem.innerHTML = str;
            orderIsSet = true;
            word = "dölj";
            target.innerHTML = word;
            target.style.color = "red";
        }
    } else
        return;
}

function viewCustomer(customerid, event) {
    var target = event.target;
    // Får token från localStorage
    let token = localStorage.getItem('token');
    const url = "http://localhost:3000/protected/customer/";
    fetch(url + customerid, {method: 'GET',
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
            .then(data => displayCustomer(data, target))
            .catch(error => {
                var elem = document.getElementById("message");
                elem.innerHTML = error;
            });
}

function displayCustomer(posts, target) {
    if (word === "dölj") {
        document.getElementById("updateplace").innerHTML = "";
        word = "visa";
        target.innerHTML = word;
        target.style.color = "blue";
        customerIsSet = false;
        return;
    }
    if (!customerIsSet)
    {
        var elem = document.getElementById("updateplace");
        //rensar innehåll;
        elem.innerHTML = "";
        var emplstr = "";
        var str = "";
        if (posts.length > 0) {
            str = "<table id='itemtable'><tr><th>Kund-id</th><th>Förnamn</th><th>Efternamn</th><th>Telefon</th><th>E-post</th><th>Kundens adress</th></tr>";
            for (var i = 0; i < posts.length; i++) {
                emplstr += "<tr>";
                emplstr += "<td>" + posts[i].customer_id + "</td><td>" + posts[i].fname + "</td><td>" + posts[i].lname + "</td><td>" + posts[i].phone + "</td><td>" + posts[i].email
                        + "</td><td>" + posts[i].address + "</td></tr>";
            }
            str += emplstr;
            str += "</table>";
            elem.innerHTML = str;
            customerIsSet = true;
            word = "dölj";
            target.innerHTML = word;
            target.style.color = "red";
        }
    } else
        return;
}
