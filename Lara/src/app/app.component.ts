﻿import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
// import { TutorialPage } from '../pages/tutorial/tutorial';
import { PerfilPage } from  '../pages/perfil/perfil'; //criar categoria
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes'; //configuracoes
import { CriarcatPage } from '../pages/criarcat/criarcat'; //criarcat
import { CriarpalPage } from '../pages/criarpal/criarpal'; //criarcat
import { SobrePage } from '../pages/sobre/sobre'; //configuracoes
import { SairPage } from '../pages/sair/sair'; //sair
import { AjudaPage } from '../pages/ajuda/ajuda'; //configuracoes
import { TutorialPage } from '../pages/tutorial/tutorial'; //configuracoes
import {AlteradadosPage} from '../pages/alteradados/alteradados';
import {InseresenhaPage} from '../pages/inseresenha/inseresenha';
import {AlterarpalavrasPage} from '../pages/alterarpalavras/alterarpalavras';
import {ListarcategoriaPage} from '../pages/listarcategoria/listarcategoria';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

    rootPage: any = SplashPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Criar Categorias', component: CriarcatPage },
      { title: 'Criar Palavras', component: CriarpalPage },
      { title: 'Alterar Categorias', component: ListarcategoriaPage},
      { title: 'Alterar Palavras', component: AlterarpalavrasPage},
      { title: 'Configurações', component: ConfiguracoesPage },
      { title: 'Ajuda', component: AjudaPage },
      { title: 'Sobre', component: SobrePage },
      { title: 'Sair', component: SairPage }
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
