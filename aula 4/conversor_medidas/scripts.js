//obter referencias aos elementos HMTL

const inputElement = document.querySelector("#input");
const fromElement = document.querySelector("#from");
const toElement = document.querySelector("#to");
const outputElement = document.querySelector("#output");
const convertButton = document.querySelector("#convert-btn");
const messageElement = document.querySelector("#message");

//função para converter a unidade 
function convert(){
    //obter os valpres das unidades de entrada e saida
    const fromValue = fromElement.value;
    const toValue = toElement.value;
    //verificar  se as unidades de entrada e saida são iguais

if (fromValue === toValue){
    outputElement.value = inputElement.value;
    messageElement.textContent = " ";
      return;
}


//converter o valor de entrada
let meters;
switch (fromValue) {
        
        case "m":
        meters = inputElement.value;
        break;
        
        case"km":
        meters = inputElement.value * 1000;
        break;
        
        case "cm":
        meters = inputElement.value / 100;
        break;
            
        case"mm":
        meters = inputElement.value / 1000;
        break;

}

//converter para unidade de saida
let result;
switch (toValue){
    
        case "m":
        result = meters;
        break;
        
        case"km":
        result = meters / 1000;
        break;

        case"cm":
        result = meters * 100;
        break;

        case"mm":
        result = meters * 1000;
        break;

}
//exibir resultado na caixa de saida

outputElement.value = result;

//exibir a mensagem de conversão
const fromLabel = fromElement.options[fromElement.selectedIndex].text;
const toLabel = toElement.options[toElement.selectedIndex].text;
const message = `${
    inputElement.value
} ${fromLabel} equivalem a ${result} ${toLabel}`;
messageElement.textContent = message;
}

//exibir o resultado na caixa de saida
convertButton.addEventListener("click", convert);