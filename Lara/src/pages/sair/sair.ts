import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';

//imports da session
import { Storage } from "@ionic/storage";
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
//paginas
import { SplashPage } from '../splash/splash';

import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-sair',
  templateUrl: 'sair.html',
})
export class SairPage {

	//session
	usuario: Usuario;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public session_login: SessionloginProvider, public storage: Storage, private alertCtrl: AlertController) {
  }
  
  	//assim que o component existir capture a sessão do usuário
	ngOnInit()
  {
  		/* IMPORTANTE!!!
  			todas as páginas onde o usuario esta logado
  			tem que pegar a session
  		*/ 
  		
      this.session_login.get().then(res => {this.usuario = new Usuario(res);})
     
		  let confirma_sair = this.alertCtrl.create({
		  title: 'Sair',
		  message: 'Deseja sair do app?',
		  buttons: [
		  {
		      text: 'Não',
	         role: 'cancel',
		        handler: () => { this.navCtrl.setRoot(HomePage);  }
		  },
		  {
		  		text: 'Sim',
		      handler: () => {
		      
		     	this.session_login.remove(); //remove os valores
		      this.navCtrl.setRoot(SplashPage); //volta para o comeco
		      
		      }
		  }
		    ]
		  });
		  confirma_sair.present();
      
	}

  ionViewDidLoad() {
	
  }

}
