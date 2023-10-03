import { calc } from './calc.js'

// i/o display
const display = document.getElementById('input-display')

// buttons Container
const btnContainer = document.getElementById('buttons-container')


function keyToValuesMap(key) {
    switch (key) {
        case ('='):
        case ('Enter'):
            const result = calc(display.value);
            console.log(result);
            display.value = result
            break;

        case ('DEL'):
        case ('Backspace'):
            display.value = display.value.slice(0, -1)
            break;

        case ('RESET'):
        case ('Delete'):
            display.value = ''
            break

        case ('x'):
        case ('*'):
            display.value += 'x'
            break

        default:
            display.value += key
    }
}


btnContainer.addEventListener('click', (e) => {
    if (e.target.id != 'buttons-container') {
        keyToValuesMap(e.target.innerText)
    }
})


// keyboard binding
document.addEventListener('keydown', (e) => {
    const allowedChar = /[\d\+\-\*\./=]|Enter|Backspace|Delete/

    // allowing only specified buttons
    if (allowedChar.test(e.key) && e.target.id !== 'input-display') {
        keyToValuesMap(e.key)
    }
})