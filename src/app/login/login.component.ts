import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = fb.group({
      userName: ["", Validators.required, this.lengthValidation]
    });
  }

  ngOnInit() {
  }

  lengthValidation(formcontrol) {
    if (formcontrol.value.length > 3) {
      return { "userName": true };
    }
  }

  questionPrep() {
    alert("ready to nav")
  }

}
