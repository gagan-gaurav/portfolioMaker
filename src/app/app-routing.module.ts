import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from 'src/lib/blogs/blogs.component';
import { ProjectsComponent } from 'src/lib/projects/projects.component';
import { WallComponent } from 'src/lib/wall/wall.component';
import { SkillsComponent } from 'src/lib/skills/skills.component';
import { PortfolioModule } from 'src/lib/portfolio.module';

const routes: Routes = [
  { path: "", component: WallComponent},
  { path: "projects", component: ProjectsComponent},
  { path: "blogs", component: BlogsComponent},
  { path: "skills", component: SkillsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
