// app/js/models/Negociacao.js

export class Negociacao {
    /*
    //Modo um mais demorado, mas texto
     // declaração das propriedades de classe
    private _data: Date;
    private _quantidade: number;
    private _valor: number;

    constructor(data: Date, quantidade: number,  valor: number) {

        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }*/

    /*Modo Facil, menos texto*/

    /* Com Get para buscar as informações
    constructor(private _data: Date, private _quantidade: number, private _valor: number) {}
    
    get data() {

        return this._data;

    }

    get quantidade() {

        return this._quantidade;

    }

    get valor() {

        return this._valor;
    }
*/
    // readoly não precisa declarar metodos getter para leitura dos dados 
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {}

    get volume() {

        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }
}