import { Component } from '@angular/core';
import { DashAtividadeComponent } from "../dash-atividade/dash-atividade.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-header',
  standalone: true,
  imports: [DashAtividadeComponent],
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss'
})
export class DashHeaderComponent {

}
