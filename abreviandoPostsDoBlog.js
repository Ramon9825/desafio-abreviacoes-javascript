const fs = require('fs').readFileSync('/home/manjaro/Documentos/DesafioJavaScript/fs.txt', 'utf-8');
let lines = fs.split('\n');
function gets() {
    return lines.shift();
}

let objMapaLetra = {};
let palavrasAbreviadas = [];
let frase;

while((frase = gets()) !== '.') {
    let arrFrase = frase.split(' ');
    separaFrasePorLetra(arrFrase);
    Object.keys(objMapaLetra).forEach(chave => {
        definePalavraAbreviada(objMapaLetra[chave]);
    });

    palavrasAbreviadas.sort();

    arrFrase.forEach((palavra, i, arr) => {
        palavrasAbreviadas.forEach(abreviar => {
            if(palavra === abreviar) {
                arr[i] = abreviar.charAt(0) + ".";
            }
        });
    });

    console.log(arrFrase.join(" "));
    console.log(palavrasAbreviadas.length);

    palavrasAbreviadas.forEach(palavra => console.log(palavra.charAt(0) + ". = " + palavra));
    palavrasAbreviadas = [];
    objMapaLetra = {};
}

function separaFrasePorLetra(frase) {
    for(let i = 0; i < frase.length; i++) {
        if(!objMapaLetra.hasOwnProperty(frase[i].charAt(0))) {
            objMapaLetra[frase[i].charAt(0)] = [];
            objMapaLetra[frase[i].charAt(0)].push(frase[i]);
        } else {
            objMapaLetra[frase[i].charAt(0)].push(frase[i]);
        }
    }
}

function definePalavraAbreviada(arr) {
    let soma = 0;
    let minsoma = 0;
    let palavra;
    for(const i of arr) {
        if(i.length <= 2) {
            continue;
        }
        for(const j of arr) {
            if(i === j) {
                soma += 2;
            } else {
                soma += j.length;
            }
        }

        if(minsoma === 0) {
            minsoma = soma;
            palavra = i;
        } else if(soma < minsoma) {
            minsoma = soma;
            palavra = i;
        }

        soma = 0;
    }
    if(palavra !== undefined)
        palavrasAbreviadas.push(palavra);
}
