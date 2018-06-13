import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuScreenPage } from './menu-screen';

@NgModule({
  declarations: [
    MenuScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuScreenPage),
  ],
})
export class MenuScreenPageModule {}
