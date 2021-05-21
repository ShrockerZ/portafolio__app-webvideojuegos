import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout/layout.component';
import { LibraryComponent } from './library/library.component';
import { AccountComponent } from './account/account.component';
import { StoreComponent } from './store/store.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    { path: '', component:LayoutComponent , 
        children:[
            { path: 'library',  component: LibraryComponent },
            { path: 'account',  component: AccountComponent},
            { path: 'store',    component: StoreComponent },
            { path: 'detail/:id',   component: DetailComponent },
    
        ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {}
