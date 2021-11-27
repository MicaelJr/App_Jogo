setInterval(() => {
    animateCSS('#btnapostar', 'heartBeat');
    animateCSS('.fa-heartbeat', 'swing');
    animateCSS('.fa-exclamation-circle', 'bounce');
    animateCSS('.fa-concierge-bell', 'wobble');
}, 3000)

//1 - Declarar um array de escopo global de erros var erros = []
var erros = []

//2 - Gerar um numero aleatório entre 1 e 60 (criar uma constante com o nome de VALOR_SORTEADO) parseInt(Math.random()*60+1)
const nmrSorteado = parseInt(Math.random() * 60 + 1)

// 3 - Declarar o limite de chances (uma constante CHANCES = 6)
const nmrChances = 6

//4 - Criar uma função chamada apostarNumero()

function apostarNumero() {
    // 4.1 - Verificar se o numero é menor ou igual a zero ou numero > que 60, caso for mostrar "Informe um número válido"

    let numErros = erros.length + 1

    let numChances = nmrChances - numErros

    let nmrJogador = document.querySelector("#numero").value

    if (nmrJogador <= 0 || nmrJogador > 60) {
        alert("Informe um número válido!")
        limparFocarCampo()
        return
    } else if (nmrJogador == nmrSorteado) {
        //* 4.2 - Verificar se o número digitado pelo usuário (a aposta) é igual ao VALOR_SORTEADO, se for mostrar "Parabéns! Você acertou!"
        //4.2.1 - Ocultar o botão apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
        document.querySelector("#btnjogar").style = "display: block !important"
            //ocultado o botao
        document.querySelector("#btnapostar").style = "display: none"

        esconderCaixa()

        // 4.2.2 - Mostrar no saidaDica "Parabéns! O número sorteado é: VALOR_SORTEADO"
        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-chess-queen"></i> Parabéns! O número sorteado é: ${nmrSorteado}</h4>`

        return

    } else if (erros.indexOf(nmrJogador) !== -1) {
        alert(`Você já apostou o número ${nmrJogador}. Tente outro!!!`)

        limparFocarCampo()

        return

    } else {
        erros.push(nmrJogador)

        //document.querySelector("#saidaErro").innerHTML += nmrJogador
        saidaErro.innerHTML = `<h4 class="alert alert-danger"><i class="fas fa-sad-tear"></i> ${numErros}: ${erros.join()}</h4>`

        saidaChance.innerHTML = `<h4 class="alert alert-primary"><i class="fas fa-sad-cry"></i> ${numChances}</h4>`

        limparFocarCampo()

    }

    if (numChances == 0) {

        //4.2.1 - Ocultar o botão apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
        document.querySelector("#btnjogar").style = "display: block !important"
            //ocultado o botao
        document.querySelector("#btnapostar").style = "display: none"

        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-book-dead"></i> GAME OVER! O número sorteado é: ${nmrSorteado}</h4>`

        esconderCaixa()

        return
    }


    let dica = nmrJogador < nmrSorteado ? "maior" : "menor"

    saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-lightbulb"></i> Tente um número ${dica} que o ${nmrJogador}`


}

document.querySelector(`form`).addEventListener(`submit`, e => {
    e.preventDefault()
    apostarNumero()
})

//4.2.3 - Se o usuário apertar o botão jogar novamente a ação será window.location.reload()
btnjogar.addEventListener("click", () => { window.location.reload() })

const limparFocarCampo = function() {
    //limpa o campo
    document.querySelector("#numero").value = ""
        //aponta o foco para o campo
    document.querySelector("#numero").focus()
}

//esconder o campo de inserir o nmr
const esconderCaixa = function() {

    document.querySelector("#numero").style = "display: none"

    document.querySelector("#labeloff").style = "display: none"
}