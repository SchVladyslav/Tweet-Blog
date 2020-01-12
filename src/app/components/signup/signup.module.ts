import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup-list/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SignUpRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SignUpComponent]
})
export class SignUpModule { }
