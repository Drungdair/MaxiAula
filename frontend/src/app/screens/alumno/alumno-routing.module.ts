import { RouterModule, Routes } from '@angular/router';

import { AlumnoScreenComponent } from './alumno-screen/alumno-screen.component';
import { CursoViewComponent } from '../components/curso-view/curso-view.component';
import { MisCursosScreenComponent } from './mis-cursos-screen/mis-cursos-screen.component';
import { MisNotasScreenComponent } from './mis-notas-screen/mis-notas-screen.component';
import { MisTareasComponent } from './mis-tareas/mis-tareas.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', component: AlumnoScreenComponent},
  {path: 'mis-cursos', component: MisCursosScreenComponent},
  {path: 'mis-notas', component: MisNotasScreenComponent},
  {path: 'curso/:id', component: CursoViewComponent},
  {path: 'mis-tareas', component: MisTareasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
