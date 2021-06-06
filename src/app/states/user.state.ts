import { User } from "../model/user.model";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {ApiService} from '../service/api.service';
import {AddUser,GetUsers,UpdateUser,DeleteUser} from '../actions/user.action';
import {tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";

export class UserStateModel{
    users!: User[];
}

@State<UserStateModel>({
    name : 'users',
    defaults:{
        users: []
    }
})

@Injectable()
export class UserState {

    constructor(private apiService : ApiService){}

    @Selector()
    static getUserList(state : UserStateModel){
        return state.users;
    }

    @Action(GetUsers)
    getUsers(stateContext: StateContext<UserStateModel>){
        return this.apiService.getUsers().pipe( 
            tap( 
                (result) => {
                    const state = stateContext.getState();
                    stateContext.setState({
                        ...state, 
                        users : result
                    });      
        }))
    }

    @Action(AddUser)
    AddUser(stateContext: StateContext<UserStateModel>,addUser : AddUser){
        console.log("add")
        return this.apiService.addUser(addUser.user).pipe( 
            tap( 
                (result) => {
                    console.log(result)
                    const state = stateContext.getState(); 
                    stateContext.patchState({
                        users: [...state.users,result]
                    })     
        }))
    }

    @Action(UpdateUser)
    UpdateUser(stateContext: StateContext<UserStateModel>,updateUser : UpdateUser){
        return this.apiService.updateUser(updateUser.user,updateUser.id).pipe( 
            tap( 
                (result) => {
                    const state = stateContext.getState(); 
                    const userList = [...state.users];
                    const userIndex = userList.findIndex(user => user.id === updateUser.id)
                    userList[userIndex] = result;
                    stateContext.setState({
                        ...state, 
                        users : userList
                    })     
        }))
    }

    @Action(DeleteUser)
    DeleteUser(stateContext: StateContext<UserStateModel>,deleteUser : DeleteUser){
        return this.apiService.deleteUser(deleteUser.id).pipe( 
            tap( 
                (result) => {
                    const state = stateContext.getState(); 
                    const filteredUser = state.users.filter(user => user.id !== deleteUser.id)
                    stateContext.setState({
                        ...state, 
                        users : filteredUser
                    })     
        }))
    }
}