import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInRoutingModule } from './login-routing.module';

import { LogInComponent } from './login-list/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LogInRoutingModule,

        ReactiveFormsModule
    ],
    declarations: [LogInComponent]
})
export class LogInModule { }
