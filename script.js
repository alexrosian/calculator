//Calculation function
const calculate = (v1, operator, v2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(v1) + parseFloat(v2);
  }
  if (operator === "subtract") {
    result = parseFloat(v1) - parseFloat(v2);
  }
  if (operator === "multiply") {
    result = parseFloat(v1) * parseFloat(v2);
  }
  if (operator === "divide") {
    result = parseFloat(v1) / parseFloat(v2);
  }

  return result;
};

const keys = document.querySelector(".calculator");
const display = document.querySelector(".current-value");

keys.addEventListener("click", (button) => {
  if (button.target.matches("button")) {
    const key = button.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNumber = display.textContent;
    const previousKeyType = keys.dataset.previousKeyType;

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (
        displayNumber === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNumber + keyContent;
      }
      keys.dataset.previousKeyType = "number";
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      const firstValue = keys.dataset.firstValue;
      const operator = keys.dataset.operator;
      const secondValue = displayNumber;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        keys.dataset.firstValue = calcValue;
      } else {
        keys.dataset.firstValue = displayNumber;
      }
      key.classList.add("is-depressed");
      //Add custom atribute
      keys.dataset.previousKeyType = "operator";
      keys.dataset.operator = action;
    }
    if (action === "decimal") {
      if (!displayNumber.includes(".")) {
        display.textContent = displayNumber + ".";
      }
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      }
      keys.dataset.previousKeyType = "decimal";
    }
    if (action === "clear") {
      keys.dataset.firstValue = "";
      keys.dataset.modValue = "";
      keys.dataset.operator = "";
      keys.dataset.previousKeyType = "";
      display.textContent = 0;
    }
    if (action === "backspace") {
      display.textContent = displayNumber.slice(0, -1);
      if (display.textContent === "") {
        keys.dataset.firstValue = "";
        keys.dataset.modValue = "";
        keys.dataset.operator = "";
        keys.dataset.previousKeyType = "";
        display.textContent = 0;
      }
      keys.dataset.previousKeyType = "backspace";
    }
    if (action === "calculate") {
      let firstValue = keys.dataset.firstValue;
      const operator = keys.dataset.operator;
      let secondValue = displayNumber;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayNumber;
          secondValue = keys.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      keys.dataset.modValue = secondValue;
      keys.dataset.previousKeyType = "calculate";
    }
  }
});
