export class User {
  private static userInstance: User | null = null;
  private static currentUser: any;
  private static profileImage: any;

  private constructor(currentUser: any, profileImage: any) {
    User.currentUser = currentUser;
    User.profileImage = profileImage;
  }

  public static setUser(currentUser: any, profileImage: any): void{
    if(!User.userInstance){
      User.userInstance = new User(currentUser, profileImage);
    }
    User.currentUser = currentUser;
    User.profileImage = profileImage;
  }

  // Service methods
  public static getCurrentUser() {
    return this.currentUser;
  }

  public static getProfileImageUrl() {
    return this.profileImage;
  }

  public static isLoggedIn(){
    return (this.currentUser != undefined);
  }
}
