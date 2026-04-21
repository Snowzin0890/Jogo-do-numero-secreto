//Gerando o número secreto
let numerosSorteados = [];
let numeroLimiteLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

//Contador de tentativas
let tentativas = 0;

//funcao para gerar um número aleatório
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimiteLista + 1);

    if(numerosSorteados.length == numeroLimiteLista){
        exibirTextonaTela('h1','Parabéns!!!');
        exibirTextonaTela('p','Você acertou todos os números secretos! Reiniciando a lista...');
        numerosSorteados = [];
        return gerarNumeroAleatorio();
    }else if(numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//funcao para exibir o texto na tela
function exibirTextonaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}

//exibindo o titulo e o paragrafo na tela
function exibirTextoinicial(){
    exibirTextonaTela('h1', 'Jogo do número secreto');
    exibirTextonaTela('p', 'Escolha um número entre 1 e 100:');
}

exibirTextoinicial();   

//Função que será chamada quando o botão for clicado
function verificarChute(){
    //Guardando o chute do usuário e enviando pra função compararNumeros
    let chute = Number(document.querySelector('input#chute').value);  
    tentativas ++;
    compararNumeros(chute);
}

//funcao para limpar o campo
function Limparcampo(){
    chute = document.querySelector('input#chute');
    chute.value = '';
}

//funcoes de habilitar e desabilitar botoes
function habilitarBotao(botao){
    document.getElementById(botao).removeAttribute('disabled');
}

function desabilitarBotao(botao){
    document.getElementById(botao).setAttribute('disabled', 'true');
}

//funcao para comparar os numeros
function compararNumeros(chute){
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        exibirTextonaTela('h1','Acertou!');
        exibirTextonaTela('p', `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`);
        habilitarBotao('reiniciar');
        desabilitarBotao('btn-chute');
    }else{
        Limparcampo();
        exibirTextonaTela('h1','Errou!');
        gerarDica(chute);
    }
}

//funcao para gerar dica
function gerarDica(chute){
    if(chute > numeroSecreto){
        exibirTextonaTela('p', 'O número secreto é menor!');
    }else{
        exibirTextonaTela('p', 'O número secreto é maior!');
    }
}

//Funcao para reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    Limparcampo();
    exibirTextoinicial();
    habilitarBotao('btn-chute');
    desabilitarBotao('reiniciar');
}