import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
     // return Observable.of(LEADERS).delay(2000).toPromise();
 }
  
  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders',id).get();
     // return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000).toPromise();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured:true}).map(leaders => leaders[0]);
    // return Observable.of(LEADERS.filter((leader) => (leader.featured === true))[0]).delay(2000).toPromise();
  }
}
