import { Component, OnInit, OnDestroy } from '@angular/core';
import { Toast, EmitterService } from "../shared/emitter.service";

import { QuestionService } from "./question.service";
import { AnswerService } from "./answer.service";

import { qQuestion } from '../models';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  sub: any;
  current: qQuestion = new qQuestion({question:'loading'})

  constructor(
    private qService: QuestionService,
    private aService: AnswerService) {
  }

  ngOnInit() {

    this.sub = this.qService.getQuestions$().subscribe(filename => {
      this.current = this.qService.firstQuestion()
    })

    //EmitterService.registerCommand(this, "RefreshDisplay", this.onRefreshDisplay);
    //EmitterService.processCommands(this);

  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  doPostTrue() {
    let data = {
      id: this.current.Id,
      answer: true,
      user: 'user'
    }
    //this.aService.postAnswer$(data).subscribe(result =>{
      this.current = this.qService.nextQuestion()
    //})
  }

  doPostFalse() {
    let data = {
      id: this.current.Id,
      answer: false,
      user: 'user'
    }
    //this.aService.postAnswer$(data).subscribe(result =>{
      this.current = this.qService.nextQuestion()
    //})
  }

}
