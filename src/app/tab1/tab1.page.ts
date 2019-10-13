import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { FirebaseService } from '../services/firebase.service';
import { DetallesModalPage } from '../pages/detalles-modal/detalles-modal.page';
import { EditModalPage } from '../pages/edit-modal/edit-modal.page';

import { Notice } from '../models/notice';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  more: boolean = false;
  notices: Notice[] = [];
  selectNotice: any;
  edit: boolean = false;
  conf;
  constructor(public firebaseService: FirebaseService,
              public modalController: ModalController,
              public alertController: AlertController
  ) {}

  ngOnInit(){
    this.getNotice();
  }

  showMore(){
    if(this.more==true){
      this.more = false;
    }else{
      this.more = true;
    }
  }

  getNotice(){
    this.firebaseService.getNotice()
      .subscribe(notices =>{
        this.notices = notices;
      });
  }

  getOneNotice(categoria){
    this.firebaseService.onlyOne(categoria)
      .subscribe(async (notices:[]) =>{
        if(notices.length<=0){
          const alert = await this.alertController.create({
            header: 'Not results',
            message: `Not find result of ${categoria}.`,
            buttons: ['OK']
          });
          await alert.present();
        }else{
          this.notices = notices;
        } 
    })
  }

  async editNotice(notice:Notice){
    this.selectNotice= notice
    const modal = await this.modalController.create({
      component: EditModalPage,
      componentProps: {
        "notice": this.selectNotice
      }
    });
    return await modal.present();
  }

  async delete(notice){
    const alert = await this.alertController.create({
      header: 'Delete!',
      message: 'Are you sure that delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.firebaseService.deleteNotice(notice)
              .then(async()=>{
                this.conf = await this.alertController.create({
                  header: 'Success',
                  message: 'notice deleted.',
                  buttons: ['OK']
                });
                await this.conf.present();
                this.getNotice();
              })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async settings(){
    if(this.edit == true){
      const alert = await this.alertController.create({
        header: 'Settings',
        message: 'Settings is disabled.',
        buttons: ['OK']
      });
      await alert.present();
      this.edit = false
    }else{
      const alert = await this.alertController.create({
        header: 'Settings',
        message: 'Settings is available.',
        buttons: ['OK']
      });
      await alert.present();
      this.edit = true;
    }
  }

  async showDetails(notice:any){
    this.selectNotice= notice
    const modal = await this.modalController.create({
      component: DetallesModalPage,
      componentProps: {
        "notice": this.selectNotice
      }
    });
    return await modal.present();
  }
}
