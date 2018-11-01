webpackJsonp([0],{

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InserecodPageModule", function() { return InserecodPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inserecod__ = __webpack_require__(321);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InserecodPageModule = /** @class */ (function () {
    function InserecodPageModule() {
    }
    InserecodPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__inserecod__["a" /* InserecodPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__inserecod__["a" /* InserecodPage */]),
            ],
        })
    ], InserecodPageModule);
    return InserecodPageModule;
}());

//# sourceMappingURL=inserecod.module.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InserecodPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inseresenha_inseresenha__ = __webpack_require__(113);
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
 * Generated class for the InserecodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InserecodPage = /** @class */ (function () {
    function InserecodPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InserecodPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InserecodPage');
    };
    InserecodPage.prototype.ir_inseresenha = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__inseresenha_inseresenha__["a" /* InseresenhaPage */]);
    };
    InserecodPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-inserecod',template:/*ion-inline-start:"C:\Users\ivanp\Desktop\Estudos\CTI\Tecnico\TCC\Lara-ApresentacaoFinal.bkp\src\pages\inserecod\inserecod.html"*/'﻿<meta charset="utf-8">\n\n\n\n<ion-content class="body" padding>\n\n \n\n	<div id="principal">\n\n\n\n  <!--Aqui é o modelo para os formularios-->\n\n  \n\n    <div id="formulario">\n\n    \n\n    <div id="linha_form">\n\n     \n\n     <h1><ion-icon name="md-key"></ion-icon>&nbsp;Código</h1> \n\n   \n\n   \n\n      <div id="input_form">\n\n      	<form action="">\n\n    			<textarea rows="1" cols="20" maxlength="500" required></textarea>\n\n          <br>\n\n          <br>\n\n  				<input type="submit" class="botao" (click)="ir_inseresenha()" value="Ok">\n\n  			</form>\n\n      </div> <!-- input_form -->\n\n    	\n\n    </div> <!-- linha_form -->\n\n    \n\n   </div> <!-- formulario -->\n\n  \n\n  </div> <!--principal-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\ivanp\Desktop\Estudos\CTI\Tecnico\TCC\Lara-ApresentacaoFinal.bkp\src\pages\inserecod\inserecod.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], InserecodPage);
    return InserecodPage;
}());

//# sourceMappingURL=inserecod.js.map

/***/ })

});
//# sourceMappingURL=0.js.map