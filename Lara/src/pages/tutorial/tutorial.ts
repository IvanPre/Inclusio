import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

//imports da session:
import { Storage } from "@ionic/storage";
//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
//confifuracoes
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes'
 

//imports do banco
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';



///TESTES
import { MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage implements OnInit
{

	public campoimg:any=[]; 

	public campocat:any=[];

	public mostra_campoimg: boolean = true; //começa mostrando o botão para ir para o proximo (campo img - true)

	public mostra_campocat: boolean = false; // e o de categoria nao aparece ainda (campo cat - false)
	usuarioLogado:any;
	data:any;

	erroNomePalavra = false;
	
	//session
	usuario: Usuario;
	
	//session
	configuracoes: Configuracoes ;

	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	
	endereco = "https://inclusio.engynios.com/api/insert/palavra.php";
	endereco2= "https://inclusio.engynios.com/api/insert/uniao.php";
	
	//TESTE
	activeMenu: string;

	imgHidden: boolean = true;
	imageURI: any;

  constructor(public navCtrl: NavController,
  				public navParams: NavParams, 
  				private alertCtrl: AlertController,
  				public session_login: SessionloginProvider,
  				public session_config: SessionconfiguracoesProvider,
  				public http: HTTP,
				public storage: Storage,
				public menu: MenuController,
				public camera: Camera) 
  {
	//TESTE
	this.menu1Active();
	// setTimeout(() => {
	// 	this.carregaCategorias();
	// }, 3000);
  }

  	//assim que o component existir capture a sessão do usuário
	ngOnInit()
	{
		/* IMPORTANTE!!!
			todas as páginas onde o usuario esta logado
			tem que pegar a session
		*/ 
	  this.session_login.get().then(res => {
		  this.usuarioLogado = new Usuario(res);
		//   setTimeout(() => {
		// 	  this.carregaCategorias();
		//   }, 3000);
	  });
  }
	
	  //TESTE
	  menu1Active() {
		this.menu.enable(false, 'menu');
	  }


	  captureImage() {
		const options: CameraOptions = {
		  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  quality : 25,
		  targetWidth: 512,
		  targetHeight: 512,
		  //encodingType: 1,
		  correctOrientation: true
		}
		this.camera.getPicture(options).then((imageData) => {
			this.imageURI = "data:image/jpeg;base64," + imageData; 
			this.imgHidden = false;
		}, (err) => {
				console.log(err);
		  // Handle error
		  console.log('Image error: ', err);
		});
	  }
	  takePicture(){
		this.camera.getPicture({
			destinationType: this.camera.DestinationType.DATA_URL,
			quality: 25,
			targetWidth: 512,
			targetHeight: 512,
		  //  encodingType: 1
		}).then((imageData) => {
		  // imageData is a base64 encoded string
			this.imageURI = "data:image/jpeg;base64," + imageData;
			this.imgHidden = false;
		}, (err) => {
			console.log(err);
		});
	  }

	carregaCategorias(){
		this.http.get('https://inclusio.engynios.com/api/read/id_usuario/categoria-null.php', {id_usuario: this.usuarioLogado.id_usuario}, {})
			.then(data => {
				let divCat = document.getElementById('div_categorias');
				// alert(divCat);
				divCat.innerText = '';
				let dados = this.converte(JSON.stringify(data.data));
				for(let i = 0; i < dados.length; i++){
					let cat = <HTMLDivElement> document.createElement('div');
					let ckb = <HTMLInputElement> document.createElement('input');
					ckb.type = "checkbox";
					ckb.name = 'ckbsCat';
					ckb.id = dados[i].id_categoria;
					ckb.value = '' + dados[i].nome_categoria;

					let label = <HTMLLabelElement> document.createElement('label');
					label.setAttribute('for', dados[i].id_categoria);
					label.innerText = '' + dados[i].nome_categoria;
					cat.appendChild(ckb);
					cat.appendChild(label);
					divCat.appendChild(cat);
					// label.
				}
			})
			.catch(error => {
				alert('Erro ao acessar o banco, contactar os desenvolvedores. ' + JSON.stringify(error));
			});
	}

	/*
		Como o intuíto de um tutorial é ser passo a passo, precisa
		mostrar o primeiro, esconder os demais e depois mostrar o segundo
		e assim sucessivamente
	*/

	converte(date){
		let data = JSON.stringify(date);
		let re = /\\\\\\\"/gi;
		data = data.replace(re, "\"");
		data = data.replace(/\\\\/gi, '');
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
			}
			objeto[campo] = valor;
			// alert(valor);
			// document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
		  }
		  retorno.push(objeto);
		}
		return retorno;
	  }

	//apos o nome ser preenchido, vamos p a segunda etapa do tutorial, o campo img
	
	aparece_img()
	{
		//primeiro iremos checar se o nome foi mesmo preenchido:
		
		//iguala a variavel ao que tem no campo "nomePalavra"
		let palavra = <HTMLInputElement> document.getElementById('nomePalavra');
		let nomepalavra = palavra.value;
		let balaozinho = document.getElementById('balao1');


		//ve se a variavel esta vazia
		if(nomepalavra == "")
		{
			//Lara avisa que esta vazio
			balaozinho.innerHTML = 'O campo precisa estar preenchido!';
			
		}
		else
		{	
			//esta preenchido, pode avançar:
			
			//primeiro ele coloca o campo imagem na tela
			this.data=true;
			this.campoimg.push({'value':''});

			//depois esconde-se o botao q permite add inputs de categoria
			this.mostra_campoimg = !this.mostra_campoimg;
			//ele pega o valor true (ou seja mostrando) e troca para false (não aparece)

			//e permite ir para a proxima etapa do tutorial, a categoria
			this.mostra_campocat = !this.mostra_campocat;
			//ele pega o valor false (ou seja não mostrando) e troca para true (aparece)
		}
		

	}

	//apos a imagem ser preenchida, vamos p a ultima etapa do tutorial, o campo categoria
	aparece_cat()
	{
		this.carregaCategorias();
		//primeiro ele coloca o campo categoria na tela
		this.data=true;
		this.campocat.push({'value':''});

		//depois ele esconde o botao q permite add inputs de categoria
		this.mostra_campocat = !this.mostra_campocat;
		//ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
	}


	// abre/fecha a categoria exemplo do form
	mostraPalavras()
	{
		// cria uma variável referente ao local das palavras (table)
		let palavras = document.getElementById('palavras');

		// vê se existem palavras na tabela de palavras
		if(palavras.childNodes.length < 1)
			for(var a = 0; a < 20; a++)
			{

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
			while(palavras.childElementCount > 0)
			{
				// remove o último elemento de palavras
				palavras.removeChild(palavras.lastChild);
			}
	}

	// muda a seta da categoria
	seta()
	{
		// verifica se existem elementos na tabela de palavras da categoria
		if(document.getElementById("palavras").childElementCount == 0)
		// se não existirem elementos, coloca a seta para a direita
			return "arrow-dropright";
		else
		// se existirem elementos, seta para baixo
			return "arrow-dropdown";
	}

	// muda a imagem com base no input do usuário
	mudaImg()
	{
		// define a variável "imagem" como o texto colocado no input
		let img = <HTMLInputElement> document.getElementById("txtimg")
		this.imagem = img.value;
	}

	// limpa todos os campos
	limpar()
	{
		// limpa oos campos
		let limpa1 = <HTMLInputElement> document.getElementById('nomeCategoria');
		let limpa2 = <HTMLInputElement> document.getElementById('nomePalavra');
		let limpa3 = <HTMLInputElement> document.getElementById('txtimg');

		limpa1.value = "";
		limpa2.value = "";
		limpa3.value = "";

		this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";

		// cria variável para categoria1
		// let categoria1 = <HTMLInputElement> document.getElementById('categoria1');

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

	enviar()
{


		//primeiro ele verifica
		
		//iguala variaveis aos campos
		let palavra = <HTMLInputElement> document.getElementById('nomePalavra');
		let nomepalavra = palavra.value;
		let img = <HTMLInputElement> document.getElementById('txtimg');
		let cats = [];
		let balao3 = <HTMLElement> document.getElementById('balao3');
		let ckbs = document.getElementsByName('ckbsCat');
		for(let i = 0; i < ckbs.length; i++){
			let cb = <HTMLInputElement> ckbs[i];
			if(cb.checked)
				cats.push(cb.id);
		}


		//ve se todos os campos estao preenchidos
		if( nomepalavra == "" || nomepalavra==null || cats.length < 1 )
		{
			//Lara avisa que esta vazio
			balao3.innerHTML = 'Todos os campos precisam estar preenchidos!';
			
		}
		else
		{
		
			//se esta completamente preechido ele pode colocar no banco
			
			//1 PARTE DE INCLUIR PALAVRAS: TABELA PALAVRAS
			
			//pegar o valor da session
			this.session_login.get().then(
			
			res => 
			
			{
			
				this.usuarioLogado = new Usuario(res);	
			
				//cria um objeto com os campos da tabela palavra
				let objetos = 
				{
					nome_palavra: nomepalavra, //nomepalavra
					id_usuario: this.usuarioLogado.id_usuario, //id_usuario -> session
					versao: 1.0
				};
				
				this.http.post(this.endereco, objetos,
				{
				  headers: { 'Content-Type': 'application/json' }  
				})
				.then(data => 
				{
					this.http.get('https://inclusio.engynios.com/api/read/nome/palavra.php', {
						nome_palavra: "\"" + nomepalavra + "\""
					}, {headers: { 'Content-Type': 'application/json' }  })
					.then(palavras => {
						let retorno = this.converte(JSON.stringify(palavras.data));
						let ad = retorno[retorno.length - 1];
						let flag = true;
						for(let i = 0; i < cats.length; i++){
							let objetos_uniao = {
								id_palavra: ad.id_palavra,
								id_categoria: cats[i],
								id_usuario: this.usuarioLogado.id_usuario
							}
							this.http.post(this.endereco2, objetos_uniao, {headers: {'Content-Type': 'application/json'}})
							.then(() => {}).catch(error => {
								flag = false;
								alert('Erro ao cadastrar a palavra: ' + JSON.stringify(error));
							});
						}
						setTimeout(() => {
							if(flag){
								//Cadastou na tabela Uniao	
								//avisar o fim do tutorial e volta e ao home
								let alerta = this.alertCtrl.create(
									{
										title: 'Tutorial',
										message: 'Parabéns!! Você adicionou sua primeira palavra! Vamos voltar ao teclado agora',
										buttons: [{text: 'Ok', handler: () => {this.navCtrl.setRoot(HomePage); }}]
									}
								);
								alerta.present();
							}
						}, 3000);
					}).catch(error => {
						alert('Erro ao conferir o banco de dados: ' + JSON.stringify(error));
					});
					//Cadastou na tabela Palavra
				}).catch(error => {
					//se deu erro na palavra
				  alert(JSON.stringify(error));
				});
			}
			); //Session
		}
	}



  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
