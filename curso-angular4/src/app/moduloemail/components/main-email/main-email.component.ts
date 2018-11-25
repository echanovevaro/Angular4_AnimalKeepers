import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-email',
  template:`
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{title}}</h4>
    	<mostrar-email></mostrar-email>
      <guardar-email></guardar-email>
     </div>
  </div>
  	`
})
	export class MainEmailComponent implements  OnInit {
	  title = 'Módulo email';

    ngOnInit(){
      console.log("componente principal del módulo cargado");
    }

}
