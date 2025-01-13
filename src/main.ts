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

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate();
      this.display = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = op;
  }

  calculate(): number {
    if (this.operator === null || this.firstOperand === null) {
      return parseFloat(this.display);
    }

    const secondOperand = parseFloat(this.display);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand + secondOperand;
        break;
      case '-':
        result = this.firstOperand - secondOperand;
        break;
      case '*':
        result = this.firstOperand * secondOperand;
        break;
      case '/':
        result = this.firstOperand / secondOperand;
        break;
      default:
        return secondOperand;
    }

    this.operator = null;
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    return result;
  }

  clear(): void {
    this.display = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}

bootstrapApplication(App);