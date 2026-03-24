import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <h1>Contact Us</h1>
    <p>If you have any questions or need assistance, feel free to reach out!</p>

    <ul>
      <li>Email: support@store.com</li>
      <li>Phone: +91 9876543210</li>
      <li>Address: India</li>
    </ul>
  `,
  styleUrls: ['./contact.css']
})
export class Contact {}