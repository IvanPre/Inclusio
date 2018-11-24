webpackJsonp([15],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InseresenhaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InseresenhaPage = /** @class */ (function () {
    function InseresenhaPage(navCtrl, alertCtrl, formBuilder, navParams, http, session_login, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.storage = storage;
        this.messageSenha = "";
        this.errorSenha = false;
        this.messageSenha_1 = "";
        this.errorSenha_1 = false;
        this.endereco = "http://inclusio.engynios.com/api/update/altera_senha_1.php";
        this.alteraSenhaForm = formBuilder.group({
            senha: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            senha_conf: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
    }
    InseresenhaPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    InseresenhaPage.prototype.criar = function () {
        var _this = this;
        var _a = this.alteraSenhaForm.controls, senha = _a.senha, senha_conf = _a.senha_conf;
        if (!senha.valid) {
            if (senha.value == null || senha.value == "") {
                this.errorSenha = true;
                this.messageSenha = "Campo obrigatório";
            }
            else {
                this.errorSenha = true;
                this.messageSenha = "A senha precisa ter de 6 a 20 caracteres";
            }
        }
        else {
            this.messageSenha = "";
        }
        if (!senha_conf.valid) {
            if (senha_conf.value == null || senha_conf.value == "") {
                this.errorSenha_1 = true;
                this.messageSenha_1 = "Campo obrigatório";
            }
        }
        else if (senha.valid) {
            if (senha.value != senha_conf.value) {
                this.errorSenha_1 = true;
                this.messageSenha_1 = "As senhas digitadas devem ser as mesmas!";
            }
            else {
                this.messageSenha_1 = "";
            }
        }
        else {
            this.messageSenha_1 = "";
        }
        if (this.alteraSenhaForm.valid) {
            var objeto = {
                id_usuario: this.usuario.id_usuario,
                senha: senha.value
            };
            this.http.post(this.endereco, objeto, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                var alerta = _this.alertCtrl.create({
                    title: 'Senha Alterada!',
                    buttons: [{ text: 'Ok', handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]); } }]
                });
                alerta.present();
            }).catch(function (error) {
                alert(JSON.stringify(error));
            });
        }
    };
    InseresenhaPage.prototype.ngOnInit = function () {
        this.getSession();
    };
    InseresenhaPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        }); //session			
    };
    InseresenhaPage.prototype.limpar = function () {
        var _a = this.alteraSenhaForm.controls, senha = _a.senha, senha_conf = _a.senha_conf;
        this.senha = "";
        this.senha_conf = "";
    };
    InseresenhaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-inseresenha',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\inseresenha\inseresenha.html"*/'<ion-header>\n\n	<ion-navbar>\n\n	  \n\n		 <div  id="topo">\n\n			 <div id="btn_menu">\n\n			  <ion-buttons left> \n\n				  <button ion-button icon-only menuToggle> \n\n					  <p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				  </button>\n\n  \n\n			  </ion-buttons>\n\n				  </div>\n\n			  <div id="titulo">\n\n			  <ion-title>\n\n			   <span text-color="fonte-laranja"> Insere Senha </span>\n\n			  </ion-title>\n\n			  </div>\n\n		  </div>\n\n	  \n\n	</ion-navbar>\n\n  </ion-header>\n\n  \n\n\n\n\n\n<ion-content class="body" padding>\n\n   \n\n		 <div id="caixa_cadastro">\n\n				&nbsp; &nbsp;  <!--p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Criar Categoria</h1>-->\n\n				<form  [formGroup]="alteraSenhaForm" novalidate>\n\n						<ion-row>\n\n							<ion-col>\n\n								<ion-list inset>\n\n					<div id="input_form">\n\n							<div id="texto"> Senha:</div>\n\n							<ion-item>\n\n							<ion-input [(ngModel)]="senha" formControlName="senha" type="password" placeholder="Nova Senha" id="senha" clearInput clearOnEdit="false"></ion-input>\n\n							</ion-item>\n\n						<h6 *ngIf="errorSenha" class="error"> {{messageSenha}}</h6>\n\n						<br>\n\n						<div id="texto"> Confirma Senha:</div>\n\n						<ion-item>\n\n							<ion-input [(ngModel)]="senha_conf" formControlName="senha_conf" type="password" placeholder="Confirma Senha" id="senha_conf" clearInput clearOnEdit="false"></ion-input>\n\n						</ion-item>\n\n						<h6 *ngIf="errorSenha_1" class="error"> {{messageSenha_1}}</h6>\n\n						<br>\n\n					</div>\n\n				</ion-list>  \n\n					</ion-col>\n\n				</ion-row>	\n\n				<ion-row>\n\n						<div id="botoes">\n\n							<button ion-button round class="botaoCad" (click)="criar()">Alterar</button>\n\n							<button ion-button round class="botaoCad" (click)="limpar()">Limpar</button>\n\n						</div>\n\n					</ion-row>\n\n			</form>\n\n			</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\inseresenha\inseresenha.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], InseresenhaPage);
    return InseresenhaPage;
}());

//# sourceMappingURL=inseresenha.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AjudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AjudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AjudaPage = /** @class */ (function () {
    function AjudaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mostra_botoes = true; //começa mostrando o botão para ir para o proximo 
        this.mostra_slides = false; //enquanto isso, os slides não aparecem
    }
    AjudaPage.prototype.goToSlide = function (n) {
        if (n == 0)
            this.slides.slideTo(0, 500);
        else if (n == 1)
            this.slides.slideTo(1, 500);
        else if (n == 2)
            this.slides.slideTo(2, 500);
    };
    AjudaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AjudaPage');
    };
    AjudaPage.prototype.ajuda_slides = function (n) {
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
    };
    AjudaPage.prototype.volta_links = function () {
        //depois esconde-se a div dos botoes 
        this.mostra_botoes = !this.mostra_botoes;
        //ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
        //e chama a div onde estão os slides
        this.mostra_slides = !this.mostra_slides;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], AjudaPage.prototype, "slides", void 0);
    AjudaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ajuda',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\ajuda\ajuda.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Ajuda </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n	\n\n\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n		\n\n      <div id="formulario" *ngIf="mostra_botoes">\n\n		\n\n        <button ion-button round class="botao" *ngIf="mostra_botoes"  (click)="ajuda_slides(0)" >Como usar o teclado</button>\n\n        <br>\n\n        <br>\n\n        \n\n        <button ion-button round class="botao" *ngIf="mostra_botoes"   (click)="ajuda_slides(1)">Como criar palavras </button>\n\n        <br>\n\n        <br>\n\n        <button ion-button round class="botao" *ngIf="mostra_botoes"  [navPush]="AjudaslidesPage" (click)="ajuda_slides(2)">Como criar categorias </button>\n\n      \n\n      \n\n      \n\n      </div> <!-- formulario -->\n\n\n\n      \n\n\n\n        <ion-slides  pager="true">\n\n          \n\n            <ion-slide>\n\n            <div id="caixa" *ngIf="mostra_slides">\n\n              <h1 class="h1_inicio">Como usar o teclado</h1>\n\n              <div id="texto_inicio">\n\n              <p class="p_inicio">\n\n                \n\n                <!-- VER SE NO CASO DAS CATEGORIAS AS IMAGENS TAMBÉM SÃO RETIRADAS-->\n\n                  Vá até o menu principal, localizado na parte superior esquerda de qualquer tela principal e clique em Teclado.\n\n                  <br>\n\n                  <!--\n\n                    DEMONSTRAÇAO DE ONDE ESTÁ A TECLADO\n\n                    NÃO SERIA MELHOR O LINK NO MENU SE CHAMAR TECLADO?\n\n\n\n                  -->\n\n                  \n\n                  Inicialmente, o teclado tem quadrados com imagens e nomes de categorias. \n\n                  <br>\n\n                  \n\n                  <!--\n\n                    1 Imagem teclado\n\n                    PRIMEIRA TELA DE CATEGORIAS\n\n                  -->\n\n                  \n\n                  Ao clicar em um quadrado, você será direcionado para outro teclado mais especifíco com palavras relacionadas à essa categoria.\n\n                  <br>\n\n                  \n\n                  <!--\n\n                    2 Imagens do "mouse"\n\n                    "MOUSE" EM CIMA DA CATEGORIA NA TELA DE CATEGORIAS\n\n                    SEGUNDA TELA DE PALAVRAS DA CATEGORIA ESCOLHIDA\n\n\n\n                  -->\n\n                  \n\n                  Este teclado é semelhante ao anterior, tendo quadrados com imagens e palavras\n\n                  <br>\n\n                \n\n                  <!--\n\n                      2 Imagens da teclado\n\n                    SEGUNDA TELA DE PALAVRAS\n\n\n\n                  -->\n\n                  \n\n                  Ao clicar em uma palavra, ela será adicionada à barra com o escrito "FRASE FORMADA", localizada ao topo da tela principal.\n\n                  <br>\n\n                  \n\n                   <!--\n\n                     2 Imagens\n\n                    "MOUSE" EM CIMA DA PALAVRA NA TELA DE PALAVRAS, MAS SEM NADA NO INPUT\n\n                    "MOUSE" CONTINUA EM CIMA, MAS NO INPUT TEM A PALAVRA ESCOLHIDA\n\n\n\n                  -->\n\n                  \n\n                  Caso você precise de palavras de outras categorias para formar a sua frase, volte para a tela inicial do teclado e escolha o complemento.\n\n                  <br>\n\n                  <!--\n\n                    "MOUSE" EM CIMA Do que FAZ VOLTAR PARA A PRIMEIRA TELA\n\n                    ETC\n\n\n\n                  -->\n\n                  \n\n                  Faça isso até formar a frase desejada.\n\n                  <!--\n\n                    por exemplo, eu amo você, eu quero brincar\n\n                  -->\n\n                  <br>\n\n                  <b style="text-align:center;">Deslize e saiba mais</b> \n\n                  \n\n                  <button ion-button round class="botao_volta" style="background-color: transparent;color:#FF6501;"  (click)="volta_links()" >Voltar</button>\n\n                  \n\n                </p>\n\n              </div>\n\n            </div>\n\n            </ion-slide>\n\n            \n\n            <ion-slide>\n\n              <div id="caixa" *ngIf="mostra_slides">\n\n              <h1 class="h1_inicio">Como criar palavras?</h1>\n\n              <div id="texto_inicio">\n\n              <p class="p_inicio">\n\n                  \n\n                  Vá até o menu principal, localizado na parte superior esquerda de qualquer tela principal.\n\n                  <br>\n\n                  <!--\n\n                    "MOUSE" EM CIMA Do que FAZ VOLTAR PARA A PRIMEIRA TELA\n\n                    ETC\n\n\n\n                  -->\n\n                  \n\n                  Clique na a opção "Criar Palavra".\n\n                  <br>\n\n                  <!--\n\n                    "MOUSE" EM CIMA do Criar Palavras\n\n                    ETC\n\n\n\n                  -->\n\n                  \n\n                  A Tela de criação de palavras contém os campos "nome", "imagem" e "categoria", todos devem ser preenchidos.\n\n                  <br>\n\n                  <!--\n\n                    não deveria ter o menu no Criar Palavras?\n\n                    \n\n\n\n                  -->\n\n                  \n\n                  O campo "imagem" exige o link de uma imagem que represente sua palavra.                \n\n                  <br>\n\n                  O campo "categoria" permite a criação de uma nova categoria. Para mais detalhes, veja _Como criar uma categoria?_ (isso é um link)\n\n                  <br>\n\n                  Para finalizar, clique no botão "Criar"\n\n                  <br>\n\n                <b>Deslize e saiba mais</b> \n\n                \n\n                <button ion-button round class="botao_volta" style="background-color: transparent;color:#FF6501;"  (click)="volta_links()" >Voltar</button>\n\n                \n\n              </p>\n\n              </div>\n\n            \n\n            </div>\n\n            </ion-slide>\n\n\n\n            <ion-slide>\n\n                <div id="caixa" *ngIf="mostra_slides">\n\n                <h1 class="h1_inicio">Como criar categorias?</h1>\n\n                <div id="texto_inicio">\n\n                <p class="p_inicio">\n\n                \n\n            \n\n                Para Criar um Categoria, acesse a página "Criar Categoria" pelo menu lateral, encontrado no canto superior esquerdo. \n\n                <br>\n\n                Ao entrar na tela de criação de palavras, dê um nome para a sua categoria e escolha uma imagem para representá-la. \n\n                <br>\n\n                Você pode escolher sua imagem pela galeria clicando no botão "Acessar a galeria" ou tirar uma foto no momento selecionando "Tirar foto". \n\n                <br>\n\n                Em "Palavras disponíveis", marque as palavras que você deseja que façam parte da categoria criada. \n\n                <br>\n\n                Pressione "Enviar" para criar a categoria ou "Limpar" para desfazer o processo.\n\n                \n\n                (Video/imagens/gif)\n\n                <br>\n\n                <b>Deslize e saiba mais</b> \n\n                \n\n                <button ion-button round class="botao_volta" style="background-color: transparent;color:#FF6501;"  (click)="volta_links()" >Voltar</button>\n\n                \n\n              </p>\n\n                </div>\n\n              \n\n              </div>\n\n              </ion-slide>\n\n         \n\n          </ion-slides>\n\n\n\n        \n\n</div> <!--principal-->\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\ajuda\ajuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AjudaPage);
    return AjudaPage;
}());

//# sourceMappingURL=ajuda.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlteradadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AlteradadosPage = /** @class */ (function () {
    function AlteradadosPage(navCtrl, formBuilder, navParams, http, alertCtrl, session_login, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.session_login = session_login;
        this.storage = storage;
        this.messageEmail = "";
        this.errorEmail = false;
        this.endereco = "http://inclusio.engynios.com/api/update/altera_dados.php";
        this.alteraDadosForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])]
        });
    }
    AlteradadosPage.prototype.ngOnInit = function () {
        this.getSession();
    };
    AlteradadosPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        }); //session			
    };
    AlteradadosPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    AlteradadosPage.prototype.altera_dados = function () {
        var _this = this;
        var email = this.alteraDadosForm.controls.email;
        if (!this.alteraDadosForm.valid) {
            if (!email.valid) {
                if (email.value == null || email.value == "") {
                    this.errorEmail = true;
                    this.messageEmail = "Campo obrigatório";
                }
                else {
                    this.errorEmail = true;
                    this.messageEmail = "Email inválido!";
                }
            }
        }
        if (this.alteraDadosForm.valid) {
            this.messageEmail = "";
            var objeto = {
                id_usuario: this.usuario.id_usuario,
                email: email.value
            };
            this.http.post(this.endereco, objeto, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                var alerta = _this.alertCtrl.create({
                    title: 'Alteração',
                    message: 'E-mail alterado',
                    buttons: [{ text: 'Ok' }]
                });
                alerta.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            }).catch(function (error) {
                alert(JSON.stringify(error));
            });
        }
    };
    AlteradadosPage.prototype.limpar = function () {
        var email = this.alteraDadosForm.controls.email;
        this.email = "";
    };
    AlteradadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-alteradados',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\alteradados\alteradados.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Alterar Email </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="caixa_cadastro">\n\n		<form  [formGroup]="alteraDadosForm" novalidate>\n\n				<ion-row>\n\n					<ion-col>\n\n						<ion-list inset>\n\n						 <div id = "input_form">\n\n						 \n\n							<div id="texto"> Email:</div>\n\n							<ion-item>\n\n								<ion-input [(ngModel)]="email" formControlName="email" type="textarea" placeholder="exemplo@hotmail.com" clearInput clearOnEdit="false"></ion-input>\n\n							</ion-item>\n\n							\n\n							<h6 *ngIf="errorEmail" class="error"> {{messageEmail}}</h6>\n\n				<br><br>\n\n				</div>\n\n			</ion-list>  \n\n		</ion-col>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n	<div id="botoes"> 	\n\n		<button ion-button round class="botao" (click)="altera_dados()" >Alterar</button>\n\n    <!--<button ion-button round class="botao" [navPush]="alteradadosPage" ></button> (click)="altera_dados()" >Alterar Dados</button>-->\n\n    <button ion-button round class="botao" (click)="limpar()">Limpar</button>\n\n </div>\n\n </ion-row>\n\n\n\n</form>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\alteradados\alteradados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], AlteradadosPage);
    return AlteradadosPage;
}());

