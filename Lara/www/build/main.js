webpackJsonp([8],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AjudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
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
    }
    AjudaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AjudaPage');
    };
    AjudaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ajuda',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\ajuda\ajuda.html"*/'<!--\n\n  Generated template for the AjudaPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <span text-color = "fonte-laranja">Ajuda</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  Página do help do sistema\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\ajuda\ajuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], AjudaPage);
    return AjudaPage;
}());

//# sourceMappingURL=ajuda.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracoesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_models_configuracoes__ = __webpack_require__(268);
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
        session_config, //session
        storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.session_login = session_login;
        this.session_config = session_config;
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
        alert("Configurações aplicadas com sucesso!");
    };
    ConfiguracoesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configuracoes',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\configuracoes\configuracoes.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n	\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Configurações </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="body" padding>\n\n	<div id="principal">\n\n		 <div id="formulario">\n\n			<div id="linha_form">\n\n				<br>\n\n				<h1><ion-icon name="apps"></ion-icon>&nbsp;Palavras por tela </h1>\n\n          <div id="input_form">\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb1"  name="qtde_tela" value="oito">   8 palavras </p> <br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb2" name="qtde_tela" value="seis">  6 palavras </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb3" name="qtde_tela" value="quatro">  4 palavras </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb4" name="qtde_tela" value="dois">  2 palavras  </p><br>\n\n    				<p><input type="radio" [(ngModel)]="ck_palavrastela" id="rb5" name="qtde_tela"  value="um">  1 palavra  </p><br>       \n\n          </div>\n\n			</div>\n\n      \n\n      		<br>\n\n      \n\n			<div id="linha_form">\n\n				<h1> <ion-icon ios="ios-photos" md="md-photos"></ion-icon>&nbsp;Imagem e texto</h1>\n\n         <div id="input_form">\n\n				<p><input type="radio" name="img_txt" id="rb6" value="s">  Texto e imagem  </p><br>\n\n				<p><input type="radio" name="img_txt" id="rb7" value="n">  Apenas texto  </p><br>\n\n				<br>\n\n        </div>\n\n			</div>\n\n        <button (click)="aplicar()" class="botao">Aplicar</button>\n\n		</div>  \n\n	</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\configuracoes\configuracoes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ConfiguracoesPage);
    return ConfiguracoesPage;
}());

//# sourceMappingURL=configuracoes.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarcatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(175);
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
        camera, transfer, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.session_config = session_config;
        this.storage = storage;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.messagenomeCategoria = "";
        this.messageImagem = "";
        this.errornomeCategoria = false;
        this.errorImagem = false;
        // variável que será o src da imagem mostrada (mickey putaço)
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        this.endereco = "http://inclusio.engynios.com/api/insert/categoria.php";
        this.currentImage = null;
        this.criarCategoriaForm = formBuilder.group({
            nomeCategoria: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]+$')])],
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
    CriarcatPage.prototype.captureImage = function () {
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
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
            // Handle error
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
            // imageData is a base64 encoded string
            _this.base64Image = "data:image/jpeg;base64," + imageData;
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
            if (!f) {
                alert("Selecione no minimo um checkbox!");
                return;
            }
            if (this.base64Image == null) {
                alert("Campo imagem obrigatorio");
                return;
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
                imagem_categoria: this.base64Image
            };
            this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' } })
                .then(function () { }).catch(function (error) {
                alert(JSON.stringify(error) + " erro na inclusão de categorias. Favor contactar os desenvolvedores");
                return;
            });
            setTimeout(function () {
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
                            alert(JSON.stringify(error) + " erro na inclusão de palavra. Favor contactar os desenvolvedores");
                            return;
                        });
                    }
                }).catch(function (error) {
                    alert(JSON.stringify(error) + " erro no acesso ao banco. Favor contactar os desenvolvedores");
                    return;
                });
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
        }); //session			
    };
    // limpa todos os campos
    CriarcatPage.prototype.limpar = function () {
        // limpa o campo de nome da categoria
        this.nomeCategoria = null;
        // nomeCategoria.nodeValue = null;
        // limpa o campo do link da imagem
        // let {txtimg}= this.criarCategoriaForm.controls;
        this.base64Image = null;
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
                // if(dados[a].nome_palavra.indexOf('capa_') != -1 || dados[a].nome_palavra.indexOf('capa ') != -1)
                // 	continue;
                // dados[a].nome_palavra = dados[a].nome_palavra.replace(/_/gi, " ");
                var ion = document.createElement('ion-item');
                ion.className = 'palavra';
                var seta = document.createElement('img');
                seta.src = 'assets/imgs/seta_dir.png';
                seta.className = 'seta-direita';
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
                    for (var count = 0; count < pala.length; count++) {
                        if (pala[count].nome_palavra.indexOf('capa ') != -1 || pala[count].nome_palavra.indexOf('capa_') != -1)
                            continue;
                        var mdiv = document.createElement('div');
                        var ckb = document.createElement('input');
                        ckb.type = 'checkbox';
                        ckb.className = 'checkbox';
                        ckb.id = 'ckb' + pala[count].id_palavra;
                        mdiv.appendChild(ckb);
                        var palavra = document.createElement('p');
                        palavra.innerText = pala[count].nome_palavra;
                        mdiv.appendChild(palavra);
                        p.appendChild(mdiv);
                    }
                    var ion = document.createElement('ion-item');
                    var cat = document.createElement('p');
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
            selector: 'page-criarcat',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\criarcat\criarcat.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n\n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Criar Categoria </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n  	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	&nbsp; &nbsp;  <!--p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Criar Categoria</h1>-->\n\n	<form  [formGroup]="criarCategoriaForm" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <div id="input_form">\n\n		    <div id="texto"> Categoria:</div>\n\n			<ion-item>\n\n				<ion-input [(ngModel)]="nomeCategoria" formControlName="nomeCategoria" type="textarea" placeholder="Categoria" id="nomeCategoria" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			<h6 *ngIf="errornomeCategoria" class="error"> {{messagenomeCategoria}}</h6>\n\n			<br>\n\n			\n\n			<div id="texto"> Imagem:</div>\n\n			<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n				<button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n				<ion-card>\n\n					<ion-card-header>Imagem</ion-card-header>\n\n					<ion-card-content>\n\n							<img [src]="base64Image"> \n\n					</ion-card-content>\n\n				</ion-card>\n\n		\n\n			\n\n			<div id="texto"> Palavras disponíveis:</div>\n\n			<div id="div_categorias" class="div_categorias"></div>\n\n			</div>\n\n			</ion-list>  \n\n        </ion-col>\n\n      </ion-row>		\n\n		\n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" (click)="criar()">Enviar</button>\n\n          <button ion-button round class="botaoCad" (click)="limpar()">Limpar</button>\n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\criarcat\criarcat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */]])
    ], CriarcatPage);
    return CriarcatPage;
}());

