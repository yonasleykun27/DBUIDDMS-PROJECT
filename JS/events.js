document.addEventListener('DOMContentLoaded', () => {
    displaySentEvents();
});

function addEvent() {
    const description = document.getElementById('event-description').value;
    const datetime = document.getElementById('event-datetime').value;

    if (description.trim() === "" || datetime === "") {
        alert("Please enter a description and select a date and time.");
        return;
    }

    const selectedDate = new Date(datetime);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
        alert("You cannot add events in the past.");
        return;
    }

    const event = {
        description: description,
        datetime: datetime
    };

    let events = getFromLocalStorage('dbu_events');
    events.push(event);
    localStorage.setItem('dbu_events', JSON.stringify(events));

    alert("Event added!");
    document.getElementById('event-description').value = "";
    document.getElementById('event-datetime').value = "";
    displaySentEvents();

    sendUpdateMessageToDashboard('eventUpdated');
}

function clearAllEvents() {
    if (confirm("Are you sure you want to clear all events?")) {
        localStorage.removeItem('dbu_events');
        alert("All events cleared.");
        displaySentEvents();

        sendUpdateMessageToDashboard('eventUpdated');
    }
}

function displaySentEvents() {
    const sentEventsArea = document.getElementById('sent-events');
    const sentEventsList = document.createElement('ul');
    sentEventsArea.innerHTML = "<h2>Upcoming Events</h2>";
    sentEventsArea.appendChild(sentEventsList);

    const events = getFromLocalStorage('dbu_events');

    if (events.length === 0) {
        appendNoEventsMessage(sentEventsList);
        return;
    }

    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <dl>
                <dt class="event-title">${event.description}</dt>
                <dd class="event-datetime">${formatDateTime(event.datetime)}</dd>
            </dl>`;

        const deleteButton = createDeleteButton(index);
        li.appendChild(deleteButton);
        sentEventsList.appendChild(li);
    });
}

function deleteEvent(event) {
    const indexToDelete = parseInt(event.target.dataset.index);
    let events = getFromLocalStorage('dbu_events');
    events.splice(indexToDelete, 1);
    localStorage.setItem('dbu_events', JSON.stringify(events));

    displaySentEvents();
    sendUpdateMessageToDashboard('eventUpdated');
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

function formatDateTime(datetimeString) {
    if (!datetimeString) return "";

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const datetime = new Date(datetimeString);

    if (isNaN(datetime)) {
        console.error("Invalid date string:", datetimeString);
        return "Invalid Date";
    }
    return datetime.toLocaleDateString(undefined, options);
}

// Helper functions

function sendUpdateMessageToDashboard(message) {
    if (window.opener) {
        window.opener.postMessage(message, '*');
    } else {
        console.warn("Dashboard window is closed. Cannot update display.");
    }
}

function appendNoEventsMessage(listElement) {
    const noEventsMessage = document.createElement('li');
    noEventsMessage.textContent = "No events scheduled yet.";
    listElement.appendChild(noEventsMessage);
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.dataset.index = index;
    deleteButton.addEventListener('click', deleteEvent);
    return deleteButton;
}