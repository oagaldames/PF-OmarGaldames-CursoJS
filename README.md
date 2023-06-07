# PROYECTO FINAL-Curso JavaScript CoderHouse
## Alumno: Omar Galdames
## Formulario para realizar Presupuestos
#### Descripción:
Este formulario se utiliza para ingresar los items de materiales y mano de obra que se necesitan para presupuestar un trabajo.
Se puede ingresar la ganacia para los materiales y para la mano de obra en forma separada.
Cuando se confirma se visualiza el resumen del presupuesto.
Luego de confirmar se realiza el envio al servidor del mismo.
#### Datos:
Utiliza los datos desde archivos Json locales para la carga de las lista desplegables de proveedores, tipo de material, iva y tarea , 
simulando que se trae de un servidor.
Se encuentran en la carpeta Data.
#### Uso:
- **Número de presupuesto:**
	Cuando se ingresa se trae del local store el número del último presupuesto 
	que se envió, si no existe se inicia con 1.
- **Campo descripción:**
	Se puede cargar la descripción del presupuesto. No es obligatoria.
- **Botón Limpiar Presupuesto**
	Sirve para eliminar todos los datos que se encuentren ingresados , si uno 
	lo desea
#### Sección Materiales:
- **Campo Material:** 
	Se ingresa el nombre o descripción del material .
	Es obligatorio.Realiza validación si queda en blanco.
- **Proveedor:**
	Se selecciona del menú desplegable el nombre del proveedor.
- **Tipo Material:**
	Se selecciona del menú desplegable el tipo del material.
- **Cantidad:**
	Se ingresa la cantidad. Realiza validación, no puede ser letras, blanco ni negativo.
- **Costo:**
	Se ingresa precio costo. Realiza validación, no puede ser letras, blanco ni negativo.
- **Iva :**
	Se selecciona del menu desplegable el % de Iva.
- **Botón Agregar:**
	Si los datos ingresados son válidos se habilita el botón , haciendo click en 
	el mismo se agrega y se visualiza en la tabla en donde se calcula el total de 
	ese ítem.
	Si el texto de material, proveedor y tipo coinciden (deben coincidir los 3) con uno que ya se encuentre cargado, se suma a la  
	cantidad anterior la cantidad que se ingrese y se actualiza el costo y el %de Iva y el total.
- **Botón Eliminar en el ítem:**
	Permite elimitar el ítem cargado.Pide confirmación para realizarlo.
- **Botón Eliminar Todos:**
	Si hay datos cargados de materiales elimina a todos. Pide confirmación para realizarlo.
- **% de Ganancia para los Materiales:**
	Se ingresa el % de ganacia deseado para los materiales.
	Realiza validación, no puede ser letras, blanco ni negativo.
- **Botón Calcular:**
	Realiza el calculo aplicando el % de ganacia ingresado.
#### Sección Mano de Obra :
- **Tarea:**
	Se selecciona del menu desplegable la tarea.
- **Cantidad horas:**
	Se ingresa la cantidad de horas hombre para realizar la tarea.
	Realiza validación, no puede ser letras, blanco ni negativo.
- **Costo Hora:**
	Se ingresa precio costo de la hora hombre.
	Realiza validación, no puede ser letras, blanco ni negativo.
- **Iva :**
	Se selecciona del menú desplegable el % de Iva.
- **Botón Agregar:**
	Si los datos ingresados son validos se habilita el botón , haciendo click en 	el mismo se agrega y se visualiza en la tabla en 
	donde se calcula el total de dicho item.
	Si la tarea coincide con una que ya se encuentre cargada, se suma a la 
	cantidad anterior la cantidad que se ingrese y se actualiza el costo y el % 	de Iva y el total.
- **Botón Eliminar en el Item:**
	Permite elimitar el ítem cargado.
	Pide confirmación para realizarlo.
- **Botón Eliminar Todos**:
	Si hay datos cargados de mano de obra elimina a todos.
	Pide confirmación para realizarlo.
- **% de Ganancia para la Mano de Obra:**
	Se ingresa el % de ganacia deseado para la mano de obra.
	Realiza validación, no puede ser letras, blanco ni negativo.
- **Botón Calcular:**
	Realiza el cálculo aplicando el % de ganacia ingresado.
#### Confirmación y envío :
- **Botón Confirmar:**
	Si hay por lo menos un item de mano de obra o de materiales se habilita 
	en botón confirmar.
	Cuando se hace click en el mismo, los datos de ítems de materiales , ítems 
	mano de obra y restantes campos ingresados,se almacenan en el local 
	store, en presupuestoHeader y en PresupuestoItems, lo cual permite que si 
	se sale y se vuelve a ingresar a la pagina se levantan dichos datos y se 
	carga el formulario , pudiendo seguir trabajando con el mismo.
	Se visualiza el resúmen del presupuesto con los datos totalizados.
- **Botón Enviar:**
	Se simula el envío de los datos del presupuesto a un servidor utilizando 
	Post , primero se envia los datos de presupuestoHeader, si ese envío se
	realiza corectamente se realiza el envío de presupuestositems, en ambos 
	casos si hay error se va a mostrar el mensaje de error.
	Si se realiza ambos  en forma correcta se visualiza el mensaje de
	"presupuesto guardado exitosamente" por unos segundos luego del 
	mismo se limpia el formulario, y se almacena en el localstore el numero de 
	presupuesto para inicializar nuevamente el ingreso
