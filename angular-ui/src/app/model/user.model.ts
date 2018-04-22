
export class User{ 
    UserEmail : string = "";
    name : string = "";
    phone : string = "";
    password : string = "";
    role : string = "";
    confirmationCode : string = "";

    constructor(src?) {
        if(src){
            this.map(src);
        }
    }

    private map(src){
        this.UserEmail = src.UserEmail;
        this.name = src.name;
        this.phone = src.phone;
        this.password = src.password;
        this.role = src.role;
    }
}