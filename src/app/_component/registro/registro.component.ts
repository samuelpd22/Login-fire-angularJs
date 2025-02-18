import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { AxiosService } from '../../service/axios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  name:string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(private axiosService: AxiosService, private router : Router) {}

  userCadastrado(){
    this.router.navigate(['/login']);
  }


  comparePasswords(): boolean {
    if (this.password !== this.confirmPassword) {
      // Exibe um alerta com SweetAlert se as senhas não forem iguais
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas não coincidem!',
      });
      return false; // As senhas não coincidem
    }
    return true; // As senhas coincidem
  }

  
  onRegister(input: any): void {
    // Verificar se os campos estão vazios
    if (!input.name || !input.email || !input.password || !this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Erro',
        text: 'Todos os campos devem ser preenchidos!',
      });
      return; // Impede o envio para o backend se algum campo estiver vazio
    }
  
    // Primeiro, verifica se as senhas são iguais
    if (!this.comparePasswords()) {
      return;
    }
  
    // Se as senhas coincidem, continua o processo de registro
    this.axiosService.request("POST", "", {
      name: input.name,
      email: input.email,
      password: input.password
    }).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      Swal.fire('Sucesso!', 'Cadastro feito com sucesso!', 'success');
    }).catch(error => {
      this.axiosService.setAuthToken(null);
      // Lógica para erro
    });
  }


  

  goToLogin(){

  }
}
