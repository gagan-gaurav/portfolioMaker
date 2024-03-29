import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  @Input() public currentUser: any;
  @Input() public isLoggedIn: boolean = false;
  @Input() public profileImageUrl: any | null = null;
  public showCurrentUser: boolean = false;

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
      
  }

  showMenu(){
    this.showCurrentUser = !this.showCurrentUser;
  }

  logOut(){
    this.cookieService.deleteAll('/');
    this.router.navigate(['/login/quilandquest']);
  }

}
