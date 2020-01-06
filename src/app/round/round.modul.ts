import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import {CommonModule} from '@angular/common';// The modal's component of the previous chapter
import {RoundModal} from './round.component';

@NgModule({
     declarations: [
      RoundModal
     ],
     imports: [
       IonicModule,
       CommonModule,
       FormsModule
     ],
     entryComponents: [
      RoundModal
     ]
})
export class RoundModalModule {}