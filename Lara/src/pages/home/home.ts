import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, Button } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
//sintetizador
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from "@ionic/storage";
import { Configuracoes } from '../../app/models/configuracoes';
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Usuario } from '../../app/models/usuario';

 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit
{
    palavras:any = {};
	timeoutMS:any;
	categorias:any= {};
	public mostra_img: boolean = true;
	resultados:any;
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	fraseFormada ="";
	
	
	endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria-null.php";

	constructor(public navCtrl: NavController,
		formBuilder: FormBuilder,
		public navParams: NavParams,
		public http: HTTP,
		public session_login: SessionloginProvider, //session
		public session_config: SessionconfiguracoesProvider, //session
		public storage: Storage, //session
		public tts: TextToSpeech)
	{}
	
	usuario: Usuario;
	config: Configuracoes;

		ngOnInit(){
			this.session_login.get().then(
				res =>
				{
					this.usuario = res;	
					// alert(JSON.stringify(this.usuario));
					// callback();
					this.session_config.get().then(ret => {
						this.config = ret;
						document.getElementById('config').innerText = JSON.stringify(ret);
						this.carrega_imagem();
					}).catch(error => {
						alert('Erro ao verificar as configurações do usuário ' + JSON.stringify(error));
					});
				}
			).catch(error => {
				alert('Erro ao reconhecer o usuário ' + JSON.stringify(error));
			});
		}

	voltar()
	{
			document.getElementById('tabela').remove();
			document.getElementById('btn_voltar').hidden=true;
			let table = document.createElement("tabela"); //cria uma tabela
			table.setAttribute('id', 'tabela');
			table.setAttribute('border', '1');
			let h1= document.getElementById("h1");
			h1.innerText= "Nossas Categorias";
		
			let objeto = JSON.parse(document.getElementById('categorias').innerText);
			
			objeto.length = function(obj){
				var size = 0, key;
				for(key in obj)
					if(obj.hasOwnProperty(key))
						size++;
						size--;
				return size;
			}
			
			for(let l=0;l<objeto.length(objeto)/2;l++)
			{
				
				let tr = document.createElement("tr"); //cria um tr
				table.appendChild(tr); //coloca o tr na tabela
				for(let p=0;p<2 && l*2+p < objeto.length(objeto);p++)
				{
					var td = document.createElement("td");
					if(objeto[l*2+p]['imagem\\\\'] == undefined)
						alert(JSON.stringify(objeto[l*2+p]));
					let s = objeto[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
					s= s.replace(/\\/gi, "");
					s = s.replace(/\//gi, "/");
					td.setAttribute('id', objeto[l*2+p]['id_categoria\\\\']);
					td.setAttribute('name', objeto[l*2+p]['nome_palavra\\\\']);
					//alert(JSON.stringify(converter[l*2+p]));
					let nome = objeto[l*2+p]['nome_categoria\\\\'].replace(/\"/gi, "");
					nome= nome.replace(/\\/gi, "");
					nome = nome.replace(/\//gi, "/");
					//alert(JSON.stringify(objeto));
					td.innerText = ''+nome.toUpperCase()+'';
					if(JSON.parse(document.getElementById('config').innerText).imagem == 's'){
						let img = document.createElement("img");
						img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
						img.setAttribute('alt', 'imagem');
						img.setAttribute('style', 'max-width: 100px; max-heigth: 100px;');
						img.setAttribute('id', 'imagem'+l*2+p);
						td.appendChild(img); //coloca a img no td
					}
					td.addEventListener('click', function()
					{
						let pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\\"/gi, "")];
						
						
						//alert(JSON.stringify(pala));
						document.getElementById('tabela').remove();
						
						document.getElementById('btn_voltar').hidden=false;
						h1.innerText= "Nossas Palavras";
						
						//criação da tabela de palavras
						
						let resultado = pala.length;
						
						// alert(JSON.stringify(converter));
						let table = document.createElement("table"); //cria uma tabela
						table.setAttribute('id', 'tabela');
						table.setAttribute('border', '1');
						

						for(let l=0;l<resultado/2;l++)
						{
							
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							for(let p=0; p<2 && l*2+p < pala.length; p++)
							{
								
								var td = document.createElement("td");
								// if(pala[l*2+p]['imagem\\\\'] == undefined)
								// 	alert(JSON.stringify(pala[l*2+p]));
								let s = pala[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
								s= s.replace(/\\/gi, "");
								s = s.replace(/\//gi, "/");
								td.setAttribute('id', pala[l*2+p]['id_categoria\\\\']);
								//alert(JSON.stringify( pala[l*2+p]['nome_palavra\\\\']));
								let nome = pala[l*2+p]['nome_palavra\\\\'].replace(/\"/gi, "");
								nome= nome.replace(/\\/gi, "");
								nome = nome.replace(/\//gi, "/");

								td.innerText = ''+nome.toUpperCase()+'';
								if(JSON.parse(document.getElementById('config').innerText).imagem == 's'){
									let img = document.createElement("img");
									img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
									img.setAttribute('alt', 'imagem');
									img.setAttribute('style', 'max-width: 100px; max-heigth: 100px;');
									img.setAttribute('id', 'imagem'+l*2+p);
									td.appendChild(img); //coloca a img no td
								}
								
								td.addEventListener('click', function()
								{
									
									document.getElementById('texto').innerText+=' '+nome.toUpperCase()+'';
		
									
								});
								tr.appendChild(td);
							}
						}
		
						document.getElementById('botoes').appendChild(table);

					});
					tr.appendChild(td);
				}
			}

			document.getElementById('botoes').appendChild(table);
		

	}
		

	converte(date)
	{
		let data = JSON.stringify(date);
		let re = /\\\"/gi;
		data = data.replace(re, "\"");
		re = /\\\\\\\//gi;
		data = data.replace(re, "/");
		let retorno = [];
		
		while(data.indexOf('{') != -1)
		{
		  let str = data.substring(data.indexOf('{')+1, data.indexOf('}')+1);
		  data = data.substring(data.indexOf('}')+1);
		  let objeto = {};
		  while(str.lastIndexOf('}') != -1)
		  {
			let campo = str.substring(str.indexOf('"')+1, str.indexOf(':')-1);
			str = str.substring(str.indexOf(':')+1);
			// document.getElementById('resposta2').innerText += str;
			let valor;
			if(str.indexOf(',') == -1)
			{
			  valor = str.substring(str.indexOf(':')+1, str.indexOf('}')-1);
			  str = ' ';
			}
			else
			{
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
	
  carrega_imagem()
  {
        let user ={
			id_usuario: this.usuario.id_usuario
		};
					
		this.http.get(this.endereco_select, user, {})
		.then(data => 
		{	
			
			
			//usar aqui
			let converter = this.converte(data.data);

			for(let a = 0; a < converter.length; a++){
				this.http.get('https://inclusio.engynios.com/api/read/id/categoria-palavra.php', {id_categoria: converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, '"')}, {}).then(dados => {
					if(JSON.stringify(this.converte(dados.data)).length < 5){
						converter.splice(a);
						a--;
					}else
						this.palavras[converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, "")] = this.converte(dados.data);
				}).catch(e => {
					alert('Erro ao acessar as palavras. Favor verificar a conexão com a internet ou contactar os desenvolvedores: ' + JSON.stringify(e));
				});
			}
			setTimeout(() => {
				document.getElementById('palavras').innerText = JSON.stringify(this.palavras);
				this.resultados = converter.length;
				// alert(JSON.stringify(converter));
				let table = document.createElement("table"); //cria uma tabela
				table.setAttribute('id', 'tabela');
				table.setAttribute('border', '1');
				let h1= document.getElementById("h1");
				h1.innerText= "Nossas Categorias";
				
				for(let l=0;l<this.resultados/2;l++)
				{
					let tr = document.createElement("tr"); //cria um tr
					table.appendChild(tr); //coloca o tr na tabela
					for(let p=0;p<2 && l*2+p < converter.length;p++)
					{
						var td = document.createElement("td");
						let img = document.createElement("img");
						// if(converter[l*2+p]['imagem\\\\'] == undefined)
						// 	alert(JSON.stringify(converter[l*2+p]));
						let s = converter[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
						s= s.replace(/\\/gi, "");
						s = s.replace(/\//gi, "/");
						img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
						img.setAttribute('alt', 'imagem');
						img.setAttribute('style', 'max-width: 100px; max-heigth: 100px;');
						img.setAttribute('id', 'imagem'+l*2+p);
						td.setAttribute('id', converter[l*2+p]['id_categoria\\\\']);
						td.setAttribute('name', converter[l*2+p]['nome_palavra\\\\']);
						this.categorias[l*2+p] = {};
						this.categorias[l*2+p]['nome_categoria\\\\'] = converter[l*2+p]['nome_categoria\\\\'];
						this.categorias[l*2+p]['imagem\\\\'] = converter[l*2+p]['imagem\\\\'];
						this.categorias[l*2+p]['id_categoria\\\\'] = converter[l*2+p]['id_categoria\\\\'];
						document.getElementById('categorias').innerText = JSON.stringify(this.categorias);
						//alert(JSON.stringify(converter[l*2+p]));
						let nome = converter[l*2+p]['nome_categoria\\\\'].replace(/\"/gi, "");
						nome= nome.replace(/\\/gi, "");
						nome = nome.replace(/\//gi, "/");

						td.innerText = ''+nome.toUpperCase()+'';
						td.appendChild(img); //coloca a img no td
						td.addEventListener('click', function()
						{
							let pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\"/gi, "")];
							// alert(JSON.stringify(pala));
							document.getElementById('tabela').remove();
							
							document.getElementById('btn_voltar').hidden=false;
							h1.innerText= "Nossas Palavras";
							
							//criação da tabela de palavras
							
							let resultado = pala.length;
							// alert(JSON.stringify(converter));
							let table = document.createElement("tabela"); //cria uma tabela
							table.setAttribute('id', 'tabela');
							table.setAttribute('border', '1');
							

							for(let l=0;l<resultado/2;l++)
							{
								
								let tr = document.createElement("tr"); //cria um tr
								table.appendChild(tr); //coloca o tr na tabela
								for(let p=0; p<2 && l*2+p < pala.length; p++)
								{
									
									var td = document.createElement("td");
									// if(pala[l*2+p]['imagem\\\\'] == undefined)
									// 	alert(JSON.stringify(pala[l*2+p]));
									let s = pala[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
									s= s.replace(/\\/gi, "");
									s = s.replace(/\//gi, "/");
									td.setAttribute('id', pala[l*2+p]['id_categoria\\\\']);
									//alert(JSON.stringify( pala[l*2+p]['nome_palavra\\\\']));
									let nome = pala[l*2+p]['nome_palavra\\\\'].replace(/\"/gi, "");
									nome= nome.replace(/\\/gi, "");
									nome = nome.replace(/\//gi, "/");

									td.innerText = ''+nome.toUpperCase()+'';

									
									if(JSON.parse(document.getElementById('config').innerText).imagem == 's'){
										let img = document.createElement("img");
										img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
										img.setAttribute('alt', 'imagem');
										img.setAttribute('style', 'max-width: 100px; max-heigth: 100px;');
										img.setAttribute('id', 'imagem'+l*2+p);
										td.appendChild(img); //coloca a img no td
									}
									
									td.addEventListener('click', function()
									{
										document.getElementById('texto').innerText+=' '+nome.toUpperCase()+'';
									});
									tr.appendChild(td);
								}
							}
			
							document.getElementById('botoes').appendChild(table);

						});
						tr.appendChild(td);
					}
				}

				document.getElementById('botoes').appendChild(table);
		}, 2000);
		})
		.catch(error => 
		{
			console.log(error.status);
			alert('Erro ao carregar as categorias. Favor verificar a conexão com a internet ou contactar os desenvolvedores: ' + JSON.stringify(error));
		});
		

	}
	
	sintetizador()
	{
		let frase = <HTMLTextAreaElement> document.getElementById('texto');
		this.tts.speak(
		{
			text: frase.innerText, 
			rate: 1,
			locale: 'pt-BR'
			
		}).then(() => {
			alert('Sucesso');
		})
		.catch(error => {
			alert('Erro no sintetizador de voz: ' + JSON.stringify(error));
		});
		
	}
	
	limpar_texto()
	{
		document.getElementById('texto').innerText=null;
	}
}
	 

	
	
	
	