//# sourceMappingURL=criarcat.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EsquecisenhaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(54);
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
    function EsquecisenhaPage(navCtrl, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.messageEmail = "";
        this.errorEmail = false;
        this.endereco = "http://inclusio.engynios.com/api/read/verifica-email.php";
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
            var objeto = {
                email: email.value
            };
            this.http.post(this.endereco, objeto, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                alert("Email enviado!");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }).catch(function (error) {
                alert(JSON.stringify(error));
            });
        }
    };
    EsquecisenhaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-esquecisenha',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\esquecisenha\esquecisenha.html"*/'﻿<meta charset="utf-8">\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n  \n\n    <div id="formulario">\n\n    \n\n    <div id="linha_form">\n\n     \n\n     <h1><ion-icon name="md-mail"></ion-icon>&nbsp;Confirme seu e-mail</h1> \n\n   \n\n      <div id="input_form">\n\n      	<form [formGroup]="esqueciForm" (submit)="ir_inserecod()" novalidate>  <!--manda p uma função de consistência de email-->\n\n          <ion-item>\n\n              <ion-input [(ngModel)]="email" formControlName="email"  type="email" placeholder="exemplo@hotmail.com" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n            <h6 *ngIf="errorEmail" class="error"> {{messageEmail}}</h6>\n\n            <br><br>  \n\n          <br>\n\n          <button ion-button round class="botao">Ok</button>\n\n        <!--  <button ion-button round class="botao" (click)="ir_inserecod()"  </button>>Ok</button>       -->   \n\n  			</form>\n\n      </div> <!-- input_form -->\n\n    	\n\n    </div> <!-- linha_form -->\n\n    \n\n    <div id="centraliza_texto">\n\n    	<p>Um link para redefinir a senha será enviado em seu e-mail, não se esqueça de checar também a caixa de spam!</p>\n\n    </div>\n\n    \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\esquecisenha\esquecisenha.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
    ], EsquecisenhaPage);
    return EsquecisenhaPage;
}());

//# sourceMappingURL=esquecisenha.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SairPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_models_usuario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__splash_splash__ = __webpack_require__(61);
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
                    handler: function () { console.log('Cancel clicked'); }
                },
                {
                    text: 'Sim',
                    handler: function () {
                        _this.session_login.remove(); //remove os valores
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__splash_splash__["a" /* SplashPage */]); //volta para o comeco
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
            selector: 'page-sair',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\sair\sair.html"*/'<!--\n\n  Generated template for the SairPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>sair</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\sair\sair.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SairPage);
    return SairPage;
}());

//# sourceMappingURL=sair.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SobrePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
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
            selector: 'page-sobre',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\sobre\sobre.html"*/'<ion-header>\n\n  <ion-navbar>\n\n\n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n  <ion-header>\n\n    <ion-navbar>\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <span text-color = "fonte-laranja">Sobre</span>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<meta charset="utf-8">\n\n\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n  \n\n  <h1>O Aplicativo</h1>\n\n  \n\n   <img class="sobre" src="../assets/imgs/logo_lara.png">\n\n  \n\n  <p> Lara CAA foi idealizada pela Inclusio, equipe desenvolvedora, que tinha como\n\n  propósito a aumentar a acessibilidade e eficiência dos já existentes aplicativos de mesma função, \n\n  priorisando sempre o usuário e as palavras que compõe seu universo. </p>\n\n  \n\n  <br>\n\n  <br>\n\n  \n\n  <h1>A Equipe</h1>\n\n  \n\n  <img class="sobre" src="../assets/imgs/logo_equipe.png">\n\n  \n\n  <p>Fundada em 2018, a Inclusio buscou para que cada detalhe de seu projeto refletissem os valores de inclusão e\n\n  empatia.</p>\n\n  \n\n  <br>\n\n  \n\n  <img class="sobre" src="../assets/imgs/equipe.jpg">\n\n  \n\n  <p>\n\n     A equipe é composta por: Ana Laura Maffei, Beatriz Dinat, Gabriela Miyajima, Gabriela Guimarães, \n\n      Ivan Prearo, Joana Cuesta, Leonardo Caldas e Maria Eduarda Corrêa.</p>\n\n      \n\n  <br>\n\n  <br>\n\n  \n\n  <h1>Apoio</h1>\n\n  \n\n   <img class="sobre" src="../assets/imgs/logo_cti.png">\n\n    <p> Um agradecimento ao Colégio Técnico Industrial Prof. Isaac Portal Roldán e aos professores coordenadores do projeto: \n\n    André Bicudo, Celso Kawashima, Jovita Baenas, Rodrigo Ferreira e Vitor Simeão.</p>\n\n    \n\n   <img class="sobre" src="../assets/imgs/logo_sorri.png">\n\n    <p> Um agradecimento especial também a instituição Sorri Bauru que abraçou o projeto, em especial o Luís Fernando M. Bento Gestor de TI </p>\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\sobre\sobre.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SobrePage);
    return SobrePage;
}());

//# sourceMappingURL=sobre.js.map

/***/ }),

