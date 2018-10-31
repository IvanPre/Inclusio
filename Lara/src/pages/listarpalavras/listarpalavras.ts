import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { EditarcategoriaPage } from '../editarcategoria/editarcategoria';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Storage } from "@ionic/storage";
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';

//banco
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-listarcategoria',
  templateUrl: 'listarcategoria.html',
})
export class ListarcategoriaPage {

	//BANCO
  caminho:string;
  usuario: Usuario;
  categoriasG:any;
  mostra= false;
  endereco:string ="http://inclusio.engynios.com/api/update/categoria.php";
    constructor(public navCtrl: NavController,
  					public navParams: NavParams, 
  					//private ServiceProvider: ServiceProvider, //paginacao
            public http: HTTP, //banco
            public formBuilder: FormBuilder,
            public session_login: SessionloginProvider,  
            public storage: Storage) 
  					{
            }
  ngOnInit() {
		this.getSession();
		setTimeout(() => {
			this.carregapalavra();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarcategoriaPage');
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
      //retorno.push(objeto);
    }
    return retorno;
  }
  carregapalavra() 
	{
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
				}).catch(e=>{
					alert(JSON.stringify(e) + 'erro de select palavras');
				});
			}
		}).catch(error => {
			  alert(JSON.stringify(error));
		});
	} 
  alterar()
  {			
    ///pegar o id dos checkbox da palavra
    let palavras = [];
    let f = false;
    let rdbs = document.getElementsByClassName('radiobutton');
    for(let a = 0; a < rdbs.length; a++){
      let rdb = <HTMLInputElement> rdbs[a];
      if(rdb.checked)
      {
        palavras.push(rdb.id.substring(3));
        f = true;
        break;
      }
    }
  if(!f){
    alert("Selecione um radiobutton!");
    return;
    }
  }
}
