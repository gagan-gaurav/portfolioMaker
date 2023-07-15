export class User {
  private static userInstance: User | null = null;
  private static currentUser: any;

  private constructor(currentUser: any) {
    User.currentUser = currentUser;
  }

  public static setUser(currentUser: any): void{
    if(!User.userInstance){
      User.userInstance = new User(currentUser);
    }
  }

  public static destroyInstance(): void {
    User.userInstance = null;
  }

  // Service methods
  public static getCurrentUser() {
    return this.currentUser;
  }

  public static isLoggedIn(){
    return (this.currentUser != undefined);
  }
}
