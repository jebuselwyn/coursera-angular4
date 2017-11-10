import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService} from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: Http,
              private processHTTPMsgService: ProcessHttpmsgService) { }
  
  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) });
     // return Observable.of(DISHES.map(dish => dish.id ));
  }
  getDishes(): Observable<Dish[]> {
  	return this.http.get(baseURL + 'dishes').map(res => {return this.processHTTPMsgService.extractData(res)});
    // return Observable.of(DISHES).delay(2000).toPromise();
  }

  getDish(id: number): Observable<Dish> {
   	return this.http.get(baseURL + 'dishes/'+id).map(res => {return this.processHTTPMsgService.extractData(res)});
   // return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000).toPromise();
  }

  getFeaturedDish(): Observable<Dish> {
   	return this.http.get(baseURL + 'dishes?featured=true').map(res => {return this.processHTTPMsgService.extractData(res)});
    // return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000).toPromise(); 
  }
}