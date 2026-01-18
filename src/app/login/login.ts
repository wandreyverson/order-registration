import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/orders']);
      console.log("ok!");
    } else {
      this.errorMessage = 'Usuário ou senha incorretos';
    }
  }
}
