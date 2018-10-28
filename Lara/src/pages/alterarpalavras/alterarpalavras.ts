import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import { Storage } from "@ionic/storage";
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-alterarpalavras',
  templateUrl: 'alterarpalavras.html',
})

export class AlterarpalavrasPage {
	dados: any;
  mostra_listagem: boolean=false;
  mostra_alterar: boolean=true;
  public alteraPalavraForm: any;
  messagePalavra = "";
  errorPalavra= false;
  usuario: Usuario;
	palavrasG:any;
	palavras =null;
	teste:any;
	public base64Image: string;
	caminho:string;
	mostra= false;
	
	
  endereco ="http://inclusio.engynios.com/api/update/palavra.php";
  path = "http://inclusio.engynios.com/api/delete/id/palavra.php";
  
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
    let nomes = [];
		for(let n = 0;n<this.palavrasG.length;n++)
			nomes.push(this.palavrasG[n]['nome_palavra'].toLowerCase());

    let {palavra} = this.alteraPalavraForm.controls;
    if (!this.alteraPalavraForm.valid)
    {
      this.errorPalavra = true;
      this.messagePalavra = "Campo obrigatorio";
    }
    if(this.alteraPalavraForm.valid)
    {
      if(nomes.indexOf(palavra.value.toLowerCase()) != -1){
				this.errorPalavra = true;
				this.messagePalavra = "Já existe uma palavra com esse nome";
        return;
      }
      let objeto = {
			id_palavra:this.palavras,
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
    this.palavra= null;
    this.base64Image=null;
  }
  excluir(){
    let objeto = {
      id_palavra:this.palavras
    };
    this.http.post(this.path, objeto,
      { headers: { 'Content-Type': 'application/json' }	  
      })
      .then(data => {
        alert("Palavra excluida!");
        this.navCtrl.push(HomePage);
        //alert(JSON.stringify(data.data));
      }).catch(error => {
        alert(JSON.stringify(error)+"erro na exclusao de palavras. Favor contactar os desenvolvedores");
      });
	}

	////////////listagem////////////////////////

  carregaCategorias()
	{
    let objeto = {
			id_usuario: this.usuario.id_usuario
		};
		let path = 'http://inclusio.engynios.com/api/read/id_usuario/palavra-null.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			this.palavrasG = dados;
			let div = document.getElementById('palavras_1');//???//

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
						let rdb = <HTMLInputElement> document.createElement('input');
						rdb.type = 'radiobutton';
						rdb.className='radiobutton';
						rdb.id = 'rdb'+pala[count].id_palavra;
						mdiv.appendChild(rdb);
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

					 var pa = document.createElement("p");
 
					 this.palavras= this.dados[a]['id_palavra\\\\'];
					 //alert("antes do replace"+id);
					 this.palavras= this.palavras.replace(/\\/gi, "");
					 this.palavras= this.palavras.replace(/\//gi, "/");
					// alert(id);
					
 
					 p.setAttribute("id",this.palavras); 
		
					 this.teste = p.addEventListener('click', function()
					 {
						 //let id_cat = document.getElementById("1");
						 //alert(this.id);
						
						
						 document.getElementById("categorias").hidden = true;
						 document.getElementById("caixa_cadastro").hidden = false;
		 
						 let cat = JSON.parse(document.getElementById('categorias').innerText)(this.id);
						 alert(JSON.stringify(cat));
					 });
				
				}).catch(e=>{
					alert(JSON.stringify(e) + 'erro de select palavras');
				});
			}
		}).catch(error => {
			  alert(JSON.stringify(error));
		});
	} 
}
