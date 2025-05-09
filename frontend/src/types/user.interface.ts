export interface User {
  id: string;
  email: string;
  fullName: string;
}


export interface LoginForm {
  email: string;
  carPlate: string;
}

 export interface SignUpForm {
  email: string;
  fullName: string;
  address: string;
  carPlate: string;
}