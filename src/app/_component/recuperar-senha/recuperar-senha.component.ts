import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent {
  password: string | undefined;
  confirmPassword: string | undefined;
  showPassword: boolean = false;
  currentStep: number = 1; // Para controlar os passos da recuperação
  showVerificationCode: boolean = false;
  
  code1: string = '';
  code2: string = '';
  code3: string = '';
  code4: string = '';
  
  email: string = '';

  constructor(private router: Router, private userService: UserServiceService) {}

  onLoginClick() {
    this.router.navigate(['/login']);
  }


  onSendCode(event: Event) {
    event.preventDefault(); 
    if (!this.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Por favor, insira um e-mail válido.',
      });
      return;
    }

    this.userService.sendRecoveryEmail(this.email).subscribe(
      response => {
        console.log('E-mail enviado com sucesso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Instruções enviadas para o seu e-mail!',
        });
      },
      error => {
        console.error('Erro ao enviar o e-mail:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao enviar as instruções. Verifique seu e-mail e tente novamente.',
        });
      }
    );
  }




  onVerifyCode() {
    const code = this.code1 + this.code2 + this.code3 + this.code4;
  
    console.log('Código verificado:', code);
   
  }

  onCodeInput(event: any, position: number) {
    const input = event.target;
    const nextInput = input.nextElementSibling;
    const prevInput = input.previousElementSibling;

    // Se digitar um número
    if (event.key >= '0' && event.key <= '9') {
      input.value = event.key;
      if (nextInput && nextInput.tagName.toLowerCase() === 'input') {
        nextInput.focus();
      }
      event.preventDefault();
    }

    // Se pressionar backspace
    if (event.key === 'Backspace') {
      input.value = '';
      if (prevInput && prevInput.tagName.toLowerCase() === 'input') {
        prevInput.focus();
      }
      event.preventDefault();
    }
  }

  onResendCode() {
    // Implementar lógica para reenviar o código
    console.log('Reenviando código...');
    // Você pode chamar onSendCode novamente se desejar reenviar
  }

  onBackToEmail() {
    this.showVerificationCode = false;
    this.code1 = '';
    this.code2 = '';
    this.code3 = '';
    this.code4 = '';
  }

  nUpdatePassword() {
    if (this.password === this.confirmPassword) {
      // Implementar lógica de atualização da senha
      console.log('Senha atualizada com sucesso');
      // Redirecionar para login ou outra ação desejada
    } else {
      // Mostrar erro de senhas diferentes
      console.error('As senhas não conferem');
    }
  }
}
  

  
    
  
    


