import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteUser, GetUsers } from 'src/app/actions/user.action';
import { ApiService } from 'src/app/service/api.service';
import { UserState } from 'src/app/states/user.state';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})

export class UserComponent implements OnInit {

  @Select(UserState.getUserList) users! : Observable<any>;
  isFetching : boolean = false; 
  searchValue : string = '';
  selectedOption: string = 'FirstName';
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };
  errorMessage: any;
  deletingUser: boolean = false;

  constructor(private store: Store, private apiService: ApiService) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUsers()).subscribe( 
      result => { 
        this.config.totalItems = result.length
        this.isFetching = true;
      },  
      error => {
        this.isFetching = true                          
        this.errorMessage = 'fetch'
      }
    )
  }

  deleteUser(id : string) {
    this.deletingUser=true;
    this.store.dispatch(new DeleteUser(id)).subscribe(
      () => { this.deletingUser = false },
      error => {
        this.deletingUser=true;
        this.errorMessage = 'delete'
      }
    )
  }

  getUser(user : User) {
    this.apiService.getUser(user);
  }

  pageChanged(event: number){
    this.config.currentPage = event;
  }
}
