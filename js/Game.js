//Model

export default class Game {
    constructor() {
        this.jogadorAtual = "X";
        // Array que represent o status atual do tabuleiro
        this.tabuleiro = new Array(9).fill(null);
    }

    proximoJogador() {
        /*
            Operador tenário
            Referencia: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
         */
        this.jogadorAtual = this.jogadorAtual === "X" ? "O" : "X";
    }

    fazJogada(index) {
        if (!this.isRunning()){
            return;
        }

        if (this.tabuleiro[index]){
            return;
        }

        this.tabuleiro[index] = this.jogadorAtual;

        if (!this.acharCombinacaoVencedora()){
            this.proximoJogador();
        }
    }

    acharCombinacaoVencedora() {
        const combinacoesVencedoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pos of combinacoesVencedoras){
            /*
                Atribuição via desestruturação
                Referencia: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
             */
            const [a, b, c] =  pos;

            if (this.tabuleiro[a] && (this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c])){
                return pos;
            }
        }

        return null;
    }

    isRunning(){
        // Para o jogo estar rodando nao pode ter posição vencedora e o tabulerio nao pode estar completo.
        return !this.acharCombinacaoVencedora() && this.tabuleiro.includes(null);
    }
}
