import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup
  constructor( 
      private _formBuldier:FormBuilder,
      private _authService:AuthService)
       { 
    // forms
    this.regForm= this._formBuldier.group({
      user:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  registerForm(){
    if(this.regForm.valid){
      this._authService.registerUser(this.regForm.value);
    }else{
      Object.values(this.regForm.controls).forEach(control=>control.markAsTouched);
    }
    
  }
}
