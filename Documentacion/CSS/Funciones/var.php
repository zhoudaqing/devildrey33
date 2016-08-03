<p>Esta función permite enlazar una propiedad con una variable CSS. Puedes utilizar la función var en cualquier parte del valor de la propiedad, es decir que no necesariamente la variable tiene que contener todo el valor de la propiedad.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>var ( --NombreVariable <span class='TxtGris'>[requerido]</span>, ValorPorDefecto <span class='TxtGris'>[opcional]</span> );</pre>
<div class='nota'>Las variables deben empezar siempre por <code>--</code></div>
<table class='Tabla'>
    <tr>
        <td style='width:140px'><b>--NombreVariable</b></td>
        <td>Nombre de la variable a enlazar.</td>
    </tr>
    <tr>
        <td><b>ValorPorDefecto</b></td>
        <td>Valor que recibirá la propiedad en el caso de no existir la variable. Este parámetro es opcional, si no se especifica este parámetro y la variable no existe, la propiedad permanecerá intacta.</td>
    </tr>
</table><br />
<hr />
<h2>Compatibilidad</h2>
<p>Esta propiedad es soportada por todos los navegadores compatibles con CSS3.</p>
<p><b>No está previsto quie ningún Internet Explorer soporte esta propiedad...</b> (Microsoft Edge por lo visto si que la soporta)</p>