//# sourceMappingURL=alteradados.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlterarpalavrasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AlterarpalavrasPage = /** @class */ (function () {
    function AlterarpalavrasPage(navCtrl, camera, alertCtrl, formBuilder, navParams, http, session_login, storage) {
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.storage = storage;
        this.mostra_listagem = false;
        this.mostra_alterar = true;
        this.messagePalavra = "";
        this.errorPalavra = false;
        this.palavras = null;
        this.endereco = "http://inclusio.engynios.com/api/update/palavra.php";
        this.currentImage = null;
        this.alteraPalavraForm = formBuilder.group({
            palavra: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    AlterarpalavrasPage_1 = AlterarpalavrasPage;
    AlterarpalavrasPage.prototype.captureImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
            // Handle error
            console.log('Image error: ', err);
        });
    };
    AlterarpalavrasPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    AlterarpalavrasPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getSession();
        setTimeout(function () {
            _this.carregaCategorias();
        }, 3000);
    };
    AlterarpalavrasPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        }); //session			
    };
    AlterarpalavrasPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        data = data.replace(/\\\\/gi, '');
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    AlterarpalavrasPage.prototype.alterar2 = function () {
        var f = false;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var c = 0; c < ckbs.length; c++) {
            var ckb = ckbs[c];
            if (ckb.checked) {
                f = true;
                this.ckb_id = ckb.id;
                break;
            }
        }
        if (!f) {
            var alerta = this.alertCtrl.create({
                title: 'Alteração',
                message: 'Selecione no minimo um radiobutton!',
                buttons: [{ text: 'Ok' }]
            });
            alerta.present();
            return;
        }
        else {
            document.getElementById("caixa_cadastro").hidden = false;
            document.getElementById("forms").hidden = false;
            document.getElementById("disponivel").hidden = true;
            document.getElementById("div_categorias").hidden = true;
            document.getElementById("btn2").hidden = true;
            document.getElementById("btn1").hidden = false;
            document.getElementById("excluir").hidden = true;
        }
    };
    AlterarpalavrasPage.prototype.alterar = function () {
        var _this = this;
        var nomes = [];
        for (var n = 0; n < this.categoriasG.length; n++)
            nomes.push(this.categoriasG[n]['nome_categoria'].toLowerCase());
        var palavra = this.alteraPalavraForm.controls.palavra;
        if (!this.alteraPalavraForm.valid) {
            this.errorPalavra = true;
            this.messagePalavra = "Campo obrigatorio";
        }
        else {
            if (nomes.indexOf(palavra.value.toLowerCase()) != -1) {
                this.errorPalavra = true;
                this.messagePalavra = "Já existe uma palavra com esse nome";
                return;
            }
        }
        var confirma_a = this.alertCtrl.create({
            title: 'Confirma alteração',
            message: 'Você deseja mesmo alterar essa palavra?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        return;
                    }
                },
                {
                    text: 'Confirmar',
                    handler: function () {
                        var objeto = {
                            id_palavra: _this.ckb_id,
                            nome_palavra: palavra.value,
                            id_usuario: _this.usuario.id_usuario,
                            versao: "1.0"
                        };
                        _this.http.post(_this.endereco, objeto, { headers: { 'Content-Type': 'application/json' }
                        })
                            .then(function (data) {
                            var alerta = _this.alertCtrl.create({
                                title: 'Alteração',
                                message: 'Palavra Alterada!',
                                buttons: [{ text: 'Ok' }]
                            });
                            alerta.present();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                        }).catch(function (error) {
                            var alerta = _this.alertCtrl.create({
                                title: 'Alteração',
                                message: JSON.stringify(error) + "erro na alteração de palavras. Favor contactar os desenvolvedores",
                                buttons: [{ text: 'Ok' }]
                            });
                            alerta.present();
                        });
                    }
                }
            ]
        });
        confirma_a.present();
    };
    AlterarpalavrasPage.prototype.limpar = function () {
        this.palavra = "";
        this.base64Image = "";
        var f = false;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var c = 0; c < ckbs.length; c++) {
            var ckb = ckbs[c];
            ckb.checked = false;
        }
        var setas = document.getElementsByClassName('seta');
        for (var c = 0; c < setas.length; c++) {
            var ckb = setas[c];
            ckb.checked = false;
        }
    };
    AlterarpalavrasPage.prototype.excluir = function () {
        var _this = this;
        var f = false;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var c = 0; c < ckbs.length; c++) {
            var ckb = ckbs[c];
            if (ckb.checked) {
                f = true;
                this.ckb_id = ckb.id;
                break;
            }
        }
        if (!f) {
            var alerta = this.alertCtrl.create({
                title: 'Exclusão',
                message: 'Selecione no minimo um radiobutton!',
                buttons: [{ text: 'Ok' }]
            });
            alerta.present();
            return;
        }
        else {
            document.getElementById("caixa_cadastro").hidden = true;
            document.getElementById("texto").hidden = true;
            document.getElementById("div_categorias").hidden = true;
            var seta = document.getElementsByClassName('seta');
            for (var c = 0; c < seta.length; c++) {
                var setas = seta[c];
                if (setas.checked) {
                    this.id_setas = setas.id;
                    break;
                }
            }
            var alerta1 = this.alertCtrl.create({
                title: 'Confirma exclusão',
                message: 'Você deseja mesmo excluir essa palavra?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: function () {
                            _this.navCtrl.setRoot(AlterarpalavrasPage_1);
                        }
                    },
                    {
                        text: 'Confirmar',
                        handler: function () {
                            var path_1 = "http://inclusio.engynios.com/api/delete/id/palavra-uniao.php";
                            var objeto = {
                                id_palavra: _this.ckb_id,
                                id_categoria: _this.id_setas
                            };
                            _this.http.get(path_1, objeto, { headers: { 'Content-Type': 'application/json' }
                            })
                                .then(function (data) {
                                var alerta = _this.alertCtrl.create({
                                    title: 'Exclusão',
                                    message: 'Palavra excluida!',
                                    buttons: [{ text: 'Ok' }]
                                });
                                alerta.present();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                            }).catch(function (error) {
                                var alerta = _this.alertCtrl.create({
                                    title: 'Exclusão',
                                    message: JSON.stringify(error) + "erro na exclusao de palavras. Favor contactar os desenvolvedores",
                                    buttons: [{ text: 'Ok' }]
                                });
                                alerta.present();
                            });
                        }
                    }
                ]
            });
            alerta1.present();
        }
    };
    ////////////listagem////////////////////////
    AlterarpalavrasPage.prototype.carregaCategorias = function () {
        var _this = this;
        var objeto = {
            id_usuario: this.usuario.id_usuario
        };
        var path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria_1.php';
        this.http.get(path, objeto, {}).then(function (data) {
            var dados = _this.converte(data.data);
            _this.categoriasG = dados;
            var div = document.getElementById('div_categorias');
            var _loop_1 = function (a) {
                var ion = document.createElement('ion-item');
                ion.className = 'palavra';
                var seta = document.createElement('input');
                seta.type = 'radio';
                seta.name = 'cat';
                seta.className = 'seta';
                seta.setAttribute('id', dados[a]['id_categoria']);
                var id2 = dados[a]['id_categoria'].replace(/\"/gi, "");
                id2.replace(/\\\\/gi, "");
                id2.replace(/\//gi, "/");
                _this.setas = id2;
                seta.addEventListener('click', function () {
                    if (document.getElementById('p' + this.id).hidden) {
                        document.getElementById('p' + this.id).hidden = false;
                        var ckbs = document.getElementsByClassName('checkbox');
                        for (var c = 0; c < ckbs.length; c++) {
                            var ckb = ckbs[c];
                            ckb.checked = false;
                        }
                    }
                    else {
                        document.getElementById('p' + this.id).hidden = true;
                        var setas = document.getElementsByClassName('seta');
                        for (var c = 0; c < setas.length; c++) {
                            var seta_1 = setas[c];
                            seta_1.checked = false;
                        }
                        var ckbs = document.getElementsByClassName('checkbox');
                        for (var c = 0; c < ckbs.length; c++) {
                            var ckb = ckbs[c];
                            ckb.checked = false;
                        }
                    }
                });
                _this.http.get('http://inclusio.engynios.com/api/read/id/categoria-palavra-teste.php', { id_usuario: _this.usuario.id_usuario, id_categoria: dados[a].id_categoria }, {}).then(function (date) {
                    var pala = _this.converte(date.data);
                    var p = document.createElement('div');
                    p.hidden = true;
                    p.id = 'p' + dados[a].id_categoria;
                    p.className = 'linhas';
                    for (var count = 0; count < pala.length; count++) {
                        if (pala[count].nome_palavra.indexOf('capa ') != -1 || pala[count].nome_palavra.indexOf('capa_') != -1)
                            continue;
                        var mdiv = document.createElement('div');
                        var ckb = document.createElement('input');
                        ckb.type = 'radio';
                        ckb.name = 'palavras';
                        ckb.className = 'checkbox';
                        ckb.id = pala[count].id_palavra;
                        _this.ckb_id = ckb.id.replace(/\"/gi, "");
                        mdiv.appendChild(ckb);
                        var palavra = document.createElement('label');
                        palavra.innerText = pala[count].nome_palavra;
                        palavra.setAttribute('for', ckb.id);
                        palavra.className = 'palavras';
                        mdiv.appendChild(palavra);
                        p.appendChild(mdiv);
                    }
                    var ion = document.createElement('ion-item');
                    var cat = document.createElement('p');
                    cat.innerText = dados[a]['nome_categoria'];
                    cat.className = 'categoria';
                    ion.appendChild(seta);
                    ion.appendChild(cat);
                    ion.appendChild(p);
                    div.appendChild(ion);
                }).catch(function (e) {
                    alert(JSON.stringify(e) + 'erro de select palavras');
                });
            };
            for (var a = 0; a < dados.length; a++) {
                _loop_1(a);
            }
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };
    AlterarpalavrasPage = AlterarpalavrasPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-alterarpalavras',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\alterarpalavras\alterarpalavras.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Alterar Palavras </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n <div id="main">\n\n	<div id="palavras_1"> <!--listar todas as categorias-->\n\n		\n\n	</div>\n\n	<div id="caixa_cadastro">\n\n		&nbsp;&nbsp;<!-- ALTERAR-->\n\n		<form  [formGroup]="alteraPalavraForm" novalidate>\n\n				<ion-row>\n\n					<ion-col>\n\n						<ion-list inset>\n\n							<div id = "input_form" >\n\n								<div id="forms" hidden>\n\n									<div id="texto">Palavra:</div>\n\n									<ion-item>\n\n										<ion-input [(ngModel)]="palavra" formControlName="palavra" type="textarea" clearInput clearOnEdit="false"></ion-input>\n\n									</ion-item>\n\n									<h6 *ngIf="errorPalavra" class="error"> {{messagePalavra}}</h6>\n\n\n\n									<div id="texto"> Imagem:</div>\n\n									<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n									<button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n									<ion-card>\n\n										<ion-card-header>Imagem</ion-card-header>\n\n										<ion-card-content>\n\n											<img src = "{{base64Image}}"/> \n\n										</ion-card-content>\n\n									</ion-card>\n\n								</div>\n\n									\n\n					<div id="disponivel"  text-color="fonte-laranja" > Palavras disponíveis:</div>\n\n					<div id="div_categorias" class="div_categorias" ></div>\n\n				</div>\n\n	\n\n			</ion-list>  \n\n		</ion-col>\n\n	</ion-row>\n\n\n\n	<ion-row>\n\n	<div id="botoes"> 	\n\n		<button ion-button round class="botao" id="btn1"  (click)="alterar()" hidden>Alterar</button>\n\n		<button ion-button round class="botao" id="btn2" (click)="alterar2()" >Alterar</button>\n\n    	<button ion-button round class="botao" (click)="excluir()" id="excluir">Excluir</button>  \n\n    	<button ion-button round class="botao" (click)="limpar()">Limpar</button>\n\n 	</div>\n\n 	</ion-row>\n\n\n\n</form>\n\n</div>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\alterarpalavras\alterarpalavras.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], AlterarpalavrasPage);
    return AlterarpalavrasPage;
    var AlterarpalavrasPage_1;
}());

//# sourceMappingURL=alterarpalavras.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracoesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_models_configuracoes__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//imports da session:

//usuario


//confifuracoes



var ConfiguracoesPage = /** @class */ (function () {
    function ConfiguracoesPage(navCtrl, navParams, session_login, //session
        session_config, alertCtrl, //session
        storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.session_login = session_login;
        this.session_config = session_config;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
    }
    //assim que o component existir capture a sessco do usuario
    ConfiguracoesPage.prototype.ngOnInit = function () {
        /* IMPORTANTE!!!
            todas as paginas onde o usuario esta logado
            tem que pegar a session
        */
        var _this = this;
        this.session_login.get().then(function (res) { _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__["a" /* Usuario */](res); });
        this.session_config.get().then(function (res) {
            _this.usuarioConfig = new __WEBPACK_IMPORTED_MODULE_6__app_models_configuracoes__["a" /* Configuracoes */](res);
            //preenche o radio com oq esta na session
            //palavratela
            if (_this.usuarioConfig.palavra_tela == 8) {
                var rb1 = document.getElementById('rb1');
                rb1.checked = true;
            }
            if (_this.usuarioConfig.palavra_tela == 6 || _this.usuarioConfig.palavra_tela == null) {
                var rb2 = document.getElementById('rb2');
                rb2.checked = true;
            }
            if (_this.usuarioConfig.palavra_tela == 4) {
                var rb3 = document.getElementById('rb3');
                rb3.checked = true;
            }
            if (_this.usuarioConfig.palavra_tela == 2) {
                var rb4 = document.getElementById('rb4');
                rb4.checked = true;
            }
            if (_this.usuarioConfig.palavra_tela == 1) {
                var rb5 = document.getElementById('rb5');
                rb5.checked = true;
            }
            //imagem
            if (_this.usuarioConfig.imagem == 's' || _this.usuarioConfig.imagem == null) {
                var rb6 = document.getElementById('rb6');
                rb6.checked = true;
            }
            if (_this.usuarioConfig.imagem == 'n') {
                var rb7 = document.getElementById('rb7');
                rb7.checked = true;
            }
        });
    };
    ConfiguracoesPage.prototype.ionViewDidLoad = function () {
    };
    ConfiguracoesPage.prototype.aplicar = function () {
        //criando uma sessao:
        this.configuracoes = new __WEBPACK_IMPORTED_MODULE_6__app_models_configuracoes__["a" /* Configuracoes */]();
        var rb1 = document.getElementById('rb1');
        var rb2 = document.getElementById('rb2');
        var rb3 = document.getElementById('rb3');
        var rb4 = document.getElementById('rb4');
        var rb5 = document.getElementById('rb5');
        var rb6 = document.getElementById('rb6');
        var rb7 = document.getElementById('rb7');
        //setando palavras por tela
        if (rb1.checked == true) {
            //colocando valores nela:
            this.configuracoes.palavra_tela = 8;
        }
        if (rb2.checked == true) {
            //colocando valores nela:
            this.configuracoes.palavra_tela = 6;
        }
        if (rb3.checked == true) {
            //colocando valores nela:
            this.configuracoes.palavra_tela = 4;
        }
        if (rb4.checked == true) {
            //colocando valores nela:
            this.configuracoes.palavra_tela = 2;
        }
        if (rb5.checked == true) {
            //colocando valores nela:
            this.configuracoes.palavra_tela = 1;
        }
        //setando imagem/texto imagem
        if (rb6.checked == true) {
            //colocando valores nela:
            this.configuracoes.imagem = "s";
        }
        if (rb7.checked == true) {
            //colocando valores nela:
            this.configuracoes.imagem = "n";
        }
        //disparando a sessco:
        this.session_config.create(this.configuracoes);
        var alerta = this.alertCtrl.create({
            title: 'Configuração',
            message: 'Configurações aplicadas com sucesso!',
            buttons: [{ text: 'Ok' }]
        });
        alerta.present();
    };
    ConfiguracoesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configuracoes',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\configuracoes\configuracoes.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n	\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Configurações </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="body" padding>\n\n	<div id="principal">\n\n		 <div id="formulario">\n\n			<div id="linha_form">\n\n				<br>\n\n				<h1><ion-icon name="apps"></ion-icon>&nbsp;Palavras por tela </h1>\n\n          <div id="input_form">\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb1"  name="qtde_tela" value="oito">  <label for="rb1"> 8 palavras </label> </p> <br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb2" name="qtde_tela" value="seis"> <label for="rb2"> 6 palavras </label> </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb3" name="qtde_tela" value="quatro"> <label for="rb3"> 4 palavras </label> </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb4" name="qtde_tela" value="dois"> <label for="rb4"> 2 palavras </label>  </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb5" name="qtde_tela"  value="um"> <label for="rb5"> 1 palavra  </label> </p><br>       \n\n          </div>\n\n			</div>\n\n      \n\n      		<br>\n\n      \n\n			<div id="linha_form">\n\n				<h1> <ion-icon ios="ios-photos" md="md-photos"></ion-icon>&nbsp;Imagem e texto</h1>\n\n         <div id="input_form">\n\n				<p><input type="radio" name="img_txt" id="rb6" value="s"> <label for="rb6">  Texto e imagem </label> </p><br>\n\n				<p><input type="radio" name="img_txt" id="rb7" value="n"> <label for="rb7"> Apenas texto </label> </p><br>\n\n				<br>\n\n        </div>\n\n			</div>\n\n        <button (click)="aplicar()" class="botao">Aplicar</button>\n\n		</div>  \n\n	</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\configuracoes\configuracoes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ConfiguracoesPage);
    return ConfiguracoesPage;
}());

//# sourceMappingURL=configuracoes.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarcatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//banco



//imports da session:

//usuario

//confifuracoes

//camera


var CriarcatPage = /** @class */ (function () {
    function CriarcatPage(navCtrl, navParams, http, //banco 
        formBuilder, //form
        session_login, //session
        session_config, //session
        storage, //session
        camera, alertCtrl, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.session_config = session_config;
        this.storage = storage;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.messagenomeCategoria = "";
        this.messageImagem = "";
        this.errornomeCategoria = false;
        this.errorImagem = false;
        this.imgHidden = true;
        this.imgAPI = "https://api.imgur.com/3/image";
        this.endereco = "http://inclusio.engynios.com/api/insert/categoria.php";
        this.currentImage = null;
        this.criarCategoriaForm = formBuilder.group({
            nomeCategoria: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z"]+$')])],
        });
    }
    CriarcatPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\\\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else {
                    valor = valor.replace(/\"/gi, "");
                    valor = valor.replace(/_/gi, " ");
                }
                objeto[campo] = valor;
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    CriarcatPage.prototype.captureImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 25,
            targetWidth: 512,
            targetHeight: 512,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = "data:image/jpeg;base64," + imageData;
            _this.imgHidden = false;
        }, function (err) {
            console.log(err);
            console.log('Image error: ', err);
        });
    };
    CriarcatPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 25,
            targetWidth: 512,
            targetHeight: 512,
        }).then(function (imageData) {
            _this.imageURI = "data:image/jpeg;base64," + imageData;
            _this.imgHidden = false;
        }, function (err) {
            console.log(err);
        });
    };
    CriarcatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InserecodPage');
    };
    CriarcatPage.prototype.criar = function () {
        var _this = this;
        var nomes = [];
        for (var n = 0; n < this.categoriasG.length; n++)
            nomes.push(this.categoriasG[n]['nome_categoria'].toLowerCase());
        var nomeCategoria = this.criarCategoriaForm.controls.nomeCategoria;
        if (!this.criarCategoriaForm.valid) {
            if (!nomeCategoria.valid) {
                if (nomeCategoria.value == null || nomeCategoria.value == "") {
                    this.errornomeCategoria = true;
                    this.messagenomeCategoria = "Campo obrigatorio";
                }
                else {
                    this.errornomeCategoria = true;
                    this.messagenomeCategoria = "Deve conter apenas letras";
                }
            }
        }
        else {
            this.messagenomeCategoria = "";
            if (nomes.indexOf(nomeCategoria.value.toLowerCase()) != -1) {
                this.errornomeCategoria = true;
                this.messagenomeCategoria = "Já existe uma categoria com esse nome";
                return;
            }
            var f = false;
            var ckbs = document.getElementsByClassName('checkbox');
            for (var c = 0; c < ckbs.length; c++) {
                var ckb = ckbs[c];
                if (ckb.checked) {
                    f = true;
                    break;
                }
            }
            var palavras_1 = [];
            for (var a = 0; a < ckbs.length; a++) {
                var ckb = ckbs[a];
                if (ckb.checked)
                    palavras_1.push(ckb.id.substring(3));
            }
            var objeto = {
                nome_categoria: nomeCategoria.value,
                id_usuario: this.usuario.id_usuario,
            };
            this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' } })
                .then(function () {
                _this.http.get('http://inclusio.engynios.com/api/read/nome/categoria.php', { nome_categoria: '"' + nomeCategoria.value + '"' }, { headers: { 'Content-Type': 'application/json' } })
                    .then(function (data) {
                    var dados = _this.converte(data.data);
                    for (var a = 0; a < palavras_1.length; a++) {
                        var ad = {
                            id_categoria: dados[dados.length - 1]['id_categoria'],
                            id_palavra: palavras_1[a],
                            id_usuario: _this.usuario.id_usuario
                        };
                        _this.http.post('http://inclusio.engynios.com/api/insert/uniao.php', ad, { headers: { 'Content-Type': 'application/json' } })
                            .then().catch(function (error) {
                            alert("Erro na inclusão de palavras na categoria. Favor contactar os desenvolvedores:\n" + JSON.stringify(error));
                            return;
                        });
                    }
                }).catch(function (error) {
                    alert("Erro no acesso ao banco. Favor contactar os desenvolvedores:\n" + JSON.stringify(error));
                    return;
                });
            }).catch(function (error) {
                alert(JSON.stringify(error) + " erro na inclusão de categorias. Favor contactar os desenvolvedores");
                return;
            });
            setTimeout(function () {
                var alerta = _this.alertCtrl.create({
                    title: 'Cadastro de Categoria Realizado!',
                    buttons: [{ text: 'Ok', handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]); } }]
                });
                alerta.present();
            }, 5000);
        }
    };
    CriarcatPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getSession();
        setTimeout(function () {
            _this.carregaCategorias();
        }, 3000);
    };
    CriarcatPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        });
    };
    CriarcatPage.prototype.limpar = function () {
        this.nomeCategoria = null;
        this.imageURI = null;
        var f = false;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var c = 0; c < ckbs.length; c++) {
            var ckb = ckbs[c];
            ckb.checked = false;
        }
    };
    CriarcatPage.prototype.carregaCategorias = function () {
        var _this = this;
        var objeto = {
            id_usuario: this.usuario.id_usuario
        };
        var path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria-null.php';
        this.http.get(path, objeto, {}).then(function (data) {
            var dados = _this.converte(data.data);
            _this.categoriasG = dados;
            var div = document.getElementById('div_categorias');
            var _loop_1 = function (a) {
                var ion = document.createElement('ion-item');
                ion.className = 'palavra';
                var seta = document.createElement('img');
                seta.src = 'assets/imgs/seta_dir.png';
                seta.className = 'seta';
                seta.setAttribute('id', dados[a].id_categoria);
                seta.addEventListener('click', function () {
                    if (document.getElementById('p' + this.id).hidden) {
                        this.src = 'assets/imgs/seta_esq.png';
                        document.getElementById('p' + this.id).hidden = false;
                    }
                    else {
                        this.src = 'assets/imgs/seta_dir.png';
                        document.getElementById('p' + this.id).hidden = true;
                    }
                });
                _this.http.get('http://inclusio.engynios.com/api/read/id/categoria-palavra.php', { id_categoria: dados[a].id_categoria }, {}).then(function (date) {
                    var pala = _this.converte(date.data);
                    var p = document.createElement('div');
                    p.hidden = true;
                    p.id = 'p' + dados[a].id_categoria;
                    p.className = 'linhas';
                    for (var count = 0; count < pala.length; count++) {
                        if (pala[count].nome_palavra.indexOf('capa ') != -1 || pala[count].nome_palavra.indexOf('capa_') != -1)
                            continue;
                        var mdiv = document.createElement('div');
                        var ckb = document.createElement('input');
                        ckb.type = 'checkbox';
                        ckb.className = 'checkbox';
                        ckb.id = 'ckb' + pala[count].id_palavra;
                        mdiv.appendChild(ckb);
                        var palavra = document.createElement('label');
                        palavra.className = 'palavras';
                        palavra.setAttribute('for', 'ckb' + pala[count].id_palavra);
                        palavra.innerText = pala[count].nome_palavra;
                        mdiv.appendChild(palavra);
                        p.appendChild(mdiv);
                    }
                    var ion = document.createElement('ion-item');
                    var cat = document.createElement('p');
                    cat.className = 'categoria';
                    cat.innerText = dados[a]['nome_categoria'];
                    ion.appendChild(seta);
                    ion.appendChild(cat);
                    ion.appendChild(p);
                    div.appendChild(ion);
                }).catch(function (e) {
                    alert(JSON.stringify(e) + 'erro de select palavras');
                });
            };
            for (var a = 0; a < dados.length; a++) {
                _loop_1(a);
            }
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };
    CriarcatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-criarcat',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\criarcat\criarcat.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n\n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Criar Categoria </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n  	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	&nbsp; &nbsp;  <!--p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Criar Categoria</h1>-->\n\n	<form  [formGroup]="criarCategoriaForm" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <div id="input_form">\n\n		    <div id="texto"> Categoria:</div>\n\n			<ion-item>\n\n				<ion-input [(ngModel)]="nomeCategoria" formControlName="nomeCategoria" type="textarea" placeholder="Categoria" id="nomeCategoria" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			<h6 *ngIf="errornomeCategoria" class="error"> {{messagenomeCategoria}}</h6>\n\n			<br>\n\n			\n\n			<div id="texto"> Imagem:</div>\n\n			<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n				<button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n				<ion-card>\n\n					<ion-card-header [hidden]="imgHidden">Imagem</ion-card-header>\n\n					<ion-card-content [hidden]="imgHidden">\n\n							<img [src]="imageURI"> \n\n					</ion-card-content>\n\n				</ion-card>\n\n		\n\n			\n\n			<div id="texto"> Palavras disponíveis:</div>\n\n			<div id="div_categorias" class="div_categorias"></div>\n\n			</div>\n\n			</ion-list>  \n\n        </ion-col>\n\n      </ion-row>		\n\n		\n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" (click)="criar()">Enviar</button>\n\n          <button ion-button round class="botaoCad" (click)="limpar()">Limpar</button>\n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\criarcat\criarcat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], CriarcatPage);
    return CriarcatPage;
}());

