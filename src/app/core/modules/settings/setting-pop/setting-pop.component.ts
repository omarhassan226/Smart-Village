import { Component, OnInit, Input, Output, EventEmitter, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-setting-pop',
  templateUrl: './setting-pop.component.html',
  styleUrls: ['./setting-pop.component.css']
})
export class SettingPopComponent implements OnInit {
  @ViewChildren(DxValidatorComponent) validatorViewChildren: QueryList<DxValidatorComponent>;
  @ViewChild('questionEnValidatorRef', { static: true }) questionEnValidatorRef: DxValidatorComponent;
  @ViewChild('questionEnAnswerValidatorRef', { static: true }) questionEnAnswerValidatorRef: DxValidatorComponent;
  @ViewChild('questionArValidatorRef', { static: true }) questionArValidatorRef: DxValidatorComponent;
  @ViewChild('questionArAnswerValidatorRef', { static: true }) questionArAnswerValidatorRef: DxValidatorComponent;

  @Output() OnHiding: EventEmitter<any> = new EventEmitter<any>();
  @Output() addQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() EditQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSettingsPopupVisible: boolean;
  @Input() popTitle : String;

  question_en = '';
  answer_en = '';
  question_ar = '';
  answer_ar = '';

  constructor() { }

  ngOnInit(): void {
  }
  
  resetForm = () => {
    this.question_en = '';
    this.answer_en = '';
    this.question_ar = '';
    this.answer_ar = '';
  }
  patchform = (data) => {
    this.question_en =  data.question_en;
    this.answer_en =   data.answer_en;
    this.question_ar = data.question_ar;
    this.answer_ar = data.answer_ar;
  }
  handleData = () => {
    if (!this.question_en || !this.answer_en || !this.question_ar || !this.answer_ar  ) {
      return
    } else {
      let questionObj = {
        question_en : this.question_en,
        answer_en : this.answer_en,
        question_ar : this.question_ar,
        answer_ar : this.answer_ar,
      }
      if(this.popTitle == 'أضافة سوال') {
       
        this.addQuestion.emit(questionObj);
      } else {
        this.EditQuestion.emit(questionObj)
      }
  
    }
   
  }
  clearDxValidators = () => {
    this.validatorViewChildren.toArray().map(ref => {
      ref.instance.reset();
    })
  }

}
