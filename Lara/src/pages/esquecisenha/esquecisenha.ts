import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {HTTP} from '@ionic-native/http';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
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
  endereco_email = "http://inclusio.engynios.com/api/read/testa_email.php";
  
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams,  private alertCtrl: AlertController, public http: HTTP) 
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
      let testar = {email: email.value}
      this.http.get(this.endereco_email, testar, {})
      .then(data => 
      {
      if(data.data.length > 2)
      {  
          let objeto = {email: email.value};
          this.http.post(this.endereco, objeto,
          {
            headers: {'Content-Type': 'application/json'}
          })
          .then(data => {
            let alerta = this.alertCtrl.create(
              {
                title: 'E-mail',
                message: 'E-mail enviado!',
                buttons: [{text: 'Ok'}]
              }
            );
            alerta.present();
            this.navCtrl.setRoot(LoginPage);
          }).catch(error => {
          alert(JSON.stringify(error));
          });
      }  
      else
      {
        let alerta = this.alertCtrl.create(
          {
            title: 'E-mail',
            message: 'Esse e-mail não é cadastrado!',
            buttons: [{text: 'Ok', handler: () => {this.limpar(); }}]
          }
        );
        alerta.present();
      }    
    }).catch(error => {
      console.log(error.status);
    });
  }
}
limpar()
{
  this.email= null;
}
}