import {fetchAnyUrl,postObjectAsJson} from "./modulejson.js";

console.log("Jeg er i postrider")

const pbPostRider = document.getElementById("pbPostRider")

const inpName = document.getElementById("name");
const inpAge = document.getElementById("age")
const inpTotalTime = document.getElementById("totalTime")
const inpSpringPoints = document.getElementById("sprintPoints")
const inpMountainPoints = document.getElementById("mountainPoints")
const ddTeam = document.getElementById("team")

const postRiderUrl = "http://localhost:8080/riders"
const getTeamsUrl = "http://localhost:8080/teams"

async function fillTeamsDropdown() {
    const teams = await fetchAnyUrl(getTeamsUrl)
    console.log("Fetched teams",teams)
    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.teamid;
        option.textContent = team.teamName;
        ddTeam.appendChild(option);
    })
}

function getRider(){
    const rider = {
        name: inpName.value,
        age: inpAge.value,
        totalTime: inpTotalTime.value,
        sprintPoints: inpSpringPoints.value,
        mountainPoints: inpMountainPoints.value,
        team: {
            teamid: ddTeam.value
        }
    };

    return rider
}

async function postRider(){
    const rider = getRider()
    const res = await postObjectAsJson(postRiderUrl,rider,"POST")
    if(res.ok){
        alert("Rider saved")
    }
}

function actionPostRider(){
    postRider()
}

window.onload = fillTeamsDropdown()

pbPostRider.addEventListener('click',actionPostRider)

