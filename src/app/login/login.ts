import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../api/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private router: Router, private authService: LoginService) { }

  onSubmit() {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Preencha usuário e senha';
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access_token);
        this.router.navigate(['/orders']);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro login:', err);
        if (err.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos';
        } else {
          this.errorMessage = 'Erro ao conectar com a API';
        }
        this.loading = false;
      }
    });
  }
}
