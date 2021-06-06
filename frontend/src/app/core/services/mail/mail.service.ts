import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

import { Mail } from '../../models/mail.model';
import { UserProviderService } from '../../providers/user/user-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  
  constructor(
    private http: HttpService,
    private userP: UserProviderService
  ) { 

  }

  sendMessage (body: Mail) {

    return this.http.post<Mail>('/mail/mensaje', body);

  }

  async avisarNuevoContenido(nombreCurso: string, nombreProfe: string,participantes: string[]) {

    let mail: Mail;
    for (let participante of participantes) { // recorrer los participantes del curso
              
      let user = await this.userP.getUsuarioByRUT(participante).toPromise(); // obtener el usuario de ese curso para extraer su correo

      mail = {
        asunto: 'Se ha añadido nuevo contenido al curso de ' + nombreCurso.toLocaleUpperCase(),
        destinatario: user!.correo,
        cuerpo: 'Su curso de ' + nombreCurso + ' impartido por ' + nombreProfe.toLocaleUpperCase() + ' tiene nuevo contenido'
      }
  
      await this.sendMessage(mail).toPromise();

    }
  }


}
