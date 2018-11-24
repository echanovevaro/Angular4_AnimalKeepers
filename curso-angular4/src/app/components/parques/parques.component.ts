import { Component, Input, Output, EventEmitter, OnChanges, OnInit, DoCheck, OnDestroy} from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
	selector:'parques',
	templateUrl: './parques.component.html'
	
	
})

export class ParquesComponent implements OnChanges, OnInit, DoCheck, OnDestroy  {
	@Input() nombre: string;
	@Input('metros_cuadrados') metros: number;
	public vegetacion: string;
	public abierto: boolean;

	@Output() pasameLosDatos = new EventEmitter();

	constructor(){
		this.nombre = 'Parque natural para caballos';
		this.metros = 450;
		this.vegetacion = 'Alta';
		this.abierto = true;
	}

	ngOnChanges(){
		console.log("existen cambios en las propiedades");
	}

	ngOnInit(){
		console.log("Método OnInit lanzado");
	}

	ngDoCheck(){
		console.log("el DoCheck se ha ejecutado");
	}

	ngOnDestroy(){
		console.log("se va a eliminar el componente");
	}

	emitirEvento(){
		this.pasameLosDatos.emit({
			'nombre' : this.nombre,
			'metros' : this.metros,
			'vegetacion' : this.vegetacion,
			'abierto' : this.abierto

		});


	}
}