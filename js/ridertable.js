import {fetchAnyUrl,restDelete,fillTeamsDropdown} from "./modulejson.js";
import {showEditForm} from "./putrider.js";


console.log("Jeg er i rider table")

const urlRiders = "http://localhost:8080/riders"
const getTeamsUrl = "http://localhost:8080/teams"
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

    const pbDelete = document.createElement("input")
    pbDelete.type = "button"
    pbDelete.setAttribute("value", "Slet rytter")
    pbDelete.className = "btn1"
    pbDelete.onclick = function () {
        document.getElementById(rider.id).remove()
        deleteRider(rider)

    }
    row.appendChild(pbDelete)

    cell = row.insertCell(cellcount++);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        showEditForm(rider)
    }
    cell.appendChild(editButton);
}

async function deleteRider(rider){
    try{
        const url = urlRiders + "/" + rider.id
        const resp = await restDelete(url)
        const body = await resp.text()
        alert(body)
    } catch(error){
        alert(error.message)
        console.log(error)
    }
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


    export function initializeRiderTable(){
    fetchRiders();
    }

