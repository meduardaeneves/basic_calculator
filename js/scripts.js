class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    checkLastDigit(input,upperValue,reg) {
        if (!reg.test(input) && //verifica se o input não é Num
            //verifica se o último elemento no display tb não é num
            !reg.test(upperValue.substr(upperValue.length-1))) {
               return true 
        } else {
            return false

        }
    }

    btnPress () {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        // verificar se tem so numeros
        var reg = new RegExp('^[0-9]+$')

        //Verifica se precisa adicionar ou não:
        // se meu último dígito for (+;-;/;*) eu vou substitur ele pelo novo apertado
        if (calc.checkLastDigit(input,upperValue,reg)) {
            calc.upperValue.textContent = upperValue.slice(0, -1);
        }


        if (upperValue == '0') {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
        }
        
    }
}

// start obj
let calc = new Calculator()

// start btns
let buttons = document.querySelectorAll('.btn')

// map all btns --> mapear todos botões
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',calc.btnPress)
}


