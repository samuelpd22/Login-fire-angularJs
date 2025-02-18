import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';  // Importando e registrando as escalas

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
export class DashAtividadeComponent implements OnInit, AfterViewInit {
  expenses: Expense[] = [
    { id: 1, description: 'Supermercado', amount: 250.00, category: 'Alimentação', date: '2025-01-25' },
    { id: 2, description: 'Energia', amount: 150.00, category: 'Contas', date: '2025-01-26' },
    { id: 3, description: 'Cinema', amount: 60.00, category: 'Lazer', date: '2025-01-27' }
  ];

  expenseForm: FormGroup;
  categories: string[] = ['Alimentação', 'Contas', 'Lazer', 'Transporte', 'Outros'];
  chartData: any[] = [];
  chartOptions: any;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['Alimentação', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });

    // Registrando todas as dependências do Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.updateChartData(); // Atualiza os dados do gráfico inicialmente
  }

  ngAfterViewInit(): void {
    this.createChart(); // Cria o gráfico após a inicialização da view
  }

  get totalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  get averageExpense(): number {
    return this.totalExpenses / Math.max(this.expenses.length, 1);
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = {
        id: this.expenses.length + 1,
        ...this.expenseForm.value,
        amount: parseFloat(this.expenseForm.value.amount)
      };

      this.expenses = [...this.expenses, newExpense];
      this.expenseForm.reset({
        category: 'Alimentação',
        date: new Date().toISOString().split('T')[0]
      });
      this.updateChartData(); // Atualiza os dados do gráfico
      this.createChart(); // Cria ou recria o gráfico após adicionar uma despesa
    }
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.updateChartData(); // Atualiza os dados do gráfico
    this.createChart(); // Recria o gráfico após deletar uma despesa
  }

  private updateChartData(): void {
    // Atualiza os dados do gráfico, agrupando as despesas por data
    this.chartData = this.expenses
      .reduce((acc: any[], expense) => {
        const existingDate = acc.find(item => item.date === expense.date);
        if (existingDate) {
          existingDate.amount += expense.amount;
        } else {
          acc.push({ date: expense.date, amount: expense.amount });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ordena por data
  }

  private createChart(): void {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      // Ajuste a qualidade do gráfico para telas de alta definição
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartData.map(item => item.date),
          datasets: [{
            label: 'Despesas',
            data: this.chartData.map(item => item.amount),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,  // Não mantém a proporção do gráfico
          scales: {
            y: {
              beginAtZero: true
            }
          },
          // Aumentar a resolução para telas de alta definição
          devicePixelRatio: window.devicePixelRatio > 1 ? 2 : 1
        }
      });
    }
  }
  
  
}
