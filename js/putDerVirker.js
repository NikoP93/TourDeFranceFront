import { fetchAnyUrl, postObjectAsJson, fillTeamsDropdown } from "./modulejson.js";

console.log("Jeg er i putrider");

const getTeamsUrl = "http://localhost:8080/teams";
const urlRider = "http://localhost:8080/rider"; // Base URL for PUT requests
const editRiderForm = document.getElementById("editRiderForm");

// Initialize form and event listeners
async function initializeEditForm() {
    await fillTeamsDropdown(document.getElementById("editTeam"), getTeamsUrl);
    createEditFormEventListener();
}

function createEditFormEventListener() {
    editRiderForm.addEventListener('submit', handleEditFormSubmit);
}

// Handle edit form submission
async function handleEditFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const riderId = document.getElementById("editRiderId").value;
    const url = `${urlRider}/${riderId}`; // Use the full URL with rider ID

    try {
        const formData = new FormData(form);
        await updateRiderDataAsJson(url, formData);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}

// Send PUT request with form data
async function updateRiderDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());

    // Adjust the structure for the PUT request
    plainFormData.team = {};
    plainFormData.team.teamid = plainFormData.teamid;

    const resp = await postObjectAsJson(url, plainFormData, "PUT");
    if (!resp.ok) {
        const errorMessage = await resp.text();
        console.error(errorMessage);
        alert(errorMessage);
    } else {
        alert("Rider updated");
        editRiderForm.style.display = "none"; // Hide the edit form after successful update
        // Optionally refresh the riders list here
    }
}

// Show the edit form and populate it with the rider's data
export function showEditForm(rider) {

    const editRiderSection = document.getElementById("editRiderSection");



    document.getElementById("editRiderId").value = rider.id;
    document.getElementById("editName").value = rider.name;
    document.getElementById("editAge").value = rider.age;
    document.getElementById("editTotalTime").value = rider.totalTime;
    document.getElementById("editSprintPoints").value = rider.sprintPoints;
    document.getElementById("editMountainPoints").value = rider.mountainPoints;

    editRiderSection.style.display = "flex"

    initializeEditForm()

}

function hideEditForm(){
    document.getElementById("editRiderForm").style.display = "none";

}

document.getElementById("cancelEditButton").addEventListener("click", hideEditForm);