// Mock role to simulate login
const currentUserRole = "SPM"; // Change to simulate other roles

// Processed data with three rows for each brand and corresponding packings
const processedData = {
    "Avifloxin": [
        ["Sr.No", "Brand Name", "Company Name", "Concentration", "Packing", "MRP (PKR)", "T.P (PKR)", "D.P (PKR)", "Monthly Sale", "Remarks"],
        [1, "Envet", "Vetz", "0.1", "10 ml", "", "", "", "", ""],
        [1, "Envet", "Vetz", "0.1", "50 ml", "", "", "", "", ""],
        [1, "Envet", "Vetz", "0.1", "100 ml", "", "", "", "", ""],
        [2, "Rofox", "A&K", "0.1", "10 ml", "", "", "", "", ""],
        [2, "Rofox", "A&K", "0.1", "50 ml", "", "", "", "", ""],
        [2, "Rofox", "A&K", "0.1", "100 ml", "", "", "", "", ""],
    ],
};

// Unapproved data and approved records
let unapprovedData = { ...processedData };
let approvedRecords = [];

// Show the relevant tab
function showTab(tab) {
    document.getElementById("unapproved-tab").style.display = tab === "unapproved" ? "block" : "none";
    document.getElementById("approved-tab").style.display = tab === "approved" ? "block" : "none";
}

// Generate Unapproved Data Sheets
function generateUnapprovedSheets() {
    const unapprovedContainer = document.getElementById("unapproved-container");
    unapprovedContainer.innerHTML = "";

    Object.entries(unapprovedData).forEach(([sheetName, rows]) => {
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");

        rows.forEach((row, rowIndex) => {
            const tr = document.createElement("tr");

            row.forEach((cell, cellIndex) => {
                const td = document.createElement("td");
                if (rowIndex === 0) {
                    const th = document.createElement("th");
                    th.textContent = cell;
                    tr.appendChild(th);
                } else {
                    if (cell === "" || cell === null) {
                        const input = document.createElement("input");
                        input.type = "text";
                        input.placeholder = "Enter data";
                        td.appendChild(input);
                    } else {
                        td.textContent = cell;
                    }
                    tr.appendChild(td);
                }
            });

            if (rowIndex !== 0 && currentUserRole === "SPM") {
                const actionsTd = document.createElement("td");
                const approveBtn = document.createElement("button");
                approveBtn.textContent = "Approve";
                approveBtn.className = "action";
                approveBtn.onclick = () => approveRow(sheetName, row);
                actionsTd.appendChild(approveBtn);
                tr.appendChild(actionsTd);
            }

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        unapprovedContainer.appendChild(table);
    });
}

// Add New Record
function addNewRecord() {
    const unapprovedContainer = document.getElementById("unapproved-container");
    const tables = unapprovedContainer.querySelectorAll("table");

    tables.forEach((table) => {
        const tbody = table.querySelector("tbody");
        const newRow = document.createElement("tr");

        const headers = Array.from(table.querySelector("tr").children).length;
        for (let i = 0; i < headers; i++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter data";
            td.appendChild(input);
            newRow.appendChild(td);
        }

        tbody.appendChild(newRow);
    });
}

// Submit Data
function submitData() {
    alert("Data Submitted Successfully!");
}

// Approve Data
function approveRow(sheetName, row) {
    approvedRecords.push(row);
    unapprovedData[sheetName] = unapprovedData[sheetName].filter(r => r !== row);
    generateUnapprovedSheets();
    populateApprovedData();
}

// Populate Approved Data
function populateApprovedData() {
    const approvedTable = document.getElementById("approved-table").querySelector("tbody");
    approvedTable.innerHTML = "";

    approvedRecords.forEach((record) => {
        const tr = document.createElement("tr");
        record.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell || "";
            tr.appendChild(td);
        });

        approvedTable.appendChild(tr);
    });
}

// Initialize
generateUnapprovedSheets();
