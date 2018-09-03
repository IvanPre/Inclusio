import { Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
@Component({
  selector: 'page-criarpal',
  templateUrl: 'criarpal.html'
})

export class CriarpalPage {
    [x: string]: any;
	public base64Image: string;
	criarPalavraForm: any;
	messagenomePalavra = "";
    messageImagem = "";
	messagePalavras="";
    errornomePalavra = false;
    errorImagem= false;
	errorPalavras=false;
	// variável que será o src da imagem mostrada (mickey putaço)
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
	
	endereco ="http://inclusio.engynios.com/api/insert/palavra.php";
    constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP, private camera: Camera)
    {
      this.criarPalavraForm = formBuilder.group(
      {
        nomePalavra: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
		//txtimg: ['',Validators.required],
		//palavras:['',Validators.required]
      });
	}

	ngOnInit(){
		this.carregaCategorias();
	}

	currentImage = null;
  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
	  destinationType: this.camera.DestinationType.DATA_URL,
	  quality : 100,
	  targetWidth: 1000,
	  targetHeight: 1000,
	  correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
		this.base64Image = "data:image/jpeg;base64," + imageData;    }, (err) => {
			console.log(err);
      // Handle error
      console.log('Image error: ', err);
    });
  }
  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InserecodPage');
  }

	converte(date){
    let data = JSON.stringify(date);
    let re = /\\\\\\\"/gi;
    data = data.replace(re, "\"");
    let retorno = [];
    
    while(data.indexOf('{') != -1){
      let str = data.substring(data.indexOf('{')+1, data.indexOf('}')+1);
      data = data.substring(data.indexOf('}')+1);
      let objeto = {};
      while(str.lastIndexOf('}') != -1){
        let campo = str.substring(str.indexOf('"')+1, str.indexOf(':')-1);
        str = str.substring(str.indexOf(':')+1);
        // document.getElementById('resposta2').innerText += str;
        let valor;
        if(str.indexOf(',') == -1){
          valor = str.substring(str.indexOf(':')+1, str.indexOf('}')-1);
          str = ' ';
        }else{
          valor = str.substring(0, str.indexOf(',')-1);
          str = str.substring(str.indexOf(',')+1);
        }
        if(valor == 'nul')
          valor = null;
        else
          valor = valor + '"';
		objeto[campo] = valor;
		// alert(valor);
        // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
      }
      retorno.push(objeto);
    }
    return retorno;
  }
	criar()
    {
		let {nomePalavra/*txtimg,palavras*/} = this.criarPalavraForm.controls;
		
        if (!this.criarPalavraForm.valid)
        {
			if (!nomePalavra.valid )
			{
				if(	nomePalavra.value== null || nomePalavra.value=="")
				{
					this.errornomePalavra = true;
					this.messagenomePalavra = "Campo obrigatorio";
				}
				else
				{
					this.errornomePalavra= true;
					this.messagenomePalavra = "Deve conter apenas letras";
				}
			}
			  
			else
			{
				this.messagenomePalavra = "";
			}
			  
			/*if (!txtimg.valid)
			{
				this.errorImagem = true;
				this.messageImagem = "Campo obrigatorio";
			}
			else
			{
				this.messageImagem= "";
			}
			if (document.getElementById('palavras') == null)
			{
				this.errorPalavras= true;
				this.messagePalavras = "campo obrigatorio";
			}
			else
			{
				this.messagePalavras= "";
			}*/
		}
		else
		{
			let ckbs = document.getElementsByClassName('checkbox');
			let id_categoria = [];
			for(let a = 0; a < ckbs.length; a++){
				let ckb = <HTMLInputElement> ckbs[a];
				if(ckb.checked)
					id_categoria.push(parseInt(ckb.id.substring(3)));
			}

			let objeto = {
				nome_palavra:nomePalavra.value,
				id_usuario:null,
				versao:null,
				id_categoria: id_categoria
			};
	
			this.http.post(this.endereco, objeto,
			{ headers: { 'Content-Type': 'application/json' }	  
			})
			.then(data => {
			 alert("Palavra criada!");
			  //alert(JSON.stringify(data.data));
			}).catch(error => {
			  alert(JSON.stringify(error));
			});
		}
	}

