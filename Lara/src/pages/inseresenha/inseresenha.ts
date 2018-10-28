import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import { Storage } from "@ionic/storage";
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-inseresenha',
  templateUrl: 'inseresenha.html',
})

export class InseresenhaPage {
  public alteraSenhaForm: any;
  messageSenha = "";
  errorSenha = false;
  messageSenha_1 = "";
  errorSenha_1 = false;
  usuario: Usuario;
  endereco ="http://inclusio.engynios.com/api/update/altera_senha_1.php";
  
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP, public session_login: SessionloginProvider,  public storage: Storage) 
  {
  this.alteraSenhaForm = formBuilder.group(
    {
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),Validators.required])],
      senha_conf: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),Validators.required])],
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
  criar() 
  {
    let { senha, senha_conf } = this.alteraSenhaForm.controls;
	  if (!senha.valid)
    {
      
      if(senha.value==null || senha.value=="")
      {
        this.errorSenha = true;
        this.messageSenha ="Campo obrigatório";
      }
      else 
      {
        this.errorSenha = true;
        this.messageSenha ="A senha precisa ter de 6 a 20 caracteres";
      }
    }
    else
    {
      this.messageSenha = "";
    }
    
    if(!senha_conf.valid)
    {
      if(senha_conf.value==null || senha_conf.value=="")
      {
        this.errorSenha_1 = true;
        this.messageSenha_1 ="Campo obrigatório";
      }
    }
    else if(senha.valid)
    {
      if(senha.value!=senha_conf.value)
      {
    
        this.errorSenha_1 = true;
        this.messageSenha_1 ="As senhas digitadas devem ser as mesmas!";
      }
      else 
      {
        this.messageSenha_1 = "";
      }
    }

    else 
    {
      this.messageSenha_1 = "";
    }

    if(this.alteraSenhaForm.valid)
    {
        let objeto = {
        id_usuario: this.usuario.id_usuario,
        senha: senha.value
        
        };
        alert (senha.value);
       this.http.post(this.endereco, objeto,
       {
          headers: {'Content-Type': 'application/json'}
      })
        .then(data => {
        alert("Senha Alterada!");
        this.navCtrl.push(LoginPage);
        }).catch(error => {
        alert(JSON.stringify(error));
        });
    }  
  }
  ngOnInit()
  {
		this.getSession();
	}

	getSession(){
		this.session_login.get().then(
			res =>
			{
				this.usuario = res;	
			}
		);//session			
	}

  limpar()
	{
		let { senha, senha_conf} = this.alteraSenhaForm.controls;
		this.senha="";
		this.senha_conf="";
	}
}