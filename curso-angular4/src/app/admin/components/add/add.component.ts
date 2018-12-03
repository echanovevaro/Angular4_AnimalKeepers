import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { AnimalService} from '../../../services/animal.service';
import { UserService} from '../../../services/user.service';
import { UploadService} from '../../../services/upload.service';
import { Animal } from '../../../models/animal';


@Component({
  selector: 'admin_add',
  templateUrl: './add.component.html',
  providers:[UserService,UploadService,AnimalService]

  
})
	export class AddComponent implements OnInit {
	  public title = 'Añadir';
	  public animal: Animal;
	  public identity;
	  public token;
	  public url: string;

	 
	 constructor(
	 	private _route: ActivatedRoute,
	 	private _router:  Router,
	 	private _userService: UserService,
	 	private _animalService: AnimalService,
	 	private _uploadService: UploadService
	 	){
	 		this.title = 'Añadir';
	 		this.animal = new Animal('','',2017,'','');
	 		this.identity = this._userService.getIdentity();
	 		this.token = this._userService.getToken();
	 		this.url = GLOBAL.url;

	 	}

	 ngOnInit(){
	 	console.log('animal-add componente ha sido cargado')
	 }

}