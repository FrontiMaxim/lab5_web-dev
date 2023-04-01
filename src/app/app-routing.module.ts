import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageStudentComponent } from './student/page-student/page-student.component';
import { PageGroupComponent } from './group/page-group/page-group.component';


const routes: Routes = [
  {path: 'students', component: PageStudentComponent },
  {path: 'groups', component: PageGroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
