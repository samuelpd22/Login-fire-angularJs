import { Routes } from '@angular/router';
import { LoginComponent } from './_component/login/login.component';
import { RegistroComponent } from './_component/registro/registro.component';
import { RecuperarSenhaComponent } from './_component/recuperar-senha/recuperar-senha.component';
import { NovaSenhaComponent } from './_component/nova-senha/nova-senha.component';
import { DashHeaderComponent } from './_component/dash/header/dash-header/dash-header.component';
import { MeuPerfilComponent } from './_component/meu-perfil/meu-perfil.component';

export const routes: Routes = [{
    path:"login", component:LoginComponent,
},
{
    path:"cadastra", component: RegistroComponent
},
{
    path:"recuperarSenha", component: RecuperarSenhaComponent
},
{
    path:"novaSenha/:token",component: NovaSenhaComponent
},
{
    path:"dash",component:DashHeaderComponent
},
{
    path:"meuPerfil",component:MeuPerfilComponent
}
];
