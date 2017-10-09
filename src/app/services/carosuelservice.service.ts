import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CarosuelService {

  constructor(private http: Http) { }

  /**
   * Fetches slides data through http call
   * @return {Observable<any>} return observable
   */
  getCarosuelData(): Observable<any> {
    return this.http.get('../../assets/slidedata.json')
    .map(response => response.json())
    .catch((res: Response) => this.onRequestError(res));
  }

  /**
   * Handles any http request error.
   * @param {Response} res Error object
   * @returns Observable of Error object
   * @memberof BookingService
   */

  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.statusText;
    const error = {
      statusCode: statusCode,
      message: body
    };
    return Observable.throw(error);
  }

}
