import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Storage } from "@ionic/storage";
import { Usuario } from '../../app/models/usuario';
import { HomePage } from '../home/home';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage implements OnInit
{

	splash_1 = true; // no comeco ele aparece o logo da Lara
	splash_2 = true; // depois a logo do inclusio, cti e sorri 

  constructor(
	public navCtrl: NavController,
	public navParams: NavParams,
	public storage: Storage,
	public session_login: SessionloginProvider,
	public menu: MenuController
	) {
  
		this.menu.swipeEnable(false);
  }

  usuario: Usuario;

  ngOnInit(){
	this.session_login.get().then(res => {
		this.usuario = res;
		// alert(JSON.stringify(res));
		setTimeout(() => {
			if(this.usuario != null && this.usuario != undefined)
				this.navCtrl.setRoot(HomePage);
		}, 2000);
	}).catch(error => {
		alert('Erro ao verificar login prévio: ' + JSON.stringify(error));
	});
  }

	ionViewDidLoad() 
	{
	   setTimeout(() =>this.splash_1=false, 5000); //quando da 5 s ele diz q é falso e some 
	   setTimeout(() =>this.splash_2=false, 7000); //quando da 7 s ele diz q é falso e some 
	}
	
	ir_login()
	{
		this.navCtrl.setRoot(LoginPage);
	}
	
	ir_cadastro()
	{
		this.navCtrl.setRoot(CadastroPage);
	}

}
