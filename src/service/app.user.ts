import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // or specify a specific module where you want to provide the service
})
export class User {

  private currentUser: any;

  // Service methods
  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn(){
    return (this.currentUser != undefined);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }
}
