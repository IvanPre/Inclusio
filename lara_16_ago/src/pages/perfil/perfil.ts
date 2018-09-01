import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Storage } from "@ionic/storage";
import { Usuario } from '../../app/models/usuario';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

   nomeUsuario = "";
  endereco: string;
  usuarioLogado:any;
  email = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HTTP, 
    public session_login: SessionloginProvider,public storage: Storage) 
    {
      this.banco()
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
  ngOnInit( )
    {
      //1 passo: checar se esta logado:
      this.session_login.get().then(res =>
      {
          
        this.usuarioLogado = new Usuario(res);
        if(this.usuarioLogado.id_usuario == null)//se nao esta logado
        {
          //vai para o comeco
          	this.navCtrl.setRoot(SplashPage);
        }
    });
  }
  banco()
  {
    this.endereco = 'https://inclusio.engynios.com/api/read/login/usuario.php'
    this.session_login.get().then(
      res =>
      {
        this.usuarioLogado = new Usuario(res);
			this.http.get(this.endereco, {id_usuario: this.usuarioLogado.id_usuario}, {})
			.then(
			data => 
			{
			//caso tenha dado tudo certo
			let converter_usu = this.converte(data.data);
			alert(""+ converter_usu[0]['login_usuario']+""+converter_usu[0]['email']);
			//this.nomeUsuario = converter_usu[0]['login_usuario'];
			let usuario = document.getElementById('usuario');
			usuario.innerHTML = ''+ converter_usu[0]['login_usuario'];
			let email = document.getElementById('email');
			email.innerHTML = ''+ converter_usu[0]['email'];

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
			});
      
      /*
      //id session (categorias personalizadas)
					this.session_login.get().then(
					res =>
			      {
			      
				      this.usuarioLogado = new Usuario(res);
				      
					   this.http.get(this.caminho, {id_usuario: this.usuarioLogado.id_usuario}, {})
						.then(
						data => 
						{
							//caso tenha dado tudo certo
							let converter_usu = this.converte(data.data);
							this.cat_usu = converter_usu.length;		
							alert ("linha usu" + this.cat_usu);
							
							this.tamanho = this.cat_usu + this.cat_null;
			      		
			      		alert ("tamanho: " + this.tamanho);
			      		
			      		this.paginacao(this.tamanho);
			      		
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
				    
			      }); //session   */
      
      
      
  }

}
