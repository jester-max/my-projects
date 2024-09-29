import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePanelPageRoutingModule } from './home-panel-routing.module';

import { HomePanelPage } from './home-panel.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePanelPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HomePanelPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePanelPageModule {}
