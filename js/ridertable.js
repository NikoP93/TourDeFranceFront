import {fetchAnyUrl} from "./modulejson.js";
console.log("Jeg er i rider table")

const urlRiders = "http://localhost:8080/riders"
const tblRiders = document.getElementById("tableRiders")

function createTable(rider) {
    let cellcount = 0
    let rowCount = tblRiders.rows.length

    let row = tblRiders.insertRow(rowCount)
    row.id = rider.id

    let cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.name;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.age;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.totalTime;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.sprintPoints;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.mountainPoints;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.team.teamName
}



    async function fetchRiders(){
        const colhead = document.getElementById("colhead")
        tblRiders.innerHTML = ""
        tblRiders.appendChild(colhead)
        const riders = await fetchAnyUrl(urlRiders)
        riders.forEach(createTable)

    }

    function actionGetRiders(){
        fetchRiders()
    }


    document.addEventListener('DOMContentLoaded',actionGetRiders)

