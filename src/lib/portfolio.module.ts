import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppConfig } from 'src/service/app.config';
import { WallComponent } from 'src/lib/wall/wall.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { WindowComponent } from './window/window.component';
import { ButtonComponent } from './button/button.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FeedComponent } from './quilandquest/feed/feed.component';
import { ContentComponent } from './quilandquest/content/content.component';


@NgModule({
  declarations: [
    WallComponent, 
    ProjectsComponent, 
    BlogsComponent, 
    SkillsComponent, 
    LoginComponent, 
    SignupComponent, 
    WindowComponent, 
    ButtonComponent, 
    ProfileComponent, 
    FeedComponent, 
    ContentComponent
  ],
  imports: [
    HttpClientModule, 
    FormsModule, 
    CommonModule, 
    RouterModule.forChild([]), 
    AngularEditorModule, 
    RouterTestingModule
  ],
  providers: [AppConfig, { provide: APP_BASE_HREF, useValue: '/' }, CookieService],
  exports: [
    ProjectsComponent, 
    WallComponent, 
    SkillsComponent, 
    BlogsComponent, 
    SignupComponent, 
    LoginComponent, 
    WindowComponent, 
    ButtonComponent, 
    ProfileComponent, 
    FeedComponent, 
    ContentComponent
  ],
  bootstrap: []
})
export class PortfolioModule { }
