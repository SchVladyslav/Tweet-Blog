import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email-list/verify-email.component';

@NgModule({
    imports: [
        CommonModule,
        VerifyEmailRoutingModule
    ],
    declarations: [VerifyEmailComponent]
})
export class VerifyEmailModule { }
