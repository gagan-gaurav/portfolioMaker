import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from 'src/lib/blogs/blogs.component';
import { ProjectsComponent } from 'src/lib/projects/projects.component';
import { WallComponent } from 'src/lib/wall/wall.component';
import { SkillsComponent } from 'src/lib/skills/skills.component';
import { PortfolioModule } from 'src/lib/portfolio.module';
import { LoginComponent } from 'src/lib/auth/login/login.component';
import { SignupComponent } from 'src/lib/auth/signup/signup.component';

const routes: Routes = [
  { path: "user/:username", component: WallComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
