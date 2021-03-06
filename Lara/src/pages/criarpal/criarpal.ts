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
import { convertToView } from 'ionic-angular/navigation/nav-util';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-criarpal',
  templateUrl: 'criarpal.html',
})

export class CriarpalPage {
	[x: string]: any;
	criarPalavraForm: any;
	messagenomePalavra = "";
  errornomePalavra = false;
 	errorPalavras=false;
	usuario: Usuario;
	palavrasG:any;
	public base64Image: string;
	endereco ="http://inclusio.engynios.com/api/insert/palavra.php";
		constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams,
			public http: HTTP, public camera: Camera, public session_login: SessionloginProvider, //session
			public session_config: SessionconfiguracoesProvider, private alertCtrl: AlertController, //session
			public storage: Storage )
    {
      this.criarPalavraForm = formBuilder.group(
      {
        nomePalavra: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
      });
		}
	
	currentImage = null;
  captureImage() {
    const options: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
	  destinationType: this.camera.DestinationType.DATA_URL,
	  quality : 100,
	  targetWidth: 512,
	  targetHeight: 512,
	  correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
		this.base64Image = "data:image/jpeg;base64," + imageData;    }, (err) => {
			console.log(err);
      console.log('Image error: ', err);
    });
  }
  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 512,
        targetHeight: 512
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InserecodPage');
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
        else
          valor = valor + '"';
		objeto[campo] = valor;
      }
      retorno.push(objeto);
    }
    return retorno;
  }
	criar()
    {
		let nomes = [];
		for(let n = 0;n<this.palavrasG.length;n++)
			nomes.push(this.palavrasG[n]['nome_palavra'].toLowerCase());

		let {nomePalavra} = this.criarPalavraForm.controls;
		
		if (!this.criarPalavraForm.valid)
		{
			if (!nomePalavra.valid )
			{
				if(	nomePalavra.value== null || nomePalavra.value=="")
				{
					this.errornomePalavra = true;
					this.messagenomePalavra = "Campo obrigatorio";
				}
				else
				{
					this.errornomePalavra= true;
					this.messagenomePalavra = "Deve conter apenas letras";
				}
			}
		}
		else
		{
			if(JSON.stringify(nomes).indexOf(nomePalavra.value.toLowerCase()) != -1){
				this.errornomePalavra = true;
				this.messagenomePalavra = "Já existe uma palavra com esse nome";
				return;
			}
			let f = false;
			let ckbs = document.getElementsByClassName('checkbox');
			for(let a = 0; a < ckbs.length; a++){
				let ckb = <HTMLInputElement> ckbs[a];
				if(ckb.checked)
				{
					f = true;
					break;
				}
			}
			if(!f){
				let alerta = this.alertCtrl.create(
					{
						title: 'Criação',
						message: 'Selecione no minimo uma opção!',
						buttons: [{text: 'Ok'}]
					}
				);
				alerta.present();		
			return;	
			}

			let id_categoria = [];
			for(let a = 0; a < ckbs.length; a++){
				let ckb = <HTMLInputElement> ckbs[a];
				if(ckb.checked)
					id_categoria.push(ckb.id.substring(3));
			}	
			let objeto = {
				nome_palavra:nomePalavra.value,
				id_usuario:this.usuario.id_usuario,
				versao:"1.0"
			};

			let ig = {
				fileName: ('palavras_usuarios/'+this.usuario.id_usuario+"_"+nomePalavra.value).replace(/\"/gi, ""),
				imageURI: this.base64Image
			};
			this.http.post('http://inclusio.engynios.com/api/insert/imagem.php', ig, { headers: { 'content-type': 'application/json' }})
			.then(data => {
				this.http.post(this.endereco, objeto,
				{ headers: { 'Content-Type': 'application/json' }	  
				})
				.then(data => {
					this.http.get('http://inclusio.engynios.com/api/read/nome/palavra.php', {nome_palavra: '"'+nomePalavra.value+'"'}, {headers: { 'Content-Type': 'application/json' }})
					.then(data => {
						let dados = this.converte(data.data);
						for(let a = 0; a < id_categoria.length; a++){
		
							let ad = {							
								id_categoria: id_categoria[a],
								id_palavra: dados[dados.length-1]['id_palavra'],//pegar a ultima palavra
								id_usuario: this.usuario.id_usuario
							}

							this.http.post('http://inclusio.engynios.com/api/insert/uniao.php', ad, {headers: { 'Content-Type': 'application/json' }})
							.then().catch(error => {
								alert("Erro na associação da palavra com a categoria. Favor contactar os desenvolvedores: " + JSON.stringify(error));
								return;
							});
						}
					}).catch(error => {
						alert("Erro no acesso ao banco. Favor verificar a conexão com a internet ou contactar os desenvolvedores: " + JSON.stringify(error));
						return;
					});
				
				}).catch(error => {
					alert("Erro na inclusão de palavras. Favor verificar a conexão com a internet ou contactar os desenvolvedores: " + JSON.stringify(error));
					return;
				});
			}).catch(e => {
				alert('Erro no upload da imagem: ' + JSON.stringify(e));
				return;
			});
		
			setTimeout(() => {
				let alerta = this.alertCtrl.create(
					{
						title: 'Criação',
						message: 'Palavra criada',
						buttons: [{text: 'Ok'}]
					}
				);
				alerta.present();		
				this.limpar();
				this.navCtrl.setRoot(HomePage);
			}, 3000);
		}
	}
	getSession(){
		this.session_login.get().then(
			res =>
			{
				this.usuario = res;	
			}
		);		
	}
	ngOnInit() {
		this.session_login.get().then(
			res =>
			{
						this.usuario = res;	
				setTimeout(() => {
					let objeto = {
						id_usuario: this.usuario.id_usuario
					};
					let path2 = 'https://inclusio.engynios.com/api/read/id_usuario/palavra-null.php';
					this.http.get(path2, objeto, {}).then(data =>{
						let dados = this.converte(data.data);
						this.palavrasG = JSON.parse(JSON.stringify(dados).toLowerCase());
					}).catch(error => {
						alert(JSON.stringify(error));
					});
					this.carregapalavras();
				}, 3000);
			}).catch(error => {
				alert('Erro ao identificar o usuário: ' + JSON.stringify(error));
			})	
	}
	
	limpar(){
	this.nomePalavra= null;
	this.base64Image=null;
	let f = false;
	let ckbs = document.getElementsByClassName('checkbox');
	for(let c = 0; c < ckbs.length; c++){
		let ckb = <HTMLInputElement> ckbs[c];
		ckb.checked=false;
		}
	}

	carregapalavras(){
		let objeto = {
			id_usuario: this.usuario.id_usuario
		};
		let path = 'https://inclusio.engynios.com/api/read/id_usuario/categoria.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			let div = document.getElementById('div_categorias');	

			for(let a = 0; a < dados.length; a++){
				let ion = document.createElement('div');
				ion.className = 'linhas';
				let ckb = document.createElement('input');
				ckb.type = "checkbox";
				ckb.id = "ckb"+dados[a]['id_categoria'];
				ckb.className = 'checkbox';
				let cat = <HTMLLabelElement> document.createElement('label');
				cat.innerText = dados[a]['nome_categoria'].replace(/\"/gi, "");
				cat.setAttribute('for', 'ckb' + dados[a]['id_categoria']);
				cat.className = 'categorias';
				cat.appendChild(document.createElement('br'));
				ion.appendChild(ckb);
				ion.appendChild(cat);
				div.appendChild(ion);
			}
			
			}
		).catch(error => {
			  alert(JSON.stringify(error));
		});
			
			
	}
}