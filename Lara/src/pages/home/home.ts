import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { LoginPage } from '../login/login';
import { SobrePage } from '../sobre/sobre';


// import { PalavrasPage } from '../palavras/palavras'; 
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
	loginPage= LoginPage;
   palavras:any;
	timeoutMS:any;
	imagens:any;
    id_cat: string;
	resultados:any;
	resultados2:any;
	pag:any;
	
	
	
	endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria2-null.php";
	endereco_palavras =  "http://inclusio.engynios.com/api/read/id/categoria2-palavra2.php";

    constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public http: HTTP)
    {
			this.carrega_imagem();
			//this.carrega_palavra();
			this.pag = this.pagina;

	}
		

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
			this.imagens=[];
			this.resultados = converter.length;
			// alert(JSON.stringify(converter));
			let table = document.createElement("table"); //cria uma tabela
			table.setAttribute('border', '1');
			table.setAttribute('id','tabela_cat');
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
				}
			}

			document.getElementById('botoes').appendChild(table);
			
			

			

		})
		.catch(error => 
		{
		
			console.log(error.status);
			alert(error.headers);
		});
		

	}

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

	
		 
}
	 

	
	
	
	
