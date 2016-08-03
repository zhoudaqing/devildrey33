/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Banner_AdiestramientoCubos3D = function() {
    // Llamo al constructor del ObjetoBanner
    ObjetoBanner.call(this, "THREE");

/*    this.Reloj  = new THREE.Clock();
    this.Matrix = new THREE.Matrix4();*/
    
    this.TamCubo        = 0; // Tamaño de cada cubo
    
    this.Escena = new THREE.Scene();
    this.Camara = new THREE.PerspectiveCamera(40, this.Ancho / this.Alto, 0.5, 10000);
    // Preparo la camara
    this.Camara.position.set( 0, 0, 2000 );
    this.Escena.add(this.Camara);
    // Colores base que se van alternando
//    this.RGBF = [ 50, 0, 0, 0 ]; // RGB que incluye la fase en el ultimo valor (0=R, 1=G, 2=B);
    
    this.TipoAni = 0;
    this.CharAni = 0;
    
    // Variables locales
    var Divisiones  = 7;       // Numero de columnas de un lado
    var Tam         = 1000;

    this.TamCubo = (Tam / (Divisiones / 2));
    this.YBase = (this.TamCubo / 2) + this.TamCubo;
            
    // Creo la parrilla
    this.Parrilla = new THREE.GridHelper(Tam, Divisiones, new THREE.Color(0xcccccc), new THREE.Color(0x999999));
    this.Parrilla.position.y = this.TamCubo;
//    this.Parrilla.setColors(new THREE.Color(0xcccccc), new THREE.Color(0x999999));    // blanco
//    this.Parrilla.setColors(new THREE.Color(0xdddd00), new THREE.Color(0xcc9900));    // naranja
//    this.Parrilla.setColors(new THREE.Color(0x00cc00), new THREE.Color(0x009900));    // verde
//    this.Parrilla.setColors(new THREE.Color(0x6666cc), new THREE.Color(0x333399));      // azul
//        this.Parrilla = this.CrearParrilla(Tam, Divisiones, 0xdd6666, 0x888888);
//        this.Escena.add(this.Parrilla);

    // Creo el grupo de columnas
    this.GrupoCubos = new THREE.Object3D();
    this.GrupoCubos.add(this.Parrilla);
    t = this.TamCubo * 0.7;
    var geometry = new THREE.BoxGeometry( t, t, t );    

    // Inicio cada columna en su posición
    for (var z = -(Divisiones / 2); z < (Divisiones / 2); z++) {
        for (var x = -(Divisiones / 2); x < (Divisiones / 2); x++) {
/*                var multiMaterial = [ new THREE.MeshBasicMaterial( { color: "rgb(0," + (50 + Math.floor(rnd)) + ", 0)" } ),
                                      new THREE.MeshBasicMaterial( { color: "rgb(0," + (100 + Math.floor(rnd)) + ", 0)", wireframe: true, transparent: true } ) ];         */
//                var Cubo = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
            
            var Grupo = new THREE.Object3D();
            var Cubo = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: "rgb(0,50,0)", /*wireframe : true*/ } ));
//            Cubo.position.set((x * this.TamCubo) + (this.TamCubo / 2), (z * this.TamCubo) + (this.TamCubo / 2), this.YBase)
/*            Cubo.position.x = (x * this.TamCubo) + (this.TamCubo / 2);
            Cubo.position.z = (z * this.TamCubo) + (this.TamCubo / 2);                                
            Cubo.position.y = this.YBase;*/
            Grupo.Ani = new this.AniColumna(1, 1, 0);
            Grupo.add(Cubo);
            Grupo.position.set((x * this.TamCubo) + (this.TamCubo / 2), this.YBase, (z * this.TamCubo) + (this.TamCubo / 2));
            this.CrearMarcoCubo(Grupo, t);
            this.GrupoCubos.add(Grupo);
        }
    }
    
    this.RandAni();

    this.GrupoCubos.rotation.x = 0.55;        
    this.Escena.add(this.GrupoCubos);


    // create a point light
    var pointLight = new THREE.PointLight(0xFF0000);
    pointLight.position.set(0, 10, 0);
    // add to the scene
    this.Escena.add(pointLight);   
    
    this.Cargando(false);
    
    
};





