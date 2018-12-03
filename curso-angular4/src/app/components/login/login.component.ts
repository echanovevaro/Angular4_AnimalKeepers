import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';


import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers:[UserService]
})
	export class LoginComponent implements OnInit{
		public title: String;
		public user: User;
		public identity;
		public token;
		public errorMessage: string;

		constructor(
			private _route: ActivatedRoute,
			private _router: Router,
			private _userService: UserService,
			
		){
			this.title = "Identificarse";
			this.user = new User('','','','','','ROLE_USER','');
		}
		ngOnInit(){
			console.log("Login.component cargado!!");
			console.log(this._userService.getIdentity());
			console.log(this._userService.getToken());


		}
		onSubmit() {
			//loguear al usuario y conseguir el objeto
			this._userService.signup(this.user).subscribe(
				response => {
					
					if(!response || !response.user || !response.user._id){
						this.errorMessage = "Error inesperado";
					}else{
						this.identity = response.user;
						//ocultar el Password
						this.identity.password = '';
						//Mostrar identity
						localStorage.setItem('identity', JSON.stringify(this.identity));

						//console.log(this.identity)

						//conseguir el Token
						this._userService.signup(this.user, 'true').subscribe(
							response => {
								if(!response || !response.token){
									this.errorMessage = "Error inesperado";
								} else {
									this.token = response.token;

									if(this.token.length <= 0){
										this.errorMessage = 'La sesión no se ha generado correctamente';
									} else {
										localStorage.setItem('token',(this.token));
										this._router.navigate(['/']);
									}
								}
							},
							error => {
								if(error && error._body){
									const body = JSON.parse(error._body);
									if(body.mensaje){
										this.errorMessage = body.mensaje;
									} else {
										this.errorMessage = "Error inesperado";
									}
								}
							}
						);
					}
				},
				error => {
					if(<any>error && error._body){
						const body = JSON.parse(error._body);
						if(body.mensaje){
							this.errorMessage = body.mensaje;
						} else {
							this.errorMessage = "Error inesperado";
						}
					}
				}
			);

		}

	}
     
