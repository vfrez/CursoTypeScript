import { Negociacao } from '../models/Negociacao';

export class Negociacoes {

    //private _negociacoes: Array<Negociacao> = [];
    private _negociacoes: Negociacao[] = []; //Assim é a mesma coisa do de cima 
    
    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }
    paraArray(): Negociacao[] {

        return ([] as Negociacao[]).concat(this._negociacoes);
        //return this._negociacoes;
     }

     paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }
}