Banner_AdiestramientoCubos3D.prototype = Object.assign( Object.create(ObjetoBanner.prototype) , {
    constructor         : Banner_AdiestramientoCubos3D, 

    // Datos de la animación
    Nombre              : "Adiestramiento de cubos",
    IdeaOriginal        : "devildrey33",
    URL                 : "/Lab/Ejemplos/BannerTest/AdiestramientoCubos.html",
    NombreURL           : "Lab : Adiestramiento de cubos",    
    RotacionCam         : 0,
    AvanceCamZ          : 0.1,
    
    Redimensionar       : function() {
//        this.Camara.
//        this.Context.setSize(this.Ancho, this.Alto);
    },
    
    AniCamara               : function() {
        // posición de la camara, y rotación del grupo de objetos
        var rnd = Rand();
        if (rnd < 0.15) {
            rnd = RandInt(4);
            if (rnd === 0)      { if (this.RotacionCam > -0.004)    { this.RotacionCam -= 0.0003; }}
            else if (rnd === 1) { if (this.RotacionCam < 0.004)     { this.RotacionCam += 0.0003; }}
            else if (rnd === 2) { if (this.AvanceCamZ > -2)         { this.AvanceCamZ -= 0.1; }}
            else if (rnd === 3) { if (this.AvanceCamZ < 2)          { this.AvanceCamZ += 0.1; }}
        }
        // Rotación y
 
        this.GrupoCubos.rotation.y += this.RotacionCam;
        // Posición Z
        if ((this.Camara.position.z < 3800 && this.AvanceCamZ > 0) || (this.Camara.position.z > 2000 && this.AvanceCamZ < 0)) {
            this.Camara.position.z += this.AvanceCamZ;
        }
/*        this.Matrix.makeRotationY(this.Reloj.getDelta() * ((Math.PI * 2) / 5));
        this.Camara.position.applyMatrix4(this.Matrix);*/
        
        this.Camara.lookAt(this.GrupoCubos);
    },
    
    
    Pintar              : function() {
        this.AniCamara();
        var AniTerminada = true;
//        this.GrupoCubos.rotation.z += 0.00033;
//        this.GrupoCubos.rotation.x -= 0.00002;  
        for (var c = 1; c < this.GrupoCubos.children.length; c++) {
            var Cubo = this.GrupoCubos.children[c];
            
            if (Cubo.Ani.FaseAni === 0) {
                if (Cubo.Ani.Retardo < 0) { // En delay
                    Cubo.Ani.Retardo += 16; // (16 milisegundos que suele tardar un frame a 60 por segundo)
                }
                else {
                    if (Cubo.position.y < this.YBase + Cubo.Ani.MaxEscalaY) { 
                        Cubo.position.y += Cubo.Ani.Vel;
                    }
                    else {
                        Cubo.Ani.FaseAni = 1;
                    }
                }
            }
            else if (Cubo.Ani.FaseAni === 1) {
                if (Cubo.position.y > this.YBase) { 
                    Cubo.position.y -= Cubo.Ani.Vel;
                }
                else { // Se ha terminado una vuelta
                    Cubo.Ani.FaseAni = 2;
                }
            }            
            // Al escalar el cubo hay que modificar la Y
//            Cubo.position.y = ((this.TamCubo * Cubo.scale.y) / 2);
            
            var col = Math.floor(50 + ((Cubo.position.y - this.YBase) * 0.5));
            
//            Cubo.material.color.setStyle("rgb(180, " + (Math.floor((Cubo.scale.y - 1) * 25) + 50) + ",0)");            
//            Cubo.material.color.setStyle("rgb(40, 30," + (Math.floor((Cubo.scale.y - 1) * 25) + 75) + ")");            
//            Cubo.material.color.setStyle("rgb(180, " + col + ",0)");            
            Cubo.children[0].material.color.setStyle("rgb(180, " + col + ",0)");            
//            Cubo.children[1].Material.color.setStyle("rgb(" + col + "," + "0" + "," + "0" + ")");            
            
            // Compruebo si la columna ha terminado
            if (Cubo.Ani.FaseAni !== 2) { 
                AniTerminada = false; 
            }                                                
        }
        
        // La animación 4 termina una vez por letra
        if (this.TipoAni === 4 && AniTerminada === true) {
            var texto = "devildrey33";
            if (this.CharAni < texto.length - 1) {
                this.CharAni += 1;
                this.IniciarAni_Caracter(texto.substr(this.CharAni, 1));
                AniTerminada = false;
            }
            else {
                this.CharAni = 0;
            }
        }
        
     
        this.Context.render(this.Escena, this.Camara);
        
        if (AniTerminada === true) { 
            this.RandAni(); 
            // Loop para el color
/*            this.RGBF[3] ++;
            if (this.RGBF[3] > 1) { this.RGBF[3] = 0; }*/
        }
    },
        
    CrearMarcoCubo          : function(Objeto, Tam) {
        var Grupo = new THREE.Object3D();
        var Med = Tam / 2;
        var GeoX = new THREE.Geometry();
        var GeoY = new THREE.Geometry();
        var GeoZ = new THREE.Geometry();
        GeoX.vertices.push(new THREE.Vector3( -Med, 0, 0 ) );
        GeoX.vertices.push(new THREE.Vector3( Med, 0, 0 ) );
        GeoY.vertices.push(new THREE.Vector3( 0, -Med, 0 ) );
        GeoY.vertices.push(new THREE.Vector3( 0, Med, 0 ) );
        GeoZ.vertices.push(new THREE.Vector3( 0, 0, -Med  ) );
        GeoZ.vertices.push(new THREE.Vector3( 0, 0, Med ) );
        Grupo.Material = new THREE.LineBasicMaterial( { color: 0x333333, opacity: .2, linewidth: .1 } );
        // Frontal
        var Linea1 = new THREE.Line( GeoX, Grupo.Material );
        var Linea2 = new THREE.Line( GeoX, Grupo.Material );
        var Linea3 = new THREE.Line( GeoY, Grupo.Material );
        var Linea4 = new THREE.Line( GeoY, Grupo.Material );
        Linea1.position.set(0, -Med, Med);
        Linea2.position.set(0, Med, Med);
        Linea3.position.set(Med, 0, Med);
        Linea4.position.set(-Med, 0, Med);
        Grupo.add(Linea1);
        Grupo.add(Linea2);
        Grupo.add(Linea3);
        Grupo.add(Linea4);
        // Trasero
        var Linea5 = new THREE.Line( GeoX, Grupo.Material );
        var Linea6 = new THREE.Line( GeoX, Grupo.Material );
        var Linea7 = new THREE.Line( GeoY, Grupo.Material );
        var Linea8 = new THREE.Line( GeoY, Grupo.Material );
        Linea5.position.set(0, -Med, -Med);
        Linea6.position.set(0, Med, -Med);
        Linea7.position.set(Med, 0, -Med);
        Linea8.position.set(-Med, 0, -Med);
        Grupo.add(Linea5);
        Grupo.add(Linea6);
        Grupo.add(Linea7);
        Grupo.add(Linea8);
        // Superior (basta con 2 líneas)
        var Linea9 = new THREE.Line( GeoZ, Grupo.Material );
        var Linea10 = new THREE.Line( GeoZ, Grupo.Material );
        Linea9.position.set(-Med, Med, 0);
        Linea10.position.set(Med, Med, 0);
        Grupo.add(Linea9);
        Grupo.add(Linea10);
        // Inferior (basta con 2 líneas)
        var Linea11 = new THREE.Line( GeoZ, Grupo.Material );
        var Linea12 = new THREE.Line( GeoZ, Grupo.Material );
        Linea11.position.set(-Med, -Med, 0);
        Linea12.position.set(Med, -Med, 0);
        Grupo.add(Linea9);
        Grupo.add(Linea10);
        
        Objeto.add(Grupo);
    },
    // Inicia la animación de un caracter
    IniciarAni_Caracter     : function(Char) {
//        console.log("Banner_AdiestramientoCubos3D", Char);
        var ColumnasLado = Math.sqrt(this.GrupoCubos.children.length - 1);
        var Inicio       = Math.floor((ColumnasLado - 5) / 2); // Las letras son de 5x5
        var cc = 0;
        for (var z = Inicio; z < ColumnasLado - Inicio; z++) {
            for (var x = Inicio; x < ColumnasLado - Inicio; x++) {
                var PosMarcador = 1 + ((z * ColumnasLado) + x);
                var PosLetra    = ((z - Inicio) * (ColumnasLado - (Inicio * 2))) + (x - Inicio);
                if (this.Letras5x5[Char][PosLetra] === "x") {
                    this.GrupoCubos.children[PosMarcador].Ani = new this.AniColumna(300, 20, 0);
                }
                else {                    
                    this.GrupoCubos.children[PosMarcador].Ani = new this.AniColumna(1, 1, 0);
                }
            }
        }
    },
    // Inicia la animación del texto caracter a caracter
    IniciarAni_Texto        : function() {
        this.CharAni = 0;
        this.IniciarAni_Caracter('d');
    },
    // Filas invertidas para el eje X o el eje Z
    IniciarAni_Filas        : function() {
        var ColumnasLado = Math.sqrt(this.GrupoCubos.children.length - 1);
        var Invertir = false;
        var rnd = Rand();
        for (var z = 0; z < ColumnasLado; z++) {
            Invertir = !Invertir;
            for (var x = 0; x < ColumnasLado; x++) {
                var Pos = 1 + ((rnd > 0.5) ? ((z * ColumnasLado) + x) : ((x * ColumnasLado) + z));
                this.GrupoCubos.children[Pos].Ani = new this.AniColumna(300, 15, ((Invertir === true)? x * 80 : (ColumnasLado - x) * 80));
            }
        }
    },    
    // Aleatório
    IniciarAni_Rand         : function() {
        for (var c = 1; c < this.GrupoCubos.children.length; c++) {
            this.GrupoCubos.children[c].Ani = new this.AniColumna(Rand(300, 100), Rand(15, 20), RandInt(500));
        }
    },
    // Ola de izquierda a derecha, o derecha a izquierda, o de arriba a abajo, o de abajo a arriba
    IniciarAni_Ola          : function() {
        var rnd = Rand();        
        var rnd2 = Rand();
        var ColumnasLado = Math.sqrt(this.GrupoCubos.children.length - 1);
        var pos = 0;
        for (var z = 0; z < ColumnasLado; z++) {
            for (var x = 0; x < ColumnasLado; x++, pos++) {
                var Pos = 1 + ((rnd2 > 0.5) ? ((z * ColumnasLado) + x) : ((x * ColumnasLado) + z));                
                this.GrupoCubos.children[Pos].Ani = new this.AniColumna(Rand(300, 250), 15, ((rnd > 0.5) ? pos * 20 : (this.GrupoCubos.children.length - pos) * 20) );
            }
        }
    },
    // Ola centrada en el eje X 
    IniciarAni_OlaCentrada  : function() {
        var rnd = Rand();
//        var rnd2 = Rand();
/*        console.log("BannerAdiestramiendoCubos3D.IniciarAni_OlaCentrada", rnd, rnd2);
        var ColumnasLado = Math.sqrt(this.GrupoCubos.children.length - 1);
        var Med = Math.floor(ColumnasLado / 2);
        // Con parrillas impares el último no queda asignado
//        this.GrupoCubos.children[this.GrupoCubos.children.length - 1].Ani =  new this.AniColumna(Rand(100, 80), 15, Max * 25);
        var pos = 0;
        for (var z = 0; z < ColumnasLado; z++) {
            for (var x = 0; x < ColumnasLado; x++, pos++) {
                var Pos = 1 + ((rnd2 > 0.5) ? ((z * ColumnasLado) + x) : ((x * ColumnasLado) + z));                
                if (Pos < this.GrupoCubos.children.length - 1 && Pos > 1) {
                    this.GrupoCubos.children[Pos + 1].Ani = new this.AniColumna(Rand(300, 250), 15, pos * 25);
                    this.GrupoCubos.children[Pos - 1].Ani = new this.AniColumna(Rand(300, 250), 15, pos * 25);
                }
            }
        }*/

        var ColumnasLado = Math.sqrt(this.GrupoCubos.children.length - 1);
        var Max = Math.floor((this.GrupoCubos.children.length - 1) / 2);
        this.GrupoCubos.children[this.GrupoCubos.children.length - 1].Ani =  new this.AniColumna(Rand(300, 250), 15, Max * 20);
        for (var c = 0; c < Max + 1; c++) { 
/*            var z = Math.round(c / (this.GrupoCubos.children.length / ColumnasLado));
            var x = Math.floor(c - ((this.GrupoCubos.children.length / ColumnasLado) * z));
            var t = (rnd2 > 0.9) ? (x + (z * ColumnasLado)) * 10 : (z + (x * ColumnasLado)) * 20;*/
            this.GrupoCubos.children[(Max + c)].Ani = new this.AniColumna(Rand(300, 250), 15, c * 20);
            this.GrupoCubos.children[(Max - c) + 1].Ani = new this.AniColumna(Rand(300, 250), 15, c * 20);
        }            
    },
    
    // Inicia una animación aleatória
    RandAni                 : function() {        
        if (this.TipoAni !== 4) { this.TipoAni = RandInt(5); }
        else                    { this.TipoAni = RandInt(4); } // Evito la animación del texto, si es la ultima que se ha hecho


//        this.TipoAni  = 2;
//        console.log("Banner_AdiestramientoCubos3D.RandAni", rnd);
        if (this.TipoAni  === 0)       {   this.IniciarAni_Rand(); }
        else if (this.TipoAni  === 1)  {   this.IniciarAni_Ola(); }
        else if (this.TipoAni  === 2)  {   this.IniciarAni_OlaCentrada(); }
        else if (this.TipoAni  === 3)  {   this.IniciarAni_Filas(); }
        else if (this.TipoAni  === 4)  {   (Rand() > 0.3) ? this.RandAni() : this.IniciarAni_Texto(); } // la animación del texto que salga lo menos posible
    },
    
    // Estructura para guardar los valores de la animación
    AniColumna              : function(nMaxEscalaY, nVel, nRetardo) {
        this.MaxEscalaY = nMaxEscalaY;
        this.Vel        = nVel;
        this.Retardo    = -nRetardo;
        this.FaseAni    = 0;            // 0 Animando, 1 Desanimando, 2 Terminado
    },
    
    
// Letras de 5x5
    Letras5x5               : { "d" :  [    " ", "x", "x", " ", " ",
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", "x", " ", " " ],
                                        
                                "e" :  [    " ", "x", "x", "x", " ", 
                                            " ", "x", " ", " ", " ", 
                                            " ", "x", "x", " ", " ", 
                                            " ", "x", " ", " ", " ", 
                                            " ", "x", "x", "x", " " ],
                                        
                                "v" :  [    "x", " ", " ", " ", "x", 
                                            "x", " ", " ", " ", "x", 
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", " ", "x", " ", " " ],
                                        
                                "i" :  [    " ", "x", "x", "x", " ", 
                                            " ", " ", "x", " ", " ", 
                                            " ", " ", "x", " ", " ", 
                                            " ", " ", "x", " ", " ", 
                                            " ", "x", "x", "x", " " ],
                                        
                                "l" :  [    " ", "x", " ", " ", " ", 
                                            " ", "x", " ", " ", " ", 
                                            " ", "x", " ", " ", " ", 
                                            " ", "x", " ", " ", " ", 
                                            " ", "x", "x", "x", " " ],
                                        
                                "r" :  [    " ", "x", "x", " ", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", "x", " ", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", "x", " ", "x", " " ],
                                        
                                "y" :  [    " ", "x", " ", "x", " ", 
                                            " ", "x", " ", "x", " ", 
                                            " ", " ", "x", " ", " ", 
                                            " ", " ", "x", " ", " ", 
                                            " ", " ", "x", " ", " " ],
                                        
                                "3" :  [    " ", "x", "x", "x", " ", 
                                            " ", " ", " ", "x", " ", 
                                            " ", " ", "x", "x", " ", 
                                            " ", " ", " ", "x", " ", 
                                            " ", "x", "x", "x", " " ] }
}); 