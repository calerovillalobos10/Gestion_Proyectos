# Directivas

Que son: Elementos que extienden la funcionalidad del html.

Como crear: ng generate directive err_img
       alt:  ng g d err-img

  El código de la directiva le indicará que hacer,
  en este caso se activará cuando el componente
  lance un error.

Como usar:  Se importa la directiva en el modulo
            Luego se utiliza la directiva en html.

Ejemplo:
        <img src:"X" appErrImg >