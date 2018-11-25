import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { routing, appRoutingProviders } from './app.routing';

//Importar nuestro módulo
import { ModuloEmailModule} from './moduloemail/moduloemail.module';

// Componentes
import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    AnimalsComponent,
    HomeComponent,
    ContactComponent,
    KeepersComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    FontAwesomeModule,
    ModuloEmailModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    library.add(fas, far);
  }
}
