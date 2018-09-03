import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
	
	erroNomePalavra = false;
	
	//session
	usuario: Usuario;
	
	//session
	configuracoes: Configuracoes ;

	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	
	endereco = "https://inclusio.engynios.com/api/insert/palavra.php";
	endereco2= "https://inclusio.engynios.com/api/insert/uniao.php";
	

  constructor(public navCtrl: NavController,
  				  public navParams: NavParams, 
  				  private alertCtrl: AlertController,
  				  public session_login: SessionloginProvider,
  				  public session_config: SessionconfiguracoesProvider,
  				  public http: HTTP,
  				  public storage: Storage) 
  {
  }
	
		//assim que o component existir capture a sessão do usuário
	ngOnInit()
  {
  		/* IMPORTANTE!!!
  			todas as páginas onde o usuario esta logado
  			tem que pegar a session
  		*/ 
  		
      this.session_login.get().then(res => {this.usuarioLogado = new Usuario(res);});
      
		  
	}

	/*
		Como o intuíto de um tutorial é ser passo a passo, precisa
		mostrar o primeiro, esconder os demais e depois mostrar o segundo
		e assim sucessivamente
	*/


	//apos o nome ser preenchido, vamos p a segunda etapa do tutorial, o campo img
	
	aparece_img()
	{
		//primeiro iremos checar se o nome foi mesmo preenchido:
		
		//iguala a variavel ao que tem no campo "nomePalavra"
		let nomepalavra = document.getElementById('nomePalavra').value;
		let balaozinho = document.getElementById('balao1');


		//ve se a variavel esta vazia
		if(nomepalavra == "")
		{
			//Lara avisa que esta vazio
			balaozinho.innerHTML = 'O campo precisa estar preenchido!';
			
		}
		else if (nomepalavra != "")
		{	
			//esta preenchido, pode avançar:
			
			//primeiro ele coloca o campo imagem na tela
			console.log('this.campoimg',this.campoimg);
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
		//primeiro ele coloca o campo categoria na tela
		console.log('this.campocat',this.campocat);
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
		this.imagem = document.getElementById("txtimg").value;
	}

	// limpa todos os campos
	limpar()
	{
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

	enviar()
{


		//primeiro ele verifica
		
		//iguala variaveis aos campos
		let nomepalavra = document.getElementById('nomePalavra').value;
		let txtimg = document.getElementById('txtimg').value;
		let nomecategoria = document.getElementById('nomeCategoria').value;
		let balao3 = document.getElementById('balao3');


		//ve se todos os campos estao preenchidos
		if( nomepalavra == "" || nomepalavra==null ||txtimg == "" || nomecategoria == "" )
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
				
					//Cadastou na tabela Palavra
					
					//2 PARTE DE INCLUIR PALAVRAS: TABELA UNIÃO
			
					//cria um objeto com os campos da tabela uniao
					let objetos_uniao = 
					{
						id_usuario: this.usuarioLogado.id_usuario, //id_usuario -> session
						id_categoria: 1, //isso deve vir do bd
						id_palavra:1 //isso deve vir do bd
					};
				
				this.http.post(this.endereco2, objetos_uniao,
				{
				  headers: { 'Content-Type': 'application/json' }  
				})
				.then(data => 
				{
				
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
				  
				}).catch(error => {
					//se deu erro na uniao
				  alert(JSON.stringify(error));
				});
		
				}
				
				).catch(error => {
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
