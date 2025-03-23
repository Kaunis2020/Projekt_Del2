/* 
 * Paginering av sidor
 * Räknar ut paginering samt
 * Visar fem poster per varje sida,
 * för att slippa långa tabeller
 */
var current = 1;
var pageSize = 5;

// Funktioner för paginering
function doPagination(posts)
{
    // Rensar allting i paginering;
    document.getElementById("paginering").innerHTML = "";
    var elem = document.getElementById("paginering");
    var start = 1;
    var total = pagesTotal(posts);
    var li = document.createElement("li");
    li.classList.add("page-item");
    var a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "javascript:prev()";
    a.innerHTML = "<b>Previous</b>";
    a.setAttribute("id", "previous");
    li.appendChild(a);
    elem.appendChild(li);
    for (var i = start; i < (total + 1); i++)
    {
        var li = document.createElement("li");
        li.classList.add("page-item");
        var a = document.createElement("a");
        a.classList.add("page-link");
        a.href = "javascript:goToPage(" + i + ")";
        a.innerHTML = "<b>" + i + "</b>";
        li.appendChild(a);
        li.onclick = clicked;
        elem.appendChild(li);
    }
    var li0 = document.createElement("li");
    li0.classList.add("page-item");
    var a0 = document.createElement("a");
    a0.classList.add("page-link");
    a0.href = "javascript:next()";
    a0.innerHTML = "<b>Next</b>";
    a0.setAttribute("id", "next");
    li0.appendChild(a0);
    elem.appendChild(li0);
}

function clicked() {
    var elems = document.querySelectorAll(".page-item");
    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove("active");
    }
    this.classList.add("active");
}

function setValues() {
    doPagination(posts);
    displayTable();
    var elems = document.querySelectorAll(".page-item");
    elems[1].classList.add("active");
    disable("previous", "disabled");
}

function disable(elemname, state) {
    var elem = document.getElementById(elemname);
    if (state === "disabled") {
        elem.classList.add("disabled");
    } else {
        elem.classList.remove("disabled");
    }
}

function prev() {
    if (current > 1) {
        current--;
        disable("previous", "enable");
        disable("next", "enable");
    }
    if (current > 1 && current < pagesTotal(posts)) {
        disable("previous", "enable");
        disable("next", "enable");
    }
    if (current < 1) {
        current = 1;
        disable("previous", "disabled");
        disable("next", "enable");
    }
    displayTable();
}

function next() {
    if (current < pagesTotal(posts)) {
        current++;
        disable("previous", "enable");
        disable("next", "enable");
    }
    if (current > 1 && current < pagesTotal(posts)) {
        disable("previous", "enable");
        disable("next", "enable");
    }
    if (current > pagesTotal(posts)) {
        current = pagesTotal(posts);
        disable("next", "disabled");
        disable("previous", "enable");
    }
    displayTable();
}

function goToPage(numPage) {
    current = numPage;
    if (current === 1) {
        disable("previous", "disabled");
        disable("next", "enable");
    }
    if (current > 1 && current < pagesTotal(posts)) {
        disable("previous", "enable");
        disable("next", "enable");
    }
    if (current === pagesTotal(posts)) {
        disable("next", "disabled");
        disable("previous", "enable");
    }
    displayTable();
}

function indexStart() {
    return (current - 1) * pageSize;
}

function indexEnd() {
    return indexStart() + pageSize;
}

function pagesTotal(posts) {
    return Math.ceil(posts.length / pageSize);
}

function paginated(posts) {
    return posts.slice(indexStart(), indexEnd());
}
