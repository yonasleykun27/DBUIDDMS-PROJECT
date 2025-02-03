// announcements.js

document.addEventListener('DOMContentLoaded', () => {
    displaySentAnnouncements(); // Display sent announcements on page load
});

function sendMessage() {
    const message = document.getElementById('message').value;

    if (message.trim() === "") {
        alert("Please enter an announcement.");
        return;
    }

    let announcements = getFromLocalStorage('dbu_announcements');
    announcements.push(message);
    localStorage.setItem('dbu_announcements', JSON.stringify(announcements));

    alert("Announcement sent!");
    document.getElementById('message').value = "";
    displaySentAnnouncements();  // Update the sent announcements list

    // Send message to dashboard to update its announcements area
    if (window.opener) {
        window.opener.postMessage('announcementUpdated', '*');
    } else {
        console.warn("Dashboard window is closed. Cannot update display.");
    }
}

function clearAllAnnouncements() {
    if (confirm("Are you sure you want to clear all announcements?")) {
        localStorage.removeItem('dbu_announcements');
        alert("All announcements cleared.");
        displaySentAnnouncements();

        if (window.opener) {
            window.opener.postMessage('announcementUpdated', '*');
        } else {
            console.warn("Dashboard window is closed. Cannot update display.");
        }
    }
}


function displaySentAnnouncements() {
    const sentAnnouncementsArea = document.getElementById('sent-announcements');
    const sentAnnouncementsList = document.createElement('ul'); // Create a <ul>
    sentAnnouncementsArea.innerHTML = "<h2>Sent Announcements</h2>"; // Clear existing content
    sentAnnouncementsArea.appendChild(sentAnnouncementsList); // Add the <ul> to the div

    const announcements = getFromLocalStorage('dbu_announcements');

    if (announcements.length === 0) {
        const noAnnouncementsMessage = document.createElement('li');
        noAnnouncementsMessage.textContent = "No announcements sent yet.";
        sentAnnouncementsList.appendChild(noAnnouncementsMessage);
        return;
    }

    announcements.forEach((announcement, index) => {
        const li = document.createElement('li');
        li.textContent = announcement;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', deleteAnnouncement);
        li.appendChild(deleteButton);
        sentAnnouncementsList.appendChild(li);
    });

}

function deleteAnnouncement(event) {
    const indexToDelete = parseInt(event.target.dataset.index);
    let announcements = getFromLocalStorage('dbu_announcements');
    announcements.splice(indexToDelete, 1);
    localStorage.setItem('dbu_announcements', JSON.stringify(announcements));

    displaySentAnnouncements(); 

    if (window.opener) {
        window.opener.postMessage('announcementUpdated', '*');
    } else {
        console.warn("Dashboard window is closed. Cannot update display.");
    }
}



function getFromLocalStorage(key) {
    try {
        const storedData = localStorage.getItem(key);
        return JSON.parse(storedData) || [];
    } catch (error) {
        console.error(`Error getting ${key} from local storage:`, error);
        localStorage.removeItem(key);
        return [];
    }
}