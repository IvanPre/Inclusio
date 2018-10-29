import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';




/**
 * Generated class for the AjudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html',
})
export class AjudaPage {
  
  @ViewChild(Slides) slides: Slides;

  goToSlide(n) {
    if(n==0)
    this.slides.slideTo(0, 500);
    else if(n==1)
    this.slides.slideTo(1, 500);
    else if(n==2)
    this.slides.slideTo(2, 500);
  }
  
  mostra_botoes: boolean = true;  //começa mostrando o botão para ir para o proximo 
  mostra_slides: boolean = false; //enquanto isso, os slides não aparecem
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjudaPage');
    
  }
  

    
  
   
  
  ajuda_slides(n)
  {

      //depois esconde-se a div dos botoes 
			this.mostra_botoes = !this.mostra_botoes;
      //ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
      
      //e chama a div onde estão os slides
      this.mostra_slides = !this.mostra_slides;

       this.goToSlide(n);

     /* 
      if()
      {

      }
      */
      
  }
  
  volta_links()
  {

      //depois esconde-se a div dos botoes 
			this.mostra_botoes = !this.mostra_botoes;
      //ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
      
      //e chama a div onde estão os slides
      this.mostra_slides = !this.mostra_slides;

      
      
  } 
  
  

}
