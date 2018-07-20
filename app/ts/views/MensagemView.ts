import { View } from './View'

export class MensagemView extends View<string>{

    //removido pois agora é herdado o construtor da View do arquivo View.ts
    // private _elemento: Element;
    // constructor(seletor: string) {

    //     this._elemento = document.querySelector(seletor);
    // }
    // update(model: string) {

    //     this._elemento.innerHTML = this.template(model);
    // }

    template(model: string): string {

        return `<p class="alert alert-info">${model}</p>`;
    }
}