// View

export default class GameView{
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
                <div class="header__jogador"></div>
                
                <div class="header__status"></div>
                
                <button type="button" class="header__restart">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <div class="tabuleiro">
                <div class="celula" data-index="0"></div>
                <div class="celula" data-index="1"></div>
                <div class="celula" data-index="2"></div>
                <div class="celula" data-index="3"></div>
                <div class="celula" data-index="4"></div>
                <div class="celula" data-index="5"></div>
                <div class="celula" data-index="6"></div>
                <div class="celula" data-index="7"></div>
                <div class="celula" data-index="8"></div>
            </div>
        `;

        this.onCelulaClick = undefined;
        this.onRestartClick = undefined

        /*
            Inversion of control (simplificado)
                Baseado em: https://www.sitepoint.com/mvc-design-pattern-javascript/

            Add Listener nas celulas do tabuleiro e vincula ela propriedade onCelulaClick
            Permite que eu crie um gancho no main que executara condigo toda vez que o evento ocorrer.
         */
        this.root.querySelectorAll(".celula").forEach(celula => {
            celula.addEventListener("click", () =>{
                // Precisa checar se a função foi implementada
                if (this.onCelulaClick){
                    this.onCelulaClick(celula.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", () =>{
            if (this.onRestartClick){
                this.onRestartClick();
            }
        });

    }

    update(game) {
        this.updateJogador(game);
        this.updateStatus(game);
        this.updateTabuleiro(game);
    }

    updateJogador(game){
        this.root.querySelector(".header__jogador").textContent = `${game.jogadorAtual} a jogar`;
    }

    updateStatus(game){
        let status = "In Progress";
        if(game.acharCombinacaoVencedora()) {
            status = `${game.jogadorAtual} venceu`;
        }
        else if (!game.isRunning()) {
            status = "empatou";
        }

        this.root.querySelector(".header__status").textContent = status;

    }

    updateTabuleiro(game){
        const combinacaoVencedora = game.acharCombinacaoVencedora();

        for (let i=0; i < game.tabuleiro.length; i++){
            const celula = this.root.querySelector(`.celula[data-index="${i}"]`);

            celula.classList.remove("celula-vencedor");
            celula.textContent = game.tabuleiro[i];

            if (combinacaoVencedora && combinacaoVencedora.includes(i)){
                celula.classList.add("celula-vencedor");
            }
        }
    }

}
