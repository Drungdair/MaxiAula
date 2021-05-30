import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/core/models/curso.model';
import { CursoProviderService } from '../../../core/providers/curso/curso-provider.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cursos-screen',
  templateUrl: './cursos-screen.component.html',
  styleUrls: ['./cursos-screen.component.css']
})
export class CursosScreenComponent implements OnInit {

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  cursosProfe$ = this.cursosP.getCursosProf(this.auth.user.rut!);
  cursos: Curso[] | undefined;
  constructor(
    private cursosP: CursoProviderService, 
    private auth: AuthService) {

    this.cursosProfe$.subscribe(
      cursos => {
        console.log(cursos);
        this.cursos = cursos;
      }
    )

    
   }


  ngOnInit(): void {
  }

}
