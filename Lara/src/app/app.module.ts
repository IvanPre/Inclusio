import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//banco:
import { HTTP } from '@ionic-native/http';

//sintetizador:
import { TextToSpeech } from '@ionic-native/text-to-speech';

//Camera
import { Camera } from '@ionic-native/camera';

//session:
import { IonicStorageModule } from '@ionic/storage';
import { SessionloginProvider } from '../providers/sessionlogin/sessionlogin';
import { SessionconfiguracoesProvider } from '../providers/sessionconfiguracoes/sessionconfiguracoes';

//paginas do app:
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//paginas de fora
import { SplashPage } from '../pages/splash/splash'; //splash

//login
import { LoginPage } from '../pages/login/login'; 
import { EsquecisenhaPage } from '../pages/esquecisenha/esquecisenha'; //esquecisenha
//cadastro
import { CadastroPage } from '../pages/cadastro/cadastro';

//paginas de dentro:
//tutorial
import { TutorialPage } from '../pages/tutorial/tutorial'; 
import { PerfilPage } from  '../pages/perfil/perfil'; //criar categoria
import { CriarcatPage } from  '../pages/criarcat/criarcat'; //criar categoria
import { CriarpalPage } from  '../pages/criarpal/criarpal'; //criar categoria
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes'; //configuracoes
import { AjudaPage } from '../pages/ajuda/ajuda'; //configuracoes
import { SobrePage } from '../pages/sobre/sobre'; //configuracoes
import { SairPage } from '../pages/sair/sair'; //sair
import {InseresenhaPage} from '../pages/inseresenha/inseresenha';
import {AlteradadosPage} from '../pages/alteradados/alteradados';


@NgModule(
{
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    LoginPage,
    EsquecisenhaPage,
    CadastroPage,
    CriarcatPage,
    CriarpalPage,
    ConfiguracoesPage,
    AjudaPage,
    SobrePage,
    PerfilPage,
    SairPage,
    InseresenhaPage,
    AlteradadosPage,
    TutorialPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot() // import do pacote IonicStorageModule -> session

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    LoginPage,
    EsquecisenhaPage,
    CadastroPage,
    CriarcatPage,
    CriarpalPage,
    ConfiguracoesPage,
    AjudaPage,
    SobrePage,
    PerfilPage,
    SairPage,
    InseresenhaPage,
    AlteradadosPage,
    TutorialPage
  ],
  providers: [
  	 HTTP, //banco
    StatusBar,
    SplashScreen,
    SessionloginProvider, //session
    TextToSpeech, //sintetizador
    SessionconfiguracoesProvider, //session
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
