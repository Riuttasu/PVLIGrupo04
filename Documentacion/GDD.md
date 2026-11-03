# CÓMO ENTRENAR A TU PROFESOR
## 1 Descripción general	
### 1.1 Concepto	
El juego da lugar a una JAM en la FDI, en la cual, tu, como profesor, tendrás que defender tu proyecto y entrenar para poder enfrentarse a las posibles amenazas (conflictos de github, errores de programación, etc…) con el objetivo de enfrentarse con los gemelos Pedro Pablo y Marco Antonio, tus mayores competidores.
### 1.2 Género	
El juego “Cómo entrenar a tu profesor” es un juego combinado entre RPG y roguellite, donde tiene desafíos por turnos y minijuegos.
### 1.3 Setting	
Se acerca el día de la JAM, un concurso donde alumnos y profesores presentarán juegos desarrollados por ellos mismos para ganar el concurso. Yo como profesor guay de la FDI, solo tengo un objetivo: presentarme a la JAM con un juego super molón que le llamarán la atención a los gemelos Pedro Pablo y Marco Antonio. Pero esto no es fácil, me tendré que pelear con conflictos de github, códigos erróneos y problemas de diseño. Pero como profesor no hay nada que impida el paso, pero ¿qué más problemas me tendré que enfrentar?...
### 1.4 Características principales	
El juego presenta las siguientes características:
- Minijuegos. Durante el juego el jugador podrá jugar minijuegos para mejorar sus habilidades y conseguir mejoras.
- Elección de personajes. El jugador podrá elegir un personaje preferido en el principio del juego.
- Juego de rol y desafíos por turnos.
- Música electrónica. 
- Arte del videojuego basado en fotografías y dibujos.
## 2 Gameplay	
### 2.1 Objetivo del juego	
- **Objetivo principal:** El objetivo principal es llegar hasta el final del juego, es decir, la planta superior de la facultad y defender tu proyecto frente a su desafío final contra Pedro Pablo y Marco Antonio y finalmente ganar la jam.
- **Objetivo medio plazo**: El objetivo a medio plazo será enfrentarse a los desafíos y pasar cada nivel, en la que, el jugador tendrá que subir a la siguiente planta y enfrentarse a nuevos conflictos.
- **objetivo corto plazo**: El objetivo a corto plazo será entrenar al profesor para que sea capaz de defender y atacar frente a los desafíos.
### 2.2 Core loops	
## 3 Personaje jugador	
El jugador tendrá que elegir un personaje de tres profesores diferentes, en la cual cada uno tendrá sus fortalezas y debilidades:
- **Tony**. Este personaje maneja mejor las habilidades de gestión.
- **Pablo**. Este personaje maneja mejor las habilidades de diseño.
- **Rubén**. Este personaje maneja mejor las habilidades de la programación. 
### 3.1 Controles	
El juego se jugará principalmente con ratón para pulsar botones, pero en casos de minijuegos también se usará teclado y ratón. A continuación se muestra una imagen del teclado:
## 4 Mecánicas	
### 4.1 Sesión de entrenamiento	
El jugador, previo a un desafío, dispone de una serie de sesiones de entrenamiento limitada.
Durante una sesión de entrenamiento, el jugador puede elegir entre uno de los diferentes minijuegos para aumentar una de sus estadísticas si lo completa con éxito. 
#### 4.1.1 Estadísticas	
El jugador dispone de tres estadísticas: Programación, Diseño y Gestión. 
Cada una tiene un valor base al comienzo del juego dependiendo del personaje del jugador, tras el comienzo del juego las estadísticas pueden ser aumentadas mediante los entrenamientos al completar un minijuego correctamente.
Las estadísticas están medidas en puntos, los cuales el jugador en la sección de mejoras puede invertir en diferentes cosas.
#### 4.1.2 Minijuego Programación	
Minijuego donde el jugador tiene que moverse a lo largo del eje horizontal sin aceleración recogiendo objetos que caerán de la parte de arriba de la pantalla durante este. Los objetos siguen un movimiento rectilíneo uniforme y puede haber objetos dañinos al jugador, los cuales tiene que esquivar. 
Tiempo máximo que puede durar el juego: 10 segundos.
#### 4.1.3 Minijuego Diseño	
Minijuego donde el jugador podrá moverse verticalmente (saltando) para esquivar obstáculos que vienen a continuación. Pero también se presentarán mejoras para el jugador donde, no se debe esquivar, sino, colisionar con él y conseguir la mejora.
Tiempo máximo que puede durar el juego: 10 segundos.
#### 4.1.4 Minijuego Gestión	
Minijuego en la cual como jugador inmovil podrás lanzar bolas de colores en cualquier sentido con el objetivo de destruir la cadena de bolas, en la que si hay más de 3 bolas de colores seguidas se destruyen.
Tiempo máximo que puede durar el juego: 10 segundos.
### 4.2 Mejoras	
Tras completar las sesiones de entrenamiento, el jugador dispone de puntos de cada estadística para invertir en mejoras.
- Programación: Desbloquea nuevas habilidades
- Diseño: Mejora las habilidades que ya tiene el jugador
- Gestión: Aporta regeneración de energía 
### 4.3 Desafíos	
Tras haber completado las sesiones de entrenamiento y mejora, el jugador es puesto en un desafío. En este, deberá completar tres objetivos repartidos entre las diferentes estadísticas. Dichos desafíos se completarán eliminando tareas respectivas a su tipo.
El jugador dispone de una cantidad de rondas limitada para alcanzar estos objetivos, si acaba el contador de rondas sin que los objetivos se cumplan o pierde toda su energía perderá el desafío.
#### 4.3.1 Habilidades	
#### 4.3.2 Tareas	
Las tareas son el principal obstáculo del juego. Al comienzo de un desafío, tres tareas, una de cada tipo aparecerán en cada espacio de tareas. 
Las tareas tienen un nivel de progreso, el cual comienza en 0 y debe ser avanzado mediante las habilidades del jugador hasta un nivel fijo, en cuanto se llega o sobrepasa este nivel de progreso, la tarea es considerada completada y es reemplazada por otra tarea de cualquier tipo.
#### 4.3.3 Tipos y relaciones entre ellos	
Tanto las habilidades como las tareas pertenecen a un tipo, existe un tipo correspondiente a cada estadística, es decir:
- Tipo Programación
- Tipo Diseño
- Tipo Gestión
Los tipos influyen en el desafío a la hora de calcular cuánto progreso de una tarea avanzará una habilidad. 
Cada tipo tiene una fortaleza y debilidad contra otro al estilo piedra-papel-tijera, representado de esta manera: (ver imagen)
Una flecha apuntando a otro tipo indica fortaleza contra ese tipo, y si un tipo es apuntado por otro, indica debilidad ante ese tipo.
(ej: programación es fuerte contra gestión, diseño es débil contra gestión)
#### 4.3.4 Energía	
La energía funciona como una barra de vida y maná a la vez del jugador, si la energía en un desafío llega a 0, se perderá automáticamente.
Por cada ronda en la que el jugador no complete un número de tareas concreto este perderá energía relativa al número de tareas que no se han conseguido completar .
Las habilidades del jugador pueden costar energía.
### 4.4 Roguelite	
La mecánicas roguelite estarán presente en nuestro juego en dos formas significativas.
La primera: Cuando pierdes en el nivel que sea volverás al nivel 1, viéndote obligado a repetir todo de nuevo. 
La segunda:  Cuando pierdes el desafío también perderás todas tus habilidades menos 1, que podrás salvar cambiandola por una de las básicas del inicio. 
## 5 Mundo del juego	
### 5.1 Niveles	
El juego estará dividido en X niveles cada uno con la misma estructura dividida en salas.
- En la primera habitación encontrará los minijuegos de entrenamiento, cada uno tematizado de diferente manera.
- En el despacho  encontrará las mejoras y nuevas habilidades
- El laboratorio donde encontrará los desafíos correspondientes a ese nivel.
Una vez superado ese nivel  pasará al siguiente nivel  tras una cinemática o escena de diálogos.
### 5.2 Guión	
### 5.3 Diálogos/cinemáticas	
Los diálogos estarán presentes en forma de cinemáticas explicativas. Estos tienen el objetivo de dar contexto a la historia del jugador como de meter bromas o momentos graciosos entre niveles. En total tendremos una cinemática por nivel al menos.
- Introducción.
- Superar nivel 1.
- …
- Superar nivel n.
- Superar a Marco Antonio y Pedro Pablo.
## 6 Interfaz	
### 6.1 Cámara	
La cámara será lateral e inmóvil estando delimitado por los bordes los espacios interactuables y pasando de una escena a otra mediante menús de selección. Haciendo un paneo a la sala seleccionada pero sin movimiento real.
### 6.2 HUD	
En todo momento la HUD solo se compondrá de un símbolo a la esquina noroeste que indique el menú que contendrá las opciones disponibles y la opción de salir del juego; y en la esquina noreste información sobre el profesor elegido y sus estadísticas actuales.
### 6.3 Menús	
## 7 Experiencia de Juego	
La experiencia de juego que queremos desarrollar es una basada en la estrategia por turno y en el desarrollo de sus habilidades. El jugador deberá pensar en qué habilidades debe priorizar y cuales dejar a un lado, a su vez que en el siguiente intento quiera probar esas que dejó y usar otras. Además de la estrategia queremos que el jugador tenga una experiencia divertida. reforzada por las bromas en las cinemáticas como en la temática del juego. 
## 8 Dinámicas	
Nuestros juego se caracteriza por tener tres mecánicas principales, el RPG, el roguelight y los minijuegos cada uno interactuando y creando mecánicas principales las más destacables son: 

