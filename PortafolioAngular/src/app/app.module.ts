import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { CrearProyectoComponent } from './pages/crear-proyecto/crear-proyecto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { EditarComponent } from './pages/editar-proyecto/editar-proyecto.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreMiComponent,
    ProyectosComponent,
    CrearProyectoComponent,
    ContactoComponent,
    ErrorNotFoundComponent,
    DetalleComponent,
    EditarComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
