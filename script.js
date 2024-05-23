document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator-keys');

    keys.addEventListener('click', event => {
        const target = event.target;
        const action = target.dataset.action;
        const keyContent = target.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = keys.dataset.previousKeyType;

        if (!target.matches('button')) return;

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'equals') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            keys.dataset.previousKeyType = 'number';
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'equals') {
                display.textContent = '0.';
            }
            keys.dataset.previousKeyType = 'decimal';
        }

        if (action === 'clear') {
            display.textContent = '0';
            keys.dataset.previousKeyType = 'clear';
            keys.dataset.firstValue = '';
            keys.dataset.operator = '';
            keys.dataset.modValue = '';
        }

        if (action === 'delete') {
            display.textContent = displayedNum.slice(0, -1) || '0';
            keys.dataset.previousKeyType = 'delete';
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = keys.dataset.firstValue;
            const operator = keys.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equals') {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                keys.dataset.firstValue = calcValue;
            } else {
                keys.dataset.firstValue = displayedNum;
            }

            keys.dataset.previousKeyType = 'operator';
            keys.dataset.operator = action;
        }

        if (action === 'equals') {
            let firstValue = keys.dataset.firstValue;
            const operator = keys.dataset.operator;
            let secondValue = displayedNum;

            if (firstValue) {
                if (previousKeyType === 'equals') {
                    firstValue = displayedNum;
                    secondValue = keys.dataset.modValue;
                }

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            keys.dataset.modValue = secondValue;
            keys.dataset.previousKeyType = 'equals';
        }
    });

    const calculate = (n1, operator, n2) => {
        let result = '';

        if (operator === 'add') {
            result = parseFloat(n1) + parseFloat(n2);
        } else if (operator === 'subtract') {
            result = parseFloat(n1) - parseFloat(n2);
        } else if (operator === 'multiply') {
            result = parseFloat(n1) * parseFloat(n2);
        } else if (operator === 'divide') {
            result = parseFloat(n1) / parseFloat(n2);
        }

        return result;
    };
});