- **La Relación piedra**: papel y tijera: En nuestro juego existen tres tipo de aura, los cuales crean una relación de ventaja o desventajas unos con otros (Explicado en el apartado de mecánica) Esta clásica relación con el piedra papel tijera provocará que el jugador entienda con rapidez  los elementos de juego y se sienta más rápidamente familiarizado con las mecánicas presentadas además de que no se encasille en una sola estrategia.

- **Perder y reintentar**:  El jugador se verá obligado a morir y reintentar el nivel, con cada fracaso si bien perderá recursos también su esfuerzo se verá reforzado a la hora de mantener una de sus habilidades en la siguiente. Generando el sentimiento de progreso en el jugador.

- **La estrategia en el desafío**: El desafío es un RPG simplificado en el que se conservan ciertos elementos estratégicos para hacer el juego más interesante. Durante el desafío, el jugador tendrá un tiempo limitado para vencer a sus enemigos. En caso de no conseguirlo, perderá puntos de energía  en función de la cantidad de enemigos que no haya derrotado. Esto creará un sentimiento de urgencia en el jugador, que deberá intentar vencer a todos sus enemigos en el menor tiempo posible. Para conseguirlo, tendrá que comprender y aprovechar las habilidades disponibles y su progreso a lo largo del juego. 

## 9 Estética y contenido	
La estética de este proyecto se define por una combinación de dos principios. Primeramente el proyecto trata de tener un tono humorístico y absurdo lo que intenta provocar sorpresas constantes para sorprender al jugador. El otro principio es provocar al jugador un sentimiento de curiosidad para querer ver todo el contenido que ofrece el juego. Estos dos principios se reflejarán en los siguientes elementos que componen el juego
### 9.1 Arte visual	
Por una parte gran parte del arte más significativo a nivel estético serán fotos reales de la facultad y de los personajes cuyas animaciones serán modificaciones sobre la propia imagen y no un video como tal. Por otra parte, gran parte del arte interactuable o de la interfaz tendrá un estilo de dibujo que imita un trazado “poco elaborado y sucio”, tratando de ser similar a un boceto o a dibujos infantiles.
### 9.1.1 Personajes	
En principio habrá 5 personajes en todo el juego:
- **Profesores contendientes**: A priori estos serán Tony, Pablo y Rubén los cuales interpretan el papel de los profesores que acabarán participando en tu equipo de la Jam. Su imagen se define por dibujos en papeles recortados de una versión cartoon de ellos con colores simples y animaciones con muy pocos frames (2 o 3 como mucho). Cada profesor tiene una especialidad que domina sobre las otras o bien es equilibrado en todas, lo que determina que en ciertas situaciones tenga un contorno del color correspondiente a su especialidad. 
- **Los gemelos**: Pedro Pablo y Marco Antonio interpretan el papel del desafío final de la aventura, en la batalla final tendrá que superar su juego para ganar la partida. Su estética es idéntica a la del resto de profesores y también tendrá mucha aura(elementos que los shavos representan como aura).
### 9.1.2 Escenarios
Todos los escenarios del proyecto funcionan de forma muy similar, son fotos directamente de la facultad y no tienen movimiento ninguno pero igual con algún efecto o filtro para que no sea directamente la imagen pero se entienda. A todos los objetos o personajes interactuables se les pondrá un reborde en su contorno cuando el ratón pase por encima para determinar su presencia. Cada sección del juego con distintas funciones estará asociado a una lugar de la facultad. Por ejemplo, la zona de “desafío” serían los laboratorios; la cafetería, la zona de diálogos; la zona de entrenamiento en el despacho del profesor y la pantalla de título es la entrada de la facultad. Los escenarios disponibles serán:
La **cafetería**: donde ocurre gran parte de los diálogos.
- El **despacho** en el que hay un tuitea toñete: donde se elegirán los entrenamientos correspondientes.
- Los **laboratorios**: donde ocurre el desafío.
- Cada escenario de cada minijuego se describe en sus apartados correspondientes(estosminijuegos no se verán como fotografías sino más como dibujos depizarra o bocetos en papel)
### 9.1.3 UI
Toda la interfaz de usuario se ve como recortes y apuntes que se solapan a la fotografía del escenario en cuestión. Toda la interfaz relacionada con la navegación entre menús serán recortes de papel, posits, pantallas y monitores, pizarras etc…
## 9.2 Música
La música del proyecto no tiene un estilo propio muy definido dado que el estilo dependerá mucho de la escena en la que se encuentre el jugador. Dado que visualmente hay tanto un estilo artístico muy tecnológico como muy plástico la banda sonora tratará de englobar ambos puntos. Para ello, como la identidad sonora no depende del estilo artístico se deben hacer pocos temas y utilizarlos en la mayor parte de las canciones para mantener la unidad de la banda sonora y que las transiciones de unas a otras no sea tan brusco.
Se usarán los siguientes leitmotifs: Un tema para los profesores que se usará muy frecuentemente en la mejora de cada uno, un tema para la batalla que solo se usará en el desafío y un tema que solo se usará en las fases de entrenamiento tanto los minijuegos como el menú.
Los temas que se necesitarán será:
- Uno para el menú principal que tendrá el tema de los profesores, el estilo tratará de mezclar tanto lo electrónico como lo plástico a elección del compositor.
- Uno para la selección del profesor que debe ser simple, que sea la exposición del leitmotif de los profesores y que sea prácticamente electrónica en su totalidad pero con elementos tranquilos.
- Uno para los desafíos(con posible variante para las batallas importantes para la trama), que tendrá el tema de batalla y el de los profesores en contrapunto con un estilo puramente electrónico.
- Uno para el menú de entrenamiento que tenga el leitmotif de entrenamiento y el de profesores en diferentes secciones y que el estilo imite elementos de oficina e instrumentos físicos en general.
- Uno por cada minijuego muy similar a los del menú de entrenamiento pero imitando en el estilo cada uno al juego arcade que parodian.
- Uno para el menú de mejoras que tenga el leitmotiv de profesor únicamente y que tenga un estilo mezclado entre los instrumentos del tema de entrenamiento y los de batalla para que sea un tema de transición.
## 9.3 Efectos de sonido
### 9.3.1 Efectos de la interfaz
Todos aquellos efectos de sonido de la interfaz dependen de si se ha pasado el ratón por encima de algo interactuable o si se ha presionado aunque estas dos diferencias solo se marcarán en la intensidad del sonido, el concepto de cada botón es el mismo para las dos acciones. 
Además, las acciones relacionadas con un tipo en específico de estadística como puede ser invertir puntos en una mejora se le relaciona con un tipo de sonido específico. Los efectos de programación con sonidos de ordenador, los de diseño con sonidos de pizarra y tiza y los de gestión con sonidos de lápices y hojas.
### 9.3.2 Efectos del desafío
Los efectos de sonido relacionados con el desafío son prácticamente todos sonidos de ordenador para las tareas y el orden de turno y sonidos de puñetazos o ataques en general para las habilidades del jugador.
