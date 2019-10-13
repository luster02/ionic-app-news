import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Notice } from '../models/notice';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private noticeCollection: AngularFirestoreCollection;
  notice: Observable<any[]>;
  noticeDoc: AngularFirestoreDocument<Notice>;
  categoria$;
  constructor(private db: AngularFirestore) {
    //this.noticeCollection = this.db.collection<Notice>('news');
    this.noticeCollection = this.db.collection<Notice>('news');
    this.notice = this.noticeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Notice;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
   }

  getNotice(){
    this.noticeCollection = this.db.collection<Notice>('news');
    this.notice = this.noticeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
        const data = a.payload.doc.data() as Notice;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    )
    return this.notice;
  }
  onlyOne(categoria){
    this.categoria$ = this.db.collection('news', ref => ref.where('category', '==', categoria)).valueChanges();
    return  this.categoria$;
  }
  addNotice(notice:Notice){
    return this.noticeCollection.add(notice);
  }
  deleteNotice(notice:Notice){
    this.noticeDoc = this.db.doc(`news/${notice.id}`);
    return this.noticeDoc.delete();
  }

  update(notice:Notice){
    this.noticeDoc = this.db.doc(`news/${notice.id}`);
    return this.noticeDoc.update(notice);
  }

}