// abre/fecha a categoria exemplo do form
	mostraPalavras(){
		let id = this.id;
		let objeto = {
			id_categoria: id
		};
		this.src = 'assets/imgs/arrow-down';
		this.className = 'seta-baixo';
		let path = 'http://inclusio.engynios.com/api/read/id/categoria-palavra.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			alert(JSON.stringify(dados));
		}).catch(error =>{
			alert(JSON.stringify(error));
		});
	}

	// muda a seta da categoria
	// seta(e){
	// 	alert(e);
	// 	if(document.getElementById('palavras') == null)
	// 		return;
		
	// 	// verifica se existem elementos na tabela de palavras da categoria
	// 	if(document.getElementById("palavras").childElementCount == 0)
	// 		// se não existirem elementos, coloca a seta para a direita
	// 		return "arrow-dropright";
	// 	else
	// 		// se existirem elementos, seta para baixo
	// 		return "arrow-dropdown";
	// }

	// muda a imagem com base no input do usuário
	mudaImg(){
		// define a variável "imagem" como o texto colocado no input
		this.imagem = document.getElementById("txtimg").nodeValue;
	}

	// limpa todos os campos
	limpar(){
		// limpa o campo de nome da categoria
		let nomeCategoria = <HTMLInputElement> document.getElementById('nomeCategoria');
		nomeCategoria.value = null;
		
		
		// limpa o campo do link da imagem
		let txtimg = <HTMLInputElement> document.getElementById('txtimg');
		txtimg.value = null;

		let ckbs = document.getElementsByClassName('checkbox');
		for(let a = 0; a < ckbs.length; a++){
			let ckb = <HTMLInputElement> ckbs[a];
			ckb.checked = false;
		}
		
		// reseta a imagem para o mickey putaço
		this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
		// cria variável para categoria1
		let categoria1 = <HTMLInputElement> document.getElementById('categoria1');
		
		// tira o checado do elemento
		categoria1.checked = false;

		// cria variável para as palavras de dentro da categoria
		let palavras = document.getElementById('palavras');

		// se existirem elementos dentro da table palavras, fica no while
		while(palavras.childElementCount > 0){
			// remove o último elemento de palavras
			palavras.removeChild(palavras.lastChild);
		}
	}

	/*ngOnInit()
	{
		this.carregaCategorias();
	}*/

	carregaCategorias(){
		let objeto = {
			id_usuario: null
		};
		let path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria.php';
		this.http.get(path, objeto, {}).then(data =>{
			let dados = this.converte(data.data);
			// alert(JSON.stringify(data.data));
			// alert(JSON.stringify(dados));
			let div = document.getElementById('div_categorias');
			// alert(dados[0].id_categoria);	

			for(let a = 0; a < dados.length; a++){
				let ion = document.createElement('ion-item');
				let ckb = document.createElement('input');
				ckb.type = "checkbox";
				ckb.id = "ckb"+dados[a]['id_categoria'];
				ckb.className = 'checkbox';
				let cat = document.createElement('p');
				cat.innerText = dados[a]['nome_categoria'];
				cat.appendChild(document.createElement('br'));
				ion.appendChild(ckb);
				ion.appendChild(cat);
				div.appendChild(ion);
			}
			
			}
		).catch(error => {
			  alert(JSON.stringify(error));
		});
			
			
		
		/*objeto.id_usuario = 3;
		this.http.get(path, objeto, {}).then(data =>{
			data = data.data;
			let div = document.getElementById('div_categorias');
			
			div.name
			
			for(let a = 0; a < data.length; a++){
				let ion = document.createElement('ion-item');
				let icon = document.createElement('ion-icon');
				icon.name = "seta()";
				icon.click = mostraPalavras;
				icon.id = "seta"+a;
				let ckb = document.createElement('input');
				ckb.type = "checkbox";
				ckb.id = "ckb"+a;
				ckb.name = dados.id_categoria;
				let cat = document.createElement(p);
				cat.innerText = dados.nome_categoria;
				cat.appendChild(document.createElement('br'));
				ion.appendChild(icon);
				ion.appendChild(ckb);
				ion.appendChild(cat);
				div.appendChild(ion);
			}
			}
		).catch(error => {
			  alert(JSON.stringify(error));
		});*/
	}

	// "envia" os dados do form (por enquanto ta indo no console, F12 para ver)
	enviar(){
		// cria um objeto dados para guardar tudo
		let dados = {};

		// pega o campo com o nome da nova categoria
		let novaCategoria = <HTMLInputElement> document.getElementById('nomeCategoria');

		// cria um campo nome_categoria no objeto a ser enviado
		dados["nome_categoria"] = novaCategoria.value;

		// pega o campo com o link da imagem
		let imgLink = <HTMLInputElement> document.getElementById('txtimg');

		// cria um campo imagem no objeto a ser enviado
		dados["imagem"] = imgLink.value;

		// pega o checkbox da categoria para verificar se o usuário selecionou ela inteira
		let categoria = <HTMLInputElement> document.getElementById('categoria1');
		
		// se tiver selecionado a categoria inteira
		if(categoria.checked == true){

			// cria um campo categoria para armazenar o valor da categoria
			dados["categoria"] = categoria.value;
		}
		else
		{
			// cria um array vazio no campo palavras para adicionar valores depois
			dados["palavras"] = [];

			// cria uma variável para palavras
			let palavras = document.getElementById('palavras');

			// fará o for para todos os elementos da table
			for(let a = 0; a < palavras.childElementCount; a++){
				
				// pega o elemento atual (checkbox dentro do primeiro td que está dentro da tr da table das palavras)
				let elemento = <HTMLInputElement> palavras.children[a].children[0].children[0];

				// se for um checkbox e estiver checado...
				if(elemento.checked == true){
					
					// adiciona o valor ao array de palavras
					dados["palavras"].push(elemento.value);
				}
			}
		}

		// mostra no console (F12) os dados
		console.log(dados);
	}
}