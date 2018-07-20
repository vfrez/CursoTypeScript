import { Negociacao } from '../models/index';

export function imprime(...objetos: any[]) {
    objetos.forEach(objeto => objeto.paraTexto());
}