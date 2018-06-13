import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailScreenPage } from './detail-screen';

@NgModule({
  declarations: [
    DetailScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailScreenPage),
  ],
})
export class DetailScreenPageModule {}
