import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {IconsModule, MDBBootstrapModule, NavbarModule} from "angular-bootstrap-md";

@NgModule({
  declarations: [
    NavbarComponent,
    SideMenuComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    IconsModule
  ]
})
export class SharedModule { }