//# sourceMappingURL=criarcat.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarpalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//banco



//imports da session:

//usuario

//confifuracoes

//camera



var CriarpalPage = /** @class */ (function () {
    function CriarpalPage(navCtrl, formBuilder, navParams, http, camera, session_login, //session
        session_config, alertCtrl, //session
        storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.camera = camera;
        this.session_login = session_login;
        this.session_config = session_config;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.messagenomePalavra = "";
        this.errornomePalavra = false;
        this.errorPalavras = false;
        this.endereco = "http://inclusio.engynios.com/api/insert/palavra.php";
        this.currentImage = null;
        this.criarPalavraForm = formBuilder.group({
            nomePalavra: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]+$')])]
        });
    }
    CriarpalPage.prototype.captureImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
            console.log('Image error: ', err);
        });
    };
    CriarpalPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    CriarpalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InserecodPage');
    };
    CriarpalPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\\\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    CriarpalPage.prototype.criar = function () {
        var _this = this;
        var nomes = [];
        for (var n = 0; n < this.palavrasG.length; n++)
            nomes.push(this.palavrasG[n]['nome_palavra'].toLowerCase());
        var nomePalavra = this.criarPalavraForm.controls.nomePalavra;
        if (!this.criarPalavraForm.valid) {
            if (!nomePalavra.valid) {
                if (nomePalavra.value == null || nomePalavra.value == "") {
                    this.errornomePalavra = true;
                    this.messagenomePalavra = "Campo obrigatorio";
                }
                else {
                    this.errornomePalavra = true;
                    this.messagenomePalavra = "Deve conter apenas letras";
                }
            }
        }
        else {
            if (JSON.stringify(nomes).indexOf(nomePalavra.value.toLowerCase()) != -1) {
                this.errornomePalavra = true;
                this.messagenomePalavra = "Já existe uma palavra com esse nome";
                return;
            }
            var f = false;
            var ckbs = document.getElementsByClassName('checkbox');
            for (var a = 0; a < ckbs.length; a++) {
                var ckb = ckbs[a];
                if (ckb.checked) {
                    f = true;
                    break;
                }
            }
            if (!f) {
                var alerta = this.alertCtrl.create({
                    title: 'Criação',
                    message: 'Selecione no minimo um radiobutton!',
                    buttons: [{ text: 'Ok' }]
                });
                alerta.present();
                return;
            }
            var id_categoria_1 = [];
            for (var a = 0; a < ckbs.length; a++) {
                var ckb = ckbs[a];
                if (ckb.checked)
                    id_categoria_1.push(ckb.id.substring(3));
            }
            var objeto = {
                nome_palavra: nomePalavra.value,
                id_usuario: this.usuario.id_usuario,
                versao: "1.0"
            };
            this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                _this.http.get('http://inclusio.engynios.com/api/read/nome/palavra.php', { nome_palavra: '"' + nomePalavra.value + '"' }, { headers: { 'Content-Type': 'application/json' } })
                    .then(function (data) {
                    var dados = _this.converte(data.data);
                    for (var a = 0; a < id_categoria_1.length; a++) {
                        var ad = {
                            id_categoria: id_categoria_1[a],
                            id_palavra: dados[dados.length - 1]['id_palavra'],
                            id_usuario: _this.usuario.id_usuario
                        };
                        _this.http.post('http://inclusio.engynios.com/api/insert/uniao.php', ad, { headers: { 'Content-Type': 'application/json' } })
                            .then().catch(function (error) {
                            alert("Erro na associação da palavra com a categoria. Favor contactar os desenvolvedores: " + JSON.stringify(error));
                            return;
                        });
                    }
                }).catch(function (error) {
                    alert("Erro no acesso ao banco. Favor verificar a conexão com a internet ou contactar os desenvolvedores: " + JSON.stringify(error));
                    return;
                });
            }).catch(function (error) {
                alert("Erro na inclusão de palavras. Favor verificar a conexão com a internet ou contactar os desenvolvedores: " + JSON.stringify(error));
                return;
            });
            setTimeout(function () {
                var alerta = _this.alertCtrl.create({
                    title: 'Criação',
                    message: 'Palavra criada',
                    buttons: [{ text: 'Ok' }]
                });
                alerta.present();
                _this.limpar();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__home_home__["a" /* HomePage */]);
            }, 3000);
        }
    };
    CriarpalPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        });
    };
    CriarpalPage.prototype.ngOnInit = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
            setTimeout(function () {
                var objeto = {
                    id_usuario: _this.usuario.id_usuario
                };
                var path2 = 'https://inclusio.engynios.com/api/read/id_usuario/palavra-null.php';
                _this.http.get(path2, objeto, {}).then(function (data) {
                    var dados = _this.converte(data.data);
                    _this.palavrasG = JSON.parse(JSON.stringify(dados).toLowerCase());
                }).catch(function (error) {
                    alert(JSON.stringify(error));
                });
                _this.carregapalavras();
            }, 3000);
        }).catch(function (error) {
            alert('Erro ao identificar o usuário: ' + JSON.stringify(error));
        });
    };
    CriarpalPage.prototype.limpar = function () {
        this.nomePalavra = null;
        this.base64Image = null;
        var f = false;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var c = 0; c < ckbs.length; c++) {
            var ckb = ckbs[c];
            ckb.checked = false;
        }
    };
    CriarpalPage.prototype.carregapalavras = function () {
        var _this = this;
        var objeto = {
            id_usuario: this.usuario.id_usuario
        };
        var path = 'https://inclusio.engynios.com/api/read/id_usuario/categoria.php';
        this.http.get(path, objeto, {}).then(function (data) {
            var dados = _this.converte(data.data);
            var div = document.getElementById('div_categorias');
            for (var a = 0; a < dados.length; a++) {
                var ion = document.createElement('div');
                ion.className = 'linhas';
                var ckb = document.createElement('input');
                ckb.type = "checkbox";
                ckb.id = "ckb" + dados[a]['id_categoria'];
                ckb.className = 'checkbox';
                var cat = document.createElement('label');
                cat.innerText = dados[a]['nome_categoria'].replace(/\"/gi, "");
                cat.setAttribute('for', 'ckb' + dados[a]['id_categoria']);
                cat.className = 'categorias';
                cat.appendChild(document.createElement('br'));
                ion.appendChild(ckb);
                ion.appendChild(cat);
                div.appendChild(ion);
            }
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };
    CriarpalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-criarpal',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\criarpal\criarpal.html"*/'<ion-header>\n\n  <ion-navbar>\n\n	\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Criar Palavras </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	\n\n	<form  [formGroup]="criarPalavraForm" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <div id="input_form">\n\n		    <div id="texto"> Palavra:</div>\n\n			<ion-item>\n\n				<ion-input [(ngModel)]="nomePalavra" formControlName="nomePalavra" type="textarea" placeholder="Palavra" id="nomePalavra" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			<h6 *ngIf="errornomePalavra" class="error"> {{messagenomePalavra}}</h6>\n\n			<br>\n\n			\n\n			<div id="texto"> Imagem:</div>\n\n				<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n          <button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n					<ion-card>\n\n            <ion-card-header>Imagem</ion-card-header>\n\n            <ion-card-content>\n\n								<img src = "{{base64Image}}"/> \n\n            </ion-card-content>\n\n          </ion-card>\n\n			<!--<ion-item>\n\n					<ion-input [(ngModel)]="txtimg" formControlName="txtimg" (input)="mudaImg()" id="txtimg" type="textarea" placeholder="Imagem" clearInput clearOnEdit="false"></ion-input><br><br>\n\n				<img [src]="imagem" height="100px"><br><br>\n\n            </ion-item> \n\n        \n\n            <h6 *ngIf="errorImagem" class="error"> {{messageImagem}}</h6>-->\n\n			<br>\n\n		\n\n			\n\n			<div id="texto"> Categorias:</div>\n\n			<div id="div_categorias">\n\n			</div>\n\n			</div>\n\n			</ion-list>  \n\n        </ion-col>\n\n      </ion-row>		\n\n		\n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" (click)="criar()">Enviar</button>\n\n          <button ion-button round class="botaoCad" (click)="limpar()">Limpar</button>\n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\criarpal\criarpal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], CriarpalPage);
    return CriarpalPage;
}());

//# sourceMappingURL=criarpal.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsquecisenhaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EsquecisenhaPage = /** @class */ (function () {
    function EsquecisenhaPage(navCtrl, formBuilder, navParams, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.messageEmail = "";
        this.errorEmail = false;
        this.endereco = "http://inclusio.engynios.com/api/read/verifica-email.php";
        this.endereco_email = "http://inclusio.engynios.com/api/read/testa_email.php";
        this.esqueciForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])]
        });
    }
    EsquecisenhaPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    EsquecisenhaPage.prototype.ir_inserecod = function () {
        var _this = this;
        var email = this.esqueciForm.controls.email;
        if (!this.esqueciForm.valid) {
            if (!email.valid) {
                if (email.value == null || email.value == "") {
                    this.errorEmail = true;
                    this.messageEmail = "Campo obrigatorio";
                }
                else {
                    this.errorEmail = true;
                    this.messageEmail = "E-mail invalido";
                }
            }
        }
        if (this.esqueciForm.valid) {
            var testar = { email: email.value };
            this.http.get(this.endereco_email, testar, {})
                .then(function (data) {
                if (data.data.length > 2) {
                    var objeto = { email: email.value };
                    _this.http.post(_this.endereco, objeto, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(function (data) {
                        var alerta = _this.alertCtrl.create({
                            title: 'E-mail',
                            message: 'E-mail enviado!',
                            buttons: [{ text: 'Ok' }]
                        });
                        alerta.present();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                    }).catch(function (error) {
                        alert(JSON.stringify(error));
                    });
                }
                else {
                    var alerta = _this.alertCtrl.create({
                        title: 'E-mail',
                        message: 'Esse e-mail não é cadastrado!',
                        buttons: [{ text: 'Ok', handler: function () { _this.limpar(); } }]
                    });
                    alerta.present();
                }
            }).catch(function (error) {
                console.log(error.status);
            });
        }
    };
    EsquecisenhaPage.prototype.limpar = function () {
        this.email = null;
    };
    EsquecisenhaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-esquecisenha',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\esquecisenha\esquecisenha.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n	\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Esqueci Senha </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n  \n\n    <div id="formulario">\n\n    \n\n    <div id="linha_form">\n\n     \n\n     <h1><ion-icon name="md-mail"></ion-icon>&nbsp;Confirme seu e-mail</h1> \n\n   \n\n      <div id="input_form">\n\n      	<form [formGroup]="esqueciForm" (submit)="ir_inserecod()" novalidate>  <!--manda p uma função de consistência de email-->\n\n          <ion-item>\n\n              <ion-input [(ngModel)]="email" formControlName="email"  type="email" placeholder="exemplo@hotmail.com" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n            <h6 *ngIf="errorEmail" class="error"> {{messageEmail}}</h6>\n\n            <br>\n\n          <br>\n\n          <button ion-button round class="botao">Ok</button><br>\n\n        <!--  <button ion-button round class="botao" (click)="ir_inserecod()"  </button>>Ok</button>       -->   \n\n        </form>\n\n        <button ion-button round class="botao" (click)="limpar()">Limpar</button>\n\n        \n\n      </div> <!-- input_form -->\n\n    	\n\n    </div> <!-- linha_form -->\n\n    \n\n    <div id="centraliza_texto">\n\n    	<p>Um link para redefinir a senha será enviado em seu e-mail, não se esqueça de checar também a caixa de spam!</p>\n\n    </div>\n\n    \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\esquecisenha\esquecisenha.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
    ], EsquecisenhaPage);
    return EsquecisenhaPage;
}());

