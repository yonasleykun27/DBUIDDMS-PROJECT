document.addEventListener('DOMContentLoaded', () => {
    displayNotifications();
});

function sendNotification() {
    const message = document.getElementById('notification-message').value;

    if (message.trim() === "") {
        alert("Please enter a notification message.");
        return;
    }

    const notification = message;

    let notifications = getFromLocalStorage('dbu_notifications');
    notifications.push(notification);
    localStorage.setItem('dbu_notifications', JSON.stringify(notifications));

    alert("Notification sent!");
    document.getElementById('notification-message').value = "";
    displayNotifications();

    if (window.opener) {
        window.opener.postMessage('notificationUpdated', '*');
    } else {
        console.warn("Dashboard window is closed. Cannot update display.");
    }
}

function clearAllNotifications() {
    if (confirm("Are you sure you want to clear all notifications?")) {
        localStorage.removeItem('dbu_notifications');
        alert("All notifications cleared.");
        displayNotifications();

        if (window.opener) {
            window.opener.postMessage('notificationUpdated', '*');
        } else {
            console.warn("Dashboard window is closed. Cannot update display.");
        }
    }
}

function displayNotifications() {
    const sentNotificationsArea = document.getElementById('sent-notifications');
    const sentNotificationsList = document.createElement('ul');
    sentNotificationsArea.innerHTML = "<h2>Sent Notifications</h2>";
    sentNotificationsArea.appendChild(sentNotificationsList);

    const notifications = getFromLocalStorage('dbu_notifications');

    if (notifications.length === 0) {
        const noNotificationsMessage = document.createElement('li');
        noNotificationsMessage.textContent = "No new notifications.";
        sentNotificationsList.appendChild(noNotificationsMessage);
        return;
    }

    notifications.forEach((notification, index) => {
        const li = document.createElement('li');
        li.textContent = notification;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', deleteNotification);
        li.appendChild(deleteButton);

        sentNotificationsList.appendChild(li);
    });
}

function deleteNotification(event) {
    const indexToDelete = parseInt(event.target.dataset.index);
    let notifications = getFromLocalStorage('dbu_notifications');
    notifications.splice(indexToDelete, 1);
    localStorage.setItem('dbu_notifications', JSON.stringify(notifications));

    displayNotifications();

    if (window.opener) {
        window.opener.postMessage('notificationUpdated', '*');
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