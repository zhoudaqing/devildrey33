/* Para crear un nuevo banner hay que seguir estos pasos : 
 *  - Modificar el archivo /Web/Config/ArchivosMinify.php, para añadirle el nuevo script para el banner. 
 *  - Modificar la variable $Banner_Lista, y añadir-le al final el nombre del objeto para el banner 
 *  - Construir un objeto que pueda ser "heredado" (aunque mas bien es engullido xd) por el ObjetoBanner */


/* Objeto base para los banners canvas
 * Los banners deben tener estas funciones sin parámetros : 
 *  - Iniciar       : Valores iniciales                  [requerida] (NOTA Dentro de esta función hay que reiniciar todos los valores de la animación por que al re-dimensionar el canvas  el 99% de veces se necesita unos valores acordes al ancho y alto disponibles.)
 *  - Pintar        : Pintado de cada frame de la escena [requerida]
 *  - Redimensionar : Redimensionar la escena            [opcional]  (Creo que no es necesaria ahora que esta función ejecuta la función Iniciar)
 *  - Scroll        : Al hacer scroll                    [opcional]
 * También requiere las siguientes variables :
 *  - Nombre        : Nombre de la animación             [requerida]
 *  - IdeaOriginal  : Nombre del autor del concepto      [requerida]
 *  - NombreURL     : URL del concepto                   [requerida]
 *  - URL           : URL del concepto                   [requerida]
 */

/* Al crear el banner se llama a las siguientes funciones en este orden : IniciarBanner > EventoRedimensionar > Redimensionar > Iniciar 
 * Una vez iniciado llamará a la función Pintar cada 16 milisegundos */

// Lista de banners
var $Banner_Lista = [ Banner_ResplandorCircular,        "2d",
                      Banner_Colisiones,                "2d",
                      Banner_TranstornoLineal,          "2d",
                      Banner_Espacio2D,                 "2d",
                      Banner_MatrixLluviaHexadecimal,   "2d",
                      Banner_Cubos3D,                   "THREE"];

var $Banner = null;

/* El primer parametro es una nueva instancia a la classe banner que queremos ejecutar 
 * El segundo parámetro es el tipo de contexto, "2d" o "THREE", si no se especifica, por defecto es 2d */