//# sourceMappingURL=esquecisenha.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_models_usuario__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//imports da session:

//usuario


//confifuracoes

//imports do banco



///TESTES

var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, navParams, alertCtrl, session_login, session_config, http, storage, menu, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.session_login = session_login;
        this.session_config = session_config;
        this.http = http;
        this.storage = storage;
        this.menu = menu;
        this.camera = camera;
        this.campoimg = [];
        this.campocat = [];
        this.mostra_campoimg = true; //começa mostrando o botão para ir para o proximo (campo img - true)
        this.mostra_campocat = false; // e o de categoria nao aparece ainda (campo cat - false)
        this.erroNomePalavra = false;
        // variável que será o src da imagem mostrada (mickey putaço)
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        this.endereco = "https://inclusio.engynios.com/api/insert/palavra.php";
        this.endereco2 = "https://inclusio.engynios.com/api/insert/uniao.php";
        this.imgHidden = true;
        //TESTE
        this.menu1Active();
        // setTimeout(() => {
        // 	this.carregaCategorias();
        // }, 3000);
    }
    //assim que o component existir capture a sessão do usuário
    TutorialPage.prototype.ngOnInit = function () {
        var _this = this;
        /* IMPORTANTE!!!
            todas as páginas onde o usuario esta logado
            tem que pegar a session
        */
        this.session_login.get().then(function (res) {
            _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_6__app_models_usuario__["a" /* Usuario */](res);
            //   setTimeout(() => {
            // 	  this.carregaCategorias();
            //   }, 3000);
        });
    };
    //TESTE
    TutorialPage.prototype.menu1Active = function () {
        this.menu.enable(false, 'menu');
    };
    TutorialPage.prototype.captureImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 25,
            targetWidth: 512,
            targetHeight: 512,
            //encodingType: 1,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = "data:image/jpeg;base64," + imageData;
            _this.imgHidden = false;
        }, function (err) {
            console.log(err);
            // Handle error
            console.log('Image error: ', err);
        });
    };
    TutorialPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 25,
            targetWidth: 512,
            targetHeight: 512,
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.imageURI = "data:image/jpeg;base64," + imageData;
            _this.imgHidden = false;
        }, function (err) {
            console.log(err);
        });
    };
    TutorialPage.prototype.carregaCategorias = function () {
        var _this = this;
        this.http.get('https://inclusio.engynios.com/api/read/id_usuario/categoria-null.php', { id_usuario: this.usuarioLogado.id_usuario }, {})
            .then(function (data) {
            var divCat = document.getElementById('div_categorias');
            // alert(divCat);
            divCat.innerText = '';
            var dados = _this.converte(JSON.stringify(data.data));
            for (var i = 0; i < dados.length; i++) {
                var cat = document.createElement('div');
                var ckb = document.createElement('input');
                ckb.type = "checkbox";
                ckb.name = 'ckbsCat';
                ckb.id = dados[i].id_categoria;
                ckb.value = '' + dados[i].nome_categoria;
                var label = document.createElement('label');
                label.setAttribute('for', dados[i].id_categoria);
                label.innerText = '' + dados[i].nome_categoria;
                cat.appendChild(ckb);
                cat.appendChild(label);
                divCat.appendChild(cat);
                // label.
            }
        })
            .catch(function (error) {
            alert('Erro ao acessar o banco, contactar os desenvolvedores. ' + JSON.stringify(error));
        });
    };
    /*
        Como o intuíto de um tutorial é ser passo a passo, precisa
        mostrar o primeiro, esconder os demais e depois mostrar o segundo
        e assim sucessivamente
    */
    TutorialPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\\\\\"/gi;
        data = data.replace(re, "\"");
        data = data.replace(/\\\\/gi, '');
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else {
                    valor = valor.replace(/\"/gi, "");
                    valor = valor.replace(/_/gi, " ");
                }
                objeto[campo] = valor;
                // alert(valor);
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    //apos o nome ser preenchido, vamos p a segunda etapa do tutorial, o campo img
    TutorialPage.prototype.aparece_img = function () {
        //primeiro iremos checar se o nome foi mesmo preenchido:
        //iguala a variavel ao que tem no campo "nomePalavra"
        var palavra = document.getElementById('nomePalavra');
        var nomepalavra = palavra.value;
        var balaozinho = document.getElementById('balao1');
        //ve se a variavel esta vazia
        if (nomepalavra == "") {
            //Lara avisa que esta vazio
            balaozinho.innerHTML = 'O campo precisa estar preenchido!';
        }
        else {
            //esta preenchido, pode avançar:
            //primeiro ele coloca o campo imagem na tela
            this.data = true;
            this.campoimg.push({ 'value': '' });
            //depois esconde-se o botao q permite add inputs de categoria
            this.mostra_campoimg = !this.mostra_campoimg;
            //ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
            //e permite ir para a proxima etapa do tutorial, a categoria
            this.mostra_campocat = !this.mostra_campocat;
            //ele pega o valor false (ou seja não mostrando) e troca para true (aparece)
        }
    };
    //apos a imagem ser preenchida, vamos p a ultima etapa do tutorial, o campo categoria
    TutorialPage.prototype.aparece_cat = function () {
        this.carregaCategorias();
        //primeiro ele coloca o campo categoria na tela
        this.data = true;
        this.campocat.push({ 'value': '' });
        //depois ele esconde o botao q permite add inputs de categoria
        this.mostra_campocat = !this.mostra_campocat;
        //ele pega o valor true (ou seja mostrando) e troca para false (não aparece)
    };
    // abre/fecha a categoria exemplo do form
    TutorialPage.prototype.mostraPalavras = function () {
        // cria uma variável referente ao local das palavras (table)
        var palavras = document.getElementById('palavras');
        // vê se existem palavras na tabela de palavras
        if (palavras.childNodes.length < 1)
            for (var a = 0; a < 20; a++) {
                // cria um elemento "tr" para colocar na table
                var tr = document.createElement('tr');
                // coloca o elemento tr na table
                palavras.appendChild(tr);
                // cria um elemento "td" para colocar no elemento tr criado antes
                var td1 = document.createElement('td');
                // adiciona o td no tr
                tr.appendChild(td1);
                // cria um novo input
                var novoCkb = document.createElement('input');
                // define o tipo do input como sendo uma checkbox
                novoCkb.type = 'checkbox';
                // define o valor que o checkbox vai transmitir quando for pego
                novoCkb.value = 'Palavra' + a;
                // adiciona o checkbox na td
                td1.appendChild(novoCkb);
                // cria uma nova td para ficar ao lado da primeira
                var td2 = document.createElement('td');
                tr.appendChild(td2);
                // cria um novo elemento como parágrafo
                var txt = document.createElement('p');
                // define o texto do parágrafo
                txt.innerHTML = '&nbsp;&nbsp;Palavra ' + a;
                // adiciona o texto ao td2
                td2.appendChild(txt);
            }
        else
            // se existirem elementos dentro da table palavras, fica no while
            while (palavras.childElementCount > 0) {
                // remove o último elemento de palavras
                palavras.removeChild(palavras.lastChild);
            }
    };
    // muda a seta da categoria
    TutorialPage.prototype.seta = function () {
        // verifica se existem elementos na tabela de palavras da categoria
        if (document.getElementById("palavras").childElementCount == 0)
            // se não existirem elementos, coloca a seta para a direita
            return "arrow-dropright";
        else
            // se existirem elementos, seta para baixo
            return "arrow-dropdown";
    };
    // muda a imagem com base no input do usuário
    TutorialPage.prototype.mudaImg = function () {
        // define a variável "imagem" como o texto colocado no input
        var img = document.getElementById("txtimg");
        this.imagem = img.value;
    };
    // limpa todos os campos
    TutorialPage.prototype.limpar = function () {
        // limpa oos campos
        var limpa1 = document.getElementById('nomeCategoria');
        var limpa2 = document.getElementById('nomePalavra');
        var limpa3 = document.getElementById('txtimg');
        limpa1.value = "";
        limpa2.value = "";
        limpa3.value = "";
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        // cria variável para categoria1
        // let categoria1 = <HTMLInputElement> document.getElementById('categoria1');
        // tira o checado do elemento
        //categoria1.checked = false;
        /*	// cria variável para as palavras de dentro da categoria
        let palavras = document.getElementById('palavras');

        // se existirem elementos dentro da table palavras, fica no while
        while(palavras.childElementCount > 0){
        // remove o último elemento de palavras
        palavras.removeChild(palavras.lastChild);
        } */
    };
    TutorialPage.prototype.enviar = function () {
        //primeiro ele verifica
        var _this = this;
        //iguala variaveis aos campos
        var palavra = document.getElementById('nomePalavra');
        var nomepalavra = palavra.value;
        var img = document.getElementById('txtimg');
        var cats = [];
        var balao3 = document.getElementById('balao3');
        var ckbs = document.getElementsByName('ckbsCat');
        for (var i = 0; i < ckbs.length; i++) {
            var cb = ckbs[i];
            if (cb.checked)
                cats.push(cb.id);
        }
        //ve se todos os campos estao preenchidos
        if (nomepalavra == "" || nomepalavra == null || cats.length < 1) {
            //Lara avisa que esta vazio
            balao3.innerHTML = 'Todos os campos precisam estar preenchidos!';
        }
        else {
            //se esta completamente preechido ele pode colocar no banco
            //1 PARTE DE INCLUIR PALAVRAS: TABELA PALAVRAS
            //pegar o valor da session
            this.session_login.get().then(function (res) {
                _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_6__app_models_usuario__["a" /* Usuario */](res);
                //cria um objeto com os campos da tabela palavra
                var objetos = {
                    nome_palavra: nomepalavra,
                    id_usuario: _this.usuarioLogado.id_usuario,
                    versao: 1.0
                };
                _this.http.post(_this.endereco, objetos, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(function (data) {
                    _this.http.get('https://inclusio.engynios.com/api/read/nome/palavra.php', {
                        nome_palavra: "\"" + nomepalavra + "\""
                    }, { headers: { 'Content-Type': 'application/json' } })
                        .then(function (palavras) {
                        var retorno = _this.converte(JSON.stringify(palavras.data));
                        var ad = retorno[retorno.length - 1];
                        var flag = true;
                        for (var i = 0; i < cats.length; i++) {
                            var objetos_uniao = {
                                id_palavra: ad.id_palavra,
                                id_categoria: cats[i],
                                id_usuario: _this.usuarioLogado.id_usuario
                            };
                            _this.http.post(_this.endereco2, objetos_uniao, { headers: { 'Content-Type': 'application/json' } })
                                .then(function () { }).catch(function (error) {
                                flag = false;
                                alert('Erro ao cadastrar a palavra: ' + JSON.stringify(error));
                            });
                        }
                        setTimeout(function () {
                            if (flag) {
                                //Cadastou na tabela Uniao	
                                //avisar o fim do tutorial e volta e ao home
                                var alerta = _this.alertCtrl.create({
                                    title: 'Tutorial',
                                    message: 'Parabéns!! Você adicionou sua primeira palavra! Vamos voltar ao teclado agora',
                                    buttons: [{ text: 'Ok', handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]); } }]
                                });
                                alerta.present();
                            }
                        }, 3000);
                    }).catch(function (error) {
                        alert('Erro ao conferir o banco de dados: ' + JSON.stringify(error));
                    });
                    //Cadastou na tabela Palavra
                }).catch(function (error) {
                    //se deu erro na palavra
                    alert(JSON.stringify(error));
                });
            }); //Session
        }
    };
    TutorialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TutorialPage');
    };
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\tutorial\tutorial.html"*/'﻿<meta charset="utf-8">\n\n\n\n<ion-content class="body" padding>\n\n  <div id="principal">\n\n    <div id="formulario">\n\n      <form action="" >\n\n      \n\n      <div id="linha_form"  >\n\n        <h1>  <ion-icon ios="ios-image" md="md-book"></ion-icon> Palavra</h1>\n\n        <div id="input_form">\n\n          <input type="text" maxlength="50" [(ngModel)]="palavra" name="palavra" id="nomePalavra" placeholder="Meu nome é..." >\n\n          <br>\n\n          <br>\n\n        </div>\n\n      </div> <!--Linha form-->\n\n\n\n      <div id="linha_tutorial" *ngIf="mostra_campoimg" >\n\n        <img src="./assets/imgs/lara.png"  class="lara_tutorial">\n\n        <p class="balao1" id="balao1"> Nesse campo insira o seu nome para cadastra-lo!</p>\n\n        <br>\n\n        <br>\n\n        <button ion-button *ngIf="mostra_campoimg" (click)="aparece_img()" class="botao_tut"> Próximo &nbsp; <ion-icon name="ios-arrow-forward-outline"></ion-icon></button>\n\n        <br>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha tutorial-->\n\n\n\n\n\n      <div id="linha_form" *ngFor="let att of campoimg; ">\n\n        <h1>  <ion-icon ios="ios-image" md="md-image"></ion-icon> Imagem</h1>\n\n        <button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n				<button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n				<ion-card>\n\n					<ion-card-header [hidden]="imgHidden">Imagem</ion-card-header>\n\n					<ion-card-content [hidden]="imgHidden">\n\n							<img [src]="imageURI"> \n\n					</ion-card-content>\n\n				</ion-card>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha form-->\n\n\n\n      <div id="linha_tutorial" *ngIf="mostra_campocat" >\n\n        <img src="./assets/imgs/lara.png" class="lara_tutorial">\n\n        <p class="balao2"> Aqui insira uma foto sua!</p>\n\n        <br>\n\n        <br>\n\n        <button ion-button  *ngIf="mostra_campocat" (click)="aparece_cat()" class="botao_tut"> Próximo &nbsp; <ion-icon name="ios-arrow-forward-outline"></ion-icon></button>\n\n        <br>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha tutorial-->\n\n\n\n\n\n      <div id="linha_form" *ngFor="let att of campocat;">\n\n        <h1>   <ion-icon ios="ios-image" md="md-image"></ion-icon> Categoria</h1>\n\n        <div id="input_form">\n\n          <div id="div_categorias" class="div_categorias"></div>\n\n          <!-- <input type="text"  maxlength="50" id="nomeCategoria"><br><br> -->\n\n        </div>\n\n        <img src="./assets/imgs/lara.png" class="lara_tutorial">\n\n        <p class="balao3"> Por fim, selecione uma catogoria, eu sugiro "Pessoas" já que você é um humano.</p>\n\n        <br>\n\n        <br>\n\n        <br>\n\n\n\n        <button ion-button round (click)="enviar()" class="botao">Enviar</button>\n\n        <br>\n\n        <br>\n\n        <button ion-button round (click)="limpar()" class="botao">Limpar</button>\n\n     \n\n      </div> <!--Linha form-->\n\n     \n\n      <!--div id="icone">\n\n      <ion-icon [name]="seta()" (click)="mostraPalavras();"></ion-icon>\n\n      <input type="checkbox" name="Categorias" value="Categoria 1" id="categoria1">&nbsp;&nbsp;Categoria 1<br>\n\n      <table id = "palavras"></table><br>\n\n      </div-->\n\n      \n\n       </form>\n\n    \n\n    </div> <!--Formulário-->\n\n  </div> <!--Principal-->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\tutorial\tutorial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListarcategoriaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//usuario


