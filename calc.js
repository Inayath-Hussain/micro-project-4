function removeSpacesIfAny(e) {
    return e.split(' ').join('')
}

const operators = {
    '+': { value: '+', priority: 1 },
    '-': { value: '-', priority: 1 },
    'x': { value: '*', priority: 2 },
    '/': { value: '/', priority: 2 },
}

function isValid(expr) {
    return /^[^x/][\d\+\-/x\.]+[^x/\-\+]$/.test(expr)
}

function infixToPostfix(expr) {
    let postfix = []
    let operatorArr = []
    let number = ''

    for (let i of expr) {
        // if number pushes to postfix expr
        if (!isNaN(i) || i === '.') number += i

        // if operator checks priority with top most element in stack and pops untill arr is empty or priority is greater
        else if (operators[i] !== undefined) {
            if (number === '') {
                // if there's '-' or '+' after 'x' or '/' then use it as prefix for number coming in next iteration
                if (operators[operatorArr.at(-1)].priority <= operators[i].priority) return 'Error'
                number += i
                continue;
            }
            postfix.push(number)
            number = ''

            while (operatorArr.length && operators[operatorArr[operatorArr.length - 1]].priority >= operators[i].priority) {
                let op = operatorArr.pop()
                postfix.push(op)
            }

            operatorArr.push(i)
        }
        else {
            return 'Error'
        }
    }

    if (number) postfix.push(number)

    // if any operators are left in arr push them in postfix expr
    while (operatorArr.length) {
        postfix.push(operatorArr.pop())
    }

    return postfix
}

function calculatePostfix(expr) {
    let operandArr = []
    let op1;
    let op2;

    for (let i of expr) {
        if (!isNaN(i)) {
            operandArr.push(i)
        }
        else if (operandArr.length >= 2) {
            op1 = operandArr.pop()
            op2 = operandArr.pop()

            switch (i) {
                case ('+'):
                    operandArr.push(parseFloat(op2) + parseFloat(op1))
                    break;
                case ('-'):
                    operandArr.push(parseFloat(op2) - parseFloat(op1))
                    break;
                case ('x'):
                    operandArr.push(parseFloat(op2) * parseFloat(op1))
                    break;
                case ('/'):
                    operandArr.push(parseFloat(op2) / parseFloat(op1))
                    break;
            }
        }
        else return 'Error'
    }

    return operandArr.length === 1 ? operandArr[0] : 'Error'
}

export const calc = (expr) => {
    const newExpr = removeSpacesIfAny(expr);
    if (!isValid(newExpr)) return 'Error'

    let res = infixToPostfix(newExpr)
    if (res !== 'Error') {
        res = calculatePostfix(res)
        res = res % 1 === 0 ? res : res.toFixed(3)
    }
    return res
}