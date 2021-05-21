import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logForm:FormGroup
  constructor(
    private _authService:AuthService,
    private _formBuldier:FormBuilder,
    private _router:Router
  ) {
    // forms
    this.logForm= this._formBuldier.group({
      user:['',[Validators.required]],
      password:['',[Validators.required]]
    });
   }

  ngOnInit(): void {
    this._authService.logOutUser();
  }
  loginForm(){
    if(this.logForm.valid){
      this._authService.loginUser(this.logForm.value);
    }else{
      Object.values(this.logForm.controls).forEach(control=>control.markAsTouched);
    }
  }

}
