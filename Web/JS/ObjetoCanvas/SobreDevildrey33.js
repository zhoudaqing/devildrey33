/* Plantilla para crear banners animados en devildrey33.es */

// Constructor SIN TIPO, el tipo se especifica según la animación
var SobreDevildrey33 = function() {
    // Llamo al constructor del ObjetoBanner, y si devuelve un error salgo retornando false.
    // El segundo parámetro del constructor puede ser "2d" o "THREE".
    if (ObjetoCanvas.call(this, { 
        'Tipo'          : 'THREE',
        'Ancho'         : 'Auto',
        'Alto'          : 'Auto',
        'Entorno'       : 'Normal',
        'MostrarFPS'    : true,
        'ElementoRaiz'  : document.getElementById('MarcoNavegacion'),
        'Pausar'        : false
    }) === false) { return false; }
    
    this.Iniciar();
    
    this.Cargando(false);
    
    // Retorno true para advertir que se ha creado el canvas correctamente
    return true;
};

SobreDevildrey33.prototype = Object.assign( Object.create(ObjetoCanvas.prototype) , {
    constructor     : SobreDevildrey33, 
    // Función que se llama al redimensionar el documento
    Redimensionar   : function() {    },
    // Función que se llama al hacer scroll en el documento    
    Scroll          : function() {    },
    // Función que se llama al mover el mouse por el canvas
    MouseMove       : function(Evento) { 
        this.Mouse.x = (Evento.clientX / this.Ancho) * 2 - 1; 
        this.Mouse.y = (Evento.clientY / this.Alto) * 2 - 1; 
    },
    // Función que se llama al presionar un botón del mouse por el canvas
    MousePresionado : function(Evento) { },
    // Función que se llama al soltar un botón del mouse por el canvas
    MouseSoltado    : function(Evento) { },
    // Función que se llama al entrar con el mouse en el canvas
    MouseEnter      : function(Evento) {  },
    // Función que se llama al salir con el mouse del canvas
    MouseLeave      : function(Evento) {  },
    // Función que se llama al presionar una tecla
    TeclaPresionada : function(Evento) { },
    // Función que se llama al soltar una tecla
    TeclaSoltada    : function(Evento) { },
    
//    Animaciones     : new ObjetoAnimacion(),
    
    Iniciar         : function() {
	this.Context.shadowMap.enabled	= true;
        // Antialias para las sombras
        this.Context.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.RayCaster = new THREE.Raycaster();
        this.Mouse = new THREE.Vector2();
        
        this.Escena = new THREE.Scene();
//        this.Camara = new THREE.OrthographicCamera(this.Ancho / -2, this.Ancho / 2, this.Alto / 2, this.Alto / -2, 0.5, 1000);
        this.Camara = new THREE.PerspectiveCamera(75, this.Ancho / this.Alto, 0.5, 1000);
        this.Camara.position.set(0, 0, 1000);
        this.Escena.add(this.Camara);

        // Parrilla para iniciar la plantilla (se puede eliminar)
/*        this.Parrilla = new THREE.GridHelper(100, 100, new THREE.Color(0xcccccc), new THREE.Color(0x999999));
        this.Parrilla.position.y = -4;
        this.Escena.add(this.Parrilla);*/
        
        var MaterialSuelo	= new THREE.MeshPhongMaterial({
		color		: 0x666666,
		shininess	: 200, 
		specular	: 0x33AA33,
		shading		: THREE.SmoothShading,
/*                transparent     : true,
                opacity         : 0.7-*/
	});
        var MaterialPared	= new THREE.MeshPhongMaterial({
		color		: 0x8888AA,
		shininess	: 200, 
		specular	: 0x33AA33,
		shading		: THREE.SmoothShading,
/*                transparent     : true,
                opacity         : 0.7-*/ 
	});
        /*
        var cubeGeom = new THREE.CubeGeometry(10, 10, 10, 1, 1, 1);
        this.mirrorCubeCamera = new THREE.CubeCamera( 0.1, 500, 512 );
        this.Escena.add( this.mirrorCubeCamera );
        var mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: this.mirrorCubeCamera.renderTarget } );
	this.mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
	this.mirrorCube.position.set(-75,50,0);
	this.mirrorCubeCamera.position = this.mirrorCube.position;
	this.Escena.add(this.mirrorCube);	
/*        var MaterialCubo1 = new THREE.MeshStandardMaterial( {
                emissive: 0x0000AA,
                emissiveIntensity: 1,
                color: 0x000000
        });*/

//        var MaterialCubo1 = new THREE.MeshBasicMaterial( { color: 0x0000AA, envMap: mirrorCamera.renderTarget } );
        var MaterialCubo1	= new THREE.MeshPhongMaterial({
		color		: 0x0000AA,
		shininess	: 300, 
		specular	: 0x33AA33,
		shading		: THREE.SmoothShading,
                transparent     : true,
                opacity         : 0.7                
	});
        
        var MaterialCubo2	= new THREE.MeshPhongMaterial({
		color		: 0x0000AA,
		shininess	: 300, 
		specular	: 0x33AA33,
		shading		: THREE.SmoothShading,
                transparent     : true,
                opacity         : 0.7                
	});
/*
        this.UniformsCubo1 = {
            MouseHover : { type: 'bool', value: false },
            Tiempo     : { type: '1f', value: 0 }
        };
        this.UniformsCubo2 = {
            MouseHover : { type: 'bool', value: false },
            Tiempo     : { type: '1f', value: 0 }
        };

        var shaderCubo1 = new THREE.ShaderMaterial({
//            attributes: 	attributesS6,
            uniforms:       this.UniformsCubo1,
            vertexShader:   this.Shaders.Vertex,    // this.Shaders.Vertex, 
//            fragmentShader: document.getElementById('fragmentshader').innerHTML, // this.Shaders.Fragment, 
            transparent : true,
            opacity:0.8,
            wireframe: true
        });*/

        
        
        hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
        hemiLight.position.set( 0, 50, -10 );
	hemiLight.castShadow		= true;
        this.Escena.add( hemiLight );
        hemiLight.intensity = 0.7;
        
        
        this.Suelo = new THREE.Mesh(new THREE.BoxGeometry( 300, 1, 300 ), MaterialSuelo );
//        this.Suelo.position.y = -12;
        this.Suelo.castShadow = false;
        this.Suelo.receiveShadow = true;
        this.Escena.add(this.Suelo);
        
        this.ParedI = new THREE.Mesh(new THREE.BoxGeometry( 1, 150, 300 ), MaterialPared );
        this.ParedI.position.x = -150;
        this.ParedI.position.y = 75;
        this.ParedI.castShadow = false;
        this.ParedI.receiveShadow = true;
        this.Escena.add(this.ParedI);

        this.ParedD = new THREE.Mesh(new THREE.BoxGeometry( 1, 150, 300 ), MaterialPared );
        this.ParedD.position.x = 150;
        this.ParedD.position.y = 75;
        this.ParedD.castShadow = false;
        this.ParedD.receiveShadow = true;
        this.Escena.add(this.ParedD);

        this.ParedC = new THREE.Mesh(new THREE.BoxGeometry( 300, 150, 1 ), MaterialPared );
        this.ParedC.position.z = -150;
        this.ParedC.position.y = 75;
        this.ParedC.castShadow = false;
        this.ParedC.receiveShadow = true;
        this.Escena.add(this.ParedC);

        this.Cubo = new THREE.Mesh(new THREE.BoxGeometry( 12, 12, 12 ), MaterialCubo1 );
        this.Cubo.castShadow = true;
        this.Cubo.receiveShadow = false;
        this.Cubo.position.set(-12, 20, 20);
        this.Escena.add(this.Cubo);
        
        this.Cubo2 = new THREE.Mesh(new THREE.BoxGeometry( 12, 12, 12 ), MaterialCubo1 );
        this.Cubo2.castShadow = true;
        this.Cubo2.receiveShadow = false;
        this.Cubo2.position.set(12, 20, 20);
        this.Escena.add(this.Cubo2);
/*        this.Rotacion_Grados    = 0;
        this.Rotacion_Avance    = 0.005;
        this.Rotacion_Distancia = 20;
        this.Camara.position.set(0, 0, this.Rotacion_Distancia);                */

        this.PointLight = new THREE.PointLight( 0xffee88, 25000, 200, 10 );
        this.PointLight.position.set( 0, 120, 70 );
	this.PointLight.castShadow		= true;
//        this.PointLight.add(this.Cubo);
        this.Escena.add(this.PointLight); 
        

/*        var ambient	= new THREE.AmbientLight( 0x444444 );
	this.Escena.add( ambient );*/
	
/*	var light	= new THREE.DirectionalLight( 0x4444cc, 2 );
	light.position.set( 1, -1, 1 ).normalize();
	scene.add( light );*/

/*	this.SpotLight	= new THREE.SpotLight( 0xFFAADD, 0 );
	this.SpotLight.position.set( 60, 80, 120 );
	this.SpotLight.shadow.camera.near	= 0.01;		
	this.SpotLight.castShadow		= true;
	this.SpotLight.target.position.set(0,-100,-400);
        this.SpotLight.target.updateMatrixWorld();
        this.Escena.add( this.SpotLight );	*/
        /*var helper = new THREE.CameraHelper(this.SpotLight.shadow.camera);
        this.Escena.add(helper);*/

/*        this.SpotLight2	= new THREE.SpotLight( 0xFFAAEE, 1 );
	this.SpotLight2.position.set( 0, 80, 120 );
	this.SpotLight2.shadow.camera.near	= 0.01;		
	this.SpotLight2.castShadow		= true;
        this.SpotLight2.target.position.set(0,-100,-400);
	this.Escena.add( this.SpotLight2 );	
        /*var helper2 = new THREE.CameraHelper(this.SpotLight2.shadow.camera);
        this.Escena.add(helper2);*/
        

/*        this.Luz = new THREE.DirectionalLight(0x888888);
        this.Luz.position.set( -150, 150, 0 );
//        this.Luz.lookAt(this.Escena.position);        
        this.Luz.castShadow = true;
        this.Luz.shadowDarkbess = 0.5;       
        this.Escena.add(this.Luz);
        var helperl = new THREE.CameraHelper(this.Luz.shadow.camera);
        this.Escena.add(helperl);*/

        
/*        this.AniAvanceCamara = new ObjetoAnimacion.Crear(Array(
            new ObjetoAnimacion.Paso({ Z : 500, Y: 150 }),
            new ObjetoAnimacion.Paso({ Z : 25, Y :  0}, 4250, 0, FuncionesTiempo.SinOut)
        ));*/
        this.AniAvanceCamara = ObjetoAnimacion.Crear([
            { 'Paso' : { z : 500, y: 150 }},
            { 'Paso' : { z :  70, y:  35 }, 'Tiempo' : 2250, 'FuncionTiempo' : FuncionesTiempo.SinInOut }
        ], { "Repetir" : 0, FuncionActualizar : function(Indice, Valor) { this.Camara.position[Indice] = Valor; }.bind(this) });
        
        
        this.AniCuboY1 = ObjetoAnimacion.Crear([
            { 'Paso' : { y: 35 }},
            { 'Paso' : { y: 40 }, Tiempo : 750, FuncionTiempo : FuncionesTiempo.SinOut},
            { 'Paso' : { y: 35 }, Tiempo : 750, FuncionTiempo : FuncionesTiempo.SinIn},
        ], { "Repetir" : -1, FuncionActualizar : function(Indice, Valor) { this.Cubo.position[Indice] = Valor; }.bind(this) });
        
        this.AniCuboY2 = ObjetoAnimacion.Crear([
            { 'Paso' : { y: 35 }},
            { 'Paso' : { y: 40 }, Tiempo : 750, FuncionTiempo : FuncionesTiempo.SinOut, Retraso : 375},
            { 'Paso' : { y: 35 }, Tiempo : 750, FuncionTiempo : FuncionesTiempo.SinIn},
        ], { "Repetir" : -1, FuncionActualizar : function(Indice, Valor) { this.Cubo2.position[Indice] = Valor; }.bind(this) });
        
        
        this.AniPosLuz = ObjetoAnimacion.Crear([ 
            { 'Paso' : { x : -20, y : 120, z : 70 }},
            { 'Paso' : { x : 20, y : 110, z : 60 }, Tiempo : 12000, FuncionTiempo : FuncionesTiempo.SinInOut },
            { 'Paso' : { x : -20, y : 120, z : 70 }, Tiempo : 12000, FuncionTiempo : FuncionesTiempo.SinInOut },
        ], { Repetir : -1, FuncionActualizar : function(Indice, Valor) { this.PointLight.position[Indice] = Valor; }.bind(this) });
/*        this.AniEncenderLuz = ObjetoAnimacion.Crear([
            { 'Paso' : { Intensidad : 0 }},
            { 'Paso' : { Intensidad : 0.7, }, 'Tiempo' : 60, 'FuncionTiempo' : FuncionesTiempo.SinInOut, Retraso : 2000},
            { 'Paso' : { Intensidad : 0, },'Tiempo' : 60, 'FuncionTiempo' : FuncionesTiempo.SinInOut },
            { 'Paso' : { Intensidad : 0.6, }, 'Tiempo' : 60, 'FuncionTiempo' : FuncionesTiempo.SinInOut, },
            { 'Paso' : { Intensidad : 0.1, },'Tiempo' : 50, 'FuncionTiempo' : FuncionesTiempo.SinInOut },
            { 'Paso' : { Intensidad : 0.7} , 'Tiempo' : 850, 'FuncionTiempo' : FuncionesTiempo.SinInOut },
            { 'Paso' : { Intensidad : 1} , 'Tiempo' : 2500, 'FuncionTiempo' : FuncionesTiempo.SinInOut }
        ], { "Repetir" : 0, FuncionActualizar : function(Indice, Valor) { this.SpotLight.intensity = Valor; }.bind(this) });
        */
        
        this.Tiempo = Date.now();
        
        this.Avance = 0;
    },
    
    // Función que pinta cada frame de la animación
    Pintar          : function() {    
        ObjetoAnimacion.Actualizar(this.Tick);
        
/*        this.mirrorCube.visible = false;
	this.mirrorCubeCamera.updateCubeMap( this.Context, this.Escena );
	this.mirrorCube.visible = true;        */
        
//        this.SpotLight.intensity = this.AniEncenderLuz.Intensidad;
        /*
        var tiempo = this.Tick;
        var delta = tiempo - this.Tiempo;
        this.Tiempo = tiempo;
        this.Avance += delta / 500;
        this.Cubo.position.y = Math.sin(this.Avance) * 1.5;
        this.Cubo2.position.y = Math.cos(this.Avance) * 1.5;*/
        
/*        this.UniformsCubo1.Tiempo.value += delta / 1000;*/
        
        
// update the picking ray with the camera and mouse position	
	this.RayCaster.setFromCamera( this.Mouse, this.Camara );	

	// calculate objects intersecting the picking ray
	var intersects = this.RayCaster.intersectObjects( this.Escena.children );
///console.log(intersects);
        if (intersects[0]) {
            if (intersects[0].object === this.Cubo) { console.log("cubo"); }
            if (intersects[0].object === this.Cubo2) { console.log("cubo2"); }
        }
/*	for ( var i = 0; i < intersects.length; i++ ) {

		intersects[ i ].object.material.color.set( 0x00ff00 );
	
	}        */
        
//        this.Camara.lookAt(this.Escena.position);
/*        this.Rotacion_Grados += this.Rotacion_Avance;
        this.Camara.position.x = this.Rotacion_Distancia * Math.cos(this.Rotacion_Grados);
        this.Camara.position.z = this.Rotacion_Distancia * Math.sin(this.Rotacion_Grados);
        this.Camara.lookAt(this.Escena.position); */
        this.Context.render(this.Escena, this.Camara);  
    },
    
    // Para el banner necesito tener los shaders dentro del mismo script
    Shaders         : {
        'Vertex'    : [ "precision highp float;",
                        "uniform bool   MouseHover;",
                        "uniform float  Tiempo;",
                        "//",
                        "// https://github.com/hughsk/glsl-noise/blob/master/classic/3d.glsl",
                        "//",
                        '// GLSL textureless classic 3D noise "cnoise",',
                        '// with an RSL-style periodic variant "pnoise".',
                        "// Author:  Stefan Gustavson (stefan.gustavson@liu.se)",
                        "// Version: 2011-10-11",
                        "//",
                        "// Many thanks to Ian McEwan of Ashima Arts for the",
                        "// ideas for permutation and gradient selection.",
                        "//",
                        "// Copyright (c) 2011 Stefan Gustavson. All rights reserved.",
                        "// Distributed under the MIT license. See LICENSE file.",
                        "// https://github.com/ashima/webgl-noise",
                        "//",
                        "vec3 mod289(vec3 x)        { return x - floor(x * (1.0 / 289.0)) * 289.0; }",
                        "vec4 mod289(vec4 x)        { return x - floor(x * (1.0 / 289.0)) * 289.0; }",
                        "vec4 permute(vec4 x)       { return mod289(((x*34.0)+1.0)*x); }",
                        "vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }",
                        "vec3 fade(vec3 t)          { return t*t*t*(t*(t*6.0-15.0)+10.0); }",
                        "// Classic Perlin noise",
                        "float cnoise(vec3 P) {",
                            "vec3 Pi0 = floor(P);", // Integer part for indexing
                            "vec3 Pi1 = Pi0 + vec3(1.0);", // Integer part + 1
                            "Pi0 = mod289(Pi0);",
                            "Pi1 = mod289(Pi1);",
                            "vec3 Pf0 = fract(P);", // Fractional part for interpolation
                            "vec3 Pf1 = Pf0 - vec3(1.0);", // Fractional part - 1.0
                            "vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);",
                            "vec4 iy = vec4(Pi0.yy, Pi1.yy);",
                            "vec4 iz0 = Pi0.zzzz;",
                            "vec4 iz1 = Pi1.zzzz;",
                            "vec4 ixy = permute(permute(ix) + iy);",
                            "vec4 ixy0 = permute(ixy + iz0);",
                            "vec4 ixy1 = permute(ixy + iz1);",
                            "vec4 gx0 = ixy0 * (1.0 / 7.0);",
                            "vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;",
                            "gx0 = fract(gx0);",
                            "vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);",
                            "vec4 sz0 = step(gz0, vec4(0.0));",
                            "gx0 -= sz0 * (step(0.0, gx0) - 0.5);",
                            "gy0 -= sz0 * (step(0.0, gy0) - 0.5);",
                            "vec4 gx1 = ixy1 * (1.0 / 7.0);",
                            "vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;",
                            "gx1 = fract(gx1);",
                            "vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);",
                            "vec4 sz1 = step(gz1, vec4(0.0));",
                            "gx1 -= sz1 * (step(0.0, gx1) - 0.5);",
                            "gy1 -= sz1 * (step(0.0, gy1) - 0.5);",
                            "vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);",
                            "vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);",
                            "vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);",
                            "vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);",
                            "vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);",
                            "vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);",
                            "vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);",
                            "vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);",
                            "vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));",
                            "g000 *= norm0.x;",
                            "g010 *= norm0.y;",
                            "g100 *= norm0.z;",
                            "g110 *= norm0.w;",
                            "vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));",
                            "g001 *= norm1.x;",
                            "g011 *= norm1.y;",
                            "g101 *= norm1.z;",
                            "g111 *= norm1.w;",
                            "float n000 = dot(g000, Pf0);",
                            "float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));",
                            "float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));",
                            "float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));",
                            "float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));",
                            "float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));",
                            "float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));",
                            "float n111 = dot(g111, Pf1);",
                            "vec3 fade_xyz = fade(Pf0);",
                            "vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);",
                            "vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);",
                            "float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);",
                            "return 2.2 * n_xyz;",
                        "}",
                        "void main() {",
                            "float Amplitud = (MouseHover == false) ? 0.75 : 2.5;",
                            "float Frequencia = (MouseHover == false) ? 0.43 : 1.0;",
                            // Get a 3d noise using the position
                            "float Desplazamiento = Amplitud * cnoise(Frequencia * position + Tiempo);",
                            "vec3 newPosition = position + normal * Desplazamiento;",
                            "gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);",
                        "}"].join("\n"),                       
        
    }
});

