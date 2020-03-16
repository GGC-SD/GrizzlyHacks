import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../environments/environment';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [ AngularFirestore ]
})
export class FireBaseStuffModule { }
