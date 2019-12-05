let url = ''
let chambermembers = [];
console.log(window.location.href)

if (window.location.href.endsWith("Senate.html")) {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json'

} else if (window.location.href.endsWith("House.html")) {
    url = 'https://api.propublica.org/congress/v1/113/house/members.json'

}



fetch(url, {
        headers: {
            "X-API-Key": "eN0OfAyhAbM6pmoOg9wPmzZ9dxMg39QXDw4sOMH7"
        }
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data);
        chambermembers = data.results[0].members;
        console.log(chambermembers)
        makeTable()
        document.getElementById("Senatedata").innerHTML = makeTable()
        alLTheStatesrdi()

    })








function makeTable() {
    let tableContents = "";
    for (let i = 0; i < chambermembers.length; i++) {
        let name = '';
        if (chambermembers[i].middle_name === null) {
            name = chambermembers[i].first_name + ' ' + chambermembers[i].last_name;
        } else {
            name = chambermembers[i].first_name + ' ' + chambermembers[i].middle_name + ' ' + chambermembers[i].last_name;
        }
        tableContents += "<tr> <td>" + "<a href='" + chambermembers[i].url + "'>" + name + '</a>' + "</td><td>" + chambermembers[i].party + "</td><td>" +
            chambermembers[i].state + "</td><td>" + chambermembers[i].seniority + "</td><td>" +
            chambermembers[i].votes_with_party_pct + "</td></tr>"
    }
    return tableContents;
}




function filtrar() {
  
    let checkedBoxResult = [];
if (document.getElementById("republican2").checked == true){
    checkedBoxResult.push('R')   
}if (document.getElementById("democrat2").checked == true){
    checkedBoxResult.push('D')
}if (document.getElementById("independent2").checked == true){
checkedBoxResult.push('I')
}
console.log(checkedBoxResult)



let arrayfilter = chambermembers.filter(function(x){
 return checkedBoxResult.includes(x.party)
})
console.log(arrayfilter)

let select = document.getElementById("theSenateFilters");
    
console.log(select.value);


    let Filtered = [];
    if ('ALL' == select.value) {
        Filtered.push(arrayfilter)
        
    } else if ('All' !== select.value) {
        Filtered.push(arrayfilter.filter(function (x) {
            return x.state == select.value
        }));
    }

    console.log(Filtered)
    
    document.getElementById("Senatedata").innerHTML = makeThe2Filter(Filtered);

}

function makeThe2Filter(arr) {
    let tableContents = "";
    for (i = 0; i < arr[0].length; i++) {
        let name = '';
        if (arr[0][i].middle_name === null) {
            name = arr[0][i].first_name + ' ' + arr[0][i].last_name;
        } else {
            name = arr[0][i].first_name + ' ' + arr[0][i].middle_name + ' ' + arr[0][i].last_name;
        }
        tableContents += "<tr> <td>" + "<a href='" + arr[0][i].url + "'>" + name + '</a>' + "</td><td>" + arr[0][i].party + "</td><td>" +
            arr[0][i].state + "</td><td>" + arr[0][i].seniority + "</td><td>" +
            arr[0][i].votes_with_party_pct + "</td></tr>"

    }
    return tableContents;
}


function alLTheStatesrdi() {
    let everYStates = [];
    for (let i = 0; i < chambermembers.length; i++) {
        everYStates.push(chambermembers[i].state)
    }
    console.log(everYStates)
    let sortStates = [...new Set(everYStates)].sort();
    console.log(sortStates)
    document.getElementById('theSenateFilters').innerHTML = senateStatesTable(sortStates)
}


function senateStatesTable(array) {
    let senateStates = '<option value=' + 'ALL' + '>' + "--ALL States--" + '</option>';

    for (let i = 0; i < array.length; i++) {
        senateStates += '<option value=' + array[i] + '>' + array[i] + '</option>';

    }
    return senateStates
}

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
