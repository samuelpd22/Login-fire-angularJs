import { Component } from '@angular/core';
import { AxiosService } from '../../service/axios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
  
})
export class LoginComponent {


  EsqueceuSenha(){
    this.router.navigate(['/recuperarSenha']);
  }

  onRegisterClick(){
    this.router.navigate(['/registra']);
  }

  errorMessage: string = ''
  email: string = '';
  password: string = '';

  constructor(private axiosService: AxiosService, private router : Router) {}

  onLogin(): void {
    this.errorMessage = ''; 

    this.axiosService
      .request('POST', '/login', {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
    
        this.axiosService.setAuthToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);

        Swal.fire('Sucesso!', 'Login efetuado com sucesso!', 'success'); 
        setTimeout(() => {
          this.router.navigate(['/dash']);
        }, 2000); // 2 segundos de delay
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';
        
        Swal.fire('Erro', 'Erro no login: ' + errorMessage, 'error'); 
        this.errorMessage = 'Erro no login: ' + errorMessage;
        this.axiosService.setAuthToken(null); // Limpar o token
      });
  }
}
