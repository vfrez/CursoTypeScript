// app/ts/app.ts
import { NegociacaoController } from './controllers/NegociacaoController'

const controller = new NegociacaoController();

$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importarDados.bind(controller));

/* Manipulando o DOM diretamente
document
    .querySelector('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));

*/
/*
Antigo código
//alert ("teste2")
let negociacao = new Negociacao(new Date(), 2, 100);
//negociacao._quantidade = 3; // O VSCODE indica um erro de compilação aqui
console.log(negociacao);
*/