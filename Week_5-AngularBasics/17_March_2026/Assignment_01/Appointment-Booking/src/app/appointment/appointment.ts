import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class AppointmentComponent {

  // ── List of doctors ──
  doctors = [
    { id: 1, name: 'Dr. Aisha Sharma',  specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Rajan Mehta',   specialty: 'Neurologist' },
    { id: 3, name: 'Dr. Priya Nair',    specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. Arjun Kapoor',  specialty: 'Orthopedic' },
    { id: 5, name: 'Dr. Meera Iyer',    specialty: 'Pediatrician' },
  ];

  // ── Form fields ──
  patientName      = '';
  selectedDoctorId = 0;
  appointmentDate  = '';
  consultationType = '';
  symptoms         = '';

  // ── Other variables ──
  submitted        = false;
  showModal        = false;
  todayDate        = new Date().toISOString().split('T')[0];

  // ── Get selected doctor object ──
  get selectedDoctor() {
    return this.doctors.find(d => d.id === Number(this.selectedDoctorId));
  }

  // ── Calculate fee ──
  get fee() {
    return this.consultationType === 'Online' ? 300 : 500;
  }

  // ── Format date nicely ──
  get niceDate() {
    if (!this.appointmentDate) return '';
    return new Date(this.appointmentDate).toDateString();
  }

  // ── Check if form is filled ──
  get isReady() {
    return this.patientName && this.selectedDoctorId && this.appointmentDate && this.consultationType;
  }

  // ── Submit form ──
  submitForm() {
    this.submitted = true;
    if (this.isReady) {
      this.showModal = true;
    }
  }

  // ── Close modal & reset ──
  closeModal() {
    this.showModal        = false;
    this.submitted        = false;
    this.patientName      = '';
    this.selectedDoctorId = 0;
    this.appointmentDate  = '';
    this.consultationType = '';
    this.symptoms         = '';
  }

}