import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial,  } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';

import { imprime } from '../helpers/index';

//let timer = 0;

export class NegociacaoController {
/*  Manipulando o DOM diretamente
    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
*/

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valors')
    private _inputValor: JQuery;

    //private _negociacoes: Negociacoes = new Negociacoes(); //Pode ser assim
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    
    private _service = new NegociacaoService();

    constructor() {
        /* Manipulando o DOM diretamente
        // document.querySelector('#data'); -- Código JS, para buscar tag ou ID ou class
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        */
       
       /* // Será carregado com decorator, para evitar carregar desnecessáriamente ao carregar
       this._inputData = $('#data');
       this._inputQuantidade = $('#quantidade');
       this._inputValor = $('#valor');
        */
        //Chama o metodo que cria a tabela no HTML assim que carrega a página
        this._negociacoesView.update(this._negociacoes);
    }
    @throttle()
    adiciona(/*event: Event*/) {
        //Código para não dar reload ao clicar 
        
        //O event será indicado no decorator, pois da problema pois foi postergado no docorator, o decorator se encarregará de passar o event ao metodo 
        /*event.preventDefault();*/

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

        const negociacao = new Negociacao(
            /*
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
            */

            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes, data);

        //this._negociacoes.paraArray().length = 0; // acabou de apagar!

        // this._negociacoes.paraArray().forEach(negociacao => {
        //     console.log(negociacao.data);
        //     console.log(negociacao.quantidade);
        //     console.log(negociacao.valor);
        // });

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');

        // imprime a lista de negociações encapsulada 
        console.log(this._negociacoes.paraArray());

    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importarDados() {
        /*
        function isOk(res: Response) {

            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }
        */

        const isOk: ResponseHandler = (res: Response) => {
            if(res.ok) return res;
            throw new Error(res.statusText);
        }

        this._service
        .obterNegociacoes(isOk)
        .then(negociacoes => {
            negociacoes.forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        });     


        /*//Usando Service agora 
        //Não permite que seja solicitado em menos de 0,5seg
        //clearTimeout(timer)
        //timer = setTimeout(() => {

        //Tipo XMLHttpRequest, mas utiliza Promise
        fetch('http://localhost:8080/dados')
            .then(res => isOK(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
            })
            .catch(err => console.log(err.message));
        //}, 500)
        */
    }

}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado, 
}