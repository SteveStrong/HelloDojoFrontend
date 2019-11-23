import { Component, OnInit, OnDestroy } from '@angular/core';
import { Toast, EmitterService } from "../shared/emitter.service";

import { QuestionService } from "./question.service";
import { qQuestion } from '../models';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  sub: any;
  current: qQuestion;

  constructor(private qService: QuestionService) {}

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

  doPostTrue(){
    this.current = this.qService.nextQuestion()
  }

  doPostFalse(){
    this.current = this.qService.nextQuestion()
  }

}
