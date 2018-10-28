import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InseresenhaPage } from '../inseresenha/inseresenha';

/**
 * Generated class for the InserecodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inserecod',
  templateUrl: 'inserecod.html',
})
export class InserecodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InserecodPage');
  }
  
  ir_inseresenha()
  {
  		this.navCtrl.push(InseresenhaPage);
  }


}
