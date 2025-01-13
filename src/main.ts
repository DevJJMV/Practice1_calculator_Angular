import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="calculator">
      <div class="display">{{ display || '0' }}</div>
      <div class="buttons">
        <button class="clear" (click)="clear()">C</button>
        <button class="operator" (click)="handleOperator('/')">/</button>
        <button class="operator" (click)="handleOperator('*')">×</button>
        <button class="operator" (click)="handleOperator('-')">-</button>
        
        <button class="number" (click)="appendNumber('7')">7</button>
        <button class="number" (click)="appendNumber('8')">8</button>
        <button class="number" (click)="appendNumber('9')">9</button>
        <button class="operator" (click)="handleOperator('+')">+</button>
        
        <button class="number" (click)="appendNumber('4')">4</button>
        <button class="number" (click)="appendNumber('5')">5</button>
        <button class="number" (click)="appendNumber('6')">6</button>
        <button class="equals" (click)="calculate()">=</button>
        
        <button class="number" (click)="appendNumber('1')">1</button>
        <button class="number" (click)="appendNumber('2')">2</button>
        <button class="number" (click)="appendNumber('3')">3</button>
        <button class="number" (click)="appendNumber('0')">0</button>
        
        <button class="number" (click)="appendNumber('.')">.</button>
      </div>
    </div>
  `,
})
export class App {
  display: string = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  appendNumber(num: string): void {
    if (this.waitingForSecondOperand) {
      this.display = num;
      this.waitingForSecondOperand = false;
    } else {
      this.display = this.display === '0' ? num : this.display + num;
    }
  }

  handleOperator(op: string): void {
    const inputValue = parseFloat(this.display);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = op;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation(this.firstOperand, inputValue, this.operator);
      this.display = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = op;
  }

  calculate(): void {
    if (this.operator === null || this.firstOperand === null) {
      return; // Nada que calcular
    }

    const secondOperand = parseFloat(this.display);
    const result = this.performCalculation(this.firstOperand, secondOperand, this.operator);

    this.display = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  performCalculation(firstOperand: number, secondOperand: number, operator: string): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : NaN; 
      default:
        return secondOperand;
    }
  }

  clear(): void {
    this.display = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}

bootstrapApplication(App);
