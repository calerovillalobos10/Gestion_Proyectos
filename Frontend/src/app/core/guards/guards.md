# Guards

Que son: Elementos que protegen las rutas.

Como crear: ng generate guard auth
       alt:  ng g g auth

  El código del guard indicará que hacer,
  en caso de acceder a una ruta protegida.
  
  Existen multiples, el principal para
  proteger de un acceso es canActivate.

  El guard debera realizar una validacion
  mediante un servicio o metodo y redirigir
  a otra ruta en caso de ser erroneo o retornar
  true en caso de ser valido.

Como usar:  Se importa el guard en el routing
            Luego se utiliza en el path.
            

Ejemplo:

const routes: Routes = [
                {
                  path:'login',
                  component: HomeComponent,
                  canActivate:[AuthGuard],
                },
              ]

