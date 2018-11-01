import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import { Storage } from "@ionic/storage";
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-alteradados',
  templateUrl: 'alteradados.html',
})

export class AlteradadosPage {
  public alteraDadosForm: any;
  messageEmail = "";
  errorEmail = false;
  usuario: Usuario;
  email:any;
  endereco ="http://inclusio.engynios.com/api/update/altera_dados.php";
  
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP, public session_login: SessionloginProvider,  public storage: Storage) 
  {
  this.alteraDadosForm = formBuilder.group(
    {
      email:['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])]
    });
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
  altera_dados() 
  {
     let {email} = this.alteraDadosForm.controls;
    if (!this.alteraDadosForm.valid)
    {

      if (!email.valid)
      {
        
        if(email.value==null || email.value=="")
        {
          this.errorEmail = true;
          this.messageEmail ="Campo obrigatório";
        }
        else
        { 
          this.errorEmail = true;
          this.messageEmail ="Email inválido!";
        }
      }
  }
    if(this.alteraDadosForm.valid)
    {
    
       this.messageEmail = "";
       let objeto = {
        id_usuario: this.usuario.id_usuario,
        email: email.value
        
        };
       this.http.post(this.endereco, objeto,
       {
          headers: {'Content-Type': 'application/json'}
      })
        .then(data => {
        alert("Email Alterado!");
        this.navCtrl.setRoot(HomePage);
        }).catch(error => {
        alert(JSON.stringify(error));
        });
    }  
  }

  limpar()
	{
		let {email} = this.alteraDadosForm.controls;
		this.email="";
	}
}