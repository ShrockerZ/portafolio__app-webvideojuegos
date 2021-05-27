import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { User } from 'src/app/auth/interface/user.interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user:User | null;
  formUser:FormGroup;
  constructor(
    private _store:Store<AppState>,
    private _fb:FormBuilder,
    private _userService:UserService
  ) { 
    // form builder
    this.formUser= this._fb.group({
      user:['',[Validators.required]],
      name:['',[Validators.required]],
      password:['',[Validators.required]],
      phrase:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this._store.select('session').subscribe(
      state=>this.user=state.user
    );
  }

  onSubmitFormUser(){
    if(this.formUser.valid){
      const {user,name,password,phrase}= this.formUser.value;
      console.log("formulario es valido para envio ")
      const updateUser:User={
        user,name,password,phrase
      }
      console.log(updateUser);
      this._userService.updateUser(updateUser);
    }else{
      Object.values(this.formUser.controls).forEach(control=>control.markAsTouched);
    }
  }

}
