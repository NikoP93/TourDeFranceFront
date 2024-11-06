import {fetchAnyUrl,postObjectAsJson,fillTeamsDropdown} from "./modulejson.js";

console.log("jeg er i postrider1")

let formRider;
const getTeamsUrl = "http://localhost:8080/teams"
const urlPostRider = "http://localhost:8080/riders"

export function initializePostRiderView(){
    const formRider = document.getElementById("postRider");
    const ddTeam = document.getElementById("team")

    fillTeamsDropdown(ddTeam,getTeamsUrl)

    formRider.addEventListener('submit',handleFormSubmit)
}



async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = urlPostRider

    console.log(form)
    console.log(url)
    try{
        const formData = new FormData(form)
        console.log(formData)
        if(!formData.has("teamid")){
            console.error("Mangler team id")
        }
        const responseData = await postFormDataAsJson(url,formData)
    } catch(error){
        alert(error.message)
        console.log(error)
    }
}

async function postFormDataAsJson(url,formData) {
    console.log("Jeg er i postformdata")
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)

    plainFormData.team = {}
    plainFormData.team.teamid = plainFormData.teamid


    const resp = await postObjectAsJson(url,plainFormData,"POST")
    if(!resp.ok){
        const errorMessage = await resp.text()
        console.error(errorMessage)
        alert(errorMessage)
    }else{
        alert("Rider saved")
    }
    return resp
}




