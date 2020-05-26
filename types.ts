export interface Products{
    id : string;
    name : string;
    description : string;
    price : number;
    date : Date;
    isActive : boolean;
}

export interface User {
    id: string;
    username: string;
    password: string;
  }
  
  const users: Array<User> = [
    {
      id: "1",
      username: "Rudy",
      password: "123",
    }
  ]
  
  export default users;