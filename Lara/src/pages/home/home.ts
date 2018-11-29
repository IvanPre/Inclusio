
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Button} from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

//sintetizador
import { TextToSpeech } from '@ionic-native/text-to-speech';

//imports da session:
import { Storage } from "@ionic/storage";

//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';


 //confifuracoes
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes';

 
//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit
{	
	//SESSIONS:
	//usuario
	usuario: Usuario;
	//configuragoes
	configuracoes: Configuracoes ;
	usuarioLogado:any;
	usuarioConfig:any;

	
	palavratela: number;
	imagem: string;

    palavras:any = {};
	timeoutMS:any;
	categorias:any= {};
	public mostra_img: boolean = true;
	resultados:any;
	fraseFormada ="";
	
	
	endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria-null.php";

	constructor(public navCtrl: NavController,
					 formBuilder: FormBuilder, 
					 public navParams: NavParams, 
					 public http: HTTP,  
					 private tts: TextToSpeech,
					 public session_login: SessionloginProvider,  //session
					 public session_config: SessionconfiguracoesProvider, //session
					 public storage: Storage)
	{
		// this.carrega_imagem();
	}
	
	ngOnInit() 
	{
			this.getSession();
	 
		this.session_config.get().then(
			res =>
			{
				this.usuarioConfig = res;	
			
			}
		);
		this.session_config.get().then(
			
			res => {this.usuarioConfig = new Configuracoes(res);
			});
	
		console.log(this.session_login.exist());
		console.log(this.session_config.exist());
		console.log(this.session_login.exist());
		console.log(this.session_config.exist());
		

		setTimeout(() => {
			this.carrega_imagem();
		}, 3000);
	}

	getSession(){
		this.session_login.get().then(
			res =>
			{
				this.usuario = res;	
			}
		);			
	}

	voltar()
	{
			document.getElementById('tabela').remove();
			document.getElementById('btn_voltar').hidden=true;
			let table = document.createElement("tabela"); //cria uma tabela
			table.setAttribute('id', 'tabela');
			table.setAttribute('border', '1px');
			let h1= document.getElementById("h1");
			h1.innerHTML= "Nossas Categorias";
		
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
				
				let tr = document.createElement("tr"); 
				table.appendChild(tr); 
				for(let p=0;p<2 && l*2+p < objeto.length(objeto);p++)
				{
					var td = document.createElement("td");
					let div = document.createElement("div");
					let img = document.createElement("img");

					let s = objeto[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
					s= s.replace(/\\/gi, "");
					s = s.replace(/\//gi, "/");
					
					td.setAttribute('id', objeto[l*2+p]['id_categoria\\\\']);
					td.setAttribute('name', objeto[l*2+p]['nome_palavra\\\\']);
					td.setAttribute('style', 'max-height: 400px; max-width: 300px;');

					div.setAttribute('id', 'div_imagem');
					div.setAttribute('border', '1px');
					div.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');
		
					img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
					img.setAttribute('alt', 'imagemmm');
					img.setAttribute('id', 'imagem'+l*2+p);

					let nome = objeto[l*2+p]['nome_categoria\\\\'].replace(/\"/gi, "");
					nome= nome.replace(/\\/gi, "");
					nome = nome.replace(/\//gi, "/");
					td.innerHTML = ''+nome.toUpperCase()+'';
					div.appendChild(img);
					td.appendChild(div);
					td.addEventListener('click', function()
					{
				
						let pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\\"/gi, "")];
						
						document.getElementById('tabela').remove();
						
						document.getElementById('btn_voltar').hidden=false;
						h1.innerHTML= "Nossas Palavras";
						
					
						let resultado = pala.length;
						
					
						let table = document.createElement("table"); 
						table.setAttribute('id', 'tabela');
						table.setAttribute('border', '1px');
						

						for(let l=0;l<resultado/2;l++)
						{
							
							let tr = document.createElement("tr"); //cria um tr
							table.appendChild(tr); //coloca o tr na tabela
							for(let p=0; p<2 && l*2+p < pala.length; p++)
							{
								
								var td = document.createElement("td");
								let div = document.createElement("div");
								let img = document.createElement("img");
								let s = pala[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
								s= s.replace(/\\/gi, "");
								s = s.replace(/\//gi, "/");
								
								td.setAttribute('id', pala[l*2+p]['id_categoria\\\\']);
								td.setAttribute('style', 'max-height: 400px; max-width: 300px;');

								div.setAttribute('id', 'div_imagem');
								div.setAttribute('border', '1px');
								div.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');

								img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
								img.setAttribute('alt', 'imagemmm');
								img.setAttribute('id', 'imagem'+l*2+p);

								let nome = pala[l*2+p]['nome_palavra\\\\'].replace(/\"/gi, "");
								nome= nome.replace(/\\/gi, "");
								nome = nome.replace(/\//gi, "/");

								td.innerHTML = ''+nome.toUpperCase()+'';
								div.appendChild(img);
								td.appendChild(div); //coloca a div com a img no td
								
								td.addEventListener('click', function()
								{
									
									document.getElementById('texto').innerHTML+=' '+nome.toUpperCase()+'';
			
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
	
		  }
		  retorno.push(objeto);
		}
		return retorno;
	}
	
  carrega_imagem()
  {
        let teste =
		{
			id_usuario: this.usuario.id_usuario

		}
		
		this.http.get(this.endereco_select, teste, {})
		.then(data => 
		{	
			let converter = this.converte(data.data);

			for(let a = 0; a < converter.length; a++){
				this.http.get('https://inclusio.engynios.com/api/read/id/categoria-palavra.php', {id_categoria: converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, '"')}, {}).then(dados => {
					this.palavras[converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, "")] = this.converte(dados.data);
					document.getElementById('palavras').innerText = JSON.stringify(this.palavras);
				}).catch(e => {
					alert(JSON.stringify(e + 'line 97'));
				});
			}
			setTimeout(() => {
				
				this.resultados = converter.length;
				let table = document.createElement("table"); //cria uma tabela
				table.setAttribute('id', 'tabela');
				table.setAttribute('border', '1px');
				
				let h1= document.getElementById("h1");
				h1.innerHTML= "Nossas Categorias";
				
				for(let l=0;l<this.resultados/2;l++)
				{
					let tr = document.createElement("tr"); //cria um tr
					table.appendChild(tr); //coloca o tr na tabela
					for(let p=0;p<2 && l*2+p < converter.length;p++)
					{
						var td = document.createElement("td");
						let div = document.createElement("div");
						let img = document.createElement("img");
				
						let s = converter[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
						s= s.replace(/\\/gi, "");
						s = s.replace(/\//gi, "/");
						
						div.setAttribute('id', 'div_imagem');
						div.setAttribute('border', '1px');
						div.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');
					
						img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
						img.setAttribute('alt', 'imagemmm');
						img.setAttribute('id', 'imagem'+l*2+p);
						
						td.setAttribute('id', converter[l*2+p]['id_categoria\\\\']);
						td.setAttribute('style', 'max-height: 400px; max-width: 300px;');
				
						this.categorias[l*2+p] = {};
						this.categorias[l*2+p]['nome_categoria\\\\'] = converter[l*2+p]['nome_categoria\\\\'];
						this.categorias[l*2+p]['imagem\\\\'] = converter[l*2+p]['imagem\\\\'];
						this.categorias[l*2+p]['id_categoria\\\\'] = converter[l*2+p]['id_categoria\\\\'];
						document.getElementById('categorias').innerText = JSON.stringify(this.categorias);
		
						let nome = converter[l*2+p]['nome_categoria\\\\'].replace(/\"/gi, "");
						nome= nome.replace(/\\/gi, "");
						nome = nome.replace(/\//gi, "/");

						td.innerHTML = ''+nome.toUpperCase()+'';
						td.appendChild(img); //coloca a img no td
						td.addEventListener('click', function()
						{
							let pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\"/gi, "")];
					
							document.getElementById('tabela').remove();
							
							document.getElementById('btn_voltar').hidden=false;
							h1.innerHTML= "Nossas Palavras";
							
							
							let resultado = pala.length;
							let table = document.createElement("table"); //cria uma tabela
							table.setAttribute('id', 'tabela');
							table.setAttribute('border', '1px');

							for(let l=0;l<resultado/2;l++)
							{
								
								let tr = document.createElement("tr"); //cria um tr
								table.appendChild(tr); //coloca o tr na tabela
								
								for(let p=0; p<2 && l*2+p < pala.length; p++)
								{
									
									var td = document.createElement("td");
									let div = document.createElement("div");
									let img = document.createElement("img");
								
									let s = pala[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
									s= s.replace(/\\/gi, "");
									s = s.replace(/\//gi, "/");
									

									td.setAttribute('id', pala[l*2+p]['id_categoria\\\\']);
									td.setAttribute('border', '1px');
								
				
									td.setAttribute('style', 'max-height: 200px; max-width: 200px;');
									

									div.setAttribute('id', 'div_imagem');
									div.setAttribute('border', '1px');
									div.setAttribute('style', 'height: 200px; width: 200px;float:center;');
								

									img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
									img.setAttribute('alt', 'imagemmm');
									img.setAttribute('id', 'imagem'+l*2+p);
									img.setAttribute('style', 'max-height: 170px; max-width: 170px;float:center;');
								
									let nome = pala[l*2+p]['nome_palavra\\\\'].replace(/\"/gi, "");
									nome= nome.replace(/\\/gi, "");
									nome = nome.replace(/\//gi, "/");

									img.setAttribute('alt', ''+nome+'');
									td.innerHTML = ''+nome.toUpperCase()+'';
								
									div.appendChild(img);
									td.appendChild(div); //coloca a div com a img no td

									td.addEventListener('click', function()
									{
										
										document.getElementById('texto').innerHTML+=' '+nome.toUpperCase()+'';
			
										
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
			alert(error + " linha 141");
		});

	}
	
	sintetizador()
	{
		let frase = document.getElementById('texto');
		
		this.tts.speak(
		{
			text: frase.innerText, 
			rate: 0.75,
			locale: 'pt-BR'
			
		}).then(() => console.log('Success'))
		.catch((reason: any) => alert(reason));
		
	}
	
	limpar_texto()
	{
		document.getElementById('texto').innerHTML=null;
	}
}

	
	
	
	

