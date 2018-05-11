<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;  
?>

<p>Esta función recorta el área visible del objeto al tamaño del circulo especificado.</p>
<p>Solo se puede utilizar en la propiedad <a href='/Doc/CSS/Propiedades/clip-path'>clip-path</a>.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>circle( <i>radio</i> [ <i>at X Y</i> ] );</pre>

<p>El rádio debe ser un valor positivo utilizando cualquier tipo de unidad de tamaño relativa válida.<br />
Las coordenadas de inicio son opcionales, y se pueden especificar con cualquier tipo de unidad de tamaño relativo válido, tanto positivo como negativo.<br />
Para más información sobre unidades de tamaño relativo, consulta la <a href="/Doc/CSS/Unidades/" target="_blank" title="px, ex, em, rem, %">Referencia CSS : Unidades</a>.</p>
<p>Un par de ejemplos :</p>
            
<!-- -[INICIO devildrey33.circle]-
clip-path:circle(10px);                     /* 10 pixeles de rádio                             */
clip-path:circle(5px at 10px 20px);         /* 5 pixeles de rádio empezando desde X 10 y Y 20. */
 -[FIN devildrey33.circle]- -->
<?php 
    $Base->PintarCodigo->PintarArchivoCSS("circle", "", basename(__FILE__), 'circle'); 
?>            