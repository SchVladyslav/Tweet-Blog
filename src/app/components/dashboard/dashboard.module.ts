import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard-list/dashboard.component';

import { NavComponent } from '../nav/nav.component';
import { SuggestionsComponent } from '../suggestions/suggestions.component';
import { PostComponent } from '../post/post.component';
import { ModalModule } from 'src/app/_modal';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule
    ],
    declarations: [
        NavComponent,
        SuggestionsComponent,
        PostComponent,
        DashboardComponent,
    ]
})
export class DashboardModule { }
