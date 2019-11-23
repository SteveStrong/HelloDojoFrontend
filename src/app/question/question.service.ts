import { Injectable } from "@angular/core";
import { Toast, EmitterService } from "../shared/emitter.service";
import { HttpClient } from '@angular/common/http';

import { qQuestion } from "../models";

import { Observable, of } from "rxjs";
import {
  map,
  catchError
} from "rxjs/operators";

interface iQuiz {
  quizTitle: string;
  questions: Array<qQuestion>
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  title: string;
  questionList: Array<qQuestion>;
  currentQuestionId = 0;

  constructor(
    private http: HttpClient) {
    //EmitterService.registerCommand(this, "ImportCase", this.onImportCase);
    //EmitterService.processCommands(this);
  }

  public firstQuestion(): qQuestion {
    this.currentQuestionId = 0;
    let q = this.questionList[this.currentQuestionId];
    return q;
  }

  public nextQuestion(): qQuestion {
    this.currentQuestionId++;
    if ( this.currentQuestionId > this.questionList.length) {
      this.currentQuestionId = 0;
    }
    let q = this.questionList[this.currentQuestionId];
    return q;
  }

  private createQuizModel(questions: Array<qQuestion>): Array < qQuestion > {
  const list = new Array<qQuestion>();
  questions.forEach(q => {
    list.push(new qQuestion(q));
  })
    return list;
}

  public getQuestions$(): Observable < any > {
  const filename = 'questions.json'
    const url = `../../assets/data/${filename}`;
  return this.http.get<iQuiz>(url).pipe(
    map(res => {
      this.title = res.quizTitle
      this.questionList = this.createQuizModel(res.questions)

      Toast.success("loaded!", filename);

      return filename;
    }),
    catchError(error => {
      const msg = JSON.stringify(error, undefined, 3);
      Toast.error(error.message, url);
      return of<any>();
    })
  );
}
}
