/* 
 * Larissa
 */
// Kontrollerar om token är satt 

window.addEventListener("load", (event) => {
    checkUser();
});

function checkUser()
{
      // Får token från localStorage
    let token = localStorage.getItem('token');
    if (token === null || token === undefined) {
        window.location.replace("index.html");
    } else {
        let fname = getCookie("fname");
        let username = getCookie("username");
        const h2 = document.createElement("h2");
        h2.innerHTML = "Välkommen, " + fname + "!";
        const h3 = document.createElement("h3");
        h3.innerHTML = "Du är inloggad som " + username;
        document.getElementById("title").appendChild(h2);
        document.getElementById("title").appendChild(h3);
    }
}

// Rensar localStorage och cookie;
// Omdirigerar till index-sidan;
function LogOut()
{
    localStorage.clear();
    document.cookie = "fname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("index.html");
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}