// Appointment Management
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('appointmentForm')) {
        setupAppointmentForm();
        loadFormOptions();
    }
    
    if (document.getElementById('appointmentsTable')) {
        loadAppointments();
    }
    
    // Initialize date picker
    if (document.getElementById('appointmentDate')) {
        flatpickr("#appointmentDate", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today"
        });
    }
});

function setupAppointmentForm() {
    document.getElementById('appointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const appointmentData = {
            id: Date.now().toString(),
            patientId: document.getElementById('patientSelect').value,
            doctorId: document.getElementById('doctorSelect').value,
            dateTime: document.getElementById('appointmentDate').value,
            reason: document.getElementById('reason').value,
            status: 'scheduled'
        };
        
        // Save to localStorage (replace with API call)
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showAlert('Appointment booked successfully!');
        setTimeout(() => window.location.href = 'list.html', 1500);
    });
}

function loadFormOptions() {
    // Load patients
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patientSelect = document.getElementById('patientSelect');
    
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
    
    // Load doctors (in a real app, this would come from an API)
    const doctors = [
        { id: 'doc1', name: 'Dr. Smith' },
        { id: 'doc2', name: 'Dr. Johnson' }
    ];
    
    const doctorSelect = document.getElementById('doctorSelect');
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const tableBody = document.querySelector('#appointmentsTable tbody');
    
    tableBody.innerHTML = appointments.map(appt => {
        const patient = patients.find(p => p.id === appt.patientId);
        return `
            <tr>
                <td>${patient ? patient.name : 'Unknown Patient'}</td>
                <td>${new Date(appt.dateTime).toLocaleString()}</td>
                <td>${appt.reason}</td>
                <td><span class="badge bg-info">${appt.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}