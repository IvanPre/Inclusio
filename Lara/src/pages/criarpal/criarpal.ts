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
			public session_config: SessionconfiguracoesProvider, //session
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
	  targetWidth: 1000,
	  targetHeight: 1000,
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
        targetWidth: 1000,
        targetHeight: 1000
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
		// alert(valor);
        // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
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
			if(nomes.indexOf(nomePalavra.value.toLowerCase()) != -1){
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
				alert("Selecione no minimo um checkbox!");
				return;
			}
	/*	if (this.base64Image==null)
			{
				alert("Campo imagem obrigatorio");
				return;
			}*/
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
	
			this.http.post(this.endereco, objeto,
			{ headers: { 'Content-Type': 'application/json' }	  
			})
			.then(data => {
			 alert("Palavra criada!");
			  //alert(JSON.stringify(data.data));
			}).catch(error => {
			  alert(JSON.stringify(error)+"erro na inclusão de palavras. Favor contactar os desenvolvedores");
			});
		
			setTimeout(() => {
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
			this.carregapalavras();
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
		let path = 'http://inclusio.engynios.com/api/read/id_usuario/palavras-null.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			this.palavrasG = dados;
			let div = document.getElementById('div_categorias');	

			for(let a = 0; a < dados.length; a++){
				let ion = document.createElement('ion-item');
				let ckb = document.createElement('input');
				ckb.type = "checkbox";
				ckb.id = "ckb"+dados[a]['id_categoria'];
				ckb.className = 'checkbox';
				let cat = document.createElement('p');
				cat.innerText = dados[a]['nome_categoria'].replace(/\"/gi, "");
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