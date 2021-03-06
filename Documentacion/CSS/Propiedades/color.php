<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite definir el color del texto para el objeto.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>color: <b>Color</b>;</pre>
<table class='Tabla'>
    <tr>
        <td><b>Color</b></td>
        <td>Especifica el color para el objeto. Para más información sobre los colores en CSS visita este enlace <a href="/Doc/CSS/Colores/" target="_blank">Referencia CSS : Colores</a>. </td>
    </tr>
    <tr>
        <td><b>inherit</b></td>
        <td>
        	El color se hereda del elemento padre. 
        	<div class='nota'>Este valor no se soporta en IE7, y en IE8 requiere la declaración de un <code>!DOCTYPE</code>.</div>
        </td>
    </tr>
</table><br />
