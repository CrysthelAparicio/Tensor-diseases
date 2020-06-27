# :sparkles: Proyecto Tensor-diseases :sparkles:
---

Este es un pequeño modulo creado para ser implementar un sistema de red neuronal usando tensorflow como libreria de apoyo, la idea es que mediante la obtención de ciertos sintomas brindados por los pacientes, el sistema de predicción pueda sugerir el nombre de una posible enfermedad, la cual está registrada en el sistema de datos.

### Ejemplo de uso :ambulance:

Un paciente escoge de entre varios sintomas enlistados, cuatro elementos.

- [x] Dolor de cabeza
- [ ] Fiebre
- [x] Dificultad para respirar
- [x] Ansiedad
- [ ] Problemas de miccion
- [x] Insomnio
- [ ] Dolor estomacal
- [ ] Somnolescia dureante el día

Estos sintomas se encuentran registrados en nuestro sistema de datos con un campo identificador **id** y el campo **name** con el nombre de dicho sintoma respectivamente, usaremos los **id's** de dichos sintomas para hacer la prediccion de la enfermedad, tambien hay que tomar en consideración que las enfermedades estarán registradas en nuestro sistema de datos con un campo identificador **id** y un campo **name** con el nombre de dicha enfermedad.

Al modelo enviaremos los cuatros identificadores de los sintomas para que este lo someta al análisis y nos devolverá el nombre de una enfermedad (puede editarse la funcion **getDiseaseName** en el modulo tfmotor.js para que esta tevuelva el identificador de la enfermedad y no el nombre de la misma)

## ¿Como hacer una prediccion usando los modulos creados con tensorflow?
---
1. **Integrar tensorflow**:
    * Integrar tensorflow a nuestro proyecto es tan sencillo como entrar a nuestra carpeta del proyecto desde una terminal y ejecutar:
        ```bash
            npm i @tensorflow/tfjs --save
        ```
    * Una vez realizada dicha instalación, revisaremos el archivo **package.json** y veremos si se instaló la dependencia de tensorflow version **2.0.0** o superior.

2. **Copia de archivos del modulo tfmotor**:
    * Debido a que este modulo fué construído especificamente para el proyecto ***tensor-diseases***, no se espera que sea implementado por ningún otro, por lo cual no hubo necesidad de exportarlo como modulo de **npm.js** y, por lo tanto, para integrarlo al proyecto debemos copiar los archivos **tfmotor.js** y **diseases.js** a un directorio que pueda ser accedido dentro del proyecto, como la carpeta public de assets del proyecto dentro del directorio javascript por ejemplo, dejandolo en un directorio aproximado al siguiente:
    
        * backend-diseases
            * src
                * Public
                    * js
                        * ***tfmotor.js***
                        * ***diseases.js***
                    * css
                    * images
    
3. **Integrar el modulo a nuestro entorno de ejecución**
    * Podemos asignarle el módulo a una constante.
    ```js
        const tfmotor = require('/js/tfmotor.js');
    ```
    * De esta forma, cada vez que necesitemos utilizar las funciones del modulo que creamos, solo será necesario llamar a la constante ***tfmotor***

4. :+1: ***Realizar una predicción*** :rocket: :
    * Para realizar una predicción, se necesita crear una función asincrona, ya que dentro del modelo de datos, cuando hacemos una peticion, este la devuelve como promesa, es decir, que la aplicación continuará con su ejecución normal mientras espera a que los datos sean analisados y devuelva un resultado, se sugiere que la funcion sea llamada desde una constante que guarde su valor y cualquier operacion con dicha constante se haga dentro de esta funcion, por ejemplo:
        ```js
            const tfmotor = require('/js/tfmotor.js');

            const sintomas = [ 7, 5, 9, 8 ];

            async function obtenerEnfermedad(sintomas) {
                const enfermedad = await tfmotor.predictDiseases(sintomas);
            
                // mostrar la enfermedad en consola
                console.log("La enfermedad pronosticada es: "+enfermedad);
            
                //mostrar el resultado disparando un alert
                alert("Es propable que usted padezca de "+enfermedad); 
            
                return enfermedad;
            }

            obtenerEnfermedad(sintomas);
        ```

    * Notese que la entrada de los datos (constante sintomas) es un arreglo de 4 elementos numericos, loc cuales son enviados como parametro a la funcion ***obtenerEnfermedad***, si hay mas datos en este arreglo, el sistema devolverá un error, por lo cual se sugiere mantener a regla de solo ingresar 4 datos, si se desea ingresar más datos, el modelo debe ser modificado

#### :tada: MANOS A LA OBRA :tada:
##### Ahora hay que implementarlo en el proyecto :D