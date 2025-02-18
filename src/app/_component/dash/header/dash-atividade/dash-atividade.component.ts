import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

@Component({
  selector: 'app-dash-atividade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-atividade.component.html',
  styleUrls: ['./dash-atividade.component.scss']
})
export class DashAtividadeComponent {
  
menuItems: any;

  constructor() {
   
  }
 

 
  
  
}
