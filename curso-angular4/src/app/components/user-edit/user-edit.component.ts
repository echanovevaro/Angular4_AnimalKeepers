import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';


import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { User } from '../../models/user';

@Component({
	selector: 'user-edit',
	templateUrl: './user-edit.component.html',
	providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit{
	public title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;

	constructor(
		private _userService: UserService,
		private _uploadService: UploadService

	){
		this.title = 'Actualizar mis datos',
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = GLOBAL.url;
	}
	ngOnInit(){
		console.log('user-edit.componet.ts cargado!')
	}

	onSubmit(){
		this._userService.updateUser(this.user).subscribe(
			response => {
				if(!response || !response.user || !response.user._id){
					this.status = "error";
				}else{
					this.identity = response.user;
					//Mostrar identity
					localStorage.setItem('identity', JSON.stringify(this.identity));
					this.status = "success";
					//subida de la imagen
					this._uploadService.makeFileRequest(this.url+'upload-image-user/'+ this.user._id, [], this.filesToUpload, this.token, 'image')
						.then((result:any) => {
							this.user.image = result.image;
							localStorage.setItem('identity', JSON.stringify(this.user));
							
						});
				}

			},
			error => {
					this.status="error";
			}
		);
	}
	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;

	}
}
