import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
@IonicPage()
@Component({
  selector: 'page-esquecisenha',
  templateUrl: 'esquecisenha.html',
})
export class EsquecisenhaPage{
  public esqueciForm: any;
  messageEmail = "";
  errorEmail = false;
  endereco ="http://inclusio.engynios.com/api/read/verifica-email.php";
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP) 
  {
    this.esqueciForm = formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])]
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
  ir_inserecod()
  {
    let {email} = this.esqueciForm.controls;
    
    if (!this.esqueciForm.valid)
    {
          if (!email.valid)
          {
            if(email.value==null || email.value=="")
            {
              this.errorEmail = true;
              this.messageEmail = "Campo obrigatorio";
            }
            else 
            {
              this.errorEmail = true;
              this.messageEmail = "E-mail invalido";
            }
          }
    }
    if(this.esqueciForm.valid)
    {
        let objeto = {
        email: email.value
        };
       this.http.post(this.endereco, objeto,
       {
          headers: {'Content-Type': 'application/json'}
      })
        .then(data => {
        alert("Email enviado!");
        this.navCtrl.push(LoginPage);
        }).catch(error => {
        alert(JSON.stringify(error));
        });
    }  
  }
}