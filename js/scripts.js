class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
        this.resolutionRunned = false
    }


    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
        this.resolutionRunned = false
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

    // Método de soma
    sum(n1,n2) {
        return Number(n1) + Number(n2)
    }
    // Método de subtração
    subtraction(n1,n2) {
        return Number(n1) - Number(n2)
    }
    // Método de multiplicação
    multiplication(n1,n2) {
        return Number(n1) * Number(n2)
    }
    // Método de divisão
    division(n1,n2) {
        return Number(n1) / Number(n2)
    }

    operationResult(operation,opFunction,array) {
         
        let indexOperation = array.indexOf(operation)
        let segundoNum = array[indexOperation+1]

        if (operation == '÷' && segundoNum == '0') {
            return 'Error'
        }

        if (array.length == 1) {
            return array
        }

        // console.log(indexOperation)
        let teste = opFunction(array[indexOperation-1],segundoNum)
        // console.log(teste)
        array[indexOperation-1] = teste

        array.splice(indexOperation,2);      
        // console.log(array)
        
        if (array.includes(operation)) {
            return this.operationResult(operation,opFunction,array)
        } else {
            return array
        }
    }
    
    resolution () {
        // explode string em array
        let textoLimpo = this.upperValue.textContent.replace(/\s+/g, ' ');
        let upperValueArray = (textoLimpo.split(' '))
        console.log(upperValueArray)
        // resultado operação 
        // let result = [];

        // For para resolver problema:
        if (upperValueArray.includes('x')) {
            upperValueArray = calc.operationResult('x',calc.multiplication,upperValueArray)
            // console.log(upperValueArray)
        }
        if (upperValueArray.includes('÷')) {
            upperValueArray = calc.operationResult('÷',calc.division,upperValueArray)
            // console.log(upperValueArray)
        }
        if (upperValueArray.includes('-')) {
            upperValueArray = calc.operationResult('-',calc.subtraction,upperValueArray)
            // console.log(upperValueArray)
        }
        if (upperValueArray.includes('+')) {
            upperValueArray = calc.operationResult('+',calc.sum,upperValueArray)
            // console.log(upperValueArray)
        }

        if (typeof(upperValueArray) == 'object') {
            if (upperValueArray % 1 !== 0) {
                upperValueArray = upperValueArray[0].toFixed(2).toString();
            } else {
                upperValueArray = upperValueArray[0].toString()
            }
            
            if (upperValueArray.endsWith(".00")) {
                upperValueArray = upperValueArray.slice(0, -3);
            }
        }

        this.upperValue.textContent = upperValueArray;
        this.resultValue.textContent = upperValueArray;
        this.resolutionRunned = true
    }

    btnPress () {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;

        // vai ficar se o resultado está como error, só vai permitir que a calculadora seja reiniciada
        if (upperValue == 'Error' && input != 'AC') {
            return
        }

        // verificar se tem so numeros
        var reg = new RegExp('^[0-9]+$')

        if (input == 'AC') {
            calc.clearValues();
        } else if (input == '=') {
            calc.resolution()
        } 
        else {
        // verifica se eu tenho um resultado na tela e se estou digitando um num
        // Caso sim, vou zerar meus parâmetros e adicionar o texto do "uperValue"
        // Como sendo aquele em que a calc está resetada
        // Só vai resetar se o último dígito é um número, se for uma operação, pode continuar 
            // console.log(reg.test(calc.upperValue.textContent.slice(-2)))
            if ((calc.resolutionRunned == true) && reg.test(input) && reg.test(calc.upperValue.textContent.slice(-2))) {
                calc.clearValues();
                calc.resolutionRunned = false
                upperValue = calc.upperValue.textContent
            }           
            
            //verifica se o meu UpperValue está vazio, caso sim
            // e eu estiver colocando algo sem ser digito, cancela
            if (calc.upperValue.textContent == '0' && !reg.test(input)) {
                return false
            }

            //Verifica se precisa adicionar ou não:
            // se meu último dígito for (+;-;/;*) eu vou substitur ele pelo novo apertado
            if (calc.checkLastDigit(input,upperValue,reg)) {
                calc.upperValue.textContent = upperValue.slice(0, -2);
            }

            // ADICIONA ESPAÇO AOS OPERADORES
            if (!reg.test(input)) {
                // input é operador, adiciona espaço antes para separar visualmente
                input = ` ${input} `;
            } else {
                // input é número
                // se último caractere do upperValue NÃO for número, adiciona espaço antes do número
                if (!reg.test(upperValue.slice(-1))) {
                    input = ` ${input}`;
                }
            }
            
            // adiciona o INPUT ao DISPLAY
            if (upperValue == '0') {
                calc.upperValue.textContent = input;
            } else {
                calc.upperValue.textContent += input;
            }            
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


