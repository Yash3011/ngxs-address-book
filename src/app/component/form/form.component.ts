import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ApiService} from '../../service/api.service';
import {User} from '../../model/user.model';
import { Store } from '@ngxs/store';
import { AddUser, UpdateUser } from 'src/app/actions/user.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})

export class FormComponent implements OnInit {

  singupForm!: FormGroup;
  id! : string;
  errorMessage!: string;
  adding! : string;
  
  constructor(private store: Store, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.selectedUser()
  }

  selectedUser(){
    this.apiService.user.subscribe(user => {
      this.id = user.id
      this.singupForm = new FormGroup({
        FirstName : new FormControl(user.FirstName),
        LastNAme : new FormControl(user.LastNAme),
        Address : new FormControl(user.Address),
        Contact : new FormControl(user.Contact),
        Email : new FormControl(user.Email)
      })
    })
  }

  onSubmit(){
    this.errorMessage=''
    if(this.id!=''){
      this.adding='update'
      this.store.dispatch(new UpdateUser(this.singupForm.value,this.id)).subscribe(
        () => { 
          this.adding=''
          this.apiService.getUser(this.apiService.dummyUser);
          this.selectedUser();
          this.singupForm.reset()
        },
        error => {
          this.adding=''
          this.errorMessage = error;
        }
      )
    }  

    else {
      this.adding='add'
      this.store.dispatch(new AddUser(this.singupForm.value)).subscribe( 
        () => {
          this.adding=''
          this.singupForm.reset()
        },
        error => {
          this.adding=''
          this.errorMessage = error;
        });
      }    
  }
}