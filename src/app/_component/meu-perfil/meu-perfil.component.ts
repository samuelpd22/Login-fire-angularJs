import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserServiceService } from '../../service/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/User';
import { AxiosService } from '../../service/axios.service';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.scss'
})
export class MeuPerfilComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Acessa o input pelo template

  user: User | null = null; // Variável para armazenar os dados do usuário
  isLoading = true; // Para exibir um indicador de carregamento

  userF: User = {
    id:0,
    idade: 0,
    estadoCivil: '',
    endereco: '',
    logradouro: '',
    fotoPerfil:'',
    numero: '',
    estado: '',
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string | undefined;
  selectedFile: File | undefined;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private axiosService: AxiosService
  ) {}

  userProfile: any;

  ngOnInit(): void {
    this.getUserProfile(); 
  }

  getUserProfile(): void {
    this.axiosService.request('GET', '/me', {})
      .then(response => {
        this.userProfile = response.data; // Armazena os dados do perfil
        console.log('Dados do perfil carregados:', this.userProfile); // Verifica os dados carregados
      })
      .catch(error => {
        console.error('Erro ao buscar perfil:', error);
        this.errorMessage = 'Erro ao carregar perfil: ' + (error.response?.data?.message || 'Erro desconhecido');
      });
  }



  onUpdateProfile(formValue: any): void {
    if (!this.userProfile || !this.userProfile.id) {
      this.errorMessage = 'Usuário não encontrado!';
      return;
    }
  
    console.log('ID do usuário:', this.userProfile.id); // Verifica o ID antes de enviar
  
    const formData = new FormData();
  
    // Adiciona os dados do usuário ao FormData
    formData.append('name', formValue.name || '');
    formData.append('idade', formValue.idade ? formValue.idade.toString() : '');
    formData.append('email', formValue.email || '');
    formData.append('estadoCivil', formValue.estadoCivil || '');
    formData.append('endereco', formValue.endereco || '');
    formData.append('logradouro', formValue.logradouro || '');
    formData.append('numero', formValue.numero || '');
    formData.append('estado', formValue.estado || '');
  
    // Adiciona a foto de perfil, se houver
    if (this.selectedFile) {
      formData.append('fotoPerfil', this.selectedFile);
    }
  
    // Passa o ID do usuário como parâmetro
    const userId = this.userProfile.id;
    
    this.userService.editPerfil(userId, formData).subscribe({
      next: (updatedUser) => {
        this.userProfile = updatedUser; // Atualiza localmente o perfil com os dados retornados
        console.log('Perfil atualizado com sucesso:', updatedUser);
        alert('Perfil atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.errorMessage = 'Erro ao atualizar perfil: ' + (err.error?.message || 'Erro desconhecido');
      },
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Aciona o clique no input
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Armazena o arquivo selecionado
      console.log('Arquivo selecionado:', this.selectedFile);
    }
  }


  
}

