import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarcategoriaPage } from './listarcategoria';
import { EditarcategoriaPage } from '../editarcategoria/editarcategoria';
@NgModule({
  declarations: [
    ListarcategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarcategoriaPage),
  ],
})
export class ListarcategoriaPageModule {}
