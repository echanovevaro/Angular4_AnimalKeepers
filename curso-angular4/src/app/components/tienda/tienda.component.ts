import{ Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
	selector:'tienda',
	templateUrl: './tienda.component.html',
	styleUrls: ['./tienda.component.css']
	
})

export class TiendaComponent {
	public titulo;
	public nombreDelParque: string;
	public miParque;

	constructor(){
		this.titulo = 'Esta es la tienda';
	}
	ngOnInit(){
		$('#textojq').hide();
		$('#caja').hide();
		$('#botonjq').click(function(){
			$('#textojq').slideToggle();
			$('#caja').slideToggle();
		});
		//$('#caja').dotdotdot({});
	}

	mostrarNombre(){
		console.log(this.nombreDelParque);

	}
	verDatosParque(event){
		console.log(event);
		this.miParque = event;
	}
}