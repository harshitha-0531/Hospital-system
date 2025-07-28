// Patient Management Functions
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('patientsTable')) {
        loadPatients();
    }
    
    if (document.getElementById('patientForm')) {
        setupPatientForm();
    }
});

function loadPatients() {
    // In a real app, this would fetch from an API
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const tableBody = document.querySelector('#patientsTable tbody');
    
    tableBody.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.lastVisit || 'N/A'}</td>
            <td>
                <a href="details.html?id=${patient.id}" class="btn btn-sm btn-primary">
                    <i class="fas fa-eye"></i>
                </a>
                <button class="btn btn-sm btn-danger" onclick="deletePatient('${patient.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function setupPatientForm() {
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const patientData = {
            id: Date.now().toString(),
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            medicalHistory: document.getElementById('medicalHistory').value,
            registeredDate: new Date().toISOString()
        };
        
        // Save to localStorage (replace with API call)
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.push(patientData);
        localStorage.setItem('patients', JSON.stringify(patients));
        
        showAlert('Patient registered successfully!');
        setTimeout(() => window.location.href = 'list.html', 1500);
    });
}

function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        let patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients = patients.filter(p => p.id !== id);
        localStorage.setItem('patients', JSON.stringify(patients));
        loadPatients();
        showAlert('Patient deleted successfully');
    }
}