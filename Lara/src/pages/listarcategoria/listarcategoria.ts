import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';


//banco
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { BindingFlags } from '@angular/compiler/src/core';

//imports da session:
import { Storage } from "@ionic/storage";
//usuario
import { SessionloginProvider } from '../../providers/sessionlogin/sessionlogin';
import { Usuario } from '../../app/models/usuario';

@IonicPage()
@Component({
  selector: 'page-listarcategoria',
  templateUrl: 'listarcategoria.html',
})
export class ListarcategoriaPage {

	//BANCO
  caminho:string;
  converter:any;
  endereco_alt ="http://inclusio.engynios.com/api/update/categoria.php";
  endereco_del= "http://inclusio.engynios.com/api/delete/id/categoria.php";

	//SESSION
	usuario: Usuario;

  //FORM
  criarCategoriaForm: any;
	messagenomeCategoria = "";
  messageImagem = "";
  errornomeCategoria = false;
  errorImagem= false;
  palavrasG:any;
  nomeCategoria:any;
  usuarioLogado: Usuario;
  //mostrar coisa
  nome_cat: any = "";
  img_cat: any = "";
 
  id_alterar:any;

  id_cat:any;
  nome: any;
  teste:any;
  id_deletar:any;
  constructor(public navCtrl: NavController,
  					 public navParams: NavParams, 
  					 //private ServiceProvider: ServiceProvider, //paginacao
             public http: HTTP, //banco
             public session_login: SessionloginProvider, //session	
             formBuilder: FormBuilder, //form
  					) 
  					{
             
              this.criarCategoriaForm = formBuilder.group(
                {
                  nomeCategoria: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
              // txtimg: ['',Validators.required],
              
                });
              
  					this.carregacategoria();
  						
  					
  }

  
	ngOnInit(){
		//document.getElementById("caixa_cadastro").hidden = true;
	}

