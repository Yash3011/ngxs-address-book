import {User} from '../model/user.model';

export class AddUser{
    static readonly type = '[User] Add';

    constructor(public user : User){}
}

export class GetUsers{
    static readonly type = '[User] Get';
}

export class UpdateUser{
    static readonly type = '[User] Update';

    constructor(public user : User, public id: string){}
}

export class DeleteUser{
    static readonly type = '[User] Delete';

    constructor(public id: string){}
}
