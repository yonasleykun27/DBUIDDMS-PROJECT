document.addEventListener('DOMContentLoaded', () => {
    const studentUsernameInput = document.getElementById('student-username');
    const studentPasswordInput = document.getElementById('student-password');
    const viewResultsButton = document.getElementById('view-results');
    const resultsTable = document.getElementById('results-table').querySelector('tbody');
    const togglePassword = document.getElementById('togglePassword');
    const calculatedGpa = document.getElementById('calculated-gpa');

    viewResultsButton.addEventListener('click', () => {
        const username = studentUsernameInput.value;
        const password = studentPasswordInput.value;

        const role = "student";
        const roleUsers = users[role];

        if (!roleUsers || !roleUsers[username] || roleUsers[username].password !== password) {
            alert("Invalid username or password.");
            return;
        }

        localStorage.setItem('studentUsername', username);
        displayResults(username);
    });

    togglePassword.addEventListener('click', () => {
        const type = studentPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        studentPasswordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    function displayResults(studentUsername) {
        const results = JSON.parse(localStorage.getItem('results')) || {};
        resultsTable.innerHTML = '';

        if (results[studentUsername]) {
            let totalGradePoints = 0;
            let totalCredits = 0;

            for (const subject in results[studentUsername]) {
                const row = resultsTable.insertRow();
                const midterm = results[studentUsername][subject].midterm;
                const assignment = results[studentUsername][subject].assignment;
                const final = results[studentUsername][subject].final;
                const total = midterm + assignment + final;

                const grade = calculateGrade(total);
                const gradePoint = calculateGradePoint(grade);
                const comment = getComment(total);

                row.insertCell().textContent = subject;
                row.insertCell().textContent = midterm;
                row.insertCell().textContent = assignment;
                row.insertCell().textContent = final;
                row.insertCell().textContent = total;
                row.insertCell().textContent = grade;
                const commentCell = row.insertCell();
                commentCell.textContent = comment;
                commentCell.classList.add(`comment-${getColor(comment)}`);

                totalGradePoints += gradePoint * getCredit(subject);
                totalCredits += getCredit(subject);
            }

            const gpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
            calculatedGpa.textContent = `Your GPA: ${gpa.toFixed(2)}`;
        } else {
            const row = resultsTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 7;
            cell.textContent = "No results found for this student.";
            cell.style.textAlign = "center";
            calculatedGpa.textContent = "";
        }
    }

    function calculateGrade(total) {
        if (total >= 90) return "A+";
        if (total >= 85) return "A";
        if (total >= 80) return "A-";
        if (total >= 75) return "B+";
        if (total >= 70) return "B";
        if (total >= 65) return "B-";
        if (total >= 60) return "C+";
        if (total >= 50) return "C";
        if (total >= 45) return "C-";
        if (total >= 40) return "D";
        return "F";
    }

    function calculateGradePoint(grade) { 
        switch (grade) {
            case "A+": return 4.0;
            case "A": return 4.0;
            case "A-": return 3.75;
            case "B+": return 3.5;
            case "B": return 3.0;
            case "B-": return 2.75;
            case "C+": return 2.5;
            case "C": return 2.0;
            case "C-": return 1.75;
            case "D": return 1.0;
            case "F": return 0.0;
            default: return 0.0; 
        }
    }

    function getComment(total) {
        if (total >= 90) return "Excellent";
        if (total >= 80) return "Very Good";
        if (total >= 70) return "Good";
        if (total >= 60) return "Fair";
        return "Poor";
    }

    function getColor(comment) {
        switch (comment) {
            case "Excellent":
            case "Very Good":
            case "Good":
                return "green";
            case "Fair":
                return "orange";
            default:
                return "red";
        }
    }

    function getCredit(subject) {
        switch (subject) {
            case "Information System": return 5;
            case "Introduction to Software Engineering": return 5;
            case "Introduction to Database": return 5;
            case "Introduction to Management": return 3;
            case "Programming II": return 5;
            case "Inclusiveness": return 3;
            case "Discrete Mathematics": return 5;
            default: return 3;
        }
    }
});