/***/ 129:
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
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ajuda/ajuda.module": [
		304,
		7
	],
	"../pages/configuracoes/configuracoes.module": [
		305,
		6
	],
	"../pages/criarcat/criarcat.module": [
		306,
		5
	],
	"../pages/esquecisenha/esquecisenha.module": [
		307,
		4
	],
	"../pages/sair/sair.module": [
		308,
		3
	],
	"../pages/sobre/sobre.module": [
		309,
		2
	],
	"../pages/splash/splash.module": [
		310,
		1
	],
	"../pages/tutorial/tutorial.module": [
		311,
		0
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
webpackAsyncContext.id = 171;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__splash_splash__ = __webpack_require__(61);
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
var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, http, session_login, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.session_login = session_login;
        this.storage = storage;
        this.nomeUsuario = "";
        this.email = "";
        this.banco();
    }
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
    PerfilPage.prototype.ngOnInit = function () {
        var _this = this;
        //1 passo: checar se esta logado:
        this.session_login.get().then(function (res) {
            _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__["a" /* Usuario */](res);
            if (_this.usuarioLogado.id_usuario == null) {
                //vai para o comeco
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__splash_splash__["a" /* SplashPage */]);
            }
        });
    };
    PerfilPage.prototype.banco = function () {
        var _this = this;
        this.endereco = 'https://inclusio.engynios.com/api/read/login/usuario.php';
        this.session_login.get().then(function (res) {
            _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__["a" /* Usuario */](res);
            _this.http.get(_this.endereco, { id_usuario: _this.usuarioLogado.id_usuario }, {})
                .then(function (data) {
                //caso tenha dado tudo certo
                var converter_usu = _this.converte(data.data);
                alert("" + converter_usu[0]['login_usuario'] + "" + converter_usu[0]['email']);
                //this.nomeUsuario = converter_usu[0]['login_usuario'];
                var usuario = document.getElementById('usuario');
                usuario.innerHTML = '' + converter_usu[0]['login_usuario'];
                var email = document.getElementById('email');
                email.innerHTML = '' + converter_usu[0]['email'];
            })
                .catch(function (error) {
                alert("" + JSON.stringify(error));
                console.log(error + "\n");
                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
            }); //catch
        });
        /*
        //id session (categorias personalizadas)
                      this.session_login.get().then(
                      res =>
                    {
                    
                        this.usuarioLogado = new Usuario(res);
                        
                         this.http.get(this.caminho, {id_usuario: this.usuarioLogado.id_usuario}, {})
                          .then(
                          data =>
                          {
                              //caso tenha dado tudo certo
                              let converter_usu = this.converte(data.data);
                              this.cat_usu = converter_usu.length;
                              alert ("linha usu" + this.cat_usu);
                              
                              this.tamanho = this.cat_usu + this.cat_null;
                          
                          alert ("tamanho: " + this.tamanho);
                          
                          this.paginacao(this.tamanho);
                          
                          })
                          .catch(
                          error =>
                          {
                              alert(""+JSON.stringify(error));
                              console.log(error+"\n");
                              console.log(error.status);
                              console.log(error.error); // error message as string
                              console.log(error.headers);
  
                          }); //catch
                      
                    }); //session   */
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\perfil\perfil.html"*/'﻿<ion-header>\n\n  <ion-navbar>\n\n  \n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Perfil </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n    <div id="formulario">\n\n		\n\n		<div id="linha_form">\n\n     <h1>Usuário:</h1> \n\n    \n\n    <div id="input_form">\n\n  		<p id="usuario"></p>\n\n    </div> <!-- input_form -->\n\n    \n\n    </div> <!-- linha_form -->\n\n    <div id="linha_form">\n\n     \n\n      <h1>Email:</h1> \n\n     <div id="input_form">\n\n        		<p id="email"></p>\n\n     </div> <!-- input_form -->\n\n     \n\n     </div> <!-- linha_form -->\n\n     <br> <br>\n\n    \n\n		<a CLASS="links_perfil" href="">ALTERAR DADOS</a>\n\n		<br>\n\n		<br>\n\n		<a CLASS="links_perfil" href="">ALTERAR SENHA</a>\n\n		<br>\n\n    <br>\n\n    \n\n		<a  CLASS="links_perfil" href="">MINHAS PALAVRAS</a>\n\n		<br>\n\n		<br>\n\n \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarpalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(91);
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



//camera

var CriarpalPage = /** @class */ (function () {
    function CriarpalPage(navCtrl, formBuilder, navParams, http, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.camera = camera;
        this.messagenomePalavra = "";
        this.messageImagem = "";
        this.messagePalavras = "";
        this.errornomePalavra = false;
        this.errorImagem = false;
        this.errorPalavras = false;
        // variável que será o src da imagem mostrada (mickey putaço)
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        this.endereco = "http://inclusio.engynios.com/api/insert/palavra.php";
        this.currentImage = null;
        this.criarPalavraForm = formBuilder.group({
            nomePalavra: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z]+$')])],
        });
    }
    CriarpalPage.prototype.ngOnInit = function () {
        this.carregaCategorias();
    };
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
            // Handle error
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
            // imageData is a base64 encoded string
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
                // alert(valor);
                // document.getElementById('resposta2').innerText = str + str.lastIndexOf('}');
            }
            retorno.push(objeto);
        }
        return retorno;
    };
    CriarpalPage.prototype.criar = function () {
        var nomes = [];
        for (var n = 0; n < this.categoriasG.length; n++)
            nomes.push(this.categoriasG[n]['nome_categoria'].toLowerCase());
        var nomePalavra = this.criarPalavraForm.controls.nomePalavra /*txtimg,palavras*/;
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
            this.messagenomeCategoria = "";
            //this.messageImagem= "";
            if (nomes.indexOf(nomePalavra.value.toLowerCase()) != -1) {
                this.errornomePalavra = true;
                this.messagenomePalavra = "Já existe uma palavra com esse nome";
                return;
            }
            var f = false;
            var ckbs = document.getElementsByClassName('checkbox');
            //let id_categoria = [];
            for (var a = 0; a < ckbs.length; a++) {
                var ckb = ckbs[a];
                if (ckb.checked) {
                    //id_categoria.push(parseInt(ckb.id.substring(3)));
                    f = true;
                    break;
                }
            }
            if (!f) {
                alert("Selecione no minimo um checkbox!");
                return;
            }
            var id_categoria = [];
            for (var a = 0; a < ckbs.length; a++) {
                var ckb = ckbs[a];
                if (ckb.checked)
                    id_categoria.push(ckb.id.substring(3));
            }
            var objeto = {
                nome_palavra: nomePalavra.value,
                id_usuario: this.usuario.id_usuario,
                versao: null,
                id_categoria: id_categoria
            };
            this.http.post(this.endereco, objeto, { headers: { 'Content-Type': 'application/json' }
            })
                .then(function (data) {
                alert("Palavra criada!");
                //alert(JSON.stringify(data.data));
            }).catch(function (error) {
                alert(JSON.stringify(error) + "erro na inclusão de categorias. Favor contactar os desenvolvedores");
            });
        }
    };
    // muda a imagem com base no input do usuário
    CriarpalPage.prototype.mudaImg = function () {
        // define a variável "imagem" como o texto colocado no input
        this.imagem = document.getElementById("txtimg").nodeValue;
    };
    // limpa todos os campos
    CriarpalPage.prototype.limpar = function () {
        // limpa o campo de nome da categoria
        var nomeCategoria = document.getElementById('nomeCategoria');
        nomeCategoria.value = null;
        // limpa o campo do link da imagem
        var txtimg = document.getElementById('txtimg');
        txtimg.value = null;
        var ckbs = document.getElementsByClassName('checkbox');
        for (var a = 0; a < ckbs.length; a++) {
            var ckb = ckbs[a];
            ckb.checked = false;
        }
        // reseta a imagem para o mickey putaço
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        // cria variável para categoria1
        var categoria1 = document.getElementById('categoria1');
        // tira o checado do elemento
        categoria1.checked = false;
        // cria variável para as palavras de dentro da categoria
        var palavras = document.getElementById('palavras');
        // se existirem elementos dentro da table palavras, fica no while
        while (palavras.childElementCount > 0) {
            // remove o último elemento de palavras
            palavras.removeChild(palavras.lastChild);
        }
    };
    /*ngOnInit()
    {
        this.carregaCategorias();
    }*/
    CriarpalPage.prototype.carregaCategorias = function () {
        var _this = this;
        var objeto = {
            id_usuario: null
        };
        var path = 'http://inclusio.engynios.com/api/read/id_usuario/categoria.php';
        this.http.get(path, objeto, {}).then(function (data) {
            var dados = _this.converte(data.data);
            // alert(JSON.stringify(data.data));
            // alert(JSON.stringify(dados));
            var div = document.getElementById('div_categorias');
            // alert(dados[0].id_categoria);	
            for (var a = 0; a < dados.length; a++) {
                var ion = document.createElement('ion-item');
                var ckb = document.createElement('input');
                ckb.type = "checkbox";
                ckb.id = "ckb" + dados[a]['id_categoria'];
                ckb.className = 'checkbox';
                var cat = document.createElement('p');
                cat.innerText = dados[a]['nome_categoria'];
                cat.appendChild(document.createElement('br'));
                ion.appendChild(ckb);
                ion.appendChild(cat);
                div.appendChild(ion);
            }
        }).catch(function (error) {
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
    };
    // "envia" os dados do form (por enquanto ta indo no console, F12 para ver)
    CriarpalPage.prototype.enviar = function () {
        // cria um objeto dados para guardar tudo
        var dados = {};
        // pega o campo com o nome da nova categoria
        var novaCategoria = document.getElementById('nomeCategoria');
        // cria um campo nome_categoria no objeto a ser enviado
        dados["nome_categoria"] = novaCategoria.value;
        // pega o campo com o link da imagem
        var imgLink = document.getElementById('txtimg');
        // cria um campo imagem no objeto a ser enviado
        dados["imagem"] = imgLink.value;
        // pega o checkbox da categoria para verificar se o usuário selecionou ela inteira
        var categoria = document.getElementById('categoria1');
        // se tiver selecionado a categoria inteira
        if (categoria.checked == true) {
            // cria um campo categoria para armazenar o valor da categoria
            dados["categoria"] = categoria.value;
        }
        else {
            // cria um array vazio no campo palavras para adicionar valores depois
            dados["palavras"] = [];
            // cria uma variável para palavras
            var palavras = document.getElementById('palavras');
            // fará o for para todos os elementos da table
            for (var a = 0; a < palavras.childElementCount; a++) {
                // pega o elemento atual (checkbox dentro do primeiro td que está dentro da tr da table das palavras)
                var elemento = palavras.children[a].children[0].children[0];
                // se for um checkbox e estiver checado...
                if (elemento.checked == true) {
                    // adiciona o valor ao array de palavras
                    dados["palavras"].push(elemento.value);
                }
            }
        }
        // mostra no console (F12) os dados
        console.log(dados);
    };
    CriarpalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-criarpal',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\criarpal\criarpal.html"*/'<ion-header>\n\n  <ion-navbar color = "inclusio_2">\n\n    <div id="titulo">\n\n	  <ion-title>\n\n	   <span text-color="fonte-laranja"> Criação de Palavras</span>\n\n	  </ion-title>\n\n    </div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	&nbsp; &nbsp;  <p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Criar Categoria</h1>-->\n\n	<form  [formGroup]="criarPalavraForm" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            <div id="input_form">\n\n		    <div id="texto"> Palavra:</div>\n\n			<ion-item>\n\n				<ion-input [(ngModel)]="nomePalavra" formControlName="nomePalavra" type="textarea" placeholder="Palavra" id="nomePalavra" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			<h6 *ngIf="errornomePalavra" class="error"> {{messagenomePalavra}}</h6>\n\n			<br>\n\n			\n\n			<div id="texto"> Imagem:</div>\n\n				<button ion-button full (click)="captureImage()">Acessar a galeria</button>\n\n          <button ion-button full (click)="takePicture()">Tirar Foto</button>\n\n					<ion-card>\n\n            <ion-card-header>Imagem</ion-card-header>\n\n            <ion-card-content>\n\n								<img src = "{{base64Image}}"/> \n\n            </ion-card-content>\n\n          </ion-card>\n\n			<!--<ion-item>\n\n					<ion-input [(ngModel)]="txtimg" formControlName="txtimg" (input)="mudaImg()" id="txtimg" type="textarea" placeholder="Imagem" clearInput clearOnEdit="false"></ion-input><br><br>\n\n				<img [src]="imagem" height="100px"><br><br>\n\n            </ion-item> \n\n        \n\n            <h6 *ngIf="errorImagem" class="error"> {{messageImagem}}</h6>-->\n\n			<br>\n\n		\n\n			\n\n			<div id="texto"> Categorias:</div>\n\n			<div id="div_categorias">\n\n			</div>\n\n			</div>\n\n			</ion-list>  \n\n        </ion-col>\n\n      </ion-row>		\n\n		\n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" (click)="criar()">Enviar</button>\n\n          <button ion-button round class="botaoCad" (click)="limpar()">Limpar</button>\n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\criarpal\criarpal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], CriarpalPage);
    return CriarpalPage;
}());

