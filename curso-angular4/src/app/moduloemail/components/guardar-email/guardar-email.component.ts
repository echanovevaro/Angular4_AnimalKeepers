import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'guardar-email',
  template:`
  	<div>
	  	<h6>{{title}}</h6>
		<div class="input-group">
	  		<div class="input-group-prepend">
				<button class="btn btn-outline-secondary" type="button" (click)="guardarEmail()">Guardar email</button>
	  		</div>
	  		<input class="form-control" [(ngModel)]="emailContacto"/>
		</div>
	</div>
  	`
})
	export class GuardarEmailComponent  {
	  title = 'Guardar email';
	  emailContacto: string;
	


	guardarEmail(){
  	 localStorage.setItem('emailContacto', this.emailContacto);
  	}
}

