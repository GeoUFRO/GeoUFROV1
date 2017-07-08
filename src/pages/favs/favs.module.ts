import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Favs } from './favs';

@NgModule({
  declarations: [
    Favs,
  ],
  imports: [
    IonicPageModule.forChild(Favs),
  ],
  exports: [
    Favs
  ]
})
export class FavsModule {}