//# sourceMappingURL=criarpal.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(242);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_list_list__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_splash_splash__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_esquecisenha_esquecisenha__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_cadastro_cadastro__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_perfil_perfil__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_criarcat_criarcat__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_criarpal_criarpal__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_configuracoes_configuracoes__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_ajuda_ajuda__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_sobre_sobre__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_sair_sair__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__ = __webpack_require__(175);
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
                __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ajuda/ajuda.module#AjudaPageModule', name: 'AjudaPage', segment: 'ajuda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/configuracoes/configuracoes.module#ConfiguracoesPageModule', name: 'ConfiguracoesPage', segment: 'configuracoes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/criarcat/criarcat.module#CriarcatPageModule', name: 'CriarcatPage', segment: 'criarcat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/esquecisenha/esquecisenha.module#EsquecisenhaPageModule', name: 'EsquecisenhaPage', segment: 'esquecisenha', priority: 'low', defaultHistory: [] },
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
                __WEBPACK_IMPORTED_MODULE_18__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_10__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
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

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_configuracoes_configuracoes__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_criarcat_criarcat__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_criarpal_criarpal__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_sobre_sobre__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_sair_sair__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_ajuda_ajuda__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tutorial_tutorial__ = __webpack_require__(60);
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
 //configuracoes
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__["a" /* PerfilPage */] },
            { title: 'Criar Categoria', component: __WEBPACK_IMPORTED_MODULE_7__pages_criarcat_criarcat__["a" /* CriarcatPage */] },
            { title: 'Criar Palavra', component: __WEBPACK_IMPORTED_MODULE_8__pages_criarpal_criarpal__["a" /* CriarpalPage */] },
            { title: 'Configurações', component: __WEBPACK_IMPORTED_MODULE_6__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */] },
            { title: 'Ajuda', component: __WEBPACK_IMPORTED_MODULE_11__pages_ajuda_ajuda__["a" /* AjudaPage */] },
            { title: 'Sobre', component: __WEBPACK_IMPORTED_MODULE_9__pages_sobre_sobre__["a" /* SobrePage */] },
            { title: 'TUTORIAL', component: __WEBPACK_IMPORTED_MODULE_12__pages_tutorial_tutorial__["a" /* TutorialPage */] },
            { title: 'Sair', component: __WEBPACK_IMPORTED_MODULE_10__pages_sair_sair__["a" /* SairPage */] }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
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
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionloginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(27);
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

