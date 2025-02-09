document.addEventListener('DOMContentLoaded', () => {
    displayAnnouncements();
    displayEvents();
    displayNotifications();
});

function displayAnnouncements() {
    const announcementsList = document.getElementById('announcement-list');
    const announcements = getFromLocalStorage('dbu_announcements');

    announcementsList.innerHTML = "";

    if (announcements.length === 0) {
        appendNoItemsMessage(announcementsList, "No announcements at this time.");
        return;
    }

    announcements.forEach(announcement => {
        const li = document.createElement('li');
        li.textContent = announcement;
        announcementsList.appendChild(li);
    });
}

function displayEvents() {
    const eventsList = document.getElementById('event-list');
    const events = getFromLocalStorage('dbu_events');

    eventsList.innerHTML = "";

    if (events.length === 0) {
        appendNoItemsMessage(eventsList, "No upcoming events scheduled.");
        return;
    }

    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
            <dl>  
                <dt class="event-title">${event.description || ""}</dt>
                <dd class="event-datetime">${formatDateTime(event.datetime) || ""}</dd>
            </dl>`;
        eventsList.appendChild(li);
    });
}

function displayNotifications() {
    const notificationsList = document.getElementById('notification-list');
    const notifications = getFromLocalStorage('dbu_notifications');

    notificationsList.innerHTML = "";

    if (notifications.length === 0) {
        appendNoItemsMessage(notificationsList, "No new notifications.");
        return;
    }

    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationsList.appendChild(li);
    });
}

function appendNoItemsMessage(listElement, message) {
    const li = document.createElement('li');
    li.textContent = message;
    listElement.appendChild(li);
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

window.addEventListener('message', (event) => {
    switch (event.data) {
        case 'announcementUpdated':
            displayAnnouncements();
            break;
        case 'eventUpdated':
            displayEvents();
            break;
        case 'notificationUpdated':
            displayNotifications();
            break;
    }
});