  ionViewDidLoad() {
   //document.getElementById("caixa_cadastro").hidden = true;
  }
//fun��o para converter dados do banco
	
converte(date)
{
  let data = JSON.stringify(date);
  let re = /\\\"/gi;
  data = data.replace(re, "\"");
  re = /\\\\\\\//gi;
  data = data.replace(re, "/");
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

  carregacategoria() 
	{
    	//primeiro as nossas categorias
		//SELECIONAR
     	//precisa-se faze dois selects: um de id null e outro de id session
     	
     
     	
       //id null (nossas categorias)
        this.session_login.get().then(res =>
		 	{
		 		this.usuarioLogado = new Usuario(res);
		 			//Indicando o caminho da api
				this.caminho= 'https://inclusio.engynios.com/api/read/id_usuario/categoria.php';
				//Faz um select (read), por id_usuario, na tabela categoria
				
				let objeto =
		       {
		          id_usuario: this.usuarioLogado.id_usuario 
		       };
				
     	this.http.get(this.caminho,objeto, {})
		.then(
		data => 
			{
        //alert("ta certo mas ta errado");
				this.converter = this.converte(data.data);
      //  alert(this.converter.length);			
			}
			).catch(e => {
					alert(JSON.stringify(e + 'line 97'));
        });
        
        setTimeout(() => 
        {
          let div = document.getElementById('categorias');
          for(let a = 0; a < this.converter.length; a++)
				  {
            //pegando as coisas
            this.nome = this.converter[a]['nome_categoria\\\\'];
            this.id_cat= this.converter[a]['id_categoria\\\\'];
            this.img_cat = this.converter[a]['imagem\\\\'];
          // alert("antes do replace"+nome);

          //substituindo
            this.nome =  this.nome.replace(/\\/gi, "");
            this.nome =  this.nome.replace(/\//gi, "/");
            this.nome = this.nome.replace(/\"/gi, "");

            this.id_cat = this.id_cat.replace(/\\/gi, "");
            this.id_cat = this.id_cat.replace(/\//gi, "/");
            this.img_cat = this.img_cat.replace(/\//gi, "/");

            this.img_cat= this.img_cat.replace(/\\/gi, "");
            

          //criando
          
            let img = document.createElement("img");

            //img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+this.img_cat);
					  //img.setAttribute('alt', 'imagem');
				  	//img.setAttribute('id', this.id_cat);
            //img.appendChild(div);
           
          
            var p = document.createElement("p");
            p.setAttribute("id",this.id_cat); 
            p.innerText = ''+ this.nome.toUpperCase()+'';
            //p.setAttribute("onclick", "this.vai();" /*"this.navCtrl.push(EditarcategoriaPage)"*/ );
            p.addEventListener('click', function()
            {
              let input = document.getElementById('nomeCategoria');
              
              
              //let id_cat = document.getElementById("1");
              //alert(this.id);

              input.innerText = JSON.stringify(this.innerText).replace(/\"/gi, ""); //tirar as aspas!!!
              
              //let pala = document.getElementById('categorias');
              
              document.getElementById("categorias").hidden = true;
              document.getElementById("caixa_cadastro").hidden = false;
              
              var p = document.getElementById("flag");
              //p.hidden =true;
              var img = document.getElementById("img");
              p.innerText=""+this.id.replace(/\"/gi, "");
             // alert(p.innerText);
            });

            div.appendChild(p); //coloca a img no td
          
       
				}	//for

        }, 2000);
		 	}).catch(error => {
        alert('Erro: ' + JSON.stringify(error));
       });
  }
  alterar()
  {
    /*let nomes = [];
		for(let n = 0;n<this.palavrasG.length;n++)
			nomes.push(this.palavrasG[n]['nome_categoria'].toLowerCase());

    let {palavra} = this.criarCategoriaForm.controls;
    if (!this.criarCategoriaForm.valid)
    {
      this.errornomeCategoria = true;
      this.messagenomeCategoria = "Campo obrigatorio";
    }
   else
    {
      if(nomes.indexOf(palavra.value.toLowerCase()) != -1){
				this.errornomeCategoria = true;
				this.messagenomeCategoria = "Já existe uma Categoria com esse nome";
        return;
      }
      let id = document.getElementById("flag");
      this.id_alterar = id.innerText.replace(/\"/gi, "");
      let objeto = {
      id_categoria: this.id_alterar,
      nome_categoria:document.getElementById("nomeCategoria")
      
      };*/
        this.session_login.get().then(res =>
		{

		this.usuarioLogado = new Usuario(res);
		let id = document.getElementById("flag");
      let nome = this.nomeCategoria;
      //alert(nome);
      this.id_alterar = id.innerText.replace(/\"/gi, "");
      let objeto = {
      id_categoria: this.id_alterar,
      nome_categoria:nome,
      id_usuario:this.usuarioLogado.id_usuario ,
      versao:1.0
      };
      this.http.post(this.endereco_alt, objeto,
        { headers: { 'Content-Type': 'application/json' }	  
        })
        .then(data => {
          alert("Palavra alterada!");
         // this.navCtrl.push(HomePage);
          //alert(JSON.stringify(data.data));
        }).catch(error => {
          alert(JSON.stringify(error)+"erro na alteração de categorias. Favor contactar os desenvolvedores");
        });
		
		}).catch(error => {
      alert('Erro: ' + JSON.stringify(error));
    });		
      
    }  
  excluir()
  {
	
    let id = document.getElementById("flag");
    this.id_deletar = id.innerText.replace(/\"/gi, "");
    alert(this.id_deletar);
    let objeto = {
      id_categoria: this.id_deletar
    };
    this.http.post(this.endereco_del, objeto,
      { headers: { 'Content-Type': 'application/json' }	  
      })
      .then(data => {
        alert("Categoria excluída com sucesso!");
        //this.navCtrl.push(HomePage);
        //alert(JSON.stringify(data.data));
      }).catch(error => {
        alert(JSON.stringify(error)+"erro na exclusao de categorias. Favor contatar os desenvolvedores");
      });
  }   
}
