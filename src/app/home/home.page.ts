import { Component } from '@angular/core';

import { ModalController} from '@ionic/angular';
import { RoundModal } from '../round/round.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private player: string[] = [];
  private points: Object[] = [];

  constructor(public modalCtrl: ModalController) {
    this.player[0] = "Klaus";
    this.player[1] = "Bernd";
    this.player[2] = "Uwe";
    this.player[3] = "Wenzi";
  }

  public async addRound() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: RoundModal,
        componentProps: {
          player: this.player
        }
      });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data) {
        let result = detail.data;
        
        let newPoints = {
          points:0,
          result: null
        };

        let currentPoints = {};
        if(this.points.length > 0) {
          currentPoints = this.points[this.points.length - 1];
        }  else {
          this.player.forEach(p => {
            currentPoints[p] = 0;
          });
        }    

        this.player.forEach(p => {
          if(result.role[p] === 1) {
            newPoints[p] = currentPoints[p] + result.re.result;
          } else if(result.role[p] === 2) {
            newPoints[p] = currentPoints[p] + result.contra.result;
          } else {
            newPoints[p] = currentPoints[p];
          }
        });

        newPoints.points = Math.abs(result.re.result);
        newPoints.result = result;

        this.points.push(newPoints);
      }
    });

    await modal.present();
  }

}
