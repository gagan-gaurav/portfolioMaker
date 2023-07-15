import { Component, OnInit, HostListener} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig} from 'src/service/app.config';
import { User } from 'src/service/app.user'
import { CookieService } from 'ngx-cookie-service';

enum Comp{
  PROFILE,
  PROJECTS,
  SKILLS,
  BLOGS,
}

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})

export class WallComponent implements OnInit {
  public currentUser: any;
  public isLoggedIn: boolean;
  public username: any;
  public showCurrentUser: boolean = false;

  public PROFILE: any = Comp.PROFILE;
  public PROJECTS: any = Comp.PROJECTS;
  public SKILLS: any = Comp.SKILLS;
  public BLOGS: any = Comp.BLOGS;

  public profileButton = {
    name: "Profile",
    image: "/assets/images/buttons/cloudOpenFolder.png",
    state: true
  }
  public projectsButton = {
    name: "Projects",
    image: "/assets/images/buttons/cloudClosedFolder.png",
    state: false
  }
  public skillsButton = {
    name: "Skills",
    image: "/assets/images/buttons/cloudClosedFolder.png",
    state: false
  }
  public blogsButton = {
    name: "Blogs",
    image: "/assets/images/buttons/cloudClosedFolder.png",
    state: false
  }


  public initialWidth = 0; // initial size of window
  public validClick: boolean = false;

  // Component booleans
  public loadProfileComponent: boolean = true;
  public loadProjectsComponent: boolean = false;
  public loadSkillsComponent: boolean = false;
  public loadBlogsComponent: boolean =  false;
  

  constructor(public config: AppConfig, private cookieService: CookieService, private route: ActivatedRoute, private router: Router) { 
    //get user details.
    if(this.cookieService.get('boonCurrentUser').length > 0) User.setUser(this.cookieService.get('boonCurrentUser'));
    this.isLoggedIn = User.isLoggedIn();
    this.currentUser = User.getCurrentUser();
    
    //set initil window width.
    this.initialWidth = window.innerWidth;

    // Initialize all button coordinates.
    if(config.profileButtonX1 == undefined) config.profileButtonX1 = window.innerWidth - 100;
    if(config.profileButtonY1 == undefined) config.profileButtonY1 = 50;

    if(config.projectsButtonX1 == undefined) config.projectsButtonX1 = window.innerWidth - 100;
    if(config.projectsButtonY1 == undefined) config.projectsButtonY1 = 140;  // 50 + 90

    if(config.blogsButtonX1 == undefined) config.blogsButtonX1 = window.innerWidth - 100;
    if(config.blogsButtonY1 == undefined) config.blogsButtonY1 = 230; // 140 + 90

    if(config.skillsButtonX1 == undefined) config.skillsButtonX1 = window.innerWidth - 100;
    if(config.skillsButtonY1 == undefined) config.skillsButtonY1 = 310; // 230 + 90

    

    
    // Initialize all window coordinates.
    if(config.profileComponentX1 == undefined) config.profileComponentX1 = (window.innerWidth * 60) / 200; // for view width 40%
    if(config.profileComponentY1 == undefined) config.profileComponentY1 = 72;

    if(config.projectsComponentX1 == undefined) config.projectsComponentX1 = ((window.innerWidth * 20) / 200); // for view width 80%
    if(config.projectsComponentY1 == undefined) config.projectsComponentY1 = 72;

    if(config.skillsComponentX1 == undefined) config.skillsComponentX1 = ((window.innerWidth * 15) / 200); // for view width 85%
    if(config.skillsComponentY1 == undefined) config.skillsComponentY1 = 72;

    if(config.blogsComponentX1 == undefined) config.blogsComponentX1 = ((window.innerWidth * 20) / 200); // for view width 80%
    if(config.blogsComponentY1 == undefined) config.blogsComponentY1 = 72;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.profileButton.name = this.username;
    });    
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.validClick = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // this.validClick = false;
  }
  
  flipWindow(value: any) {
    if(this.validClick){
      if(value == Comp.PROJECTS) {
        this.loadProjectsComponent = !this.loadProjectsComponent;
        this.projectsButton.state = !this.projectsButton.state;
        if(this.projectsButton.state) this.projectsButton.image = "/assets/images/buttons/cloudOpenFolder.png";
        else this.projectsButton.image = "/assets/images/buttons/cloudClosedFolder.png"
      }else if(value == Comp.BLOGS){
        this.loadBlogsComponent = !this.loadBlogsComponent;
        this.blogsButton.state = !this.blogsButton.state;
        if(this.blogsButton.state) this.blogsButton.image = "/assets/images/buttons/cloudOpenFolder.png";
        else this.blogsButton.image = "/assets/images/buttons/cloudClosedFolder.png"
      }else if(value == Comp.SKILLS){
        this.loadSkillsComponent = !this.loadSkillsComponent;
        this.skillsButton.state = !this.skillsButton.state;
        if(this.skillsButton.state) this.skillsButton.image = "/assets/images/buttons/cloudOpenFolder.png";
        else this.skillsButton.image = "/assets/images/buttons/cloudClosedFolder.png"
      }else{
        this.loadProfileComponent = !this.loadProfileComponent;
        this.profileButton.state = !this.profileButton.state;
        if(this.profileButton.state) this.profileButton.image = "/assets/images/buttons/cloudOpenFolder.png";
        else this.profileButton.image = "/assets/images/buttons/cloudClosedFolder.png"
      }
    }
  }

  setWindowX1(value: any, window: any){
    if(window == Comp.PROFILE) this.config.profileComponentX1 = value;
    else if(window == Comp.PROJECTS) this.config.projectsComponentX1 = value;
    else if(window == Comp.SKILLS) this.config.skillsComponentX1 = value;
    else this.config.blogsComponentX1 = value;
  }

  setWindowY1(value: any, window: any){
    if(window == Comp.PROFILE) this.config.profileComponentY1 = value;
    else if(window == Comp.PROJECTS) this.config.projectsComponentY1 = value;
    else if(window == Comp.SKILLS) this.config.skillsComponentY1 = value;
    else this.config.blogsComponentY1 = value;
  }

  setButtonX1(value: any, button: any){
    // if(button == Comp.PROFILE) this.config.profileButtonX1 = value;
    // else if(button == Comp.PROJECTS) this.config.projectsButtonX1 = value;
    // else if(button == Comp.SKILLS) this.config.skillsButtonX1 = value;
    // else this.config.blogsButtonX1 = value;
  }

  setButtonY1(value: any, button: any){
    // if(button == Comp.PROFILE) this.config.profileButtonY1 = value;
    // else if(button == Comp.PROJECTS) this.config.projectsButtonY1 = value;
    // else if(button == Comp.SKILLS) this.config.skillsButtonY1 = value;
    // else this.config.blogsButtonY1 = value;
  }

  showMenu(){
    this.showCurrentUser = !this.showCurrentUser;
  }

  logOut(){
    // this.user.setCurrentUser(undefined);
    User.destroyInstance();
    this.cookieService.deleteAll('/');
    this.cookieService.deleteAll('/user');
    this.router.navigate(['/login']);
  }
}
