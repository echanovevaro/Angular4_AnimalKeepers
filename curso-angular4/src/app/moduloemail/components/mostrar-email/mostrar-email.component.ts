import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template:`
	<div *ngIf="emailContacto">
		<h6>{{title}}</h6>
		<div class="input-group">
			<div class="input-group-prepend">
				<label class="input-group-text">Email</label>
			</div>
  			<input class="form-control disabled" value="{{emailContacto}}"/>
  			<div class="input-group-append">
				<button class="btn btn-outline-secondary" type="button" (click)="borrarEmail()">Eliminar</button>
			</div>
		</div>
		<hr/>
	</div>
			`
})
	export class MostrarEmailComponent implements DoCheck, OnInit {
	  title = 'Mostrar email';
	  emailContacto: string;
	
		ngOnInit(){
			this.emailContacto = localStorage.getItem('emailContacto');
		}
		ngDoCheck(){
			this.emailContacto = localStorage.getItem('emailContacto');
			
		}
		borrarEmail(){
			localStorage.removeItem('emailContacto');
			localStorage.clear();
			this.emailContacto = null;
		}
  	
  }


