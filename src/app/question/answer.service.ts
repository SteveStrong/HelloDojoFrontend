import { Injectable } from "@angular/core";
import { Toast, EmitterService } from "../shared";
import { HttpClient } from '@angular/common/http';

import { qQuestion } from "../models";

import { Observable, Subject, of  } from "rxjs";
import {
  map,
  catchError
} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http: HttpClient) {
    //EmitterService.registerCommand(this, "ImportCase", this.onImportCase);
    //EmitterService.processCommands(this);
  }

  public postAnswer$(data:any): Observable<any> {

    // const url = `../../assets/data/`;
    // return this.http.post(url, data).pipe(
    //   map(res => {
    //     return data;
    //   }),
    //   catchError(error => {
    //     const msg = JSON.stringify(error, undefined, 3);
    //     Toast.error(error.message, url);
    //     return of<any>();
    //   })
    // );

    let obs = new Subject<any>()
    setTimeout( _ => {
      obs.next("")
    }, 500 );
    return obs;
  }

}
