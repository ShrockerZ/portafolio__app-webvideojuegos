import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar-tag/sidebar.component';
import { SidebarPlatformComponent } from './sidebar-platform/sidebar-platform.component';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarPlatformComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    SidebarComponent,
    SidebarPlatformComponent
  ]
})
export class GameComponentModule { }
