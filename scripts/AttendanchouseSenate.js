let url = ''
let chambermembers = [];

console.log(window.location.href)


if (window.location.href.endsWith("AttendanceSenate.html")) {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json'

} else if (window.location.href.endsWith("AttendanceHouse.html")) {
    url = 'https://api.propublica.org/congress/v1/113/house/members.json'

}

let statistics = {
    numberOfRepublicans: 0,
    numberOfDemocrats: 0,
    numberOfIndependents: 0,
    precentOfRepublicans: 0,
    percentOfDemocrats: 0,
    percentOfIndependents: 0,
    total: 0,
    precentOfTotal: 0,

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
        for (i = 0; i < chambermembers.length; i++) {
            if (chambermembers[i].party === "R") {
                statistics.numberOfRepublicans = statistics.numberOfRepublicans + 1
            }
            if (chambermembers[i].party === "D") {
                statistics.numberOfDemocrats = statistics.numberOfDemocrats + 1
            }
            if (chambermembers[i].party === "I") {
                statistics.numberOfIndependents = statistics.numberOfIndependents + 1
            }
        }
        console.log(statistics)
        repDemInd(chambermembers)
        statistics.total = statistics.numberOfRepublicans + statistics.numberOfDemocrats + statistics.numberOfIndependents;
        console.log(statistics.total)
        statistics.precentOfTotal = (statistics.precentOfRepublicans + statistics.percentOfDemocrats + statistics.percentOfIndependents) / 3;
        console.log(statistics.precentOfTotal)
        document.getElementById("AttendanceSenate").innerHTML = makeTable(statistics)

        let arraychambermembers = chambermembers
        arraychambermembers.sort(function (obj1, obj2) {
            return obj2.missed_votes_pct - obj1.missed_votes_pct;
        });
        document.getElementById("Last Engaged").innerHTML = lastEngaged(arraychambermembers)
        document.getElementById("Most Engaged").innerHTML = mostEngaged(arraychambermembers)

    })









function repDemInd(chambermembers) {
    for (i = 0; i < chambermembers.length; i++) {
        if (chambermembers[i].party === "R") {
            statistics.precentOfRepublicans += chambermembers[i].votes_with_party_pct
        } else if (chambermembers[i].party === "D") {
            statistics.percentOfDemocrats += chambermembers[i].votes_with_party_pct
        } else if (chambermembers[i].party === "I") {
            statistics.percentOfIndependents += chambermembers[i].votes_with_party_pct
        }

    }

    statistics.precentOfRepublicans =
        statistics.precentOfRepublicans / statistics.numberOfRepublicans;
    statistics.percentOfDemocrats = statistics.percentOfDemocrats / statistics.numberOfDemocrats;
    statistics.percentOfIndependents = statistics.percentOfIndependents / statistics.numberOfIndependents;
    if (isNaN(statistics.percentOfIndependents)) {
        statistics.percentOfIndependents = 0;
    }
}





document.getElementById("AttendanceSenate").innerHTML = makeTable(statistics)

function makeTable(statistics) {
    let tableContents = "";
    tableContents += "<tr> <td> Republicans</td>" +
        "<td>" + statistics.numberOfRepublicans + "</td>" +
        "<td>" + statistics.precentOfRepublicans.toFixed(2) + " %" + "</td></tr>" +
        "<tr> <td> Democrats</td>" +
        "<td>" + statistics.numberOfDemocrats + "</td>" +
        "<td>" + statistics.percentOfDemocrats.toFixed(2) + " %" + "</td></tr>" +
        "<tr> <td> Independents</td>" +
        "<td>" + statistics.numberOfIndependents + "</td>" +
        "<td>" + statistics.percentOfIndependents.toFixed(2) + " %" + "</td></tr>" +
        "<tr> <td> Total</td>" +
        "<td>" + statistics.total + "</td>" +
        "<td>" + statistics.precentOfTotal.toFixed(2) + " %" + "</td></tr>"
    return tableContents;
}




function lastEngaged(array) {

    let mostEngagedTable = ""
    for (let i = 0; i < array.length * 0.1; i++) {
        let name = '';
        if (array[i].middle_name === null) {
            name = array[i].first_name + ' ' + array[i].last_name;
        } else {
            name = array[i].first_name + ' ' + array[i].middle_name + ' ' + array[i].last_name;
        }
        mostEngagedTable += '<tr><td>' + '<a href="' + array[i].url + '">' + name + '</a>' + '</td><td>' + array[i].missed_votes +
            '</td><td>' + array[i].missed_votes_pct + '</td></tr>'
    }
    return mostEngagedTable;
}


function mostEngaged(array) {
    let firsttable = ""
    for (let i = array.length - 1; i > array.length * 0.9; i--) {
        if (array[i].middle_name === null) {
            name = array[i].first_name + ' ' + array[i].last_name;
        } else {
            name = array[i].first_name + ' ' + array[i].middle_name + ' ' + array[i].last_name;
        }
        firsttable += '<tr><td>' + '<a href="' + array[i].url + '">' + name + '</a>' + '</td><td>' + array[i].missed_votes +
            '</td><td>' + array[i].missed_votes_pct + '</td></tr>'
    }
    return firsttable
}


var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}