/***/ 46:
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

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionconfiguracoesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(27);
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

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_models_usuario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tutorial_tutorial__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__esquecisenha_esquecisenha__ = __webpack_require__(118);
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
    function LoginPage(navCtrl, formBuilder, http, session, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.session = session;
        this.alertCtrl = alertCtrl;
        this.messageUsuario = "";
        this.messagePassword = "";
        this.errorUsuario = false;
        this.errorPassword = false;
        this.endereco_select = "http://inclusio.engynios.com/api/read/login/usuario.php";
        this.cadastroPage = __WEBPACK_IMPORTED_MODULE_10__cadastro_cadastro__["a" /* CadastroPage */];
        this.loginForm = formBuilder.group({
            usuario: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].maxLength(20),
                    __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required])],
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var _a = this.loginForm.controls, usuario = _a.usuario, password = _a.password;
        if (!this.loginForm.valid) {
            if (!usuario.valid) {
                this.errorUsuario = true;
                this.messageUsuario = "Ops! Usuário inválido";
            }
            else {
                this.messageUsuario = "";
            }
            if (!password.valid) {
                this.errorPassword = true;
                this.messagePassword = "Senha inválida";
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
                                    handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]); }
                                },
                                {
                                    text: 'Sim',
                                    handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__tutorial_tutorial__["a" /* TutorialPage */]); }
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
                    alert("Senha incorreta");
                    _this.limpa_senha();
                }
                if (_this.erro_usuario == "true") {
                    alert("Usuário não encontrado");
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
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\login\login.html"*/'﻿<ion-header>\n\n		<ion-navbar color = "inclusio_2">\n\n		  <div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Login </span>\n\n			</ion-title>\n\n		  </div>\n\n		  \n\n		</ion-navbar>\n\n	  </ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n    <div id="formulario">\n\n		\n\n		<form [formGroup]="loginForm"  (submit)="login()" novalidate>	\n\n			 <div id="linha_form">\n\n				<div id="input_form">\n\n					 <ion-item>\n\n						 <ion-input [(ngModel)]="usuario"\n\n							 formControlName="usuario"\n\n							 type="textarea"\n\n							 placeholder="Usuário"\n\n							 clearInput clearOnEdit="false">\n\n						</ion-input>\n\n					 </ion-item>\n\n					 <h6 *ngIf="errorUsuario" class="error"> {{messageUsuario}}</h6>\n\n				</div> <!-- input_form -->\n\n			</div> <!-- linha_form -->\n\n			<br> <br>\n\n			<div id="linha_form">\n\n				<div id="input_form">\n\n					<ion-item>\n\n						<ion-input [(ngModel)]="password"\n\n							 formControlName="password"\n\n							 type="password"\n\n							 placeholder="Senha"\n\n							 clearInput clearOnEdit="false">\n\n						</ion-input>\n\n					</ion-item>\n\n					<h6 *ngIf="errorPassword" class="error"> {{messagePassword}}</h6>\n\n				</div> <!-- input_form -->\n\n			\n\n			</div> <!-- linha_form -->\n\n			<br>\n\n			<button ion-button round class="botao">Entrar</button>\n\n		</form>	\n\n		<br>\n\n	<button ion-button round class="botao"[navPush]="cadastroPage" >Ainda não sou cadastrado</button>\n\n	    <br>\n\n		<br>\n\n	<button ion-button round class="botao"[navPush]="esquecisenhaPage" (click)="ir_esquecisenha()" >Esqueci minha senha</button>\n\n   \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_6__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sobre_sobre__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { PalavrasPage } from '../palavras/palavras'; 
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loginPage = __WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */];
        this.endereco_select = "http://inclusio.engynios.com/api/read/id_usuario/categoria2-null.php";
        this.endereco_palavras = "http://inclusio.engynios.com/api/read/id/categoria2-palavra2.php";
        this.carrega_imagem();
        //this.carrega_palavra();
        this.pag = this.pagina;
    }
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
    HomePage.prototype.carrega_imagem = function () {
        var _this = this;
        var teste = {
            id_usuario: 1
        };
        this.http.get(this.endereco_select, teste, {})
            .then(function (data) {
            var converter = _this.converte(data.data);
            _this.imagens = [];
            _this.resultados = converter.length;
            // alert(JSON.stringify(converter));
            var table = document.createElement("table"); //cria uma tabela
            table.setAttribute('border', '1');
            table.setAttribute('id', 'tabela_cat');
            for (var l = 0; l < _this.resultados / 2; l++) {
                var tr = document.createElement("tr"); //cria um tr
                table.appendChild(tr); //coloca o tr na tabela
                for (var p = 0; p < 2 && l * 2 + p < converter.length; p++) {
                    //let img = document.createElement("img");
                    if (converter[l * 2 + p]['imagem\\\\'] == undefined)
                        alert(JSON.stringify(converter[l * 2 + p]));
                    var s = converter[l * 2 + p]['imagem\\\\'].replace(/\"/gi, "");
                    s = s.replace(/\\/gi, "");
                    s = s.replace(/\//gi, "/");
                    var td = "<button id = " + converter[l * 2 + p]['id_categoria\\\\'] + " (click)='this.pagina()'> <img   src= 'https://inclusio.engynios.com/imagens/" + s + "'>  </button>";
                    //alert(s);
                    //img.setAttribute('src', 'https://inclusio.engynios.com/imagens/'+s);
                    //img.setAttribute('alt', 'imagemmm');
                    // td.onclick= this.pagina;
                    //td.setAttribute('id',''+converter[l*2+p]['id_categoria\\\\']);
                    //td.appendChild(img); //coloca a img no td
                    // td.setAttribute('onclick', '{{pag}}');
                    // alert(td.onclick)
                    var tdReal = document.createElement('td');
                    tdReal.innerHTML = td;
                    tr.appendChild(tdReal);
                }
            }
            document.getElementById('botoes').appendChild(table);
        })
            .catch(function (error) {
            console.log(error.status);
            alert(error.headers);
        });
    };
    HomePage.prototype.pagina = function () {
        alert('entrou');
        try {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__sobre_sobre__["a" /* SobrePage */]);
        }
        catch (e) {
            alert(JSON.stringify(e));
        }
    };
    HomePage.prototype.carrega_palavra = function () {
        var _this = this;
        var teste = {
            id_categoria: 1
        };
        this.http.get(this.endereco_palavras, teste, {})
            .then(function (data) {
            var converter = _this.converte(data.data);
            _this.imagens = [];
            _this.resultados = converter.length;
            // alert(JSON.stringify(converter));
            var table = document.createElement("table"); //cria uma tabela
            table.setAttribute('border', '1');
            for (var l = 0; l < _this.resultados / 2; l++) {
                var tr = document.createElement("tr"); //cria um tr
                table.appendChild(tr); //coloca o tr na tabela
                for (var p = 0; p < 2 && l * 2 + p < converter.length; p++) {
                    var td = document.createElement("td");
                    var img = document.createElement("img");
                    if (converter[l * 2 + p]['imagem\\\\'] == undefined)
                        alert(JSON.stringify(converter[l * 2 + p]));
                    var s = converter[l * 2 + p]['imagem\\\\'].replace(/\"/gi, "");
                    s = s.replace(/\\/gi, "");
                    s = s.replace(/\//gi, "/");
                    img.setAttribute('src', 'https://inclusio.engynios.com/imagens/' + s);
                    img.setAttribute('alt', 'imagemmm');
                    td.setAttribute('id', '' + converter[l * 2 + p]['id_palavra\\\\']);
                    td.appendChild(img); //coloca a img no td
                    td.onclick = _this.sintetizador;
                    tr.appendChild(td);
                }
            }
            document.getElementById('botoes').appendChild(table);
        })
            .catch(function (error) {
            console.log(error.status);
            alert(error);
        });
    };
    /*pushPage()
    {
        

          alert(this.id);
          this.id_cat= this.id;
          let w = document.getElementById('tabela_cat');
          w.remove();
         
         


         
       
    }*/
    HomePage.prototype.sintetizador = function () {
        alert("Aqui entra");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n\n\n	<!--caso a pag não tenha cabeçalho voc apaga tudo (a header e as coisas dentro-->\n\n	   <div  id="topo">\n\n		   <div id="btn_menu">\n\n			<ion-buttons left> \n\n				<button ion-button icon-only menuToggle> \n\n					<p class="menu"><ion-icon name="menu"> </ion-icon></p>\n\n				</button>\n\n\n\n			</ion-buttons>\n\n				</div>\n\n			<div id="titulo">\n\n			<ion-title>\n\n			 <span text-color="fonte-laranja"> Teclado </span>\n\n			</ion-title>\n\n			</div>\n\n		</div>\n\n  	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n  <div id="botoes"> \n\n    <h1>Nossas Categorias</h1>\n\n\n\n  </div>\n\n</div>\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sessionlogin_sessionlogin__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sessionconfiguracoes_sessionconfiguracoes__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_timeout__);
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
    function TutorialPage(navCtrl, navParams, alertCtrl, session_login, session_config, http, storage, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.session_login = session_login;
        this.session_config = session_config;
        this.http = http;
        this.storage = storage;
        this.menu = menu;
        this.campoimg = [];
        this.campocat = [];
        this.mostra_campoimg = true; //começa mostrando o botão para ir para o proximo (campo img - true)
        this.mostra_campocat = false; // e o de categoria nao aparece ainda (campo cat - false)
        this.erroNomePalavra = false;
        // variável que será o src da imagem mostrada (mickey putaço)
        this.imagem = "https://img.olx.com.br/images/86/864708037631038.jpg";
        this.endereco = "https://inclusio.engynios.com/api/insert/palavra.php";
        this.endereco2 = "https://inclusio.engynios.com/api/insert/uniao.php";
        //TESTE
        this.menu1Active();
    }
    //TESTE
    TutorialPage.prototype.menu1Active = function () {
        this.menu.enable(false, 'menu');
    };
    //assim que o component existir capture a sessão do usuário
    TutorialPage.prototype.ngOnInit = function () {
        /* IMPORTANTE!!!
            todas as páginas onde o usuario esta logado
            tem que pegar a session
        */
        var _this = this;
        this.session_login.get().then(function (res) { _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__["a" /* Usuario */](res); });
    };
    /*
        Como o intuíto de um tutorial é ser passo a passo, precisa
        mostrar o primeiro, esconder os demais e depois mostrar o segundo
        e assim sucessivamente
    */
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
        else if (nomepalavra != "") {
            //esta preenchido, pode avançar:
            //primeiro ele coloca o campo imagem na tela
            console.log('this.campoimg', this.campoimg);
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
        //primeiro ele coloca o campo categoria na tela
        console.log('this.campocat', this.campocat);
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
        var txtimg = img.value;
        var categoria = document.getElementById('nomeCategoria');
        var nomecategoria = categoria.value;
        var balao3 = document.getElementById('balao3');
        //ve se todos os campos estao preenchidos
        if (nomepalavra == "" || nomepalavra == null || txtimg == "" || nomecategoria == "") {
            //Lara avisa que esta vazio
            balao3.innerHTML = 'Todos os campos precisam estar preenchidos!';
        }
        else {
            //se esta completamente preechido ele pode colocar no banco
            //1 PARTE DE INCLUIR PALAVRAS: TABELA PALAVRAS
            //pegar o valor da session
            this.session_login.get().then(function (res) {
                _this.usuarioLogado = new __WEBPACK_IMPORTED_MODULE_5__app_models_usuario__["a" /* Usuario */](res);
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
                    //Cadastou na tabela Palavra
                    //2 PARTE DE INCLUIR PALAVRAS: TABELA UNIÃO
                    //cria um objeto com os campos da tabela uniao
                    var objetos_uniao = {
                        id_usuario: _this.usuarioLogado.id_usuario,
                        id_categoria: 1,
                        id_palavra: 1 //isso deve vir do bd
                    };
                    _this.http.post(_this.endereco2, objetos_uniao, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(function (data) {
                        //Cadastou na tabela Uniao	
                        //avisar o fim do tutorial e volta e ao home
                        var alerta = _this.alertCtrl.create({
                            title: 'Tutorial',
                            message: 'Parabéns!! Você adicionou sua primeira palavra! Vamos voltar ao teclado agora',
                            buttons: [{ text: 'Ok', handler: function () { _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]); } }]
                        });
                        alerta.present();
                    }).catch(function (error) {
                        //se deu erro na uniao
                        alert(JSON.stringify(error));
                    });
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
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\tutorial\tutorial.html"*/'﻿<meta charset="utf-8">\n\n\n\n<ion-content class="body" padding>\n\n  <div id="principal">\n\n    <div id="formulario">\n\n      <form action="" >\n\n      \n\n      <div id="linha_form"  >\n\n        <h1>  <ion-icon ios="ios-image" md="md-book"></ion-icon> Palavra</h1>\n\n        <div id="input_form">\n\n          <input type="text" maxlength="50" [(ngModel)]="palavra" name="palavra" id="nomePalavra" placeholder="Meu nome é..." >\n\n          <br>\n\n          <br>\n\n        </div>\n\n      </div> <!--Linha form-->\n\n\n\n      <div id="linha_tutorial" *ngIf="mostra_campoimg" >\n\n        <img src="./assets/imgs/lara.png"  class="lara_tutorial">\n\n        <p class="balao1" id="balao1"> Nesse campo insira o seu nome para cadastra-lo!</p>\n\n        <br>\n\n        <br>\n\n        <button ion-button *ngIf="mostra_campoimg" (click)="aparece_img()" class="botao_tut"> Próximo &nbsp; <ion-icon name="ios-arrow-forward-outline"></ion-icon></button>\n\n        <br>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha tutorial-->\n\n\n\n\n\n      <div id="linha_form" *ngFor="let att of campoimg; ">\n\n        <h1>  <ion-icon ios="ios-image" md="md-image"></ion-icon> Imagem</h1>\n\n        <div id="input_form">\n\n        <input type="text" [(ngModel)]="imagem" (input)="mudaImg()" name="imagem" id="txtimg" placeholder="Sua imagem"><br><br>\n\n        <img [src]="imagem" height="100px">\n\n        </div>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha form-->\n\n\n\n      <div id="linha_tutorial" *ngIf="mostra_campocat" >\n\n        <img src="./assets/imgs/lara.png" class="lara_tutorial">\n\n        <p class="balao2"> Aqui insira uma foto sua!</p>\n\n        <br>\n\n        <br>\n\n        <button ion-button  *ngIf="mostra_campocat" (click)="aparece_cat()" class="botao_tut"> Próximo &nbsp; <ion-icon name="ios-arrow-forward-outline"></ion-icon></button>\n\n        <br>\n\n        <br>\n\n        <br>\n\n      </div> <!--Linha tutorial-->\n\n\n\n\n\n      <div id="linha_form" *ngFor="let att of campocat;">\n\n        <h1>   <ion-icon ios="ios-image" md="md-image"></ion-icon> Categoria</h1>\n\n        <div id="input_form">\n\n          <input type="text"  maxlength="50" id="nomeCategoria"><br><br>\n\n        </div>\n\n        <img src="./assets/imgs/lara.png" class="lara_tutorial">\n\n        <p class="balao3"> Por fim, selecione uma catogoria, eu sugiro "Pessoas" já que você é um humano.</p>\n\n        <br>\n\n        <br>\n\n        <br>\n\n\n\n        <button ion-button round (click)="enviar()" class="botao">Enviar</button>\n\n        <br>\n\n        <br>\n\n        <button ion-button round (click)="limpar()" class="botao">Limpar</button>\n\n     \n\n      </div> <!--Linha form-->\n\n     \n\n      <!--div id="icone">\n\n      <ion-icon [name]="seta()" (click)="mostraPalavras();"></ion-icon>\n\n      <input type="checkbox" name="Categorias" value="Categoria 1" id="categoria1">&nbsp;&nbsp;Categoria 1<br>\n\n      <table id = "palavras"></table><br>\n\n      </div-->\n\n      \n\n       </form>\n\n    \n\n    </div> <!--Formulário-->\n\n  </div> <!--Principal-->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\tutorial\tutorial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sessionlogin_sessionlogin__["a" /* SessionloginProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_sessionconfiguracoes_sessionconfiguracoes__["a" /* SessionconfiguracoesProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro__ = __webpack_require__(93);
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
    function SplashPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.splash_1 = true; // no comeco ele aparece o logo da Lara
        this.splash_2 = true; // depois a logo do inclusio, cti e sorri 
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () { return _this.splash_1 = false; }, 5000); //quando da 5 s ele diz q é falso e some 
        setTimeout(function () { return _this.splash_2 = false; }, 7000); //quando da 7 s ele diz q é falso e some 
    };
    SplashPage.prototype.ir_login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SplashPage.prototype.ir_cadastro = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro__["a" /* CadastroPage */]);
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\splash\splash.html"*/'﻿<meta charset="utf-8">\n\n\n\n<div id="custom-overlay" [style.display]="splash_2 ? \'flex\': \'none\'"> <!--Essa vem depois-->\n\n      <div id="logos">\n\n        <div id="linha_logos">\n\n          <img class="logos_splash" src="../assets/imgs/logo_equipe.png">\n\n          <img class="logos_splash" src="../assets/imgs/logo_sorri.png"> \n\n       </div>\n\n       <ion-grid style="height: 100%">\n\n        <ion-row justify-content-center align-items-center style="height: 100%">\n\n        <img class="logos_splash" src="../assets/imgs/logo_cti.png">\n\n        </ion-row>\n\n      </ion-grid>\n\n       </div>\n\n</div>\n\n\n\n<div id="custom-overlay" [style.display]="splash_1 ? \'flex\': \'none\'"> <!--Essa vem primeiro-->\n\n      <div id="logo_lara">\n\n       <img src="../assets/imgs/logo_lara.png">\n\n      </div>       \n\n</div>\n\n\n\n<ion-content class="body" padding>\n\n\n\n<ion-slides>\n\n\n\n  <ion-slide>\n\n  <div id="caixa">\n\n    <h1 class="h1_inicio">Olá, seja bem-vindo a Lara CAA!</h1>\n\n    <div id="texto_inicio">\n\n    <p class="p_inicio">Um aplicativo de Comunição Aumentativa Alternativa desenvolvido como trabalho de conclusão de curso \n\n    do curso de informática do Colégio Técnico Industrial Isaac Portal Roldán.\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n  <div id="caixa">\n\n    <h1 class="h1_inicio">Flexível</h1>\n\n     <div id="texto_inicio">\n\n    <p class="p_inicio">Seu universo é muito grande para que nós satisfaçamos todas as possibilidades,\n\n    mas não se preocupe, através das muitas opções de personalização, o aplicativo consegue abrager melhor a qualquer realidade!\n\n    <br><br>\n\n    Inclua Palavras, adicione imagens, crie e altere categorias.\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  \n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n    <div id="caixa">\n\n    <h1 class="h1_inicio">Para todas as idades</h1>\n\n     <div id="texto_inicio">\n\n    <p class="p_inicio">Caso as imagens sejam muito infantis e você deseje retirá-las, acesse o menu de configurações\n\n    determine sua preferência sobre o teclado!\n\n    <br><br>\n\n    <b>Deslize para continuar</b> \n\n    </p>\n\n    </div>\n\n  \n\n  </div>\n\n  </ion-slide>\n\n  \n\n  <ion-slide>\n\n   <div id="caixa">\n\n    <h1 class="h1_inicio">VAMOS LÁ!</h1>\n\n     <div id="texto_inicio">\n\n      <button ion-button round (click)="ir_login()" class="botao">LOGIN</button>\n\n      <p class="p_inicio"><br>Ou</p>\n\n      <br>\n\n      <button ion-button round (click)="ir_cadastro()" class="botao">CADASTRE-SE</button>  \n\n    </div>\n\n  \n\n  </div>\n\n    \n\n</ion-slide>\n\n  \n\n</ion-slides>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\splash\splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(54);
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
    function CadastroPage(navCtrl, formBuilder, navParams, http) {
        this.navCtrl = navCtrl;
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
                            alert("Esse usuário já é cadastrado!");
                            _this.limpar();
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
                                alert("Cadastro realizado com sucesso!");
                                //pode ir para o teclado
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                            }).catch(function (error) {
                                alert(JSON.stringify(error));
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-cadastro',template:/*ion-inline-start:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\cadastro\cadastro.html"*/'﻿\n\n<ion-header>\n\n  <ion-navbar color = "inclusio_2">\n\n    <div id="titulo">\n\n	  <ion-title>\n\n	   <span text-color="fonte-laranja"> Cadastro </span>\n\n	  </ion-title>\n\n    </div>\n\n	\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" padding>\n\n \n\n<div id="caixa_cadastro">\n\n	&nbsp; &nbsp;  <p class="icon"><ion-icon ios="ios-person" md="md-person"></ion-icon></p> <!-- <h1>Cadastro</h1>-->\n\n	<form  [formGroup]="cadastroForm" (submit)="cadastro()" novalidate>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n           <div id = "input_form">\n\n		   <div id="texto"> Usuário:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="nome" formControlName="nome" type="textarea" placeholder="Nome do Usuário" clearInput clearOnEdit="false" id="usuario"></ion-input>\n\n            </ion-item>\n\n            \n\n            <h6 *ngIf="errorNome" class="error"> {{messageNome}}</h6>\n\n			<br><br>\n\n            <div id="texto"> E-mail:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="email" formControlName="email"  type="email" placeholder="exemplo@hotmail.com" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n        \n\n            <h6 *ngIf="errorEmail" class="error"> {{messageEmail}}</h6>\n\n			<br><br>\n\n			<div id="texto"> Senha:</div>\n\n            <ion-item>\n\n              <ion-input [(ngModel)]="password" formControlName="password" type="password" placeholder="Senha" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n\n\n            <h6 *ngIf="errorPassword" class="error"> {{messagePassword}}</h6>\n\n			<br><br>\n\n            <div id="texto"> Confirma senha:</div>\n\n            <ion-item>\n\n                <ion-input [(ngModel)]="password_1" formControlName="password_1" type="password" placeholder="Confirma Senha" clearInput clearOnEdit="false"></ion-input>\n\n            </ion-item>\n\n			\n\n            <h6 *ngIf="errorPassword_1" class="error"> {{messagePassword_1}}</h6>\n\n            </div>\n\n          </ion-list>  \n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n      <ion-row>\n\n        <div id="botoes">\n\n          <button ion-button round class="botaoCad" >CADASTRAR</button><br><br>\n\n          <a class ="login" (click)="ir_login()">Já sou cadastrado</a>\n\n          \n\n        </div>\n\n      </ion-row>\n\n	</form>\n\n</div>\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\ra1657100\Desktop\Inclusio\Lara\src\pages\cadastro\cadastro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */]])
    ], CadastroPage);
    return CadastroPage;
}());

//# sourceMappingURL=cadastro.js.map

/***/ })

},[219]);
//# sourceMappingURL=main.js.map