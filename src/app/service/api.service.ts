import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable( {providedIn:'root'})
export class ApiService {

  configUrl = "https://605d84019386d200171bab49.mockapi.io/abook/address/";  
  dummyUser : User = {
    id : '',
    FirstName: '',
    LastNAme: '',
    Address: '',
    Contact: '',
    Email: ''
  }
  private behaviorSubject = new BehaviorSubject<User>(this.dummyUser);
  user = this.behaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.configUrl);
  }

  deleteUser(id : string){
    return this.http.delete(this.configUrl+id);
  }

  addUser(user : User) {
    console.log("Http")
    console.log(user);
    return this.http.post<User>(this.configUrl,user);
  }

  updateUser(user : User, id : string){
    return this.http.put<User>(this.configUrl+id,user);
  }

  getUser(user : User) {
    this.behaviorSubject.next(user);
  }
}