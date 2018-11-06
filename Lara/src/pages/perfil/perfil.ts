import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//banco
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

//imports da session:
import { Storage } from "@ionic/storage";
//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes';
import { SplashPage } from '../splash/splash';
import { AlteradadosPage } from '../alteradados/alteradados';
import { InseresenhaPage } from '../inseresenha/inseresenha';


// @IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage implements OnInit
{

	nomeUsuario = "";
	usuario: Usuario;
	endereco: string;
	email="";
	//usuarioLogado:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HTTP, 
		public session_login: SessionloginProvider, public session_config: SessionconfiguracoesProvider, public storage: Storage,
		public  menu: MenuController) {
			menu.swipeEnable(true);
		}

		ngOnInit()
		{
			this.session_login.get().then(
				res =>
				{
					this.usuario = res;	
					this.banco();	
				}
			);//session	
		}
		getSession(){
			this.session_login.get().then(
				res =>
				{
					this.usuario = res;		
				}
			);//session		
		}
   //função para converter dados do banco
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
  banco()
  {
		this.endereco = 'https://inclusio.engynios.com/api/read/id/usuario.php';
			this.http.get(this.endereco, {id_usuario: this.usuario.id_usuario}, {})
			.then(
			data => 
			{
			//caso tenha dado tudo certo
			let converter_usu = this.converte(data.data);
			//alert(""+ converter_usu[0]['login_usuario']+""+converter_usu[0]['email']);
			//this.nomeUsuario = converter_usu[0]['login_usuario'];
			let usuario = document.getElementById('usuario');
			usuario.innerText = ''+ converter_usu[0]['login_usuario'].replace(/\"/gi,"");
			let email = document.getElementById('email');
			email.innerText = ''+ converter_usu[0]['email'].replace(/\"/gi,"");

			})
			.catch(
			error => 
			{
			alert(""+JSON.stringify(error));
			console.log(error+"\n"); 
			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);

			}); //catch
	}
	altera_dados()
	{
		this.navCtrl.push(AlteradadosPage);
	}
	altera_senha()
	{
		this.navCtrl.push(InseresenhaPage);
	}
}


