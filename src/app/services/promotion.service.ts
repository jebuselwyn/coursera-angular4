import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Observable.of(PROMOTIONS).toPromise();
  }

  getPromotion(id: number): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Observable.of(PROMOTIONS.filter((promo) => (promo.featured === true))[0]).toPromise();
  }
}