import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SelectItem } from 'primeng/api';

import { User } from 'src/app/core/models/user.model';
import { UserProviderService } from '../../../core/providers/user/user-provider.service';
import { PopupService } from '../../../core/services/popup/popup.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {


  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  @Input()
  usuarioActual: User | undefined;
  @Input()
  usuarios: any;

  statuses : SelectItem[] = [{label: 'Administrador', value: 1},{label: 'Profesor', value: 2},{label: 'Alumno', value: 3},
                            {label: 'Apoderado', value: 4},{label: 'Solicitante', value: 0}];

  clonedUsers: { [s: string]: User; } = {};


  constructor(
    private userP: UserProviderService,
    private popUp : PopupService
  ) {
 
   }

  ngOnInit(): void {
  }

  onRowEditInit(user: User) {
    this.clonedUsers[user._id] = {...user};
  }


  
  async onRowEditSave(user: User) {

    this.popUp.pregunta('Editar Usuario','¿Desea editar el usuario de forma permanente?','warning')
              .then(async (result) => {
                if (result.isConfirmed) {
                  try {

                    await this.userP.updateUsuarioById(user._id, user).toPromise();
                    this.popUp.aviso('Usuario Actualizado!','Se ha actualizado correctamente el usuario.','success');
                    
                  } catch (error) {
                    
                    this.popUp.aviso('Error al actualizar el usuario!','No se pudo actualizar el usuario','error');
            
                  }      
                }
              });
              
   
  }

  onRowEditCancel(user: User, index: number) {
      this.usuarios[index] = this.clonedUsers[user._id];
      delete this.clonedUsers[user._id];
  }

  async deleteUser(user: User, index: number){

    this.popUp.pregunta('Eliminar Usuario','¿Desea eliminar este usuario de forma permanente?','error')
              .then(async (result) => {
                if (result.isConfirmed) {                  
                  try {

                    await this.userP.deleteUsuarioById(user._id).toPromise(); // eliminar de la base de datos
                    this.popUp.aviso('Usuario Eliminado','Se ha eliminado correctamente el usuario','success');  
                    delete this.usuarios[index]; // eliminar de la tabla
                  } catch (error) {

                    this.popUp.aviso('Error al eliminar el usuario!','No se pudo eliminar el usuario','error');

                 }
                
                }
              });
  }

  async aprobarProfesor(user: User) {

      user.tipo=2;
      try {

        await this.userP.updateUsuarioById(user._id, user).toPromise();
        this.popUp.aviso('Usuario Aprobado!','Se ha actualizado correctamente el usuario a profesor.','success');
        
      } catch (error) {
        
        this.popUp.aviso('Error al actualizar el usuario!','No se pudo actualizar el usuario','error');

      }  

  }

}

