var inputs = document.querySelectorAll('input');
var resultado = document.querySelector('.resultado');
resultado.innerHTML="Veja seu resultado aqui!";
var peso, altura;
var button = document.querySelector('button')
button.addEventListener("click", preventSubmit);
function getInputValues(inputs){
    peso = inputs[0].value || "0";
    altura = inputs[1].value || "0.0";
}
function validateData(){
    if(altura.match(/\d{1}[(,)]\d{2}/)) altura = Number(String(altura).replace(",", ".") || 0);
    if(peso.match(/\d{1}[(,)]\d{2}/)) peso = Number(String(peso).replace(",", ".") || 0);
}

function calculaImc(peso, altura){
    var imc =  Math.round(Number(peso) / (Number(altura) * Number(altura)));
    return imc || 0;  
}

function turnResultNumberIntoMeans(){
    switch(true){
        case peso < 0.1 || peso == "":
            return "Insira algum peso";
        break;
        case altura < 0.1 || altura == "":
            return "Insira algum altura";
        break;
        case calculaImc(peso, altura) < 18.5:
            return "Abaixo do peso";
        break;
        case calculaImc(peso, altura) < 24.9:
            return "Peso normal";
        break;
        case calculaImc(peso, altura) < 29.9:
            return "Sobrepeso";
        break;
        case calculaImc(peso, altura) < 34.9:
            return "Obesidade grau 1";
        break;
        case calculaImc(peso, altura) < 39.9:
            return "Obesidade grau 2";
        break;
        case calculaImc(peso, altura) > 40:
            return "Obesidade grau 3";
        break;
    }
}

function imprimeResultado(){
    resultado.innerHTML = turnResultNumberIntoMeans();
    
}

async function preventSubmit(e){
    e.preventDefault();
    
    await getInputValues(inputs);
    await validateData();
    imprimeResultado();
}

