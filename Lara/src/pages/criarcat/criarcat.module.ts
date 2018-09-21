import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarcatPage } from './criarcat';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    CriarcatPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarcatPage),
  ],
})
export class CriarcatPageModule {}
