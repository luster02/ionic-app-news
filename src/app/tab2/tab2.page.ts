import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Notice } from '../models/notice';
import { FirebaseService } from '../services/firebase.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notice:Notice = new Notice();
  alert;
  constructor(public alertController: AlertController,
              public firebaseService: FirebaseService,
              public router: Router
    ) {}

  async sendForm(form:NgForm){
    if(form.invalid){
      const alert = await this.alertController.create({
        header: 'Error',

        message: 'Form invalid',
        buttons: ['OK']
      });
  
      await alert.present();
      return
    }else{
      this.notice = form.value
      this.firebaseService.addNotice(this.notice)
        .then(async()=>{
          this.alert = await this.alertController.create({
            header: 'Success',
    
            message: 'Notice created.',
            buttons: ['OK']
          });
      
          await this.alert.present();
          this.router.navigateByUrl('/');
          console.log(form.value);
        })
      
    }
  }

}
