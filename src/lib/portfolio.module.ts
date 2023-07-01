import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppConfig } from 'src/config/app.config';
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


@NgModule({
  declarations: [
    WallComponent, ProjectsComponent, BlogsComponent, SkillsComponent, LoginComponent, SignupComponent, WindowComponent, ButtonComponent, ProfileComponent
  ],
  imports: [
    HttpClientModule, FormsModule, CommonModule, RouterModule.forChild([]), AngularEditorModule
  ],
  providers: [AppConfig, { provide: APP_BASE_HREF, useValue: '/' }, CookieService],
  exports: [ProjectsComponent, WallComponent, SkillsComponent, BlogsComponent, SignupComponent, LoginComponent, WindowComponent, ButtonComponent, ProfileComponent],
  bootstrap: []
})
export class PortfolioModule { }
