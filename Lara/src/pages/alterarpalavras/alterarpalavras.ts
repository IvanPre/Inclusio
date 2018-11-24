import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes';
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { setTestabilityGetter } from '@angular/core/src/testability/testability';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-alterarpalavras',
  templateUrl: 'alterarpalavras.html',
})

export class AlterarpalavrasPage implements OnInit
{
	[x: string]: any;
  mostra_listagem: boolean=false;
  mostra_alterar: boolean=true;
  public alteraPalavraForm: any;
  messagePalavra = "";
  errorPalavra= false;
  usuario: Usuario;
	CategoriasG:any;
	palavras =null;
	teste:any;
	public base64Image: string;
	caminho:string;
	ckb_id:any;
	id_setas:any;

  endereco ="http://inclusio.engynios.com/api/update/palavra.php";
  
  
  constructor(public navCtrl: NavController,public camera: Camera, private alertCtrl: AlertController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP, public session_login: SessionloginProvider,  public storage: Storage) 
  {
    this.alteraPalavraForm = formBuilder.group(
    {
      palavra: ['', Validators.compose([Validators.required])]
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
  ngOnInit()
  {
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
  converte(date)
	{
		let data = JSON.stringify(date);
		let re = /\\\"/gi;
		data = data.replace(re, "\"");
		data = data.replace(/\\\\/gi, '');
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
	alterar2()
	{

		let f = false;
		let ckbs = document.getElementsByClassName('checkbox');
		for(let c = 0; c < ckbs.length; c++){
			let ckb = <HTMLInputElement> ckbs[c];
			if(ckb.checked){
				f = true;
				this.ckb_id = ckb.id;
				break;
			}
		}
		if(!f)
		{
			let alerta = this.alertCtrl.create(
				{
					title: 'Alteração',
					message: 'Selecione no minimo um radiobutton!',
					buttons: [{text: 'Ok'}]
				}
			);
			alerta.present();		
			
		
			return;
		}
		else 
		{
			document.getElementById("caixa_cadastro").hidden = false;
			document.getElementById("forms").hidden = false;
			document.getElementById("disponivel").hidden = true;
			document.getElementById("div_categorias").hidden = true;
			document.getElementById("btn2").hidden = true;
			document.getElementById("btn1").hidden = false;
			document.getElementById("excluir").hidden = true;
		}
	}
	alterar() 
  {
    let nomes = [];
		for(let n = 0;n<this.categoriasG.length;n++)
			nomes.push(this.categoriasG[n]['nome_categoria'].toLowerCase());

    let {palavra} = this.alteraPalavraForm.controls;
    if (!this.alteraPalavraForm.valid)
    {
      this.errorPalavra = true;
      this.messagePalavra = "Campo obrigatorio";
    }
   else
    {
      if(nomes.indexOf(palavra.value.toLowerCase()) != -1){
				this.errorPalavra = true;
				this.messagePalavra = "Já existe uma palavra com esse nome";
        return;
			}
			}
			let confirma_a = this.alertCtrl.create({
				title: 'Confirma alteração',
				message: 'Você deseja mesmo alterar essa palavra?',
				buttons: [
					{
						text: 'Cancelar',
						role: 'cancel',
						handler: () => {
							return;
						}
					},
					{
						text: 'Confirmar',
						handler: () => {
							let objeto = {
								id_palavra:this.ckb_id,
								nome_palavra:palavra.value,
								id_usuario:this.usuario.id_usuario,
								versao:"1.0"
								};
					
								this.http.post(this.endereco, objeto,
									{ headers: { 'Content-Type': 'application/json' }	  
									})
									.then(data => {
									
										let alerta = this.alertCtrl.create(
											{
												title: 'Alteração',
												message: 'Palavra Alterada!',
												buttons: [{text: 'Ok'}]
											}
										);
										alerta.present();	

										this.navCtrl.setRoot(HomePage);
									}).catch(error => {
										let alerta = this.alertCtrl.create(
											{
												title: 'Alteração',
												message: JSON.stringify(error)+"erro na alteração de palavras. Favor contactar os desenvolvedores",
												buttons: [{text: 'Ok'}]
											}
										);
										alerta.present();		
								});					
						}
					}
				]
			});
			confirma_a.present();
    }  
	limpar()
	{
    this.palavra="";
		this.base64Image="";
		let f = false;
		let ckbs = document.getElementsByClassName('checkbox');
		for(let c = 0; c < ckbs.length; c++){
			let ckb = <HTMLInputElement> ckbs[c];
			ckb.checked=false;
			}
		let setas = document.getElementsByClassName('seta');
		for(let c = 0; c < setas.length; c++){
			let ckb = <HTMLInputElement> setas[c];
			ckb.checked=false;
			}
  }
	excluir()
	{
		let f = false;
		let ckbs = document.getElementsByClassName('checkbox');
		for(let c = 0; c < ckbs.length; c++){
			let ckb = <HTMLInputElement> ckbs[c];
			if(ckb.checked){
				f = true;
				this.ckb_id = ckb.id;
				break;
			}
		}

		if(!f)
		{
			let alerta = this.alertCtrl.create(
				{
					title: 'Exclusão',
					message: 'Selecione no minimo um radiobutton!',
					buttons: [{text: 'Ok'}]
				}
			);
			alerta.present();		
			
		
			return;
		}
		else
		{
			document.getElementById("caixa_cadastro").hidden = true;
			document.getElementById("texto").hidden = true;
			document.getElementById("div_categorias").hidden = true;

			let seta = document.getElementsByClassName('seta');
			for(let c = 0; c < seta.length; c++){
				let setas = <HTMLInputElement> seta[c];
				if(setas.checked)
				{
					
					this.id_setas = setas.id;
					break;
				}
			}
			
			let alerta1= this.alertCtrl.create({
				title: 'Confirma exclusão',
				message: 'Você deseja mesmo excluir essa palavra?',
				buttons: [
					{
						text: 'Cancelar',
						role: 'cancel',
						handler: () => {
							this.navCtrl.setRoot(AlterarpalavrasPage);
							
						}
					},
					{
						text: 'Confirmar',
						handler: () => {

							let path_1 = "http://inclusio.engynios.com/api/delete/id/palavra-uniao.php";
							let objeto = {
								id_palavra: this.ckb_id,
								id_categoria: this.id_setas
							};
							this.http.get(path_1, objeto,
							{ headers: { 'Content-Type': 'application/json' }	  
							})
							.then(data => {
								let alerta = this.alertCtrl.create(
									{
										title: 'Exclusão',
										message: 'Palavra excluida!',
										buttons: [{text: 'Ok'}]
									}
								);
								alerta.present();		
								this.navCtrl.setRoot(HomePage);
							}).catch(error => {
								let alerta = this.alertCtrl.create(
									{
										title: 'Exclusão',
										message: JSON.stringify(error)+"erro na exclusao de palavras. Favor contactar os desenvolvedores",
										buttons: [{text: 'Ok'}]
									}
								);				
								alerta.present();		
							});	
						}
					}
				]
			});
			
			alerta1.present();
			
		}
	}


	////////////listagem////////////////////////
		
		carregaCategorias(){
			
			
				let objeto = {
					id_usuario: this.usuario.id_usuario
				};
			
				let path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria_1.php';
				this.http.get(path, objeto, {}).then(data =>{
					let dados = this.converte(data.data);
					this.categoriasG = dados;
					let div = document.getElementById('div_categorias');
		
					for(let a = 0; a < dados.length; a++){
				
						let ion = document.createElement('ion-item');
						ion.className = 'palavra';
						let seta = <HTMLInputElement> document.createElement('input');
						seta.type = 'radio';
						seta.name='cat';
						seta.className = 'seta';
						seta.setAttribute('id', dados[a]['id_categoria']);
						let id2 = dados[a]['id_categoria'].replace(/\"/gi, "");
						id2.replace(/\\\\/gi, "");				
						id2.replace(/\//gi, "/");
						
						this.setas= id2;
						seta.addEventListener('click', function(){
							if(document.getElementById('p'+this.id).hidden)
							{
								document.getElementById('p'+this.id).hidden = false;
								let ckbs = document.getElementsByClassName('checkbox');
								for(let c = 0; c < ckbs.length; c++){
									let ckb = <HTMLInputElement> ckbs[c];
									ckb.checked=false;
									}
								
							}
							else{
								document.getElementById('p'+this.id).hidden = true;
								let setas = document.getElementsByClassName('seta');
								for(let c = 0; c < setas.length; c++){
									let seta = <HTMLInputElement> setas[c];
									seta.checked=false;
								}	
								let ckbs = document.getElementsByClassName('checkbox');
								for(let c = 0; c < ckbs.length; c++){
									let ckb = <HTMLInputElement> ckbs[c];
									ckb.checked=false;
									}
								
							}
							
						});
						
						this.http.get('http://inclusio.engynios.com/api/read/id/categoria-palavra-teste.php', {id_usuario: this.usuario.id_usuario, id_categoria: dados[a].id_categoria}, {}).then(date =>{	
							let pala = this.converte(date.data);
							let p = <HTMLDivElement> document.createElement('div');
							p.hidden = true;
							p.id = 'p'+dados[a].id_categoria;
							p.className = 'linhas';
							for(let count = 0; count < pala.length; count++){
								if(pala[count].nome_palavra.indexOf('capa ') != -1 || pala[count].nome_palavra.indexOf('capa_') != -1)
									continue;
								let mdiv = <HTMLDivElement> document.createElement('div');
								let ckb = <HTMLInputElement> document.createElement('input');
								ckb.type = 'radio';
								ckb.name='palavras';
								ckb.className='checkbox';
								ckb.id = pala[count].id_palavra;
								this.ckb_id = ckb.id.replace(/\"/gi,"");	
								mdiv.appendChild(ckb);
								let palavra = <HTMLLabelElement> document.createElement('label');
								palavra.innerText = pala[count].nome_palavra;
								palavra.setAttribute('for', ckb.id);
								palavra.className = 'palavras';
								mdiv.appendChild(palavra);
								p.appendChild(mdiv);
							}
							let ion = document.createElement('ion-item');
							let cat = <HTMLParagraphElement> document.createElement('p');
							cat.innerText = dados[a]['nome_categoria'];	
							cat.className = 'categoria'
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