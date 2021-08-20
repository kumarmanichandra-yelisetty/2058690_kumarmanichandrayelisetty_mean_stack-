import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quizService';
import { Question } from '../questionsModel';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  myForm: FormGroup;
  allQuestions: Array<Question> = new Array();
  finalScore: number = 0;
  started: Boolean = true;
  ended: Boolean = false;
  passed: Boolean = false;
  failed: Boolean = false;
  graded: Boolean = false;
  status: String = "";

  constructor(public testSer: QuizService, public form: FormBuilder) {
    this.myForm = form.group({});
  }
  ngOnInit(): void {
    this.testSer.checkUserQuestion().subscribe(results => {
      let tempQ = results;
      tempQ.forEach(qq => this.allQuestions.push(qq));
      this.allQuestions.forEach(qqq => this.myForm.addControl(qqq.id, this.form.control("")));
    })
  }

  gradeTest() {
    let userAnswer = this.myForm.value;
    for (let i = 1; i < this.allQuestions.length + 1; ++i) {
      if (userAnswer[i] == this.allQuestions[i - 1].correct) {
        ++this.finalScore;
      }
    }

    if (this.finalScore >= 6) {
      this.passed = true;
      this.failed = false;
      this.status = "PASSED";
    }
    else {
      this.passed = false;
      this.failed = true;
      this.status = "FAILED";
    }
    this.endTest();
  }

  endTest() {
    this.ended = true;
    this.graded = true;
  }
}
