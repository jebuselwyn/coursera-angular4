import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  '[@expand]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: String;
  promotionErrMess: String;
  leaderErrMess: String;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

  this.dishservice.getFeaturedDish().subscribe(
    featureddish => this.dish = featureddish,
    errMess => this.dishErrMess = errMess); 
	this.promotionservice.getFeaturedPromotion().subscribe(
    featuredPromotion => this.promotion = featuredPromotion,
    errMess => this.promotionErrMess = errMess); 
	this.leaderService.getFeaturedLeader().subscribe(
  	featuredLeader => this.leader = featuredLeader,
    errMess => this.leaderErrMess = errMess);
  }

}