//banco



var ListarcategoriaPage = /** @class */ (function () {
    function ListarcategoriaPage(navCtrl, navParams, 
        //private ServiceProvider: ServiceProvider, //paginacao
        session_login, //session	
        http, //banco
        alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.session_login = session_login;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.endereco_alt = "http://inclusio.engynios.com/api/update/categoria.php";
        this.endereco_del = "http://inclusio.engynios.com/api/delete/id/categoria.php";
        this.messagenomeCategoria = "";
        this.messageImagem = "";
        this.errornomeCategoria = false;
        this.errorImagem = false;
        //mostrar coisa
        this.nome_cat = "";
        this.img_cat = "";
        this.criarCategoriaForm = formBuilder.group({
            nomeCategoria: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]+$')])],
        });
        this.carregacategoria();
    }
    ListarcategoriaPage.prototype.ngOnInit = function () {
        //document.getElementById("caixa_cadastro").hidden = true;
    };
    ListarcategoriaPage.prototype.ionViewDidLoad = function () {
        //document.getElementById("caixa_cadastro").hidden = true;
    };
    //fun��o para converter dados do banco
    ListarcategoriaPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        re = /\\\\\\\//gi;
        data = data.replace(re, "/");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    ListarcategoriaPage.prototype.carregacategoria = function () {
        var _this = this;
        //primeiro as nossas categorias
        //SELECIONAR
        //precisa-se faze dois selects: um de id null e outro de id session
        this.session_login.get().then(function (res) {
            _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__["a" /* Usuario */](res);
            //Indicando o caminho da api
            _this.caminho = 'https://inclusio.engynios.com/api/read/id_usuario/categoria.php';
            //Faz um select (read), por id_usuario, na tabela categoria
            //id null (nossas categorias)
            var objeto = {
                id_usuario: _this.usuarioLogado.id_usuario
            };
            _this.http.get(_this.caminho, objeto, {})
                .then(function (data) {
                //alert("ta certo mas ta errado");
                _this.converter = _this.converte(data.data);
                // alert(this.converter.length);				
            }).catch(function (e) {
                alert(JSON.stringify(e + 'line 97'));
            });
            setTimeout(function () {
                var div = document.getElementById('categorias');
                if (_this.converter.length < 0 || _this.converter.length != "" || _this.converter.length != null) {
                    for (var a = 0; a < _this.converter.length; a++) {
                        //pegando as coisas
                        _this.nome = _this.converter[a]['nome_categoria\\\\'];
                        _this.id_cat = _this.converter[a]['id_categoria\\\\'];
                        _this.img_cat = _this.converter[a]['imagem\\\\'];
                        // alert("antes do replace"+nome);
                        //substituindo
                        _this.nome = _this.nome.replace(/\\/gi, "");
                        _this.nome = _this.nome.replace(/\//gi, "/");
                        _this.nome = _this.nome.replace(/\"/gi, "");
                        _this.id_cat = _this.id_cat.replace(/\\/gi, "");
                        _this.id_cat = _this.id_cat.replace(/\//gi, "/");
                        _this.img_cat = _this.img_cat.replace(/\//gi, "/");
                        _this.img_cat = _this.img_cat.replace(/\\/gi, "");
                        //criando
                        var img = document.createElement("img");
                        //img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+this.img_cat);
                        //img.setAttribute('alt', 'imagem');
                        //img.setAttribute('id', this.id_cat);
                        //img.appendChild(div);
                        var p = document.createElement("p");
                        p.setAttribute("id", _this.id_cat);
                        p.setAttribute("class", "listar_cat");
                        p.innerText = '' + _this.nome.toUpperCase() + '';
                        //p.setAttribute("onclick", "this.vai();" /*"this.navCtrl.push(EditarcategoriaPage)"*/ );
                        p.addEventListener('click', function () {
                            // let input = document.getElementById('nomeCategoria');
                            //let id_cat = document.getElementById("1");
                            //alert(this.id);
                            //  input.innerText = JSON.stringify(this.innerText).replace(/\"/gi, ""); //tirar as aspas!!!
                            //let pala = document.getElementById('categorias');
                            document.getElementById("categorias").hidden = true;
                            document.getElementById("principal").hidden = true;
                            document.getElementById("caixa_cadastro").hidden = false;
                            var p = document.getElementById("flag");
                            //p.hidden =true;
                            var img = document.getElementById("img");
                            p.innerText = "" + this.id.replace(/\"/gi, "");
                            // alert(p.innerText);
                        });
                        div.appendChild(p); //coloca a img no td
                    } //for
                } //if
                else {
                    var A = document.createElement("p");
                    A.setAttribute("class", "listar_cat");
                    A.innerText = 'Você não possui nenhuma categoria sua :( <br> Deseja criar?';
                    div.appendChild(A); //coloca a p na div
                }
            }, 2000);
        });
    };
    ListarcategoriaPage.prototype.alterar = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__["a" /* Usuario */](res);
            var id = document.getElementById("flag");
            var nome = _this.nomeCategoria;
            //alert(nome);
            _this.id_alterar = id.innerText.replace(/\"/gi, "");
            var objeto = {
                id_categoria: _this.id_alterar,
                nome_categoria: nome,
                id_usuario: _this.usuarioLogado.id_usuario,
                versao: 1.0
            };
            _this.http.post(_this.endereco_alt, objeto, { headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                alert("Palavra alterada!");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                //alert(JSON.stringify(data.data));
            }).catch(function (error) {
                alert(JSON.stringify(error) + "erro na alteração de categorias. Favor contactar os desenvolvedores");
            });
        });
    };
    ListarcategoriaPage.prototype.excluir = function () {
        var _this = this;
        var id = document.getElementById("flag");
        this.id_deletar = id.innerText.replace(/\"/gi, "");
        //alert(this.id_deletar);
        var objeto = {
            id_categoria: this.id_deletar
        };
        this.http.post(this.endereco_del, objeto, { headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
            alert("Categoria excluída com sucesso!");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            //alert(JSON.stringify(data.data));
        }).catch(function (error) {
            alert(JSON.stringify(error) + "erro na exclusao de categorias. Favor contatar os desenvolvedores");
        });
    };
    ListarcategoriaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-listarcategoria',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\listarcategoria\listarcategoria.html"*/'<ion-header>\n  <ion-navbar>\n  \n	<!--caso a pag n�o tenha cabe�alho voc apaga tudo (a header e as coisas dentro-->\n	   <div  id="topo">\n		   <div id="btn_menu">\n			<ion-buttons left> \n				<button ion-button icon-only menuToggle> \n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n				</button>\n\n			</ion-buttons>\n				</div>\n			<div id="titulo">\n			<ion-title>\n			 <span text-color="fonte-laranja">Minhas Categorias </span>\n			</ion-title>\n			</div>\n		</div>\n	\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n\n\n<ion-content class="body" padding>\n\n    <div id="categorias"> <!--listar todas as categorias-->\n	</div>\n		\n\n		<div id="caixa_cadastro" hidden>\n				&nbsp; &nbsp;  <!--p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Criar Categoria</h1>-->\n				<form  [formGroup]="criarCategoriaForm" novalidate>\n						<ion-row>\n							<ion-col>\n								<ion-list inset>\n									<div id="input_form">\n							<div id="texto"> Categoria:</div>\n						<ion-item>\n							<ion-input [(ngModel)]="nomeCategoria" id="nomeCategoria" value="" formControlName="nomeCategoria" type="textarea" placeholder="Categoria" id="nomeCategoria" clearInput clearOnEdit="false"></ion-input>\n									</ion-item>\n						<h6 *ngIf="errornomeCategoria" class="error"> {{messagenomeCategoria}}</h6>\n						<br>\n						\n						<div id="texto"> Imagem:</div>\n						\n							<ion-card>\n								<ion-card-header>Imagem</ion-card-header>\n								<ion-card-content>\n										<img [src]="base64Image" id="imagem">\n								</ion-card-content>\n							</ion-card>\n							<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n							<button ion-button full (click)="takePicture()">Tirar Foto</button>\n						\n						<div id="texto"> Palavras disponíveis:</div>\n						<div id="div_categorias" class="div_categorias"></div>\n						</div>\n						</ion-list>  \n							</ion-col>\n						</ion-row>		\n					<p id="flag" hidden></p>\n						<ion-row>\n							<div id="botoes">\n								<button ion-button round class="botaoCad" (click)="alterar()">Alterar</button>\n								<button ion-button round class="botaoCad" (click)="excluir()">Excluir</button>\n							</div>\n						</ion-row>\n				</form>\n			</div>  \n\n</ion-content>\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\listarcategoria\listarcategoria.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], ListarcategoriaPage);
    return ListarcategoriaPage;
}());

//# sourceMappingURL=listarcategoria.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SairPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__splash_splash__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//imports da session



//paginas


var SairPage = /** @class */ (function () {
    function SairPage(navCtrl, navParams, session_login, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.session_login = session_login;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
    }
    //assim que o component existir capture a sessão do usuário
    SairPage.prototype.ngOnInit = function () {
        /* IMPORTANTE!!!
            todas as páginas onde o usuario esta logado
            tem que pegar a session
        */
        var _this = this;
        this.session_login.get().then(function (res) { _this.usuario = new __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__["a" /* Usuario */](res); });
        var confirma_sair = this.alertCtrl.create({
            title: 'Sair',
            message: 'Deseja sair do app?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]); }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        _this.session_login.remove(); //remove os valores
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__splash_splash__["a" /* SplashPage */]); //volta para o comeco
                    }
                }
            ]
        });
        confirma_sair.present();
    };
    SairPage.prototype.ionViewDidLoad = function () {
    };
    SairPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sair',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\sair\sair.html"*/'<!--\n\n  Generated template for the SairPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Sair </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\sair\sair.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SairPage);
    return SairPage;
}());

