//Módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


//componentes

import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

//servicios
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';


@NgModule({
	declarations: [
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		FontAwesomeModule,
		AdminRoutingModule
	],
	exports: [
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent
	],
	providers: [
	AdminGuard,
	UserService
	]
})
export class AdminModule {
	 constructor() {
    library.add(fas, far);
  }
}