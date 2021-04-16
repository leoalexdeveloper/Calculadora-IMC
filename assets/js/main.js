var inputs = document.querySelectorAll('input');
var resultado = document.querySelector('.resultado');
resultado.innerHTML="Veja seu resultado aqui!";
var peso, altura;
var button = document.querySelector('button');
/* ==================format number at input=========================== */
for(let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener("input", function(e){
        if (inputs[i].value.length > 6)
        {
            inputs[i].value = inputs[i].value.substr(0, 6);
        };

        if(!inputs[i].value.match(/\d{1}\.\d{*}/) 
            && 
            inputs[i].value[inputs[i].value.length-1].match(/\d/))
        {
            let strSplit = inputs[i].value.replace(".", "").split("");
            strSplit.splice(-2, 0, ".");
            let joined = strSplit.join("");
            inputs[i].value = joined;
        }else{
            inputs[i].value = inputs[i].value.substr(0, inputs[i].value.length-1);
        }
    });
    
    inputs[i].addEventListener("keyup", function(){
        if(inputs[i].value == "."){
            inputs[i].value = '';
        }
    });
}

function getInputValues(inputs){
    peso = inputs[0].value || "0";
    altura = inputs[1].value || "0.0";
}
function validateData(){
    if(altura.match(/\d{1}[(,)]\d{2}/)) altura = Number(String(altura).replace(",", ".") || 0);
    if(peso.match(/\d{1}[(,)]\d{2}/)) peso = Number(String(peso).replace(",", ".") || 0);
}

function calculaImc(peso, altura){
    var imc =  (Number(peso) / (Number(altura) * Number(altura))).toFixed(2);
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
 
 button.addEventListener("click", async function(e){
    e.preventDefault();
    
    await getInputValues(inputs);
    await validateData();
    imprimeResultado();
});