//# sourceMappingURL=sair.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SobrePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SobrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SobrePage = /** @class */ (function () {
    function SobrePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SobrePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SobrePage');
    };
    SobrePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sobre',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\sobre\sobre.html"*/'<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Sobre </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<meta charset="utf-8">\n\n\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n  \n\n  <h1>O Aplicativo</h1>\n\n  <br>\n\n  <br>\n\n\n\n   <img class="sobre" src="../assets/imgs/logo_lara.png">\n\n   <br>\n\n   <br>\n\n\n\n\n\n  <p class="texto"> Lara CAA foi idealizada pela Inclusio, equipe desenvolvedora, que tinha como\n\n  propósito a aumentar a acessibilidade e eficiência dos já existentes aplicativos de mesma função, \n\n  priorisando sempre o usuário e as palavras que compõe seu universo. </p>\n\n  \n\n  <br>\n\n  <br>\n\n  \n\n  <h1>A Equipe</h1>\n\n  <br>\n\n  <br>\n\n  <img class="sobre" src="../assets/imgs/logo_equipe.png">\n\n  <br>\n\n  <br>\n\n  \n\n  \n\n  <p class="texto">Fundada em 2018, a Inclusio buscou para que cada detalhe de seu projeto refletissem os valores de inclusão e\n\n  empatia.</p>\n\n  <br>\n\n  <br>\n\n  \n\n  <img class="sobre" src="../assets/imgs/equipe.jpg">\n\n  <br>\n\n  <br>\n\n  \n\n  <p class="texto">\n\n     A equipe é composta por: Ana Laura Maffei, Beatriz Dinat, Gabriela Miyajima, Gabriela Guimarães, \n\n      Ivan Prearo, Joana Cuesta, Leonardo Caldas e Maria Eduarda Corrêa.</p>\n\n      \n\n  <br>\n\n  <br>\n\n  \n\n  <h1>Apoio</h1>\n\n  <br>\n\n  <br>\n\n   <img class="sobre" src="../assets/imgs/logo_cti.png">\n\n   <br>\n\n   <br>\n\n   \n\n    <p class="texto"> Um agradecimento ao Colégio Técnico Industrial Prof. Isaac Portal Roldán e aos professores coordenadores do projeto: \n\n    André Bicudo, Celso Kawashima, Jovita Baenas, Rodrigo Ferreira e Vitor Simeão.</p>\n\n    <br>\n\n    <br>\n\n   <img class="sobre" src="../assets/imgs/logo_sorri.png">\n\n   <br>\n\n   <br>\n\n    <p class="texto"> Um agradecimento especial também a instituição Sorri Bauru que abraçou o projeto, em especial o Luís Fernando M. Bento Gestor de TI </p>\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\sobre\sobre.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SobrePage);
    return SobrePage;
}());

//# sourceMappingURL=sobre.js.map

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 133;

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionloginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//pacote para transformar nossa classe em injetável

var SessionloginProvider = /** @class */ (function () {
    function SessionloginProvider(storage) {
        this.storage = storage;
    }
    // setando uma seção e passando o tipo de usuário
    SessionloginProvider.prototype.create = function (usuario) {
        this.storage.set('usuario', usuario);
    };
    SessionloginProvider.prototype.get = function () {
        return this.storage.get('usuario');
    };
    // Quando deslogar deve remova do storage
    SessionloginProvider.prototype.remove = function () {
        this.storage.remove('usuario');
    };
    SessionloginProvider.prototype.exist = function () {
        this.get().then(function (res) {
            console.log('resultado >>> ', res);
            if (res) {
                console.log('resultado IF');
                return true;
            }
            else {
                console.log('resultado else');
                return false;
            }
        });
    };
    SessionloginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], SessionloginProvider);
    return SessionloginProvider;
}());

