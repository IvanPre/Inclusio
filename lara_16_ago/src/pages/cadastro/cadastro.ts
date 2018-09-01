﻿import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage
{
    
    palavras:any;
	timeoutMS:any;
    public cadastroForm: any;
	messageNome = ""
    messageEmail = ""
    messagePassword = "";
    messagePassword_1 = "";
    errorNome = false;
    errorEmail = false;
    errorPassword = false;
    errorPassword_1 = false;
	
	endereco ="http://inclusio.engynios.com/api/insert/usuario.php";
	endereco_select = "http://inclusio.engynios.com/api/read/login/usuario.php";

    constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP)
    {
		
      this.cadastroForm = formBuilder.group(
      {
		  
        nome: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]+$')])],
        email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])],
	    password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),Validators.required])],
        password_1: ['', Validators.required]
		
      });
	  
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
	
    cadastro()
    {
        let {nome, email, password, password_1 } = this.cadastroForm.controls;

        if (!this.cadastroForm.valid)
        {
		
			if(!nome.valid)
			{
				if(nome.value == null || nome.value=="")
				{
					this.errorNome = true;
					this.messageNome = "Campo obrigatório";
					
				}
				else 
				{
					
					this.errorNome = true;
					this.messageNome = "Por favor utilize apenas letras";
					
				}
			}
			else
			{
				this.messageNome = "";
			}
			
			
			if (!email.valid)
			{
				if(email.value==null || email.value=="")
				{
					this.errorEmail = true;
					this.messageEmail = "Campo obrigatório";
				}
				else 
				{
					this.errorEmail = true;
					this.messageEmail = "E-mail inválido";
				}
				
			}
			else if(email.valid)
			{
				this.messageEmail = "";
			}

			if (!password.valid)
			{
				
				if(password.value==null || password.value=="")
				{
					this.errorPassword = true;
					this.messagePassword ="Campo obrigatório";
				}
				else 
				{
					this.errorPassword = true;
					this.messagePassword ="A senha precisa ter de 6 a 20 caracteres";
				}
			}
			else
			{
				this.messagePassword = "";
			}
			
			if(!password_1.valid)
			{
				
					this.errorPassword_1 = true;
					this.messagePassword_1 = "Campo obrigatório";

			}
			else if(password.valid)
			{
				if(password.value!=password_1.value)
				{
			
					this.errorPassword_1 = true;
					this.messagePassword_1 ="As senhas digitadas devem ser as mesmas!";
				}
				else 
				{
					this.messagePassword_1 = "";
				}
			}

			else 
			{
				this.messagePassword_1 = "";
			}
			  
			
			
		}
		else if(password.valid)
		{
			if(password.value!=password_1.value)
			{
		
				this.errorPassword_1 = true;
				this.messagePassword_1 ="As senhas digitadas devem ser as mesmas!";
			}
			else if(password.value==password_1.value)
			{
				this.messagePassword_1 = "";
				if(this.cadastroForm.valid)
				{
					
					
					let teste =
					{
						login_usuario: nome.value
						
					}
					
					this.http.get(this.endereco_select, teste, {})
					.then(data => 
					{
						alert(data.data.length);
						if(data.data.length > 2)
						{
							alert("Esse usuário já é cadastrado!");
							this.limpar();
						}
						else 
						{
						
							let objeto = {
								login_usuario: nome.value,
								senha: password.value,
								email: email.value
								
							};
			
					
							this.http.post(this.endereco, objeto,
							{
							  
							  headers: { 'Content-Type': 'application/json' }
							  
							})
							
							.then(data => {
							  alert("Cadastro realizado com sucesso!");
							  //pode ir para o teclado
								this.navCtrl.setRoot(LoginPage);
							  
							}).catch(error => {
							
							  alert(JSON.stringify(error));
							});
						}
					})
					.catch(error => {
						
					  console.log(error.status);
					  
					});

					
					
					
				}
				
			}
		}
		
	
	}
	
	limpar()
	{
		let {nome } = this.cadastroForm.controls;
		this.nome=null;
	}
	
	ir_login()
	{
		this.navCtrl.setRoot(LoginPage);
	}
	

}