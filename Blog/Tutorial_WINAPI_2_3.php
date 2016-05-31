<?php 
/*	include("devildrey33.php");
	$Base = new devildrey33(devildrey33_TipoPlantilla::Articulo, basename(__FILE__));	
	$Base->InicioPlantilla("Tutorial WINAPI C++ 2.3 (Archivos y directorios)");*/

        include($_SERVER['DOCUMENT_ROOT']."/Web/devildrey33.php");
	$Base = new devildrey33;	
	
	$META = '<meta name="description" content="Tutorial WINAPI">
        <meta name="keywords" content="WINAPI C++, WINAPI, C++">';

        $Base->InicioPlantilla(basename(__FILE__), "Tutorial WINAPI C++ 2.3 (Archivos y directorios)", $META);
        
        $Base->InicioBlog(basename(__FILE__), "Tutorial WINAPI C++ 2.3 (Archivos y directorios)");

?>	


                <!-- INTRODUCCION -->
                <img class="ImagenPortada" src="/Web/Graficos/250x200_Ejemplo.2.3.png" alt="Tutorial 2.3" style='cursor:pointer;' />
                <p>Este tutorial se enfoca en el tratamiento de archivos y directorios. En versiones antiguas de windows los programas podian escribir archivos en cualquier parte del disco, pero a partir de windows vista esto ya no es así.</p>
                <p>En los sistemas operativos actuales como son Windows vista y Windows 7, si tenemos que escribir en ciertas partes del disco duro requerimos privilegios de administrador. Esto es un coñazo para los programadores que venian haciendo aplicaciones de windows, ya que han tenido que adaptar multitud de codigo por esta razon.</p>
                <p>Pero existen ciertas carpetas creadas especificamente para que los programas guarden datos sin tener que requerir privilegios de administracion, y en este tutorial veremos como acceder a ellas.</p>
                <!-- FIN_INTRODUCCION -->
                
                <p>Bueno imagino que mas de uno ha tratado con temas de archivos básicos ya sea con las funciones fopen fread fwrite y tal o con los objetos std::istream std::ostream std::iostream, así que no veremos nada de eso, y nos centraremos en las APIs que tiene Windows para realizar esos trabajos. Pero antes de nada deberíamos empezar por comprender un poco como funcionan Windows vista y Windows 7 en temas de lectura y escritura de archivos y permisos.</p>
                <p>A partir de Windows vista y Windows 7 se implanto como directiva que todos los programas debían funcionar en modo usuario por defecto, al contrario de lo que pasa con Windows xp e inferiores. Dicho sistema hace que nuestra aplicación tenga privilegios limitados de escritura, y esto se convierte en un problema en aplicaciones viejas cuando las hacemos correr en Windows 6.x</p>
                <p>Lo que pasa es muy simple… cualquier aplicación que necesite escribir datos en su mismo directorio donde se encuentra el ejecutable no podrá si no tiene privilegios de administrador, o se modifican los privilegios de la carpeta para ello. Modificar los privilegios de la carpeta es inviable desde la misma aplicación ya que seguimos necesitando privilegios de administrador. Así que la mejor solución es utilizar el directorio AppData / ProgramData o incluso he visto algunos programas que utilizan la carpeta MisDocumentos directamente que también es una buena opción. Las rutas de esos directorios pueden variar bastante asi que lo mejor es usar el API de windows para saber donde estan. Por ejemplo en Windows 7 tengo el directorio AppData en &quot;C:\ProgramData\&quot;, pero en windows XP lo tengo en &quot;H:\Documents and Settings\All Users\Datos de programa&quot; asi que es poco recomendable ingeniarse algún otro sistema.</p>
                <p>Por un lado el tema de los privilegios está muy bien porque ya de por si evita muchos programas maliciosos, virus, etc.. pero por otro lado el que tenga que empezar a aprender C / C++ y quiera tocar el tema de archivos y directorios se puede volver idiota.</p>
                <p>Al caso, el objetivo es hacer aplicaciones compatibles tanto con Windows xp como con Windows 6.x o superiores (aunque lo de superiores… siempre nos pueden volver a sorprender). Tampoco sería algo gravísimo si hacemos la aplicación compatible pensando solo en Windows XP, ya que en Windows Vista y Windows 7 si ejecutamos esa aplicación con privilegios de administrador funcionara perfectamente. Pero personalmente ya que nos ponemos a hacer las cosas… vamos a hacerlas bien :).</p>
                <p>Lo primero que vamos a hacer es un objeto que nos devolverá la ruta para el directorio AppData en el cual podremos escribir lo que nos de la gana. Debido a que es algo problemático obtener directorios en ciertos sistemas operativos he hecho esta clase para que resulte de lo mas fácil. Veamos la declaración de ObjetoDirectoriosWindows :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDObjetoDirectoriosWindows", "Archivo : ObjetoDirectoriosWindows.h", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.h", "ObjetoDirectoriosWindows"); ?>
                <p>En esencia hay 4 funciones públicas a las que les pasamos un TCHAR[MAX_PATH] y nos devuelven la ruta especificada, y luego tenemos el barullo, me explico… En Windows XP se usa la API <a href="http://msdn.microsoft.com/en-us/library/bb762181(VS.85).aspx" target="_blank">SHGetFolderPath</a> para obtener ese tipo de rutas, esa api no funciona en Windows 95 y no sabría decir si en Windows 98 existía (pero con VC6 se tiene que cargar dinamicamente por lo que lo veo poco probable), así que ya perdemos compatibilidad con esos dos sistemas operativos, pero ahora viene lo mejor.. En Windows Vista y Windows 7 se ha implementado una nueva API para esa tarea <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a>, y como no… no es compatible con WindowsXP, es mas <strong>CUALQUIER PROGRAMA QUE ENLACE ESTÁTICAMENTE A ESA API NO FUNCIONARA EN WINDOWS XP</strong>, podéis aplaudir.</p>
                <div style="margin-left:auto; margin-right:auto; cursor:pointer; display:table"><img src="/Graficos/ErrorSHGetKnownFolder.png" width="600" onclick="Imagen_Mostrar('/Graficos/ErrorSHGetKnownFolder.png')" /></div>
                <p>Yo personalmente me niego crear mis aplicaciones para que solo funcionen en Windows vista y Windows 7, con lo cual lo mas fácil seria tirar de <a href="http://msdn.microsoft.com/en-us/library/bb762181(VS.85).aspx" target="_blank">SHGetFolderPath</a>, pero claro no me da la gana el no ofrecer las nuevas opciones de <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a>, asi que esta clase se ha diseñado para cargar <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a> dinámicamente si existe y en ese caso utilizarla. Que no existe? Es que estamos en Windows XP y utilizaremos <a href="http://msdn.microsoft.com/en-us/library/bb762181(VS.85).aspx" target="_blank">SHGetFolderPath</a>.</p>
                <p>Para las aplicaciones del tutorial esto será prácticamente inútil ya que no necesitamos ningún directorio de los nuevos de <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a>, pero seguro que mas de uno se ha encontrado o se encontrara con este problema, así que os doy una solución inicial a este. </p>
                <p>Obviamente si estamos en Windows xp y preguntamos por un directorio extendido de Windows 6.x vamos a tener que retornar de alguna forma que ese recurso no existe en Windows xp, pero eso dependerá mas de la aplicación que de mi implementación para solucionar el problema. Y recordemos que el problema es grave ya que directamente nos saldrá un mensaje de error en Windows XP que no se encuentra la función <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a> y se cerrara nuestra aplicación sin mas.</p>
                <p>Bueno vamos al meollo, veamos la función _ObtenerDirectorioV5 :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("ID_ObtenerDirectorioV5", "Archivo : ObjetoDirectoriosWindows.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp", "ObjetoDirectoriosWindows::_ObtenerDirectorioV5"); ?>
                <p>Como veis se llama a la API <a href="http://msdn.microsoft.com/en-us/library/bb762181(VS.85).aspx" target="_blank">SHGetFolderPath</a> la cual nos retornara la ruta donde se encuentra el directorio AppData. Si la operación sale bien se retorna TRUE, en caso contrario FALSE.</p>
                <p>Ahora veamos la funcion _ ObtenerDirectorioV6 :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("ID_ObtenerDirectorioV6", "Archivo : ObjetoDirectoriosWindows.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp", "ObjetoDirectoriosWindows::_ObtenerDirectorioV6"); ?>
                <p>Ahora echemos un vistazo al constructor, y asi veremos como cargamos dinámicamente la API <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a> :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDObjetoDirectoriosWindows", "Archivo : <a href='./Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp'>ObjetoDirectoriosWindows.cpp</a>", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp", "ObjetoDirectoriosWindows::ObjetoDirectoriosWindows"); ?>
                <p>Lo primero que hacemos es usar <a href="http://msdn.microsoft.com/en-us/library/ms684175(VS.85).aspx" target="_blank">LoadLibrary</a> con la shell32.dll que es la librería que tiene la API <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a>. Si el resultado de <a href="http://msdn.microsoft.com/en-us/library/ms684175(VS.85).aspx" target="_blank">LoadLibrary</a> es un handle valido, utilizamos la API <a href="http://msdn.microsoft.com/en-us/library/ms683212(VS.85).aspx" target="_blank">GetProcAddress</a> para obtener la dirección de la API <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a> que introduciremos en la variable _ SHGetKnownFolderPath.</p>
                <p>Ahora veamos el destructor :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDDESTRUCTORObjetoDirectoriosWindows", "Archivo : ObjetoDirectoriosWindows.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp", "ObjetoDirectoriosWindows::~ObjetoDirectoriosWindows"); ?>
                <p>Lo único que se hace es usar la API <a href="http://msdn.microsoft.com/en-us/library/ms683152(VS.85).aspx" target="_blank">FreeLibrary</a> con el handle de la Shell32.dll.</p>
                <p>Por último veamos la función AppData :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDAppData", "Archivo : ObjetoDirectoriosWindows.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoDirectoriosWindows.cpp", "ObjetoDirectoriosWindows::AppData"); ?>
                <p>Primero usamos _ObtenerDirectorioV6, en el caso de que retorne FALSE, usamos _ObtenerDirectorioV5.</p>
                <p>En el caso de que necesitemos una ruta distinta podemos crearnos nuestra función haciendo exactamente lo mismo que en la función AppData, con solo cambiar el FOLDERID y el CSLID por el adecuado para la ruta que queramos obtener.</p>
                <p>Bueno con esto ya tenemos un objeto que utiliza a poder ser la API <a href="http://msdn.microsoft.com/en-us/library/bb762188(VS.85).aspx" target="_blank">SHGetKnownFolderPath</a>, y si no es posible utiliza la API <a href="http://msdn.microsoft.com/en-us/library/bb762181(VS.85).aspx" target="_blank">SHGetFolderPath</a>. A partir de aquí ya somos capaces de ubicar una ruta donde podamos crear nuestros archivos. Ahora pasemos a la fase de creación de archivos, para ello crearemos un ObjetoArchivo que nos permitirá leer y escribir archivos de una forma fácil. Veamos la declaración de ObjetoArchivo :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDObjetoArchivo", "Archivo : ObjetoArchivo.h", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.h", "ObjetoArchivo"); ?>
                <p>Esta clase tiene varias funciones para abrir archivos, una para lectura, una para escritura, y una para lectura y escritura. Además tiene 2 funciones base para leer y escribir datos, y otras 4 funciones que usan las dos primeras para leer / escribir tipos de datos mas específicos como son una cadena de caracteres y un UINT. Por último también tenemos dos funciones para obtener la longitud del archivo, y una función para saber si el archivo está abierto por nosotros. Ahora veamos la función AbrirArchivo :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDAbrirArchivo", "Archivo : ObjetoArchivo.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.cpp", "ObjetoArchivo::AbrirArchivo"); ?>
                <p>Lo primero que hacemos es usar la función CerrarArchivo por si ya había alguno abierto no dejarlo colgado, luego usamos la API <a href="http://msdn.microsoft.com/en-us/library/aa363858(VS.85).aspx" target="_blank">CreateFile</a> para obtener el handle del archivo, y retornamos TRUE si la operación ha tenido éxito, FALSE en caso contrario.</p>
                <p>La API <a href="http://msdn.microsoft.com/en-us/library/aa363858(VS.85).aspx" target="_blank">CreateFile</a> se usa tanto para crear archivos como para abrir archivos, podemos especificar FILE_READ_DATA , FILE_WRITE_DATA , o los dos a la vez según nos convenga, también podemos especificar si creamos un archivo en el caso de que no exista con el parámetro OPEN_ALWAYS, o podemos especificar el parámetro OPEN_EXISTING si solo queremos abrir un archivo ya existente. </p>
                <p>Ahora veamos la función CerrarArchivo : </p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDCerrarArchivo", "Archivo : ObjetoArchivo.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.cpp", "ObjetoArchivo::CerrarArchivo"); ?>
                <p>Utilizamos la API <a href="http://msdn.microsoft.com/en-us/library/ms724211(VS.85).aspx" target="_blank">CloseHandle</a> para cerrar el archivo. Solo comentar que si _Archivo es igual a INVALID_HANDLE_VALUE no debemos usar CloseHandle.</p>
                <p>Ahora veamos las funciones Leer y Guardar :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDLeer", "Archivo : ObjetoArchivo.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.cpp", "ObjetoArchivo::Leer"); ?>
                <p>Para leer datos utilizamos la API <a href="http://msdn.microsoft.com/en-us/library/aa365467(VS.85).aspx" target="_blank">ReadFile</a>, a la que le pasamos un buffer previamente creado con el tamaño necesario para obtener los bytes especificados. En la variable Guardado nos retorna los bytes realmente leídos que retornaremos en la función Leer.</p>
                <p>Para guardar datos utilizamos la API <a href="http://msdn.microsoft.com/en-us/library/aa365747(VS.85).aspx" target="_blank">WriteFile</a> a la que le pasamos el buffer de datos a guardar, el tamaño en bytes del buffer, y una variable en la que recibiremos los bytes realmente guardados.<br />
                 Ahora vamos a ver las funciones LeerString y GuardarString :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDLeerString", "Archivo : ObjetoArchivo.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.cpp", "ObjetoArchivo::LeerString"); ?>
                <p>La función GuardarString primero guarda el tamaño en caracteres de la cadena, y luego guarda la cadena. De esta forma LeerString sabe cuantos caracteres deberá leer.<br />
                 La función LeerString primero lee el tamaño en caracteres de la cadena, luego crea un buffer con el suficiente tamaño para albergar la cadena en el puntero por referencia nStr, y por ultimo lee el string dentro de nStr.</p>
                <p>Y ya solo nos faltan las funciones ObtenerLongitud :</p>
                <?php $Base->PintarCodigo->PintarArchivoC("IDObtenerLongitud", "Archivo : ObjetoArchivo.cpp", "../Codigo/Tutoriales_WinAPI/Objetos Tutorial/ObjetoArchivo.cpp", "ObjetoArchivo::ObtenerLongitud"); ?>
                <p>He puesto las 2 versiones ya que me parecía interesante comentar la función de 64 bits, aunque para las tareas que os voy a encomendar sobrara con la de 32 bits.</p>
                <p>Para la función de 32 bits se usa la API <a href="http://msdn.microsoft.com/en-us/library/aa364955(VS.85).aspx" target="_blank">GetFileSize</a>, la cual nos retorna el DWORD bajo, y si necesitamos un valor mas alto podemos usar ValorAlto y asi obtener el DWORD Alto.</p>
                <p>Para la función de 64 bits se usa la API <a href="http://msdn.microsoft.com/en-us/library/aa364957(v=VS.85).aspx" target="_blank">GetFileSizeEx</a>, la cual nos retorna una estructura del tipo <a href="http://msdn.microsoft.com/en-us/library/aa383713(VS.85).aspx" target="_blank">LARGE_INTEGER</a>. La estructura <a href="http://msdn.microsoft.com/en-us/library/aa383713(VS.85).aspx" target="_blank">LARGE_INTEGER</a> viene con varios valores, para 32 bits debemos usar LowPart y HighPart para obtener el resultado, pero para 64 bits solo hay que consultar el parámetro QuadPart.</p>
                <p>En el ejemplo 2.3 se crea un archivo txt de prueba con un texto dentro, y se abre una ventana del explorador en la ruta AppData donde se ha guardado.</p>
                <p>Ahora si que ya podemos crear la ultima ventana translucida que nos falta para el juego : <a href="/Blog/Tutorial_WINAPI_2_4">2.4 - Tutorial Creación del ObjetoEscena_Records</a>. </p>
                
                <table class='Centrado'><tr>
                        <td><a class='Boton-Normal' href="/Descargas/EjemplosWinAPI.zip" target="_blank">Descargar tutorial WinAPI completo</a></td>
                	<td><a class='Boton-Normal' href="/Descargas/Snake.zip" target="_blank">Snake compilada</a></td>
                </tr></table>
                


<?php
    $Base->FinBlog();
    $Base->FinPlantilla(); 
?>
     