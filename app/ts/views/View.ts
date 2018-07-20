import { logarTempoDeExecucao } from '../helpers/decorators/index';

//Torna esta uma classe genérica, forçando as filhas a indicar o tipo que será usado nelas 
export abstract class View<T> {
    /* Manipulando a DOM diretamente
    //Protected permite que a propriedade possa ser acessada atravez de metodos na classe e também nos classes que estão herdando View  
    protected _elemento: Element;
    */
   protected _elemento: JQuery;
   private _escapar: boolean;

    //parametro com ? indica que é um parametro opcional, por default se não for definido é undefined(que é Null e false em JS)
    // Quando passamos o valor para o parâmetro, caso não seja declarado na chamada ele tomara o valor definido como padrão
    constructor(seletor: string, escapar: boolean = false) {
        /* Manipulando a DOM diretamente
        this._elemento = document.querySelector(seletor);
        */
        this._elemento = $(seletor);
        this._escapar = escapar;
    }
    
    @logarTempoDeExecucao()
    update(model: T) {

        /*//Manipulando DOM diretamente
        this._elemento.innerHTML = this.template(model);
        */
       let template = this.template(model)
       if(this._escapar) 
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');

        this._elemento.html(this.template(model));

    }

    //Classes abstratas não podem ser instanciadas, apenas herdadas
    //Obriga as classes filhas a implementar o método 
    abstract template(model: T): string

/*
    //Este método será sobreescrito na classe que herdar está classe, nas classe filhas
    template(model: T): string {
        //Caso não seja implementado o metodo template na classe filha, lançar um alerta de erro 
        throw new Error('Você deve implementar o método template');
    
    }
*/
}