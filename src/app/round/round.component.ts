import { Component } from '@angular/core';
import { RoundResult } from 'src/core/RoundResult';
import { ModalController } from '@ionic/angular';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
@Component({
  templateUrl: 'round.component.html',
  styleUrls: ['./round.component.scss'],
  selector: 'round'
})
export class RoundModal {
  private result = {
    "role": {
    },
    "re": new RoundResult(),
    "contra": new RoundResult()
  };

  constructor(public modalCtrl: ModalController) {
    this.result.contra.gegen = true;
  }

  private getPointsStep(winner: RoundResult, looser: RoundResult, step: number): number {
    let punkte = 0;
    if (looser.punkte <= step) {
      punkte++;
      if (winner.ansage !== undefined && winner.ansage <= step) {
        punkte++;
      }
    }

    return punkte;
  }

  private calcCardPoints(winner: RoundResult, looser: RoundResult): number {
    let punkte = 0;
    if (looser.punkte <= 120) {
      	punkte++;
    }
    punkte += this.getPointsStep(winner, looser, 90);
    punkte += this.getPointsStep(winner, looser, 60);
    punkte += this.getPointsStep(winner, looser, 30);
    punkte += this.getPointsStep(winner, looser, 0);

    return punkte;
  }

  private calcSpecialPoints(result: RoundResult): number {
    let points: number = 0;

    if (result.fuchs[0]) {
      points++;
    }

    if (result.fuchs[1]) {
      points++;
    }

    if (result.karl) {
      points++;
    }

    if (result.fuchsAmPin) {
      points += 3;
    }

    if (result.gegen && result.punkte >= 120) {
      points++;
    }

    points += result.doppelkopf;

    return points;
  }

  private calcPoints() {
    let reSpecialPoints = this.calcSpecialPoints(this.result.re);
    let contraSpecialPoints = this.calcSpecialPoints(this.result.contra);

    let winnerPoints = 0;
    if (this.result.re.punkte > 120 && (this.result.re.ansage === null || this.result.re.ansage > this.result.contra.punkte)) {
      winnerPoints = this.calcCardPoints(this.result.re, this.result.contra);
      winnerPoints += reSpecialPoints - contraSpecialPoints;

      if(this.result.re.ansage<=120) {
        winnerPoints *= 2;
      }

      this.result.re.result = winnerPoints;
      this.result.contra.result = -1 * winnerPoints;
    } else {
      winnerPoints = this.calcCardPoints(this.result.contra, this.result.re);
      winnerPoints += contraSpecialPoints - reSpecialPoints;

      if(this.result.contra.ansage<=120) {
        winnerPoints *= 2;
      }

      this.result.contra.result = winnerPoints;
      this.result.re.result = -1 * winnerPoints;
    }

  }

  public onRePointsChanged() {
    this.result.contra.punkte = 240 - this.result.re.punkte;
  }

  public onContraPointsChanged() {
    this.result.re.punkte = 240 - this.result.contra.punkte;
  }

  public toogleRole(p) {
    this.result.role[p] = ((this.result.role[p] || 0) + 1) % 3;
  }

  public getRole(p) {
    if (!this.result.role[p]) {
      return '-';
    } else if (this.result.role[p] === 1) {
      return 'Re';
    } else {
      return 'Contra';
    }
  }


  public save() {
    this.calcPoints();
    this.modalCtrl.dismiss(this.result);
  }


}