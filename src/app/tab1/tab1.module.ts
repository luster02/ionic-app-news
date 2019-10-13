import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { FirebaseService } from '../services/firebase.service';
import { DetallesModalPage } from '../pages/detalles-modal/detalles-modal.page';
import { EditModalPage } from '../pages/edit-modal/edit-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, DetallesModalPage, EditModalPage],
  entryComponents: [DetallesModalPage, EditModalPage],
  providers:[
    FirebaseService
  ]
})
export class Tab1PageModule {}
