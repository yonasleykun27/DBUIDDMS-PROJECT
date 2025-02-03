document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('results-form');
    const studentUsernameSelect = document.getElementById('student-username');
    const resultsTable = document.getElementById('results-table').querySelector('tbody');
    const filterStudentSelect = document.getElementById('filter-student');
    const filterSubjectSelect = document.getElementById('filter-subject');

    const students = users.student;

    for (const username in students) {
        const option = document.createElement('option');
        option.value = username;
        option.text = username;
        studentUsernameSelect.appendChild(option);
        // Add options to the filter selects as well
        const filterStudentOption = document.createElement('option');
        filterStudentOption.value = username;
        filterStudentOption.text = username;
        filterStudentSelect.appendChild(filterStudentOption);

    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentUsername = studentUsernameSelect.value;
        const subject = document.getElementById('subject').value;

        const midtermStr = document.getElementById('midterm').value;
        const assignmentStr = document.getElementById('assignment').value;
        const finalStr = document.getElementById('final').value;

        let errorMessages = [];

        const midterm = parseFloat(midtermStr);
        const assignment = parseFloat(assignmentStr);
        const final = parseFloat(finalStr);

        if (isNaN(midterm) || isNaN(assignment) || isNaN(final)) {
            errorMessages.push("Please enter valid numbers for all scores.");
        }

        if (midterm > 30 || midterm < 0) {
            errorMessages.push("Midterm score must be between 0 and 30.");
        }

        if (assignment > 20 || assignment < 0) {
            errorMessages.push("Assignment score must be between 0 and 20.");
        }

        if (final > 50 || final < 0) {
            errorMessages.push("Final score must be between 0 and 50.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            return;
        }

        let results = JSON.parse(localStorage.getItem('results')) || {};
        if (!results[studentUsername]) {
            results[studentUsername] = {};
        }
        results[studentUsername][subject] = { midterm, assignment, final };
        localStorage.setItem('results', JSON.stringify(results));

        alert('Results submitted successfully!');
        form.reset();
        filterResults(); // Call filterResults to update the table after submit
    });


    filterStudentSelect.addEventListener('change', filterResults);
    filterSubjectSelect.addEventListener('change', filterResults);

    function filterResults() {
        const selectedStudent = filterStudentSelect.value;
        const selectedSubject = filterSubjectSelect.value;

        const results = JSON.parse(localStorage.getItem('results')) || {};
        resultsTable.innerHTML = '';

        for (const student in results) {
            if ((selectedStudent === "" || student === selectedStudent)) {
                for (const subject in results[student]) {
                    if (selectedSubject === "" || subject === selectedSubject) {
                        const row = resultsTable.insertRow();
                        const midterm = results[student][subject].midterm;
                        const assignment = results[student][subject].assignment;
                        const final = results[student][subject].final;
                        const total = midterm + assignment + final;

                        row.insertCell().textContent = student;
                        row.insertCell().textContent = subject;
                        row.insertCell().textContent = midterm;
                        row.insertCell().textContent = assignment;
                        row.insertCell().textContent = final;
                        row.insertCell().textContent = total;

                        const actionsCell = row.insertCell();
                        const clearButton = document.createElement('button');
                        clearButton.className = 'clear-button';
                        clearButton.textContent = 'Clear';
                        clearButton.addEventListener('click', () => {
                            if (confirm("Are you sure you want to clear this result?")) {
                                delete results[student][subject];
                                localStorage.setItem('results', JSON.stringify(results));
                                resultsTable.deleteRow(row.rowIndex - 1);
                            }
                        });
                        actionsCell.appendChild(clearButton);
                    }
                }
            }
        }

        if (resultsTable.rows.length === 0) {
            const row = resultsTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 7;
            cell.textContent = "No results found.";
            cell.style.textAlign = "center";
        }
    }

    filterResults(); // Initial call to display all results

});