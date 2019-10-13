import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.page.html',
  styleUrls: ['./detalles-modal.page.scss'],
})
export class DetallesModalPage implements OnInit {
  @Input() notice: {};
  noticeInput: any;
  constructor(public modalCtrl: ModalController,
              public navParams: NavParams
    ) { 
      this.noticeInput = navParams.get('notice')
    }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