/*

	var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer.setClearColorHex( 0x000000, 1 );

	renderer.shadowMapEnabled	= true;
	renderer.shadowMapType 		= THREE.PCFSoftShadowMap;

	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
	camera.position.z = 25;
	// camera.position.set(0, 8, 15);
	// camera.lookAt(scene.position)

	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////
	var ambient	= new THREE.AmbientLight( 0x444444 );
	scene.add( ambient );
	
	var light	= new THREE.DirectionalLight( 0x4444cc, 2 );
	light.position.set( 1, -1, 1 ).normalize();
	scene.add( light );

	var spotLight	= new THREE.SpotLight( 0xFFAA88 );
	spotLight.target.position.set( 0, 2, 0 );
	spotLight.shadowCameraNear	= 0.01;		
	spotLight.castShadow		= true;
	spotLight.shadowDarkness	= 0.5;
	spotLight.shadowCameraVisible	= true;
// console.dir(spotLight)
// spotLight.shadowMapWidth	= 1024;
// spotLight.shadowMapHeight	= 1024;
	scene.add( spotLight );	

	onRenderFcts.push(function(){
		var angle	= Date.now()/1000 * Math.PI;
// angle	= Math.PI*2
		spotLight.position.x	= Math.cos(angle*-0.1)*20;
		spotLight.position.y	= 10 + Math.sin(angle*0.5)*6;
		spotLight.position.z	= Math.sin(angle*-0.1)*20;		
	})
	//////////////////////////////////////////////////////////////////////////////////
	//		Comment								//
	//////////////////////////////////////////////////////////////////////////////////

	var geometry	= new THREE.TorusKnotGeometry(25, 8, 75, 20);
	var texture	= THREE.ImageUtils.loadTexture( "images/water.jpg" );
	texture.repeat.set( 0.7, 1 );
	texture.wrapS	= texture.wrapT = THREE.RepeatWrapping;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: 0x444444,
		color		: 0x8844AA,
		shininess	: 300, 
		specular	: 0x33AA33,
		shading		: THREE.SmoothShading,
		map		: texture
	});
	var torusKnot	= new THREE.Mesh( geometry, material );
	torusKnot.scale.multiplyScalar(1/18);
	torusKnot.position.y		= 4;
	scene.add( torusKnot );

	onRenderFcts.push(function(){
		// torusKnot.rotation.x	+= 0.005;
		// torusKnot.rotation.y	+= 0.03;
		// torusKnot.rotation.z	+= 0.02;		
	})


	torusKnot.castShadow		= true;
	torusKnot.receiveShadow	= false;

	//////////////////////////////////////////////////////////////////////////////////
	//		Ground
	//////////////////////////////////////////////////////////////////////////////////

	var geometry	= new THREE.CubeGeometry( 10, 0.2, 10);
	var texture	= THREE.ImageUtils.loadTexture('images/water.jpg');
	texture.repeat.set( 0.5, 0.8 );
	texture.wrapS	= texture.wrapT = THREE.RepeatWrapping;
	var material	= new THREE.MeshPhongMaterial({
		ambient		: 0x444444,
		color		: 0x66aa66,
		shininess	: 150, 
		specular	: 0x888888,
		shading		: THREE.SmoothShading,
		map		: texture
	});
	var ground		= new THREE.Mesh( geometry, material );
	ground.scale.multiplyScalar(3);
	ground.position.y		= -0.5/2;
	scene.add( ground );

	ground.castShadow	= false;
	ground.receiveShadow	= true;

	
	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var mouse	= {x : 0, y : 0}
	document.addEventListener('mousemove', function(event){
		mouse.x	= (event.clientX / window.innerWidth ) - 0.5
		mouse.y	= (event.clientY / window.innerHeight) - 0.5
	}, false)
	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*40 - camera.position.x) * (delta*3)
		camera.position.y += (mouse.y*10 - camera.position.y + 4) * (delta*3)
		// limit camera position to avoid showing shadow on backface
		camera.position.y	= Math.max(camera.position.y, 3);

		camera.lookAt( scene.position )
	})


	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	})
	
	//////////////////////////////////////////////////////////////////////////////////
	//		loop runner							//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})
*/