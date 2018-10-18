
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, Button } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoginPage } from '../login/login';
import { SobrePage } from '../sobre/sobre';


 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
<<<<<<< HEAD
	loginPage= LoginPage;
   palavras:any;
=======
    palavras:any = {};
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
	timeoutMS:any;
	imagens:any;
	public mostra_img: boolean = true;
	resultados:any;
<<<<<<< HEAD
	resultados2:any;
	pag:any;
	
=======
	imagem:string = "https://img.olx.com.br/images/86/864708037631038.jpg";
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
	
	
	endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria2-null.php";

    constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP)
    {
<<<<<<< HEAD
			this.carrega_imagem();
			//this.carrega_palavra();
			this.pag = this.pagina;

	}
=======
		this.carrega_imagem();
     
	  
		}
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
		

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
	
  carrega_imagem()
  {
        let teste =
		{
			id_usuario: 1

		}
	
					
		this.http.get(this.endereco_select, teste, {})
		.then(data => 
		{	
			
			
			let converter = this.converte(data.data);

			for(let a = 0; a < converter.length; a++){
				this.http.get('https://inclusio.engynios.com/api/read/id/categoria2-palavra2.php', {id_categoria: converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, '"')}, {}).then(dados => {
					this.palavras[converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, "")] = this.converte(dados.data);
				}).catch(e => {
					alert(JSON.stringify(e + 'line 97'));
				});
			}
			setTimeout(() => {
			this.imagens=[];
			this.resultados = converter.length;
			// alert(JSON.stringify(converter));
			let table = document.createElement("table"); //cria uma tabela
			table.setAttribute('id', 'tabela');
			table.setAttribute('border', '1');
			for(let l=0;l<this.resultados/2;l++)
			{
				let tr = document.createElement("tr"); //cria um tr
				table.appendChild(tr); //coloca o tr na tabela
				for(let p=0;p<2 && l*2+p < converter.length;p++)
				{
					
					//let img = document.createElement("img");
					if(converter[l*2+p]['imagem\\\\'] == undefined)
						alert(JSON.stringify(converter[l*2+p]));
					let s = converter[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
					s= s.replace(/\\/gi, "");
					s = s.replace(/\//gi, "/");
<<<<<<< HEAD
					var td = "<button id = "+ converter[l*2+p]['id_categoria\\\\'] +" (click)='this.pagina()'> <img   src= 'https://inclusio.engynios.com/imagens/"+s+"'>  </button>";
					//alert(s);
					//img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
					//img.setAttribute('alt', 'imagemmm');
					// td.onclick= this.pagina;
					//td.setAttribute('id',''+converter[l*2+p]['id_categoria\\\\']);
					
					//td.appendChild(img); //coloca a img no td
					
					// td.setAttribute('onclick', '{{pag}}');
					// alert(td.onclick)
					let tdReal = document.createElement('td');
					tdReal.innerHTML = td;
					tr.appendChild(tdReal);
=======
					img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
					img.setAttribute('alt', 'imagemmm');
					img.setAttribute('id', 'imagem'+l*2+p);
					td.setAttribute('id', converter[l*2+p]['id_categoria\\\\']);
					td.appendChild(img); //coloca a img no td
					td.setAttribute('slot', JSON.stringify(this.palavras[converter[l*2+p]['id_categoria\\\\'].replace(/\\\\\"/gi, "")]));
					alert(JSON.stringify(this.palavras[converter[l*2+p]['id_categoria\\\\'].replace(/\\\\\"/gi, "")]));
					td.addEventListener('click', function(){
						alert(this.slot);
						document.getElementById('tabela').remove();
					});
					tr.appendChild(td);
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
				}
			}

			document.getElementById('botoes').appendChild(table);
<<<<<<< HEAD
			
			

			

=======
		}, 2000);
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
		})
		.catch(error => 
		{
			console.log(error.status);
			alert(error);
		});
		

	}
<<<<<<< HEAD

	pagina()
	{
		alert('entrou');
		try{
			this.navCtrl.push(SobrePage);
		}
		catch(e){
			alert(JSON.stringify(e));
		}
	}

	carrega_palavra()
	{
		let teste =
		{
			id_categoria: 1

		}
					
		this.http.get(this.endereco_palavras, teste, {})
		.then(data => 
		{	
			
			
			let converter = this.converte(data.data);
			this.imagens=[];
			this.resultados = converter.length;
			// alert(JSON.stringify(converter));
			let table = document.createElement("table"); //cria uma tabela
			table.setAttribute('border', '1');
			for(let l=0;l<this.resultados/2;l++)
			{

				let tr = document.createElement("tr"); //cria um tr
				table.appendChild(tr); //coloca o tr na tabela
				for(let p=0;p<2 && l*2+p < converter.length;p++)
				{
					var td = document.createElement("td");
					let img = document.createElement("img");
					if(converter[l*2+p]['imagem\\\\'] == undefined)
						alert(JSON.stringify(converter[l*2+p]));
					let s = converter[l*2+p]['imagem\\\\'].replace(/\"/gi, "");
					s= s.replace(/\\/gi, "");
					s = s.replace(/\//gi, "/");
					img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
					img.setAttribute('alt', 'imagemmm');
					td.setAttribute('id',''+converter[l*2+p]['id_palavra\\\\']);
					td.appendChild(img); //coloca a img no td
					td.onclick= this.sintetizador;
					tr.appendChild(td);
				}
			}

			document.getElementById('botoes').appendChild(table);

		})
		.catch(error => 
		{
			console.log(error.status);
			alert(error);
		});
		
	}


	/*pushPage() 
	{
		

		  alert(this.id);
          this.id_cat= this.id;
		  let w = document.getElementById('tabela_cat');
		  w.remove();
		 
		 


		 
       
	}*/

	sintetizador()
	{
		alert("Aqui entra");

	}

=======
>>>>>>> 02dc947dde7b32c6e4ae37564c93b56feae3f7be
	
	
}
	 

	
	
	
	