//# sourceMappingURL=sessionlogin.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ajuda/ajuda.module": [
		306,
		14
	],
	"../pages/alteradados/alteradados.module": [
		307,
		13
	],
	"../pages/alterarpalavras/alterarpalavras.module": [
		308,
		12
	],
	"../pages/configuracoes/configuracoes.module": [
		309,
		11
	],
	"../pages/criarcat/criarcat.module": [
		310,
		10
	],
	"../pages/criarpal/criarpal.module": [
		311,
		9
	],
	"../pages/esquecisenha/esquecisenha.module": [
		312,
		8
	],
	"../pages/inserecod/inserecod.module": [
		313,
		0
	],
	"../pages/inseresenha/inseresenha.module": [
		314,
		7
	],
	"../pages/listarcategoria/listarcategoria.module": [
		315,
		6
	],
	"../pages/listarpalavras/listarpalavras.module": [
		316,
		5
	],
	"../pages/sair/sair.module": [
		317,
		4
	],
	"../pages/sobre/sobre.module": [
		318,
		3
	],
	"../pages/splash/splash.module": [
		319,
		2
	],
	"../pages/tutorial/tutorial.module": [
		320,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 175;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Model */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configuracoes; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = /** @class */ (function () {
    function Model(objeto) {
        Object.assign(this, objeto);
    }
    return Model;
}());

//classe configuracoes extendendo a classe Model
var Configuracoes = /** @class */ (function (_super) {
    __extends(Configuracoes, _super);
    function Configuracoes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Configuracoes;
}(Model));

//# sourceMappingURL=configuracoes.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_models_configuracoes__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//sintetizador

//imports da session:

//usuario

//confifuracoes


//@IonicPage()
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, formBuilder, navParams, http, tts, session_login, //session
        session_config, //session
        storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.tts = tts;
        this.session_login = session_login;
        this.session_config = session_config;
        this.storage = storage;
        this.palavras = {};
        this.categorias = {};
        this.mostra_img = true;
        this.fraseFormada = "";
        this.endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria-null.php";
        this.carrega_imagem();
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.session_config.get().then(function (res) {
            _this.usuarioConfig = res;
        });
        this.session_config.get().then(function (res) {
            _this.usuarioConfig = new __WEBPACK_IMPORTED_MODULE_10__app_models_configuracoes__["a" /* Configuracoes */](res);
        });
        console.log(this.session_login.exist());
        console.log(this.session_config.exist());
        console.log(this.session_login.exist());
        console.log(this.session_config.exist());
    };
    HomePage.prototype.voltar = function () {
        document.getElementById('tabela').remove();
        document.getElementById('btn_voltar').hidden = true;
        var table = document.createElement("tabela"); //cria uma tabela
        table.setAttribute('id', 'tabela');
        table.setAttribute('border', '1px');
        var h1 = document.getElementById("h1");
        h1.innerHTML = "Nossas Categorias";
        var objeto = JSON.parse(document.getElementById('categorias').innerText);
        objeto.length = function (obj) {
            var size = 0, key;
            for (key in obj)
                if (obj.hasOwnProperty(key))
                    size++;
            size--;
            return size;
        };
        for (var l = 0; l < objeto.length(objeto) / 2; l++) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            for (var p = 0; p < 2 && l * 2 + p < objeto.length(objeto); p++) {
                var td = document.createElement("td");
                var div = document.createElement("div");
                var img = document.createElement("img");
                var s = objeto[l * 2 + p]['imagem\\\\'].replace(/\"/gi, "");
                s = s.replace(/\\/gi, "");
                s = s.replace(/\//gi, "/");
                td.setAttribute('id', objeto[l * 2 + p]['id_categoria\\\\']);
                td.setAttribute('name', objeto[l * 2 + p]['nome_palavra\\\\']);
                td.setAttribute('style', 'max-height: 400px; max-width: 300px;');
                div.setAttribute('id', 'div_imagem');
                div.setAttribute('border', '1px');
                div.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');
                img.setAttribute('src', 'https://inclusio.engynios.com/imagens/' + s);
                img.setAttribute('alt', 'imagemmm');
                img.setAttribute('id', 'imagem' + l * 2 + p);
                var nome = objeto[l * 2 + p]['nome_categoria\\\\'].replace(/\"/gi, "");
                nome = nome.replace(/\\/gi, "");
                nome = nome.replace(/\//gi, "/");
                td.innerHTML = '' + nome.toUpperCase() + '';
                div.appendChild(img);
                td.appendChild(div);
                td.addEventListener('click', function () {
                    var pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\\"/gi, "")];
                    document.getElementById('tabela').remove();
                    document.getElementById('btn_voltar').hidden = false;
                    h1.innerHTML = "Nossas Palavras";
                    var resultado = pala.length;
                    var table = document.createElement("table");
                    table.setAttribute('id', 'tabela');
                    table.setAttribute('border', '1px');
                    for (var l_1 = 0; l_1 < resultado / 2; l_1++) {
                        var tr_1 = document.createElement("tr"); //cria um tr
                        table.appendChild(tr_1); //coloca o tr na tabela
                        var _loop_1 = function (p_1) {
                            td = document.createElement("td");
                            var div_1 = document.createElement("div");
                            var img_1 = document.createElement("img");
                            var s_1 = pala[l_1 * 2 + p_1]['imagem\\\\'].replace(/\"/gi, "");
                            s_1 = s_1.replace(/\\/gi, "");
                            s_1 = s_1.replace(/\//gi, "/");
                            td.setAttribute('id', pala[l_1 * 2 + p_1]['id_categoria\\\\']);
                            td.setAttribute('style', 'max-height: 400px; max-width: 300px;');
                            div_1.setAttribute('id', 'div_imagem');
                            div_1.setAttribute('border', '1px');
                            div_1.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');
                            img_1.setAttribute('src', 'https://inclusio.engynios.com/imagens/' + s_1);
                            img_1.setAttribute('alt', 'imagemmm');
                            img_1.setAttribute('id', 'imagem' + l_1 * 2 + p_1);
                            var nome_1 = pala[l_1 * 2 + p_1]['nome_palavra\\\\'].replace(/\"/gi, "");
                            nome_1 = nome_1.replace(/\\/gi, "");
                            nome_1 = nome_1.replace(/\//gi, "/");
                            td.innerHTML = '' + nome_1.toUpperCase() + '';
                            div_1.appendChild(img_1);
                            td.appendChild(div_1); //coloca a div com a img no td
                            td.addEventListener('click', function () {
                                document.getElementById('texto').innerHTML += ' ' + nome_1.toUpperCase() + '';
                            });
                            tr_1.appendChild(td);
                        };
                        var td;
                        for (var p_1 = 0; p_1 < 2 && l_1 * 2 + p_1 < pala.length; p_1++) {
                            _loop_1(p_1);
                        }
                    }
                    document.getElementById('botoes').appendChild(table);
                });
                tr.appendChild(td);
            }
        }
        document.getElementById('botoes').appendChild(table);
    };
    HomePage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        re = /\\\\\\\//gi;
        data = data.replace(re, "/");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    HomePage.prototype.carrega_imagem = function () {
        var _this = this;
        var teste = {
            id_usuario: null
        };
        this.http.get(this.endereco_select, teste, {})
            .then(function (data) {
            var converter = _this.converte(data.data);
            var _loop_2 = function (a) {
                _this.http.get('https://inclusio.engynios.com/api/read/id/categoria-palavra.php', { id_categoria: converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, '"') }, {}).then(function (dados) {
                    _this.palavras[converter[a]['id_categoria\\\\'].replace(/\\\\\"/gi, "")] = _this.converte(dados.data);
                    document.getElementById('palavras').innerText = JSON.stringify(_this.palavras);
                }).catch(function (e) {
                    alert(JSON.stringify(e + 'line 97'));
                });
            };
            for (var a = 0; a < converter.length; a++) {
                _loop_2(a);
            }
            setTimeout(function () {
                _this.resultados = converter.length;
                var table = document.createElement("table"); //cria uma tabela
                table.setAttribute('id', 'tabela');
                table.setAttribute('border', '1px');
                var h1 = document.getElementById("h1");
                h1.innerHTML = "Nossas Categorias";
                for (var l = 0; l < _this.resultados / 2; l++) {
                    var tr = document.createElement("tr"); //cria um tr
                    table.appendChild(tr); //coloca o tr na tabela
                    for (var p = 0; p < 2 && l * 2 + p < converter.length; p++) {
                        var td = document.createElement("td");
                        var div = document.createElement("div");
                        var img = document.createElement("img");
                        var s = converter[l * 2 + p]['imagem\\\\'].replace(/\"/gi, "");
                        s = s.replace(/\\/gi, "");
                        s = s.replace(/\//gi, "/");
                        div.setAttribute('id', 'div_imagem');
                        div.setAttribute('border', '1px');
                        div.setAttribute('style', 'max-height: 250px; max-width: 250px;float:center;');
                        img.setAttribute('src', 'https://inclusio.engynios.com/imagens/' + s);
                        img.setAttribute('alt', 'imagemmm');
                        img.setAttribute('id', 'imagem' + l * 2 + p);
                        td.setAttribute('id', converter[l * 2 + p]['id_categoria\\\\']);
                        td.setAttribute('style', 'max-height: 400px; max-width: 300px;');
                        _this.categorias[l * 2 + p] = {};
                        _this.categorias[l * 2 + p]['nome_categoria\\\\'] = converter[l * 2 + p]['nome_categoria\\\\'];
                        _this.categorias[l * 2 + p]['imagem\\\\'] = converter[l * 2 + p]['imagem\\\\'];
                        _this.categorias[l * 2 + p]['id_categoria\\\\'] = converter[l * 2 + p]['id_categoria\\\\'];
                        document.getElementById('categorias').innerText = JSON.stringify(_this.categorias);
                        var nome = converter[l * 2 + p]['nome_categoria\\\\'].replace(/\"/gi, "");
                        nome = nome.replace(/\\/gi, "");
                        nome = nome.replace(/\//gi, "/");
                        td.innerHTML = '' + nome.toUpperCase() + '';
                        td.appendChild(img); //coloca a img no td
                        td.addEventListener('click', function () {
                            var pala = JSON.parse(document.getElementById('palavras').innerText)[this.id.replace(/\\\\"/gi, "")];
                            document.getElementById('tabela').remove();
                            document.getElementById('btn_voltar').hidden = false;
                            h1.innerHTML = "Nossas Palavras";
                            var resultado = pala.length;
                            var table = document.createElement("table"); //cria uma tabela
                            table.setAttribute('id', 'tabela');
                            table.setAttribute('border', '1px');
                            for (var l_2 = 0; l_2 < resultado / 2; l_2++) {
                                var tr_2 = document.createElement("tr"); //cria um tr
                                table.appendChild(tr_2); //coloca o tr na tabela
                                var _loop_3 = function (p_2) {
                                    td = document.createElement("td");
                                    var div_2 = document.createElement("div");
                                    var img_2 = document.createElement("img");
                                    var s_2 = pala[l_2 * 2 + p_2]['imagem\\\\'].replace(/\"/gi, "");
                                    s_2 = s_2.replace(/\\/gi, "");
                                    s_2 = s_2.replace(/\//gi, "/");
                                    td.setAttribute('id', pala[l_2 * 2 + p_2]['id_categoria\\\\']);
                                    td.setAttribute('border', '1px');
                                    td.setAttribute('style', 'max-height: 200px; max-width: 200px;');
                                    div_2.setAttribute('id', 'div_imagem');
                                    div_2.setAttribute('border', '1px');
                                    div_2.setAttribute('style', 'height: 200px; width: 200px;float:center;');
                                    img_2.setAttribute('src', 'https://inclusio.engynios.com/imagens/' + s_2);
                                    img_2.setAttribute('alt', 'imagemmm');
                                    img_2.setAttribute('id', 'imagem' + l_2 * 2 + p_2);
                                    img_2.setAttribute('style', 'max-height: 170px; max-width: 170px;float:center;');
                                    var nome_2 = pala[l_2 * 2 + p_2]['nome_palavra\\\\'].replace(/\"/gi, "");
                                    nome_2 = nome_2.replace(/\\/gi, "");
                                    nome_2 = nome_2.replace(/\//gi, "/");
                                    img_2.setAttribute('alt', '' + nome_2 + '');
                                    td.innerHTML = '' + nome_2.toUpperCase() + '';
                                    div_2.appendChild(img_2);
                                    td.appendChild(div_2); //coloca a div com a img no td
                                    td.addEventListener('click', function () {
                                        document.getElementById('texto').innerHTML += ' ' + nome_2.toUpperCase() + '';
                                    });
                                    tr_2.appendChild(td);
                                };
                                var td;
                                for (var p_2 = 0; p_2 < 2 && l_2 * 2 + p_2 < pala.length; p_2++) {
                                    _loop_3(p_2);
                                }
                            }
                            document.getElementById('botoes').appendChild(table);
                        });
                        tr.appendChild(td);
                    }
                }
                document.getElementById('botoes').appendChild(table);
            }, 2000);
        })
            .catch(function (error) {
            console.log(error.status);
            alert(error + " linha 141");
        });
    };
    HomePage.prototype.sintetizador = function () {
        var frase = document.getElementById('texto');
        this.tts.speak({
            text: frase.innerText,
            rate: 0.75,
            locale: 'pt-BR'
        }).then(function () { return console.log('Success'); })
            .catch(function (reason) { return alert(reason); });
    };
    HomePage.prototype.limpar_texto = function () {
        document.getElementById('texto').innerHTML = null;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n	   <div  id="topo">\n		   <div id="btn_menu">\n			<ion-buttons left> \n				<button ion-button icon-only menuToggle> \n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n				</button>\n\n			</ion-buttons>\n				</div>\n			<div id="titulo">\n			<ion-title>\n			 <span text-color="fonte-laranja"> Teclado </span>\n			</ion-title>\n			</div>\n		</div>\n  	\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="body" padding>\n \n<div id="caixa_cadastro">\n		<p id = "palavras" hidden="true"></p>\n		<p id = "categorias" hidden="true"></p>\n		<div class="imagem">	\n			<img id="btn_voltar" (click)="voltar()"   hidden src = "assets/imgs/setaVoltar.png"> \n			<img id="volume" (click)="sintetizador()"    src = "assets/imgs/volume.png"> \n			<img id="limpar" (click)="limpar_texto()"    src = "assets/imgs/cancelar.png"> \n		</div>\n	\n		\n  <div class="caixa"> <textarea readonly id="texto" placeholder="Frase Formada" style="float:left;"></textarea> </div>\n  <div id="botoes" > \n    <h1 id="h1"> </h1>\n    \n  </div>\n</div>\n</ion-content>\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_8__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__alteradados_alteradados__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__inseresenha_inseresenha__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//banco



//imports da session:

//usuario




// @IonicPage()
var PerfilPage = /** @class */ (function () {
    //usuarioLogado:any;
    function PerfilPage(navCtrl, navParams, http, session_login, session_config, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.session_config = session_config;
        this.storage = storage;
        this.nomeUsuario = "";
        this.email = "";
    }
    PerfilPage.prototype.ngOnInit = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
            _this.banco();
        }); //session	
    };
    PerfilPage.prototype.getSession = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
        }); //session		
    };
    //função para converter dados do banco
    PerfilPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    PerfilPage.prototype.banco = function () {
        var _this = this;
        this.endereco = 'https://inclusio.engynios.com/api/read/id/usuario.php';
        this.http.get(this.endereco, { id_usuario: this.usuario.id_usuario }, {})
            .then(function (data) {
            //caso tenha dado tudo certo
            var converter_usu = _this.converte(data.data);
            //alert(""+ converter_usu[0]['login_usuario']+""+converter_usu[0]['email']);
            //this.nomeUsuario = converter_usu[0]['login_usuario'];
            var usuario = document.getElementById('usuario');
            usuario.innerText = '' + converter_usu[0]['login_usuario'].replace(/\"/gi, "");
            var email = document.getElementById('email');
            email.innerText = '' + converter_usu[0]['email'].replace(/\"/gi, "");
        })
            .catch(function (error) {
            alert("" + JSON.stringify(error));
            console.log(error + "\n");
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        }); //catch
    };
    PerfilPage.prototype.altera_dados = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__alteradados_alteradados__["a" /* AlteradadosPage */]);
    };
    PerfilPage.prototype.altera_senha = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__inseresenha_inseresenha__["a" /* InseresenhaPage */]);
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\perfil\perfil.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Perfil </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n		<ion-row>\n\n			<ion-col>\n\n			<ion-list inset>\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n    <div id="formulario">\n\n		\n\n		<div id="linha_form">\n\n     <h1>Usuário:</h1> \n\n    <div id="input_form">\n\n  		<p id="usuario">\n\n				<ion-item>\n\n					<ion-input [(ngModel)]="login" type="textarea" id="usuario" [readonly]="true" clearInput clearOnEdit="false"></ion-input>\n\n					</ion-item>\n\n			</p>\n\n    </div> <!-- input_form -->\n\n    \n\n    </div> <!-- linha_form -->\n\n    <div id="linha_form">\n\n     \n\n      <h1>Email:</h1> \n\n     <div id="input_form">\n\n        		<p id="email">\n\n								<ion-item>\n\n										<ion-input [(ngModel)]="email" type="textarea" id="email" [readonly]="true" clearInput clearOnEdit="false"></ion-input>\n\n								</ion-item>\n\n						</p>\n\n     </div> <!-- input_form -->\n\n     \n\n     </div> <!-- linha_form -->\n\n     <br> <br>\n\n		<button ion-button round class="botao"[navPush]="alteradadosPage" (click)="altera_dados()" >Alterar Email</button>\n\n		<br>\n\n	<br>\n\n<button ion-button round class="botao"[navPush]="inseresenhaPage" (click)="altera_senha()">Alterar Senha</button>\n\n \n\n   </div> <!-- formulario -->\n\n  </ion-list>  \n\n</ion-col>\n\n</ion-row>		\n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(246);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_list_list__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_splash_splash__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_esquecisenha_esquecisenha__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_cadastro_cadastro__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_perfil_perfil__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_criarcat_criarcat__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_criarpal_criarpal__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_configuracoes_configuracoes__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_ajuda_ajuda__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_sobre_sobre__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_sair_sair__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_inseresenha_inseresenha__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_alteradados_alteradados__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_alterarpalavras_alterarpalavras__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_listarcategoria_listarcategoria__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//banco:

//sintetizador:

//Camera

//session:



//paginas do app:



//paginas de fora
 //splash
//login

 //esquecisenha
//cadastro

//paginas de dentro:
//tutorial

 //criar categoria
 //criar categoria
 //criar categoria
 //configuracoes
 //configuracoes
 //configuracoes
 //sair




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_esquecisenha_esquecisenha__["a" /* EsquecisenhaPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_criarcat_criarcat__["a" /* CriarcatPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_criarpal_criarpal__["a" /* CriarpalPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_ajuda_ajuda__["a" /* AjudaPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_sobre_sobre__["a" /* SobrePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_sair_sair__["a" /* SairPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_inseresenha_inseresenha__["a" /* InseresenhaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_alteradados_alteradados__["a" /* AlteradadosPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_alterarpalavras_alterarpalavras__["a" /* AlterarpalavrasPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_listarcategoria_listarcategoria__["a" /* ListarcategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ajuda/ajuda.module#AjudaPageModule', name: 'AjudaPage', segment: 'ajuda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/alteradados/alteradados.module#AlteradadosPageModule', name: 'AlteradadosPage', segment: 'alteradados', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/alterarpalavras/alterarpalavras.module#AlterarpalavrasPageModule', name: 'AlterarpalavrasPage', segment: 'alterarpalavras', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/configuracoes/configuracoes.module#ConfiguracoesPageModule', name: 'ConfiguracoesPage', segment: 'configuracoes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/criarcat/criarcat.module#CriarcatPageModule', name: 'CriarcatPage', segment: 'criarcat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/criarpal/criarpal.module#CriarpalPageModule', name: 'CriarpalPage', segment: 'criarpal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/esquecisenha/esquecisenha.module#EsquecisenhaPageModule', name: 'EsquecisenhaPage', segment: 'esquecisenha', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inserecod/inserecod.module#InserecodPageModule', name: 'InserecodPage', segment: 'inserecod', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inseresenha/inseresenha.module#InseresenhaPageModule', name: 'InseresenhaPage', segment: 'inseresenha', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/listarcategoria/listarcategoria.module#ListarcategoriaPageModule', name: 'ListarcategoriaPage', segment: 'listarcategoria', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/listarpalavras/listarpalavras.module#ListarpalavrasPageModule', name: 'listarpalavrasPage', segment: 'listarpalavras', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sair/sair.module#SairPageModule', name: 'SairPage', segment: 'sair', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sobre/sobre.module#SobrePageModule', name: 'SobrePage', segment: 'sobre', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot() // import do pacote IonicStorageModule -> session
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_esquecisenha_esquecisenha__["a" /* EsquecisenhaPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_criarcat_criarcat__["a" /* CriarcatPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_criarpal_criarpal__["a" /* CriarpalPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_ajuda_ajuda__["a" /* AjudaPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_sobre_sobre__["a" /* SobrePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_sair_sair__["a" /* SairPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_inseresenha_inseresenha__["a" /* InseresenhaPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_alteradados_alteradados__["a" /* AlteradadosPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_alterarpalavras_alterarpalavras__["a" /* AlterarpalavrasPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_listarcategoria_listarcategoria__["a" /* ListarcategoriaPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_10__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_configuracoes_configuracoes__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_criarcat_criarcat__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_criarpal_criarpal__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_sobre_sobre__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_sair_sair__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_ajuda_ajuda__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_alterarpalavras_alterarpalavras__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_listarcategoria_listarcategoria__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { TutorialPage } from '../pages/tutorial/tutorial';
 //criar categoria
 //configuracoes
 //criarcat
 //criarcat
 //configuracoes
 //sair
 //configuracoes


var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_splash_splash__["a" /* SplashPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__["a" /* PerfilPage */] },
            { title: 'Criar Categorias', component: __WEBPACK_IMPORTED_MODULE_8__pages_criarcat_criarcat__["a" /* CriarcatPage */] },
            { title: 'Criar Palavras', component: __WEBPACK_IMPORTED_MODULE_9__pages_criarpal_criarpal__["a" /* CriarpalPage */] },
            { title: 'Alterar Categorias', component: __WEBPACK_IMPORTED_MODULE_14__pages_listarcategoria_listarcategoria__["a" /* ListarcategoriaPage */] },
            { title: 'Alterar Palavras', component: __WEBPACK_IMPORTED_MODULE_13__pages_alterarpalavras_alterarpalavras__["a" /* AlterarpalavrasPage */] },
            { title: 'Configurações', component: __WEBPACK_IMPORTED_MODULE_7__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */] },
            { title: 'Ajuda', component: __WEBPACK_IMPORTED_MODULE_12__pages_ajuda_ajuda__["a" /* AjudaPage */] },
            { title: 'Sobre', component: __WEBPACK_IMPORTED_MODULE_10__pages_sobre_sobre__["a" /* SobrePage */] },
            { title: 'Sair', component: __WEBPACK_IMPORTED_MODULE_11__pages_sair_sair__["a" /* SairPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionconfiguracoesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//pacote para transformar nossa classe em injet�vel

var SessionconfiguracoesProvider = /** @class */ (function () {
    function SessionconfiguracoesProvider(storage) {
        this.storage = storage;
    }
    // setando uma se��o e passando o tipo de usu�rio
    SessionconfiguracoesProvider.prototype.create = function (configuracoes) {
        this.storage.set('configuracoes', configuracoes);
    };
    SessionconfiguracoesProvider.prototype.get = function () {
        return this.storage.get('configuracoes');
    };
    // Quando deslogar deve remova do storage
    SessionconfiguracoesProvider.prototype.remove = function () {
        this.storage.remove('configuracoes');
    };
    SessionconfiguracoesProvider.prototype.exist = function () {
        this.get().then(function (res) {
            console.log('resultado >>> ', res);
            if (res) {
                console.log('resultado IF');
                return true;
            }
            else {
                console.log('resultado else');
                return false;
            }
        });
    };
    SessionconfiguracoesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
    ], SessionconfiguracoesProvider);
    return SessionconfiguracoesProvider;
}());

//# sourceMappingURL=sessionconfiguracoes.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Model */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = /** @class */ (function () {
    function Model(objeto) {
        Object.assign(this, objeto);
    }
    return Model;
}());

//classe usuario extendendo a classe Model
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Usuario;
}(Model));

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tutorial_tutorial__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__esquecisenha_esquecisenha__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












// @IonicPage()
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, formBuilder, http, session, menuCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.session = session;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.messageUsuario = "";
        this.messagePassword = "";
        this.errorUsuario = false;
        this.errorPassword = false;
        this.endereco_select = "http://inclusio.engynios.com/api/read/login/usuario.php";
        this.cadastroPage = __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro__["a" /* CadastroPage */];
        this.menuCtrl.swipeEnable(false);
        this.loginForm = formBuilder.group({
            usuario: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required]
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var _a = this.loginForm.controls, usuario = _a.usuario, password = _a.password;
        if (!this.loginForm.valid) {
            if (!usuario.valid) {
                this.errorUsuario = true;
                this.messageUsuario = "Campo obrigatório";
            }
            else {
                this.messageUsuario = "";
            }
            if (!password.valid) {
                this.errorPassword = true;
                this.messagePassword = "Campo obrigatório";
            }
            else {
                this.messagePassword = "";
            }
        }
        else {
            var teste = {
                login_usuario: usuario.value
            };
            this.http.get(this.endereco_select, teste, {})
                .then(function (data) {
                //alert(password.value);
                //alert(usuario.value);
                _this.nome = "\"" + usuario.value + "\"";
                _this.senha = "\"" + password.value + "\"";
                //alert(this.nome);
                //alert(this.senha);
                var converter = _this.converte(data.data);
                //alert(JSON.stringify(converter));
                if (converter[0] == null) {
                    _this.erro_usuario = "true";
                }
                else if (converter[0]['login_usuario'] == _this.nome) {
                    _this.erro_usuario = "falso";
                    //alert(converter[0]['senha']);
                    //alert(converter[0]['login_usuario']);
                    if (converter[0]['senha'] == _this.senha) {
                        _this.erro_senha = "falso";
                        // alert("Login realizado com sucesso");
                        //criando uma sessao:
                        var user = new __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__["a" /* Usuario */]();
                        //colocando valores nela:
                        user.id_usuario = converter[0]['id_usuario']; // atenção!!! esse valor deve vir do bd
                        //this.usuario.email= document.getElementById('email_login').value; 						
                        //disparando a sessão:
                        _this.session.create(user);
                        //pode ir para o teclado
                        //uma vez que ele cadastrou ele já loga:
                        var pergunta_tutorial = _this.alertCtrl.create({
                            title: 'Bem-vindo!',
                            message: 'Deseja ver o tutorial?',
                            buttons: [
                                {
                                    text: 'Não',
                                    handler: function () {
                                        _this.menuCtrl.swipeEnable(true);
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                                    }
                                },
                                {
                                    text: 'Sim',
                                    handler: function () {
                                        _this.menuCtrl.swipeEnable(true);
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__tutorial_tutorial__["a" /* TutorialPage */]);
                                    }
                                }
                            ]
                        });
                        pergunta_tutorial.present();
                    }
                    else {
                        _this.erro_senha = "true";
                    }
                }
                else {
                    _this.erro_usuario = "true";
                }
                if (_this.erro_senha == "true" && _this.erro_usuario == "falso") {
                    var alerta = _this.alertCtrl.create({
                        title: 'Senha',
                        message: 'Senha incorreta',
                        buttons: [{ text: 'Ok' }]
                    });
                    alerta.present();
                    _this.limpa_senha();
                }
                if (_this.erro_usuario == "true") {
                    var alerta = _this.alertCtrl.create({
                        title: 'Login',
                        message: 'Usuario não encontrado',
                        buttons: [{ text: 'Ok' }]
                    });
                    alerta.present();
                    _this.limpa_usu();
                }
            })
                .catch(function (error) {
                console.log(error.status);
                alert(error);
            });
        }
    };
    //função para converter dados do banco
    LoginPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    LoginPage.prototype.limpa_usu = function () {
        var usuario = this.loginForm.controls.usuario;
        usuario = null;
    };
    LoginPage.prototype.limpa_senha = function () {
        var password = this.loginForm.controls.password;
        password = null;
    };
    LoginPage.prototype.limpa_tudo = function () {
        var _a = this.loginForm.controls, usuario = _a.usuario, password = _a.password;
        password = null;
        usuario = null;
    };
    LoginPage.prototype.ir_cadastro = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro__["a" /* CadastroPage */]);
    };
    LoginPage.prototype.ir_esquecisenha = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__esquecisenha_esquecisenha__["a" /* EsquecisenhaPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\login\login.html"*/'﻿<ion-header>\n\n		<ion-navbar color = "inclusio_2">\n\n		  <div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Login </span>\n\n			</ion-title>\n\n		  </div>\n\n		  \n\n		</ion-navbar>\n\n	  </ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n    <div id="formulario">\n\n		\n\n		<form [formGroup]="loginForm"  (submit)="login()" novalidate>	\n\n			 <div id="linha_form">\n\n				<div id="input_form">\n\n					 <ion-item>\n\n						 <ion-input [(ngModel)]="usuario"\n\n							 formControlName="usuario"\n\n							 type="textarea"\n\n							 placeholder="Usuário"\n\n							 clearInput clearOnEdit="false">\n\n						</ion-input>\n\n					 </ion-item>\n\n					 <h6 *ngIf="errorUsuario" class="error"> {{messageUsuario}}</h6>\n\n				</div> <!-- input_form -->\n\n			</div> <!-- linha_form -->\n\n			<br> <br>\n\n			<div id="linha_form">\n\n				<div id="input_form">\n\n					<ion-item>\n\n						<ion-input [(ngModel)]="password"\n\n							 formControlName="password"\n\n							 type="password"\n\n							 placeholder="Senha"\n\n							 clearInput clearOnEdit="false">\n\n						</ion-input>\n\n					</ion-item>\n\n					<h6 *ngIf="errorPassword" class="error"> {{messagePassword}}</h6>\n\n				</div> <!-- input_form -->\n\n			\n\n			</div> <!-- linha_form -->\n\n			<br>\n\n			<button ion-button round class="botao">Entrar</button>\n\n		</form>	\n\n		<br>\n\n	<button ion-button round class="botao"[navPush]="cadastroPage" >Ainda não sou cadastrado</button>\n\n	    <br>\n\n		<br>\n\n	<button ion-button round class="botao"[navPush]="esquecisenhaPage" (click)="ir_esquecisenha()" >Esqueci minha senha</button>\n\n   \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sessionlogin_sessionlogin__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cadastro_cadastro__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


var SplashPage = /** @class */ (function () {
    function SplashPage(navCtrl, navParams, storage, session_login, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.session_login = session_login;
        this.menu = menu;
        this.splash_1 = true; // no comeco ele aparece o logo da Lara
        this.splash_2 = true; // depois a logo do inclusio, cti e sorri 
        this.menu.swipeEnable(false);
    }
    SplashPage.prototype.ngOnInit = function () {
        var _this = this;
        this.session_login.get().then(function (res) {
            _this.usuario = res;
            if (_this.usuario != null && _this.usuario != undefined)
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
        }).catch(function (error) {
            alert('Erro ao verificar login prévio: ' + JSON.stringify(error));
        });
    };
    SplashPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () { return _this.splash_1 = false; }, 5000); //quando da 5 s ele diz q é falso e some 
        setTimeout(function () { return _this.splash_2 = false; }, 7000); //quando da 7 s ele diz q é falso e some 
    };
    SplashPage.prototype.ir_login = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    SplashPage.prototype.ir_cadastro = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__cadastro_cadastro__["a" /* CadastroPage */]);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\splash\splash.html"*/'﻿<meta charset="utf-8">\n\n\n\n<div id="custom-overlay" [style.display]="splash_2 ? \'flex\': \'none\'"> <!--Essa vem depois-->\n\n      <div id="logos">\n\n        <div id="linha_logos">\n\n          <img class="logos_splash" src="../assets/imgs/logo_equipe.png">\n\n          <img class="logos_splash" src="../assets/imgs/logo_sorri.png"> \n\n       </div>\n\n       <ion-grid style="height: 100%">\n\n        <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <img class="logos_splash" src="../assets/imgs/logo_cti.png">\n\n        </ion-row>\n\n      </ion-grid>\n\n       </div>\n\n</div>\n\n\n\n<div id="custom-overlay" [style.display]="splash_1 ? \'flex\': \'none\'"> <!--Essa vem primeiro-->\n\n      <div id="logo_lara">\n\n       <img src="../assets/imgs/logo_lara.png">\n\n      </div>       \n\n</div>\n\n\n\n<ion-content class="body" padding>\n\n\n\n<ion-slides>\n\n\n\n  <ion-slide>\n\n  <div id="caixa">\n\n    <h1 class="h1_inicio">Olá, seja bem-vindo a Lara CAA!</h1>\n\n    <div id="texto_inicio">\n\n    <p class="p_inicio">Um aplicativo de Comunição Aumentativa Alternativa desenvolvido como trabalho de conclusão de curso \n\n    do curso de informática do Colégio Técnico Industrial Isaac Portal Roldán.\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n  <div id="caixa">\n\n    <h1 class="h1_inicio">Flexível</h1>\n\n     <div id="texto_inicio">\n\n    <p class="p_inicio">Seu universo é muito grande para que nós satisfaçamos todas as possibilidades,\n\n    mas não se preocupe, através das muitas opções de personalização, o aplicativo consegue abrager melhor a qualquer realidade!\n\n    <br><br>\n\n    Inclua Palavras, adicione imagens, crie e altere categorias.\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  \n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n    <div id="caixa">\n\n    <h1 class="h1_inicio">Para todas as idades</h1>\n\n     <div id="texto_inicio">\n\n    <p class="p_inicio">Caso as imagens sejam muito infantis e você deseje retirá-las, acesse o menu de configurações\n\n    determine sua preferência sobre o teclado!\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  \n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n   <div id="caixa">\n\n    <h1 class="h1_inicio">VAMOS LÁ!</h1>\n\n     <div id="texto_inicio">\n\n      <button ion-button round (click)="ir_login()" class="botao">LOGIN</button>\n\n      <p class="p_inicio"><br>Ou</p>\n\n      <br>\n\n      <button ion-button round (click)="ir_cadastro()" class="botao">CADASTRE-SE</button>  \n\n    </div>\n\n  \n\n  </div>\n\n    \n\n</ion-slide>\n\n  \n\n</ion-slides>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CadastroPage = /** @class */ (function () {
    function CadastroPage(navCtrl, alertCtrl, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.messageNome = "";
        this.messageEmail = "";
        this.messagePassword = "";
        this.messagePassword_1 = "";
        this.errorNome = false;
        this.errorEmail = false;
        this.errorPassword = false;
        this.errorPassword_1 = false;
        this.endereco = "http://inclusio.engynios.com/api/insert/usuario.php";
        this.endereco_select = "http://inclusio.engynios.com/api/read/login/usuario.php";
        this.endereco_email = "http://inclusio.engynios.com/api/read/login/cadastro.php";
        this.cadastroForm = formBuilder.group({
            nome: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]+$')])],
            email: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')])],
            password: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required])],
            password_1: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required]
        });
    }
    CadastroPage.prototype.converte = function (date) {
        var data = JSON.stringify(date);
        var re = /\\\"/gi;
        data = data.replace(re, "\"");
        var retorno = [];
        while (data.indexOf('{') != -1) {
            var str = data.substring(data.indexOf('{') + 1, data.indexOf('}') + 1);
            data = data.substring(data.indexOf('}') + 1);
            var objeto = {};
            while (str.lastIndexOf('}') != -1) {
                var campo = str.substring(str.indexOf('"') + 1, str.indexOf(':') - 1);
                str = str.substring(str.indexOf(':') + 1);
                // document.getElementById('resposta2').innerText += str;
                var valor = void 0;
                if (str.indexOf(',') == -1) {
                    valor = str.substring(str.indexOf(':') + 1, str.indexOf('}') - 1);
                    str = ' ';
                }
                else {
                    valor = str.substring(0, str.indexOf(',') - 1);
                    str = str.substring(str.indexOf(',') + 1);
                }
                if (valor == 'nul')
                    valor = null;
                else
                    valor = valor + '"';
                objeto[campo] = valor;
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    CadastroPage.prototype.cadastro = function () {
        var _this = this;
        var _a = this.cadastroForm.controls, nome = _a.nome, email = _a.email, password = _a.password, password_1 = _a.password_1;
        if (!this.cadastroForm.valid) {
            if (!nome.valid) {
                if (nome.value == null || nome.value == "") {
                    this.errorNome = true;
                    this.messageNome = "Campo obrigatório";
                }
                else {
                    this.errorNome = true;
                    this.messageNome = "Por favor utilize apenas letras";
                }
            }
            else {
                this.messageNome = "";
            }
            if (!email.valid) {
                if (email.value == null || email.value == "") {
                    this.errorEmail = true;
                    this.messageEmail = "Campo obrigatório";
                }
                else {
                    this.errorEmail = true;
                    this.messageEmail = "E-mail inválido";
                }
            }
            else if (email.valid) {
                this.messageEmail = "";
            }
            if (!password.valid) {
                if (password.value == null || password.value == "") {
                    this.errorPassword = true;
                    this.messagePassword = "Campo obrigatório";
                }
                else {
                    this.errorPassword = true;
                    this.messagePassword = "A senha precisa ter de 6 a 20 caracteres";
                }
            }
            else {
                this.messagePassword = "";
            }
            if (!password_1.valid) {
                this.errorPassword_1 = true;
                this.messagePassword_1 = "Campo obrigatório";
            }
            else if (password.valid) {
                if (password.value != password_1.value) {
                    this.errorPassword_1 = true;
                    this.messagePassword_1 = "As senhas digitadas devem ser as mesmas!";
                }
                else {
                    this.messagePassword_1 = "";
                }
            }
            else {
                this.messagePassword_1 = "";
            }
        }
        else if (password.valid) {
            if (password.value != password_1.value) {
                this.errorPassword_1 = true;
                this.messagePassword_1 = "As senhas digitadas devem ser as mesmas!";
            }
            else if (password.value == password_1.value) {
                this.messagePassword_1 = "";
                if (this.cadastroForm.valid) {
                    var teste = {
                        login_usuario: nome.value
                    };
                    this.http.get(this.endereco_select, teste, {})
                        .then(function (data) {
                        if (data.data.length > 2) {
                            var alerta = _this.alertCtrl.create({
                                title: 'Cadastro',
                                message: 'Esse usuário já é cadastrado!',
                                buttons: [{ text: 'Ok', handler: function () { _this.limpar(); } }]
                            });
                            alerta.present();
                        }
                        else {
                            var testar = {
                                email: email.value
                            };
                            _this.http.get(_this.endereco_email, testar, {})
                                .then(function (data) {
                                if (data.data.length > 2) {
                                    var alerta = _this.alertCtrl.create({
                                        title: 'E-mail',
                                        message: 'Esse e-mail já é cadastrado!',
                                        buttons: [{ text: 'Ok', handler: function () { _this.limpar(); } }]
                                    });
                                    alerta.present();
                                }
                                else {
                                    var objeto = {
                                        login_usuario: nome.value,
                                        senha: password.value,
                                        email: email.value
                                    };
                                    _this.http.post(_this.endereco, objeto, {
                                        headers: { 'Content-Type': 'application/json' }
                                    })
                                        .then(function (data) {
                                        var alerta = _this.alertCtrl.create({
                                            title: 'Cadastro realizado!',
                                            buttons: [{ text: 'Ok', handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]); } }]
                                        });
                                        alerta.present();
                                    }).catch(function (error) {
                                        alert(JSON.stringify(error));
                                    });
                                }
                            }).catch(function (error) {
                                console.log(error.status);
                            });
                        }
                    })
                        .catch(function (error) {
                        console.log(error.status);
                    });
                }
            }
        }
    };
    CadastroPage.prototype.limpar = function () {
        var nome = this.cadastroForm.controls.nome;
        nome = null;
    };
    CadastroPage.prototype.ir_login = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    CadastroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-cadastro',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\tcc\src\pages\cadastro\cadastro.html"*/'﻿\n\n<ion-header>\n\n  <ion-navbar color = "inclusio_2">\n\n    <div id="titulo">\n\n	  <ion-title>\n\n	   <span text-color="fonte-laranja"> Cadastro </span>\n\n	  </ion-title>\n\n    </div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	&nbsp; &nbsp;  <p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Cadastro</h1>-->\n\n	<form  [formGroup]="cadastroForm" (submit)="cadastro()" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n           <div id = "input_form">\n\n		   <div id="texto"> Usuário:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="nome" formControlName="nome" type="textarea" placeholder="Nome do Usuário" clearInput clearOnEdit="false" id="usuario"></ion-input>\n\n            </ion-item>\n\n            \n\n            <h6 *ngIf="errorNome" class="error"> {{messageNome}}</h6>\n\n			<br><br>\n\n            <div id="texto"> E-mail:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="email" formControlName="email"  type="email" placeholder="exemplo@hotmail.com" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n        \n\n            <h6 *ngIf="errorEmail" class="error"> {{messageEmail}}</h6>\n\n			<br><br>\n\n			<div id="texto"> Senha:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="password" formControlName="password" type="password" placeholder="Senha" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n\n\n            <h6 *ngIf="errorPassword" class="error"> {{messagePassword}}</h6>\n\n			<br><br>\n\n            <div id="texto"> Confirma senha:</div>\n\n            <ion-item>\n\n                <ion-input [(ngModel)]="password_1" formControlName="password_1" type="password" placeholder="Confirma Senha" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			\n\n            <h6 *ngIf="errorPassword_1" class="error"> {{messagePassword_1}}</h6>\n\n            </div>\n\n          </ion-list>  \n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" >CADASTRAR</button><br><br>\n\n          <a class ="login" (click)="ir_login()">Já sou cadastrado</a>\n\n          \n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\tcc\src\pages\cadastro\cadastro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]])
    ], CadastroPage);
    return CadastroPage;
}());

//# sourceMappingURL=cadastro.js.map

/***/ })

},[223]);
//# sourceMappingURL=main.js.map