import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Doctor { id:number; name:string; specialty:string; avatar:string }

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.css']
})
export class AppointmentComponent implements OnInit {

  doctors: Doctor[] = [
    {id:1,name:'Dr. Aisha Sharma',specialty:'Cardiologist',avatar:'🫀'},
    {id:2,name:'Dr. Rajan Mehta',specialty:'Neurologist',avatar:'🧠'},
    {id:3,name:'Dr. Priya Nair',specialty:'Dermatologist',avatar:'🌿'},
    {id:4,name:'Dr. Arjun Kapoor',specialty:'Orthopedic',avatar:'🦴'},
    {id:5,name:'Dr. Meera Iyer',specialty:'Pediatrician',avatar:'👶'},
    {id:6,name:'Dr. Siddharth Rao',specialty:'General Physician',avatar:'🩺'},
  ];

  form = { patientName:'', doctorId:null as number|null, appointmentDate:'', consultationType:'' as 'Online'|'Offline'|'', symptoms:'' };
  todayDate = '';
  submitted = false;
  confirmationVisible = false;

  ngOnInit() { this.todayDate = new Date().toISOString().split('T')[0]; }

  get selectedDoctor() { return this.doctors.find(d => d.id === Number(this.form.doctorId)); }
  get consultationFee() { return this.form.consultationType === 'Online' ? 300 : 500; }
  get formattedDate() {
    if (!this.form.appointmentDate) return '';
    return new Date(this.form.appointmentDate).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  }
  get isFormComplete() { return !!(this.form.patientName.trim() && this.form.doctorId && this.form.appointmentDate && this.form.consultationType); }
  get summaryReady() { return !!(this.form.patientName || this.form.doctorId || this.form.appointmentDate || this.form.consultationType); }

  onSubmit() {
    this.submitted = true;
    if (this.isFormComplete) this.confirmationVisible = true;
  }

  closeConfirmation() {
    this.confirmationVisible = false;
    this.form = { patientName:'', doctorId:null, appointmentDate:'', consultationType:'', symptoms:'' };
    this.submitted = false;
  }
}