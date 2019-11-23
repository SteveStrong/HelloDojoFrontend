import { Component, OnInit, OnDestroy } from '@angular/core';
import { Toast, EmitterService, SubSink } from "../shared";

import { QuestionService } from "./question.service";
import { AnswerService } from "./answer.service";

import { qQuestion } from '../models';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  sub: SubSink = new SubSink();
  current: qQuestion = new qQuestion({question:'loading'})

  constructor(
    private qService: QuestionService,
    private aService: AnswerService) {
  }

  ngOnInit() {

    let s1 = this.qService.getQuestions$().subscribe(filename => {
      this.current = this.qService.firstQuestion()
    })

    this.sub.add(s1)

    //EmitterService.registerCommand(this, "RefreshDisplay", this.onRefreshDisplay);
    //EmitterService.processCommands(this);

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  postAndNavigate(data:any){
    let s1 = this.aService.postAnswer$(data).subscribe(result =>{
      this.current = this.qService.nextQuestion()
    })
    this.sub.add(s1)
  }

  doPostTrue() {
    let data = {
      id: this.current.Id,
      answer: true,
      user: 'user'
    }
    this.postAndNavigate(data)
  }

  doPostFalse() {
    let data = {
      id: this.current.Id,
      answer: false,
      user: 'user'
    }
    this.postAndNavigate(data)
  }

}
