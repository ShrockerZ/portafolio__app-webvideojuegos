import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppState } from 'src/app/AppState';
import { User } from 'src/app/auth/interface/user.interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  loading:boolean=true;
  user:User|null=null;
  constructor(
    private _userService:UserService,
    private _store:Store<AppState>,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {
    this.spinner.show()
    this._store.select('session').subscribe(
      state=>{
        this.user=state.user;
        this.loading=state.loading;
      });
  }
  removeWishList(id:number){
    this._userService.removeWishlist(id);
  }

}
