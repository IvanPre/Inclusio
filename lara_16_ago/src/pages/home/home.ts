import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Slides, Events } from 'ionic-angular';

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
import { Configuracoes } from '../../app/models/configuracoes'

//import do sintetizador
import { TextToSpeech } from '@ionic-native/text-to-speech';
 
//paginas q esse pagina chama
import { SplashPage } from '../splash/splash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit
{

	@ViewChild('slider') private slider: Slides;
	
	//caminhos de imagem (temporario -> deve vir do bd)
  imagem1:string = "assets/imgs/capa_comida.png";
  imagem2:string = "assets/imgs/capa_sensacoes.png";
  imagem3:string = "assets/imgs/capa_pessoas.png";
  imagem4:string = "assets/imgs/capa_corpo.png";
  imagem5:string = "assets/imgs/capa_animais.png";
  imagem6:string = "assets/imgs/capa_letras.png";
	
	//SESSIONS:
	//usuario
	usuario: Usuario;
	//configuraçoes
	configuracoes: Configuracoes ;
	usuarioLogado:any;
	usuarioConfig:any;
	usuarioConfig1:any;
	
	//CONFIGURAÇÕES DO TECLADO:
	//imagem e texto
	public mostra_img: boolean = true; //mostra

	
	//BANCO
	caminho:string;
	linhas_nossas: any;
	tamanho: any;
	cat_usu: any;
	indice_null:any;
	resultados:any;
	j: number = 0;
	
	numbers = [0,1,2];
 	firstLoad = true;
  	data:any = {};
  	displayData = [];
  	imagens = [];
  	fraseFormada ="";
		
	
	
	
  constructor(	 public navCtrl: NavController,
  					 public navParams: NavParams, 
  					 public session_login: SessionloginProvider, //session
  					 public session_config: SessionconfiguracoesProvider, //session
  					 public http: HTTP, //banco
					 private tts: TextToSpeech, //sintetizador
  					 public storage: Storage)
  {
	this.data.position = '';
	this.data.tabela = 'cartao';
	this.data.response = '';

	//1 passo: checar se esta logado:
	this.session_login.get().then(res =>
	{

	this.usuarioLogado = new Usuario(res);
	if(this.usuarioLogado.id_usuario == null)//se nao esta logado
	{
	//vai para o comeco
	this.navCtrl.setRoot(SplashPage);
	}
	else //está logado
	{
		this.carrega_teclado(); //pode carregar o teclado
	}

	});
      

	}
	
	//função para converter dados do banco
	converte(date)
	{
    let data = JSON.stringify(date);
    let re = /\\\\\\\"/gi;
    data = data.replace(re, "\"");
    let retorno = [];
    
    while(data.indexOf('{') != -1)
    {
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
        else
					valor = valor + '"';
        objeto[campo] = valor;
        // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
      }
      retorno.push(objeto);
    }
    return retorno;
  }
	
	carrega_teclado()
	{
		//primeiro as nossas categorias
		//SELECIONAR
     	//precisa-se faze dois selects: um de id null e outro de id session
     	
     	//Indicando o caminho da api
		this.caminho= 'https://inclusio.engynios.com/api/read/id_usuario/categoria.php';
		//Faz um select (read), por id_usuario, na tabela categoria
     	
     	//id null (nossas categorias)
     	this.http.get(this.caminho, {id_usuario: "null"}, {})
		.then(
		data => 
		{
			//caso tenha dado tudo certo
			let converter = this.converte(data.data);
		
			let nossas_categorias = document.getElementById('nossas_categorias');
			//indices dos fors:
			let indice_slide;//qndt de slides e tabelas
			let indice_tr;
			let indice_td;
			
			this.resultados = converter.length;
			
			this.session_config.get().then(
	    	res =>
	    	{
	    		this.usuarioConfig = new Configuracoes(res);
	    		let divisao = this.resultados / this.usuarioConfig.palavra_tela; //Aqui voce divida o tamanho pela session
		   	let qndt_slide = Math.ceil(divisao); //aqui voce arredonda pra cima e armazena na variável que representa o numero de páginas    
		  		//alert("linhas: "+this.resultados+"divisao: "+divisao+"qntd slide"+ qndt_slide+" session "+ this.usuarioConfig.palavra_tela);
		  			
	  			/*
	  			  para exibir de acordo as configurações deve-se criar os elementos 
				  na sequencia da div maior para a menor. ex: ion-slide, table, tr, td e p 
				  e em seguida ir colocando eles na tela
				*/
				
				
				for (indice_slide=0; indice_slide<qndt_slide; indice_slide++ )
				{
					//1º tabela
					let table = document.createElement("table"); //cria uma tabela
					table.setAttribute('border', '1');
					table.setAttribute('id', ''+indice_slide);
					nossas_categorias.appendChild(table); // coloca a tabela na div (teclado) que já existe
					
					if(this.usuarioConfig.palavra_tela==8)
				  	{
						for(indice_tr = 0; indice_tr != 4; indice_tr++)
						{
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							for(indice_td = 0; indice_td != 2; indice_td++)
					     	{
					     	
									let td = document.createElement("td");
									let p = document.createElement("P"); // Cria um elemento do tipo p (paragrafo)
									let nome_categoria = document.createTextNode(""+converter[ this.j ]['nome_categoria']+'');// Create a text node
									p.appendChild(nome_categoria); // coloca a info do bd no paragrafo	
									td.appendChild(p) //coloca o paragrafo no td	
									tr.appendChild(td); //coloca o td no tr
									this.j++;
								
					     	
					     	} //for de td
						
						}//dor de tr
						
					}//if de conf
					
						if(this.usuarioConfig.palavra_tela==6 || this.usuarioConfig.palavra_tela== null )
				  	{
						for(indice_tr = 0; indice_tr != 3; indice_tr++)
						{
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							for(indice_td = 0; indice_td != 2; indice_td++)
					     	{
					     	
									let td = document.createElement("td");
									let p = document.createElement("P"); // Cria um elemento do tipo p (paragrafo)
									let nome_categoria = document.createTextNode(""+converter[ this.j ]['nome_categoria']+'');// Create a text node
									p.appendChild(nome_categoria); // coloca a info do bd no paragrafo	
									td.appendChild(p) //coloca o paragrafo no td	
									tr.appendChild(td); //coloca o td no tr
									this.j++;
								
					     	
					     	} //for de td
						
						}//dor de tr
						
					}//if de conf
					
					if(this.usuarioConfig.palavra_tela==4 )
				  	{
						for(indice_tr = 0; indice_tr != 2; indice_tr++)
						{
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							for(indice_td = 0; indice_td != 2; indice_td++)
					     	{
					     	
									let td = document.createElement("td");
									let p = document.createElement("P"); // Cria um elemento do tipo p (paragrafo)
									let nome_categoria = document.createTextNode(""+converter[ this.j ]['nome_categoria']+'');// Create a text node
									p.appendChild(nome_categoria); // coloca a info do bd no paragrafo	
									td.appendChild(p) //coloca o paragrafo no td	
									tr.appendChild(td); //coloca o td no tr
									this.j++;
								
					     	
					     	} //for de td
						
						}//dor de tr
						
					}//if de conf
					
					if(this.usuarioConfig.palavra_tela==2 || this.usuarioConfig.palavra_tela==1 )
				  	{
						for(indice_tr = 0; indice_tr != 1; indice_tr++)
						{
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							if(this.usuarioConfig.palavra_tela==2  )
				  			{
				  				for(indice_td = 0; indice_td != 2; indice_td++)
					     		{
					     	
									let td = document.createElement("td");
									let p = document.createElement("P"); // Cria um elemento do tipo p (paragrafo)
									let nome_categoria = document.createTextNode(""+converter[ this.j ]['nome_categoria']+'');// Create a text node
									p.appendChild(nome_categoria); // coloca a info do bd no paragrafo	
									td.appendChild(p) //coloca o paragrafo no td	
									tr.appendChild(td); //coloca o td no tr
									this.j++;
								
					     	
					     		} //for de td
				  			}
				  			if(this.usuarioConfig.palavra_tela==1)
				  			{
				  				for(indice_td = 0; indice_td != 1; indice_td++)
					     		{
					     	
									let td = document.createElement("td");
									let p = document.createElement("P"); // Cria um elemento do tipo p (paragrafo)
									let nome_categoria = document.createTextNode(""+converter[ this.j ]['nome_categoria']+'');// Create a text node
									p.appendChild(nome_categoria); // coloca a info do bd no paragrafo	
									td.appendChild(p) //coloca o paragrafo no td	
									tr.appendChild(td); //coloca o td no tr
									this.j++;
								
					     	
					     		} //for de td
				  			}
							
						
						}//dor de tr
						
					}//if de conf
					
					
					
				}
					
		    	
	    	
	    	}  );//session
			
		

		})
		.catch(
		error => 
		{
			alert(""+JSON.stringify(error));
			console.log(error+"\n"); 
			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);
		});
				
		
	}

  addPalavra(event)
  {
    console.log(event.id);
    var n = event.target.id;
    if(document.getElementById("fraseFormada").innerHTML != "&nbsp;FRASE FORMADA")
      document.getElementById("fraseFormada").innerHTML += n.toUpperCase() + " ";
    else
      document.getElementById("fraseFormada").innerHTML = "&nbsp;" + n.toUpperCase() + " ";
  }
  
  limpar_frase()
  {
  	 document.getElementById("fraseFormada").innerHTML = 'FRASE FORMADA';
  }
  
	sintetizador()
  {
  		
    this.tts.speak({
      text: this.fraseFormada, 
      locale: 'pt-BR',
      rate: 0.75
    }).then(() => console.log('Success'))
    .catch((reason: any) => alert(reason));
  }
  
  
}
