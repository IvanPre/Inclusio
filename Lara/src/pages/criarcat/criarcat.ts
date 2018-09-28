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
//camera
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-criarcat',
  templateUrl: 'criarcat.html',
})
export class CriarcatPage implements OnInit //implementar OnInit
 {
	[x: string]: any;
	criarCategoriaForm: any;
	messagenomeCategoria = "";
    messageImagem = "";
	errornomeCategoria = false;
    errorImagem= false;
	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	usuario: Usuario;
	categoriasG:any;
	base64Image: string;
	
	endereco:string ="http://inclusio.engynios.com/api/insert/categoria.php";

  constructor(public navCtrl: NavController,
  				  public navParams: NavParams,
  				  public http: HTTP, //banco 
  				  formBuilder: FormBuilder, //form
  				  public session_login: SessionloginProvider, //session
  				  public session_config: SessionconfiguracoesProvider, //session
				  public storage: Storage, //session
				  public camera: Camera,
				  public transfer: FileTransfer, 
				  public file: File
  				  )
  {
  		 this.criarCategoriaForm = formBuilder.group(
      {
        nomeCategoria: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
		// txtimg: ['',Validators.required],
		
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
  currentImage = null;
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
		this.base64Image = "data:image/jpeg;base64," + imageData;    }, (err) => {
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
		this.base64Image = "data:image/jpeg;base64," + imageData;
	}, (err) => {
		console.log(err);
	});
  }
	ionViewDidLoad() {
		console.log('ionViewDidLoad InserecodPage');
	  }

	criar()
    {

		let nomes = [];
		for(let n = 0; n < this.categoriasG.length; n++)
			nomes.push(this.categoriasG[n]['nome_categoria'].toLowerCase());

        let {nomeCategoria} = this.criarCategoriaForm.controls;

        if (!this.criarCategoriaForm.valid)
        {
			if (!nomeCategoria.valid)
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
			
		}
		else
		{
			this.messagenomeCategoria = "";
			if(nomes.indexOf(nomeCategoria.value.toLowerCase()) != -1){
				this.errornomeCategoria = true;
				this.messagenomeCategoria = "Já existe uma categoria com esse nome";
				return;
			}

			let f = false;
			let ckbs = document.getElementsByClassName('checkbox');
			for(let c = 0; c < ckbs.length; c++){
				let ckb = <HTMLInputElement> ckbs[c];
				if(ckb.checked){
					f = true;
					break;
				}
			}
			if(!f){
				alert("Selecione no minimo um checkbox!");
				return;
			}
			if (this.base64Image==null)
			{
				alert("Campo imagem obrigatorio");
				return;
			}
	
			let palavras = [];
			for(let a = 0; a < ckbs.length; a++){
				let ckb = <HTMLInputElement> ckbs[a];
				if(ckb.checked)
					palavras.push(ckb.id.substring(3));
			}
	
			let objeto = {
				nome_categoria:nomeCategoria.value,
				id_usuario: this.usuario.id_usuario,			
				imagem_categoria: this.base64Image
			};

			this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' }})
			.then(() => {}).catch(error => {
				alert(JSON.stringify(error) + " erro na inclusão de categorias. Favor contactar os desenvolvedores");
			  	return;
			});
			setTimeout(() => {
				this.http.get('http://inclusio.engynios.com/api/read/nome/categoria.php', {nome_categoria: '"'+nomeCategoria.value+'"'}, {headers: { 'Content-Type': 'application/json' }})
				.then(data => {
					let dados = this.converte(data.data);
					for(let a = 0; a < palavras.length; a++){
	
						let ad = {
							id_categoria: dados[dados.length-1]['id_categoria'],//pegar a ultima categoria
							id_palavra: palavras[a],
							id_usuario: this.usuario.id_usuario
						}

						this.http.post('http://inclusio.engynios.com/api/insert/uniao.php', ad, {headers: { 'Content-Type': 'application/json' }})
						.then().catch(error => {
							alert(JSON.stringify(error) + " erro na inclusão de palavra. Favor contactar os desenvolvedores");
							return;
						});
					}
				}).catch(error => {
					alert(JSON.stringify(error) + " erro no acesso ao banco. Favor contactar os desenvolvedores");
					return;
				});
			}, 5000);
		}
	}

	ngOnInit() {
		this.getSession();
		setTimeout(() => {
			this.carregaCategorias();
		}, 3000);
	}

	getSession(){
		this.session_login.get().then(
			res =>
			{
				this.usuario = res;	
			}
		);//session			
	}

	// limpa todos os campos
	limpar(){
		
		// limpa o campo de nome da categoria
		this.nomeCategoria= null;
		// nomeCategoria.nodeValue = null;
		
		// limpa o campo do link da imagem
		// let {txtimg}= this.criarCategoriaForm.controls;
		this.base64Image=null;
		let f = false;
		let ckbs = document.getElementsByClassName('checkbox');
		for(let c = 0; c < ckbs.length; c++){
			let ckb = <HTMLInputElement> ckbs[c];
			ckb.checked=false;
			}
		}

	carregaCategorias(){
	
		let objeto = {
			id_usuario: this.usuario.id_usuario
		};
		let path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria-null.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			this.categoriasG = dados;
			let div = document.getElementById('div_categorias');

			for(let a = 0; a < dados.length; a++){
				// if(dados[a].nome_palavra.indexOf('capa_') != -1 || dados[a].nome_palavra.indexOf('capa ') != -1)
				// 	continue;
				// dados[a].nome_palavra = dados[a].nome_palavra.replace(/_/gi, " ");

				let ion = document.createElement('ion-item');
				ion.className = 'palavra';
				let seta = <HTMLImageElement> document.createElement('img');
				seta.src = 'assets/imgs/seta_dir.png';
				seta.className = 'seta-direita';
				seta.setAttribute('id', dados[a].id_categoria);
				seta.addEventListener('click', function(){
					if(document.getElementById('p'+this.id).hidden){
						this.src = 'assets/imgs/seta_esq.png';
						document.getElementById('p'+this.id).hidden = false;
					}
					else{
						this.src = 'assets/imgs/seta_dir.png';
						document.getElementById('p'+this.id).hidden = true;
					}
				});
				this.http.get('http://inclusio.engynios.com/api/read/id/categoria-palavra.php', {id_categoria: dados[a].id_categoria}, {}).then(date =>{	
					let pala = this.converte(date.data);
					let p = <HTMLDivElement> document.createElement('div');
					p.hidden = true;
					p.id = 'p'+dados[a].id_categoria;
					for(let count = 0; count < pala.length; count++){
						if(pala[count].nome_palavra.indexOf('capa ') != -1 || pala[count].nome_palavra.indexOf('capa_') != -1)
							continue;
						let mdiv = <HTMLDivElement> document.createElement('div');
						let ckb = <HTMLInputElement> document.createElement('input');
						ckb.type = 'checkbox';
						ckb.className='checkbox';
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
					alert(JSON.stringify(e) + 'erro de select palavras');
				});
			}
		}).catch(error => {
			  alert(JSON.stringify(error));
		});
	}

}

