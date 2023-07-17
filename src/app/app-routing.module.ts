import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallComponent } from 'src/lib/wall/wall.component';
import { LoginComponent } from 'src/lib/auth/login/login.component';
import { SignupComponent } from 'src/lib/auth/signup/signup.component';
import { FeedComponent } from 'src/lib/quilandquest/feed/feed.component';
import { ContentComponent } from 'src/lib/quilandquest/content/content.component';

const routes: Routes = [
  { path: "user/:username", component: WallComponent},
  { path: "login", component: LoginComponent},
  { path: "login/:source", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "signup/:source", component: SignupComponent},
  { path: "quilandquest", component: FeedComponent},
  { path: "content/:blog_id", component: ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
