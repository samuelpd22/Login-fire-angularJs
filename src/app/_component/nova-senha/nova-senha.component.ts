import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AxiosService } from '../../service/axios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.scss'
})
export class NovaSenhaComponent {
   
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  comparePasswords(): boolean {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas não coincidem!',
      });
      return false; 
    }
    return true; 
  }


  onRegister(input: any): void {
  
    if (!input.password || !this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Erro',
        text: 'Todos os campos devem ser preenchidos!',
      });
      return; 
    }

    
    if (!this.comparePasswords()) {
      return;
    }

    
    if (this.token) {
      this.axiosService.request("POST", `http://localhost:3330/users/novaSenha/${this.token}`, {
        newPassword: input.password 
      }).then(response => {
          Swal.fire('Sucesso!', 'Senha redefinida com sucesso!', 'success');
          this.router.navigate(['/login']); 
      }).catch(error => {
          console.error('Erro ao redefinir a senha:', error);
          Swal.fire('Erro', 'Não foi possível redefinir a senha. Tente novamente.', 'error');
      });
    } else {
      Swal.fire('Erro', 'Token não encontrado.', 'error');
    }
  }
}

