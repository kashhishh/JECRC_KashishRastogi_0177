import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackFormComponent {

  // Dropdown options
  departments = ['HR', 'Development', 'Design', 'QA'];

  // Skills checkboxes
  allSkills = ['Angular', 'React', 'Node', 'Python'];

  selectedSkills: string[] = [];

  // Two-way binding model
  feedback = {
    name: '',
    email: '',
    department: '',
    rating: '',
    comments: '',
    skills: [] as string[]
  };
  // Submit handler
submitForm(form: any) {
  if (form.valid) {
    console.log('Feedback Submitted ✅', this.feedback);
    alert(JSON.stringify(this.feedback, null, 2));
    form.resetForm();
    this.feedback.skills = []; // reset skills manually
  } else {
    alert('Please fill all required fields');
  }
}

// Handle skills array
onSkillChange(skill: string, isChecked: boolean) {
  if (isChecked) {
    this.feedback.skills.push(skill);
  } else {
    this.feedback.skills = this.feedback.skills.filter(s => s !== skill);
  }
}
updateSkills(skill: string, isChecked: boolean){
    if(isChecked) {
      this.feedback.skills.push(skill);
    }
    else {
      const index= this.feedback.skills.indexOf(skill);
      if(index >=0)this.feedback.skills.splice(index,1);
    }
  }
}