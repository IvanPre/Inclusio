import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//imports da session:
import { Storage } from "@ionic/storage";
//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';
//confifuracoes
import { SessionconfiguracoesProvider } from '../../providers/sessionconfiguracoes/sessionconfiguracoes';
import { Configuracoes } from '../../app/models/configuracoes'

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage implements OnInit  {

	//SESSIONS:
	//usuario
	usuario: Usuario;
	//configuragoes
	configuracoes: Configuracoes ;
	usuarioLogado:any;
	usuarioConfig:any;
	
	
	palavratela: number;
	imagem: string;

  constructor( public navCtrl: NavController,
				   public navParams: NavParams, 
				   public session_login: SessionloginProvider,  //session
				   public session_config: SessionconfiguracoesProvider, //session
				   public storage: Storage){}
  
  	//assim que o component existir capture a sessco do usuario
	ngOnInit()
  {
  		/* IMPORTANTE!!!
  			todas as paginas onde o usuario esta logado
  			tem que pegar a session
  		*/ 
  		
      this.session_login.get().then(res => {this.usuarioLogado = new Usuario(res);});
      this.session_config.get().then(
      
      res => {this.usuarioConfig = new Configuracoes(res);
      //preenche o radio com oq esta na session
      //palavratela
     	if(this.usuarioConfig.palavra_tela==8)
     	{
     		 document.getElementById('rb1').checked = true;
     	}
     	
     	if(this.usuarioConfig.palavra_tela==6 || this.usuarioConfig.palavra_tela== null)  //se ta vazio ele vai para o default 
     	{
     		 document.getElementById('rb2').checked = true;
     	}
     	
     	if(this.usuarioConfig.palavra_tela==4)
     	{
     		 document.getElementById('rb3').checked = true;
     	}
     	
     	if(this.usuarioConfig.palavra_tela==2)
     	{
     		 document.getElementById('rb4').checked = true;
     	}
     	
     	if(this.usuarioConfig.palavra_tela==1)
     	{
     		 document.getElementById('rb5').checked = true;
     	} 
     	//imagem
      if(this.usuarioConfig.imagem=='s' || this.usuarioConfig.imagem== null ) //se ta vazio ele vai para o defalt 
     	{
     		 document.getElementById('rb6').checked = true;
     	}
     	if(this.usuarioConfig.imagem=='n')
     	{
     		 document.getElementById('rb7').checked = true;
     	}
     	
      
      });
      
    
		  
	}

  ionViewDidLoad() 
  {
    
  }
  
  aplicar()
  {
  		 //criando uma sessao:
      	this.configuracoes = new Configuracoes();
      
      //setando palavras por tela
     	if(document.getElementById('rb1').checked == true) //se rb1 (8 palavras) muda session
     	{
	    //colocando valores nela:
	    this.configuracoes.palavra_tela = 8; 
     	}
     	
     	if(document.getElementById('rb2').checked == true)  //se rb2 (6 palavras) muda session
     	{ 
	    //colocando valores nela:
	    this.configuracoes.palavra_tela = 6; 
     	}
     	
     	if(document.getElementById('rb3').checked == true)  //se rb3 (4 palavras) muda session
     	{
	    //colocando valores nela:
	    this.configuracoes.palavra_tela = 4; 
     	}
     	
     	if(document.getElementById('rb4').checked == true)  //se rb4 (2 palavras) muda session
     	{
	    //colocando valores nela:
	    this.configuracoes.palavra_tela = 2; 
     	}
     	
     	if(document.getElementById('rb5').checked == true)  //se rb5 (1 palavra) muda session
     	{
	    
	    //colocando valores nela:
	    this.configuracoes.palavra_tela = 1; 
     	}
     	
     	//setando imagem/texto imagem
     	if(document.getElementById('rb6').checked == true) //se rb1 (8 palavras) muda session
     	{
	    //colocando valores nela:
	    this.configuracoes.imagem = "s"; 
     	}
     	
     	if(document.getElementById('rb7').checked == true)  //se rb2 (6 palavras) muda session
     	{ 
	    //colocando valores nela:
	    this.configuracoes.imagem = "n"; 
     	}
     	
     	//disparando a sessco:
	    this.session_config.create(this.configuracoes);
	    alert("Configurações aplicadas com sucesso!");
  			
  }
  
  

  }