ObjetoBanner = function(NuevoBanner, Tipo) {
    // Añado todas las funciones y variables del NuevoBanner a este objeto antes de hacer nada. (POEO Programación Orientada a Engullir Objetos??)
    // (probablemente no es la forma más correcta para utilizar la POO en Java Script, pero es la que me resulta más cómoda.)
    for (var Propiedad in NuevoBanner) { 
        if (this.hasOwnProperty(Propiedad) === false) {
            this[Propiedad] = NuevoBanner[Propiedad];
        }
    }
    // Tipo por defecto
    if (typeof(Tipo) === "undefined") { this.Tipo = "2d"  }
    else                              { this.Tipo = Tipo; }

    // Variables para el banner
    this.Canvas         = null;                                             // Etiqueta canvas
    this.Context        = null;                                             // Contexto
    this.Ancho          = 0;                                                // Ancho del canvas
    this.Alto           = 0;                                                // Altura del canvas
    this.RAFID          = 0;                                                // Request Animation Frame ID
    this.FPS_UltimoTick = Date.now() + 1000;                                // Ultimo Tick del sistema + 1000ms
    this.FPS_Contador   = 0;                                                // Contador de frames por segundo    
    this.PIx2           = Math.PI * 2;                                      // PI + PI
    this.FocoWeb        = true;                                             // Foco de la ventana de la web
    
    // OJO si es TRUE nunca se pausara la animación!!
//    this.Depurar        = true;
    this.Depurar        = false;
 
    this.IniciarBanner = function() {
        console.log("Banner.IniciarBanner", this.Tipo);
        
        // Hay que eliminar la etiqueta canvas por que al crear un 2d context encima de un webgl context y viceversa produce error.
        $("#Cabecera_Canvas").remove();
        $(".Cabecera").append("<canvas id='Cabecera_Canvas'></canvas>");
        this.Canvas = document.getElementById("Cabecera_Canvas");
        
        // Creo el contexto según el tipo especificado
        if (this.Tipo === "2d") {
            this.Context    = this.Canvas.getContext("2d");                         // Contexto 2D
        } else if(this.Tipo === "THREE") {
            this.Context    = new THREE.WebGLRenderer({ canvas : this.Canvas, antialias : true });    // Contexto THREE.JS
        }
        // Marco que contiene la información de la animación
        $("#CabeceraAutorAni_HTML").html(   "<div>"+ this.Nombre +"</div>" +
                                            "<div><span style='color:#AAA;'>Concepto original : </span><b>" + this.IdeaOriginal + "</b></div>" + 
                                            "<a href='" + this.URL + "' target='_blank'>" + this.NombreURL + "</a>");
        // Eventos para los botones next / prev
        $("#Cabecera_AutorAni > .BotonVentana:nth-child(1)").off("click").on("click", function() { $Base.Banner(-1); });
        $("#Cabecera_AutorAni > .BotonVentana:nth-child(3)").off("click").on("click", function() { $Base.Banner(-2); });
        this.EventoRedimensionar();
        if (typeof(this.Iniciar) !== "undefined") { this.Iniciar(); }
        this.RAFID = window.requestAnimationFrame(this.Actualizar);       
        
        // Exporto la escena del THREE.JS para poder verla en el Three.js.inspector
        if (typeof(this.Escena) !== "undefined") { window.scene = this.Escena; }
        
        
    };   
    
    // Función interna utilizada por requestAnimationFrame para actualizar y pintar la animación
    this.Actualizar = function() {
        if ($Banner !== null) {
            $Banner.FPS(); 
            $Banner.RAFID = window.requestAnimationFrame($Banner.Actualizar);
            $Banner.Pintar(); 
        }
    };
    
    // Función que obtiene el tamaño del canvas una vez redimensionado.
    this.EventoRedimensionar = function() {
        /* El ancho del canvas siempre tiene que ser el mismo que #MarcoNavegacion - 60 pixeles que ocupan los botones de la izquierda
         * La altura del canvas siempre es la misma desde el principio */
        this.Ancho  = document.getElementById("MarcoNavegacion").offsetWidth - 60; // El 60 es el ancho del botón del menú lateral derecho, pero no es correcto en ciertas resoluciones moviles...
        this.Alto   = this.Canvas.offsetHeight;
        this.Canvas.setAttribute("width", this.Ancho);
        this.Canvas.setAttribute("height", this.Alto);
        if (this.Tipo === "THREE") { // redimensionar el THREE.JS
            this.Context.setSize(this.Ancho, this.Alto);
            if (this.Camara !== null) { // Si hay una camara creada
                this.Camara.aspect = this.Ancho / this.Alto;
                this.Camara.updateProjectionMatrix();            
            }
        }
        // 
        if (typeof(this.Redimensionar) !== "undefined") {
            this.Redimensionar();
        }
        // Hago la llamada a la función Iniciar que debería tener el NuevoBanner
//        if (typeof(this.Iniciar) !== "undefined") { this.Iniciar(); }
    };

    // Función para pausar la animación
    // - Hay que detectar cuando la animación no es visible y cuando la ventana no tiene el foco para pausar la animación
    // - En modo depuración nunca se hace la pausa (esto es para poder depurar el Three.js en el Three.js.inspector)
    this.Pausa = function() {
        if (this.RAFID !== 0 && this.Depurar === false) {
            $(".Cabecera").attr({ "animar" : "false" });
            console.log("Banner.Pausa");
            window.cancelAnimationFrame(this.RAFID); 
            this.RAFID = 0;
        }
    };
    
    // Función para reanudar la animación desde el ultimo punto
    this.Reanudar = function() {
        if (this.RAFID === 0 && this.FocoWeb === true) {
            $(".Cabecera").attr({ "animar" : "true" }); 
            this.RAFID = window.requestAnimationFrame(this.Actualizar); 
            console.log("Banner.Reanudar RAFID = " + this.RAFID);
        }
    };
    
    // Función que controla el scroll para determinar si la animación sigue a la vista o no y de esta forma detenerla / reanudarla
    this.EventoScroll = function() {
        var Header = $(".Cabecera");
        if (Header.length > 0) { // Hay páginas que no tienen la cabecera
            var PS = $(window).scrollTop();
            var Altura = Header.get(0).offsetHeight;
            if (PS > Altura) {
                if ($Banner !== null) { $Banner.Pausa(); }
            }
            else if (PS < Altura) {
                if ($Banner !== null) { $Banner.Reanudar(); }
            }
            // Llamo a la función Scroll del NuevoObjeto (si existe)
            if (typeof(this.Scroll) !== "undefined") {
                this.Scroll();
            }            
        }
    };
      
    // Función que cuenta los frames por segundo
    this.FPS = function() {
        var Tick = Date.now();
        if (Tick > this.FPS_UltimoTick) {
            this.FPS_UltimoTick = Tick + 1000;
            $("#Cabecera_Stats").html(this.FPS_Contador + " FPS");
            this.FPS_Contador = 0;
        }
        else {
            this.FPS_Contador ++;
        }
    };
      
    
    /////////////////
    // Constructor //
    /////////////////
    this.IniciarBanner();
};



$(window).on("resize", function() { 
    if ($Banner !== null) { $Banner.EventoRedimensionar(); }
});


// Evento posición scroll
$(window).on("scroll", function() { 
    if ($Banner !== null) { $Banner.EventoScroll(); }
});

// Evento foco perdido
$(window).on("blur", function() { 
    console.log("Foco de la ventana perdido");
    if ($Banner !== null) {
        $Banner.FocoWeb = false;
        $Banner.Pausa();
    }
});

// Evento foco obtenido
$(window).on("focus", function() { 
    console.log("Foco de la ventana recibido");
    if ($Banner !== null) {
        $Banner.FocoWeb = true;
        if ($(window).scrollTop() < 190) {
            $Banner.Reanudar();
        }
    }
});
