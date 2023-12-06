import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { CrearProyectoComponent } from './pages/crear-proyecto/crear-proyecto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { EditarComponent } from './pages/editar-proyecto/editar-proyecto.component';
import { ProyectoService } from './services/proyecto.service';

const appRoutes: Routes = [
  {path: '', component: SobreMiComponent},
  {path: 'sobre-mi', component: SobreMiComponent},
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'crear-proyecto', component: CrearProyectoComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'detalle/:id', component: DetalleComponent},
  {path: 'editar-proyecto/:id', component: EditarComponent},
  {path: '**', component: ErrorNotFoundComponent}
];

export const appRoutingProviders: Array<any> = [ProyectoService];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 