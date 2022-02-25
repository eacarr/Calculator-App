class Calculator {
  // The constructor method is a special method of a class for creating and initializing an object instance of that class.
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }

  // Clear operand text area
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    // if nothing is selected when cleared
    this.operation = undefined;
  }

  // function to show number in operand area
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    // show current operand
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.previousOperand = `${this.currentOperand} ${operation}`;
    this.currentOperand = "";
    // this.currentText.innerText = "";
  }

  posNegConvert() {
    if (!this.currentOperand.includes("-")) {
      this.currentOperand = this.currentOperand.replace(/^/, "-");
    } else {
      this.currentOperand = this.currentOperand.replace("-", "");
    }
  }
  convertPercent() {
    if (this.previousOperand.includes("+")) {
      this.previousOperand = this.previousOperand.replace("+", "");
      this.currentOperand =
        (+this.previousOperand * +this.currentOperand) / 100;
      this.previousOperand = this.previousOperand += "+";
    } else if (this.previousOperand.includes("-")) {
      this.previousOperand = this.previousOperand.replace("-", "");
      this.currentOperand =
        (+this.previousOperand * +this.currentOperand) / 100;
      this.previousOperand = this.previousOperand += "-";
    } else if (this.previousOperand.includes("*")) {
      this.previousOperand = this.previousOperand.replace("*", "");
      this.currentOperand = +this.currentOperand / 100;
      this.previousOperand = this.previousOperand += "*";
    } else if (this.previousOperand.includes("÷")) {
      this.previousOperand = this.previousOperand.replace("÷", "");
      this.currentOperand = +this.currentOperand / 100;
      this.previousOperand = this.previousOperand += "÷";
    } else {
      return (this.currentOperand = +this.currentOperand / 100);
    }
  }

  compute() {
    if (this.previousOperand.includes("+")) {
      this.previousOperand = this.previousOperand.replace("+", "");
      this.currentOperand = +this.previousOperand + +this.currentOperand;
      this.previousOperand = "";
    } else if (this.previousOperand.includes("-")) {
      this.previousOperand = this.previousOperand.replace("-", "");
      this.currentOperand = +this.previousOperand - +this.currentOperand;
      this.previousOperand = "";
    } else if (this.previousOperand.includes("*")) {
      this.previousOperand = this.previousOperand.replace("*", "");
      this.currentOperand = +this.previousOperand * +this.currentOperand;
      this.previousOperand = "";
    } else if (this.previousOperand.includes("÷")) {
      this.previousOperand = this.previousOperand.replace("÷", "");
      this.currentOperand = +this.previousOperand / +this.currentOperand;
      this.previousOperand = "";
    } else {
      return this.currentOperand;
    }
  }

  updateDisplay() {
    this.currentText.innerText = this.currentOperand;
    this.previousText.innerText = this.previousOperand;
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equal]");
const previousText = document.querySelector("[data-previous-operand]");
const currentText = document.querySelector("[data-current-operand]");
const percentBtn = document.querySelector("[data-percent]");
const posNegBtn = document.querySelector("[data-pos-neg]");

// new is used to define the class that was made earlier
const calculator = new Calculator(previousText, currentText);

// loop through number buttons to add eventListener
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // call appendNumber function
    calculator.appendNumber(button.innerText);
    // call updateDisplay function
    calculator.updateDisplay();
  });
});

// loop through operation buttons
operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    // currentText.innerText = "";
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

percentBtn.addEventListener("click", () => {
  calculator.convertPercent();
  calculator.updateDisplay();
});

posNegBtn.addEventListener("click", () => {
  calculator.posNegConvert();
  calculator.updateDisplay();
});
