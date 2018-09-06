import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

//banco
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

//imports da session:
import { Storage } from "@ionic/storage";
//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
//confifuracoes
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes';
import { createElement } from '@angular/core/src/view/element';

@IonicPage()
@Component({
  selector: 'page-criarcat',
  templateUrl: 'criarcat.html',
})
export class CriarcatPage implements OnInit //implementar OnInit
 {

	criarCategoriaForm: any;
	messagenomeCategoria = "";
    messageImagem = "";
	messagePalavras="";
    errornomeCategoria = false;
    errorImagem= false;
	errorPalavras=false;
	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	
	endereco:string ="http://inclusio.engynios.com/api/insert/categoria.php";

  constructor(public navCtrl: NavController,
  				  public navParams: NavParams,
  				  public http: HTTP, //banco 
  				   formBuilder: FormBuilder, //form
  				  public session_login: SessionloginProvider, //session
  				  public session_config: SessionconfiguracoesProvider, //session
  				  public storage: Storage //session
  				  
  				  )
  {
  		 this.criarCategoriaForm = formBuilder.group(
      {
        nomeCategoria: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
		txtimg: ['',Validators.required],
		//palavras:['',Validators.required]
      });
  }


converte(date){
    let data = JSON.stringify(date);
    let re = /\\\\\\\"/gi;
    data = data.replace(re, "\"");
    let retorno = [];
    
    while(data.indexOf('{') != -1){
      let str = data.substring(data.indexOf('{')+1, data.indexOf('}')+1);
      data = data.substring(data.indexOf('}')+1);
      let objeto = {};
      while(str.lastIndexOf('}') != -1){
        let campo = str.substring(str.indexOf('"')+1, str.indexOf(':')-1);
        str = str.substring(str.indexOf(':')+1);
        // document.getElementById('resposta2').innerText += str;
        let valor;
        if(str.indexOf(',') == -1){
          valor = str.substring(str.indexOf(':')+1, str.indexOf('}')-1);
          str = ' ';
        }else{
          valor = str.substring(0, str.indexOf(',')-1);
          str = str.substring(str.indexOf(',')+1);
        }
        if(valor == 'nul')
          valor = null;
        else{
          valor = valor.replace(/\"/gi, "");
			valor = valor.replace(/_/gi, " ");
		}objeto[campo] = valor;
		// alert(valor);
        // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
      }
      retorno.push(objeto);
    }
    return retorno;
  }
	criar()
    {
		
        let {nomeCategoria,txtimg/*,palavras*/} = this.criarCategoriaForm.controls;

        if (!this.criarCategoriaForm.valid)
        {

			if (!nomeCategoria.valid )
			{
				if(	nomeCategoria.value== null || nomeCategoria.value=="")
				{
					this.errornomeCategoria = true;
					this.messagenomeCategoria = "Campo obrigatorio";
				}
				else
				{
					this.errornomeCategoria= true;
					this.messagenomeCategoria = "Deve conter apenas letras";
				}
			}
			  
			else
			{
				this.messagenomeCategoria = "";
			}
			  
			if (!txtimg.valid)
			{
				this.errorImagem = true;
				this.messageImagem = "Campo obrigatorio";
			}
			else
			{
				this.messageImagem= "";
			}
			/*if (document.getElementById('palavras') == null)
			{
				this.errorPalavras= true;
				this.messagePalavras = "campo obrigatorio";
			}
			else
			{
				this.messagePalavras= "";
			}*/
		}
		if(this.criarCategoriaForm.valid)
		{

			let palavras = [];
			let ckbs = document.getElementsByClassName('checkbox');
			for(let a = 0; a < ckbs.length; a++){
				let ckb = <HTMLInputElement> ckbs[a];
				if(ckb.checked)
					palavras.push(ckb.id);
			}
			let objeto = {
				nome_categoria:nomeCategoria.value,
				id_usuario:null			
				
			};

	
			this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' }})
			.then(() => {
				
				// setTimeout(() => {
				this.http.get('http://inclusio.engynios.com/api/read/nome/categoria.php', {nome_categoria: '"'+nomeCategoria.value+'"'}, {headers: { 'Content-Type': 'application/json' }})
				.then(data => {
					let dados = this.converte(data.data);
					// alert(JSON.stringify(dados[dados.length-1]['id_categoria']));
					for(let a = 0; a < palavras.length; a++){
						let ad = {
							id_categoria: dados[dados.length-1]['id_categoria'],
							id_palavra: palavras[a],
							id_usuario: '5'
						}

						//alert(JSON.stringify(ad));

						this.http.post('http://inclusio.engynios.com/api/insert/uniao.php', ad, {headers: { 'Content-Type': 'application/json' }})
						.then().catch(error => {
							alert(JSON.stringify(error) + " erro na inclusão de palavra. Favor contactar os desenvolvedores");
							return;
						});
					}
					alert("Cadastro de Categoria Realizado");
				}).catch(error => {
					alert(JSON.stringify(error) + " erro no acesso ao banco. Favor contactar os desenvolvedores");
					return;
				});
				// }, 5000);
			  	//alert(JSON.stringify(data.data));
			}).catch(error => {
			
				alert(JSON.stringify(error) + " erro na inclusão de categorias. Favor contactar os desenvolvedores");
			  return;
			});
		}
	}

	ngOnInit() {
		this.carregaCategorias();
	}

// abre/fecha a categoria exemplo do form
	mostraPalavras(id){
		let objeto = {
			id_categoria: id
		};
		let seta = <HTMLImageElement> document.getElementById('seta'+id);
		seta.src = 'assets/imgs/arrow-down';
		seta.className = 'seta-baixo';
		seta.setAttribute('click', 'escondePalavras(' +id+ ')');
		let path = 'http://inclusio.engynios.com/api/read/id/categoria-palavra.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			alert(JSON.stringify(dados));
		}).catch(error =>{
			alert(JSON.stringify(error));
		});
	}

	escondePalavras(id){

	}

	// muda a seta da categoria
	// seta(e){
	// 	alert(e);
	// 	if(document.getElementById('palavras') == null)
	// 		return;
		
	// 	// verifica se existem elementos na tabela de palavras da categoria
	// 	if(document.getElementById("palavras").childElementCount == 0)
	// 		// se não existirem elementos, coloca a seta para a direita
	// 		return "arrow-dropright";
	// 	else
	// 		// se existirem elementos, seta para baixo
	// 		return "arrow-dropdown";
	// }

	// muda a imagem com base no input do usuário
	mudaImg(){
		// define a variável "imagem" como o texto colocado no input
		this.imagem = document.getElementById("txtimg").nodeValue;
	}

	// limpa todos os campos
	limpar(){
		// limpa o campo de nome da categoria
		let {nomeCategoria} = this.criarCategoriaForm.controls;
		nomeCategoria.value = "";
		// let nomeCategoria = document.getElementById('nomeCategoria');
		// nomeCategoria.nodeValue = null;
		
		// limpa o campo do link da imagem
		let txtimg = <HTMLInputElement> document.getElementById('txtimg');
		txtimg.value = "";

		let ckbs = document.getElementsByClassName('checkbox');
		// alert(ckbs.length);
		for(let a = 0; a < ckbs.length; a++){
			let ckb = <HTMLInputElement> ckbs[a];
			ckb.checked = false;
		}

		// se existirem elementos dentro da table palavras, fica no while
		// while(palavras.childElementCount > 0){
		// 	// remove o último elemento de palavras
		// 	palavras.removeChild(palavras.lastChild);
		// }
	}
	
	// carregaCategorias(){
	// 	let objeto = {
	// 		id_usuario: null
	// 	};
	// 	let path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria.php';
	// 	this.http.get(path, objeto, {}).then(data =>{
	// 		let dados = this.converte(data.data);
	// 		// alert(JSON.stringify(data.data));
	// 		// alert(JSON.stringify(dados));
	// 		let div = document.getElementById('div_categorias');
	// 		// alert(dados[0].id_categoria);	

	// 		for(let a = 0; a < dados.length; a++){
	// 			let ion = document.createElement('ion-item');
	// 			// let icon = document.getElementById('hiddenIcon');
	// 			// let icon = document.createElement('ion-icon');
	// 			// icon.setAttribute('[name]', 'arrow-dropright')
	// 			let icon = <HTMLImageElement> document.createElement('img');
	// 			icon.id = 'seta'+dados[a]['id_categoria'];
	// 			icon.src = 'assets/imgs/arrow-right.png'; 
	// 			icon.className = 'seta-direita';
	// 			let chama = function(){
	// 				this.mostraPalavras(dados[a].id_categoria);
	// 			}
	// 			icon.onclick = chama;
	// 			let ckb = <HTMLInputElement> document.createElement('input');
	// 			ckb.type = "checkbox";
	// 			ckb.id = "ckb"+dados[a]['id_categoria'];
	// 			ckb.className = 'checkbox';
	// 			let cat = document.createElement('p');
	// 			cat.innerText = dados[a]['nome_categoria'];
	// 			cat.appendChild(document.createElement('br'));
	// 			ion.appendChild(icon);
	// 			ion.appendChild(ckb);
	// 			ion.appendChild(cat);
	// 			div.appendChild(ion);
	// 		}
			
	// 		}
	// 	).catch(error => {
	// 		  alert(JSON.stringify(error));
	// 	});
			
			
		
	// 	/*objeto.id_usuario = 3;
	// 	this.http.get(path, objeto, {}).then(data =>{
	// 		data = data.data;
	// 		let div = document.getElementById('div_categorias');
			
	// 		div.name
			
	// 		for(let a = 0; a < data.length; a++){
	// 			let ion = document.createElement('ion-item');
	// 			let icon = document.createElement('ion-icon');
	// 			icon.name = "seta()";
	// 			icon.click = mostraPalavras;
	// 			icon.id = "seta"+a;
	// 			let ckb = document.createElement('input');
	// 			ckb.type = "checkbox";
	// 			ckb.id = "ckb"+a;
	// 			ckb.name = dados.id_categoria;
	// 			let cat = document.createElement(p);
	// 			cat.innerText = dados.nome_categoria;
	// 			cat.appendChild(document.createElement('br'));
	// 			ion.appendChild(icon);
	// 			ion.appendChild(ckb);
	// 			ion.appendChild(cat);
	// 			div.appendChild(ion);
	// 		}
	// 		}
	// 	).catch(error => {
	// 		  alert(JSON.stringify(error));
	// 	});*/
	// }

	palavras(id){
		let objeto = {
			id_categoria: id
		};

		let path = 'http://inclusio.engynios.com/api/read/id/categoria-palavra.php';
		this.http.get(path, objeto, {}).then(data =>{
			return this.converte(data.data);
		}).catch(error =>{
			alert(JSON.stringify(error));
		});
	}	

	carregaCategorias(){
		let objeto = {
			id_usuario: null
		};
		let path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			// alert(JSON.stringify(data.data));
			// alert(JSON.stringify(dados));
			let div = document.getElementById('div_categorias');
			// alert(dados[0].id_categoria);	

			for(let a = 0; a < dados.length; a++){
				dados[a].nome_categoria = dados[a].nome_categoria.replace(/_/gi, " ");
				let seta = <HTMLImageElement> document.createElement('img');
				seta.src = 'assets/imgs/seta_dir.png';
				seta.className = 'seta-direita';
				seta.setAttribute('id', dados[a].id_categoria);
				seta.addEventListener('click', function(){
					if(document.getElementById('p'+this.id).hidden){
						this.src = 'assets/imgs/seta_esq';
						document.getElementById('p'+this.id).hidden = false;
					}
					else{
						this.src = 'assets/imgs/seta_dir';
						document.getElementById('p'+this.id).hidden = true;
					}
				});
				this.http.get('http://inclusio.engynios.com/api/read/id/categoria-palavra.php', {id_categoria: dados[a].id_categoria}, {}).then(date =>{
					let pala = this.converte(date.data);
					let p = <HTMLDivElement> document.createElement('div');
					p.hidden = true;
					p.id = 'p'+dados[a].id_categoria;
					for(let count = 0; count < pala.length; count++){
						let mdiv = <HTMLDivElement> document.createElement('div');
						let ckb = <HTMLInputElement> document.createElement('input');
						ckb.type = 'checkbox';
						ckb.id = 'ckb'+pala[count].id_palavra;
						mdiv.appendChild(ckb);
						let palavra = <HTMLParagraphElement> document.createElement('p');
						palavra.innerText = pala[count].nome_palavra;
						mdiv.appendChild(palavra);
						p.appendChild(mdiv);
					}
					let ion = document.createElement('ion-item');
					let cat = <HTMLParagraphElement> document.createElement('p');
					cat.innerText = dados[a]['nome_categoria'];	
					ion.appendChild(seta);
					ion.appendChild(cat);
					ion.appendChild(p);
					div.appendChild(ion);	
				}).catch(e=>{
					alert(JSON.stringify(e));
				});
			}
		}
		).catch(error => {
			alert(JSON.stringify(error));
	  });
 	}
				
	
	/////////////////////let ckbs = document.getElementsByClassName('checkbox');
	/////////////////////let n = <HTMLInputElement> ckbs[a];

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
		// dados["imagem"] = imgLink.value;

		// pega o checkbox da categoria para verificar se o usuário selecionou ela inteira
		
		let palavras = [];
		let ckbs = document.getElementsByClassName('checkbox');
		for(let a = 0; a < ckbs.length; a++){
			let ckb = <HTMLInputElement> ckbs[a];
			if(ckb.checked)
				palavras.push(ckb.id.substring(4));
		}
		alert(palavras.length);

		// mostra no console (F12) os dados
		console.log(dados);
	}

}

