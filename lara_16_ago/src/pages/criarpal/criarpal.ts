import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({

selector: 'page-criarpal',

templateUrl: 'criarpal.html'

})

export class CriarpalPage {

	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";


	constructor(public navCtrl: NavController) {	}

	// abre/fecha a categoria exemplo do form
	mostraPalavras(){
		// cria uma variável referente ao local das palavras (table)
		let palavras = document.getElementById('palavras');
		
		// vê se existem palavras na tabela de palavras
		if(palavras.childNodes.length < 1)
			for(var a = 0; a < 20; a++){

				// cria um elemento "tr" para colocar na table
				let tr = document.createElement('tr');

				// coloca o elemento tr na table
				palavras.appendChild(tr);

				// cria um elemento "td" para colocar no elemento tr criado antes
				let td1 = document.createElement('td');

				// adiciona o td no tr
				tr.appendChild(td1);

				// cria um novo input
				let novoCkb = document.createElement('input');
				
				// define o tipo do input como sendo uma checkbox
				novoCkb.type = 'checkbox';

				// define o valor que o checkbox vai transmitir quando for pego
				novoCkb.value = 'Palavra' + a;

				// adiciona o checkbox na td
				td1.appendChild(novoCkb);

				// cria uma nova td para ficar ao lado da primeira
				let td2 = document.createElement('td');
				tr.appendChild(td2);

				// cria um novo elemento como parágrafo
				let txt = document.createElement('p');

				// define o texto do parágrafo
				txt.innerHTML = '&nbsp;&nbsp;Palavra '+a;

				// adiciona o texto ao td2
				td2.appendChild(txt);
			}
		else
			// se existirem elementos dentro da table palavras, fica no while
			while(palavras.childElementCount > 0){

				// remove o último elemento de palavras
				palavras.removeChild(palavras.lastChild);
			}
	}

	// muda a seta da categoria
	seta(){
		// verifica se existem elementos na tabela de palavras da categoria
		if(document.getElementById("palavras").childElementCount == 0)
			// se não existirem elementos, coloca a seta para a direita
			return "arrow-dropright";
		else
			// se existirem elementos, seta para baixo
			return "arrow-dropdown";
	}

	// muda a imagem com base no input do usuário
	mudaImg(){
		// define a variável "imagem" como o texto colocado no input
		this.imagem = document.getElementById("txtimg").value;
	}

	// limpa todos os campos
	limpar(){
		// limpa o campo de nome da categoria
		document.getElementById('nomeCategoria').value = null;
		
		// limpa o campo de nome da palavra
		document.getElementById('nomePalavra').value = null;
		
		// limpa o campo do link da imagem
		document.getElementById('txtimg').value = null;
		
		// reseta a imagem para o mickey putaço
		this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";

		// cria variável para categoria1
		let categoria1 = <HTMLInputElement> document.getElementById('categoria1');
		
		// tira o checado do elemento
		//categoria1.checked = false;

	/*	// cria variável para as palavras de dentro da categoria
		let palavras = document.getElementById('palavras');

		// se existirem elementos dentro da table palavras, fica no while
		while(palavras.childElementCount > 0){
			// remove o último elemento de palavras
			palavras.removeChild(palavras.lastChild);
		} */
	}

	// "envia" os dados do form (por enquanto ta indo no console, F12 para ver)
	enviar(){
		// cria um objeto dados para guardar tudo
		let dados = {};

		// pega o campo com o nome da nova categoria
		let novaCategoria = <HTMLInputElement> document.getElementById('nomeCategoria');

		// cria um campo nome_categoria no objeto a ser enviado
		dados["nome_categoria"] = novaCategoria.value;

		// pega o campo com o link da imagem
		let imgLink = <HTMLInputElement> document.getElementById('txtimg');

		// cria um campo imagem no objeto a ser enviado
		dados["imagem"] = imgLink.value;

		// pega o checkbox da categoria para verificar se o usuário selecionou ela inteira
		let categoria = <HTMLInputElement> document.getElementById('categoria1');
		
		// se tiver selecionado a categoria inteira
	/*	if(categoria.checked == true){

			// cria um campo categoria para armazenar o valor da categoria
			dados["categoria"] = categoria.value;
		}
		else
		{
			// cria um array vazio no campo palavras para adicionar valores depois
			dados["palavras"] = [];

			// cria uma variável para palavras
			let palavras = document.getElementById('palavras');

			// fará o for para todos os elementos da table
			for(let a = 0; a < palavras.childElementCount; a++){
				
				// pega o elemento atual (checkbox dentro do primeiro td que está dentro da tr da table das palavras)
				let elemento = <HTMLInputElement> palavras.children[a].children[0].children[0];

				// se for um checkbox e estiver checado...
				if(elemento.checked == true){
					
					// adiciona o valor ao array de palavras
					dados["palavras"].push(elemento.value);
				}
			}
		}
*/
		// mostra no console (F12) os dados
		console.log(dados);
	}
}