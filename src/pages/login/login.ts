import { Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';

import { HomePage } from '../home/home';
import { TutorialPage } from '../tutorial/tutorial';
import { CadastroPage } from '../cadastro/cadastro';
import { EsquecisenhaPage } from '../esquecisenha/esquecisenha';




// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm: any;
	messageUsuario = "";
	messagePassword = "";
	errorUsuario = false;
	errorPassword = false;
	endereco_select = "http://inclusio.engynios.com/api/read/login/usuario.php";
	erro_senha:string;
	erro_usuario:string;
	nome: string;
	senha: string;
	cadastroPage= CadastroPage;
	usuario: Usuario;
	
   constructor(public navCtrl: NavController,
   				 formBuilder: FormBuilder,
   				 public http: HTTP, 
   				 public session: SessionloginProvider, 
   				 private alertCtrl: AlertController) 
  {
	  this.loginForm = formBuilder.group
	  ({
		  usuario: ['', Validators.required],
		  password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
		  Validators.required])],
	  });
  }
 
  
  login() 
  {
    let { usuario, password } = this.loginForm.controls;
	 
		if (!this.loginForm.valid) 
		{
		  if (!usuario.valid) 
		  {
			this.errorUsuario = true;
			this.messageUsuario = "Ops! Usuário inválido";
		  } 
		  else 
		  {
			this.messageUsuario = "";
		  }
	 
		  if (!password.valid) 
		  {
			this.errorPassword = true;
			this.messagePassword ="Senha inválida"
		  } 
		  else 
		  {
			this.messagePassword = "";
		  }
		}
		else 
		{

			let teste =
			{
				login_usuario: usuario.value

			}
						
			this.http.get(this.endereco_select, teste, {})
			.then(data => 
			{
				
				//alert(password.value);
				//alert(usuario.value);
				this.nome = "\"" + usuario.value + "\"";
				this.senha = "\"" + password.value + "\"";
				//alert(this.nome);
				//alert(this.senha);
				
				let converter = this.converte(data.data);
				//alert(JSON.stringify(converter));
				if(converter[0]==null)
				{
					
					this.erro_usuario="true";
				}	
				else if(converter[0]['login_usuario']==this.nome)
				{
					this.erro_usuario="falso";
					//alert(converter[0]['senha']);
					//alert(converter[0]['login_usuario']);
					if(converter[0]['senha']==this.senha)
					{
						this.erro_senha="falso";
						// alert("Login realizado com sucesso");
						//criando uma sessao:
						let user = new Usuario();			
						//colocando valores nela:
						user.id_usuario = converter[0]['id_usuario']; // atenção!!! esse valor deve vir do bd
						//this.usuario.email= document.getElementById('email_login').value; 						
						//disparando a sessão:
						this.session.create(user);						
						//pode ir para o teclado
						//uma vez que ele cadastrou ele já loga:
					  let pergunta_tutorial = this.alertCtrl.create({
					  title: 'Bem-vindo!',
					  message: 'Deseja ver o tutorial?',
					  buttons: [
					  {
					      text: 'Não',
			  	        handler: () => {this.navCtrl.setRoot(HomePage);}
					  },
					  {
					  		text: 'Sim',
					      handler: () => {this.navCtrl.setRoot(TutorialPage);}
					  }
					    ]
					  });
					  pergunta_tutorial.present();	
						
						
					}
					else 
					{
						this.erro_senha="true";
					}
		
				}
				else 
				{
					
					this.erro_usuario="true";
				}

				if (this.erro_senha=="true" && this.erro_usuario=="falso")
				{
					alert("Senha incorreta");
					this.limpa_senha();
				}
				if (this.erro_usuario=="true")
				{
					alert("Usuário não encontrado");
					this.limpa_usu();
				}
			})
			.catch(error => 
			{
				console.log(error.status);
				alert(error);
			});
			

			
			
		}

  
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
  
	limpa_usu()
	{
		let { usuario } = this.loginForm.controls;
		usuario=null;
	}
	limpa_senha()
	{
		let { password } = this.loginForm.controls;
		password=null;
	}
	limpa_tudo()
	{
		let { usuario, password} = this.loginForm.controls;
		password=null;
		usuario=null;
	}
	ir_cadastro()
	{
		this.navCtrl.push(CadastroPage);
	}
	
	ir_esquecisenha()
	{
		this.navCtrl.push(EsquecisenhaPage);
	}

}
