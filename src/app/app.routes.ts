import { Routes } from '@angular/router';
import { LoginComponent } from './_component/login/login.component';
import { RegistroComponent } from './_component/registro/registro.component';
import { RecuperarSenhaComponent } from './_component/recuperar-senha/recuperar-senha.component';
import { NovaSenhaComponent } from './_component/nova-senha/nova-senha.component';

export const routes: Routes = [{
    path:"login", component:LoginComponent,
},
{
    path:"cadastra", component: RegistroComponent
},{
    path:"recuperarSenha", component: RecuperarSenhaComponent
},{
    path:"novaSenha/:token",component: NovaSenhaComponent
}
];
