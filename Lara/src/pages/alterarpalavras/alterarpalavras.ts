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

  endereco ="http://inclusio.engynios.com/api/update/palavra.php";
  
  
  constructor(public navCtrl: NavController,public camera: Camera, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP, public session_login: SessionloginProvider,  public storage: Storage) 
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
	alterar() 
  {
		document.getElementById("caixa_cadastro").hidden = false;
		document.getElementById("texto").hidden = true;
		document.getElementById("div_categorias").hidden = true;
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
			if(!f){
				alert("Selecione no minimo um radiobutton!");
				return;
			}
			
			alert(this.ckb_id);
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
          alert("Palavra alterada!");
          this.navCtrl.push(HomePage);
          //alert(JSON.stringify(data.data));
        }).catch(error => {
          alert(JSON.stringify(error)+"erro na alteração de palavras. Favor contactar os desenvolvedores");
        });
    }  
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
		document.getElementById("caixa_cadastro").hidden = true;
		document.getElementById("texto").hidden = true;
		document.getElementById("div_categorias").hidden = true;
		let path_1 = "http://inclusio.engynios.com/api/delete/id/palavra.php";
    let objeto = {
			id_palavra: this.ckb_id
		};
		alert(this.ckb_id);
    this.http.get(path_1, objeto,
      { headers: { 'Content-Type': 'application/json' }	  
      })
      .then(data => {
        alert("Palavra excluida!");
        //alert(JSON.stringify(data.data));
      }).catch(error => {
        alert(JSON.stringify(error)+"erro na exclusao de palavras. Favor contactar os desenvolvedores");
			});
			setTimeout(() => {
				this.navCtrl.push(HomePage);
			}, 3000);
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
						// if(dados[a].nome_palavra.indexOf('capa_') != -1 || dados[a].nome_palavra.indexOf('capa ') != -1)
						// 	continue;
						// dados[a].nome_palavra = dados[a].nome_palavra.replace(/_/gi, " ");
		
						let ion = document.createElement('ion-item');
						ion.className = 'palavra';
						let seta = <HTMLImageElement> document.createElement('img');
						seta.src = 'assets/imgs/seta_dir.png';
						seta.className = 'seta';
						seta.setAttribute('id', dados[a]['id_categoria']);
						let id2 = dados[a]['id_categoria'].replace(/\"/gi, "");
						id2.replace(/\\\\/gi, "");				
						id2.replace(/\//gi, "/");
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