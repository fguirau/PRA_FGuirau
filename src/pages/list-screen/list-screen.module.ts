import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListScreenPage } from './list-screen';

@NgModule({
  declarations: [
    ListScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ListScreenPage),
  ],
})
export class ListScreenPageModule {}
