<?php
require_once "Conexion.php";
session_start();

$conexion = new Conexion();
$conexion->abrir();

// Obtener el ID desde POST o desde la sesión
if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $_SESSION['producto_id'] = $id; // guardarlo para futuras vistas
} elseif (isset($_SESSION['producto_id'])) {
    $id = intval($_SESSION['producto_id']);
} else {
    $id = 0; // sin ID
}

// Si no hay ID válido, no seguimos
if ($id <= 0) {
    echo "<p>Producto no encontrado.</p>";
    exit;
}
$sql = "SELECT productos.id, productos.nombre, productos.especificaciones, productos.precio, imagenes_producto.imagenes, categorias.nombre as Categoria 
        FROM productos 
        JOIN categorias ON productos.id_categoria=categorias.id 
        JOIN imagenes_producto ON productos.id=imagenes_producto.id_producto 
        WHERE productos.id = $id LIMIT 1";
$conexion->consulta($sql);
$producto = $conexion->obtenerResult()->fetch_assoc();
?>
<section id="detalle-producto" class="detpro">
    <div class="producto-detalle">
        <?php if ($producto) { ?>
            <?php
            $id_prod = $id;
            $conexion_img = new Conexion();
            $conexion_img->abrir();
            $sql_img = "SELECT imagenes FROM imagenes_producto WHERE id_producto = $id_prod";
            $conexion_img->consulta($sql_img);
            $imgs_result = $conexion_img->obtenerResult();
            $imagenes = [];
            while ($img_row = $imgs_result->fetch_assoc()) {
                $imagenes[] = $img_row["imagenes"];
            }
            $conexion_img->cerrar();
            ?>
            <h2><strong><?php echo $producto["Categoria"] ?></strong></h2>
            <br>
            <table class="tablita">
                <tr>
                    <th>Producto</th>
                    <th>
                        <?php if (count($imagenes) > 1): ?>
                            <div class="carousel" data-prod="<?php echo $id_prod; ?>">
                                <?php foreach ($imagenes as $idx => $img): ?>
                                    <img src="upload/<?php echo $img; ?>" class="carousel-img"
                                        style="display:<?php echo $idx == 0 ? '' : 'none'; ?>;" width="50%" alt="">
                                <?php endforeach; ?>
                                <button class="prev" type="button">&#10094;</button>
                                <button class="next" type="button">&#10095;</button>
                            </div>
                        <?php elseif (count($imagenes) == 1): ?>
                            <img src="upload/<?php echo $imagenes[0]; ?>" width="50%" alt="">
                        <?php endif; ?>
                    </th>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <th>
                        <p><?php echo $producto["nombre"] ?></p>
                    </th>
                </tr>
                <tr>
                    <th>Especificaciones</th>
                    <th>
                        <p><?php echo $producto["especificaciones"] ?></p>
                    </th>
                </tr>
                <tr>
                    <th>Precio</th>
                    <th>
                        <p>$<?php echo number_format($producto["precio"], 0, ',', '.') ?></p>
                    </th>
                </tr>
            </table>
            <form id="Form-agregarCarrito" action="index.php?accion=agregarCarrito" method="post">
                <input type="hidden" name="id" value="<?php echo $producto["id"]; ?>">
                <input type="hidden" name="nombre" value="<?php echo $producto["nombre"]; ?>">
                <input type="hidden" name="precio" value="<?php echo $producto["precio"]; ?>">
                <input type="hidden" name="imagen" value="<?php echo $producto["imagenes"]; ?>">
                <input type="hidden" name="categoria" value="<?php echo $producto["Categoria"]; ?>">

                <label for="cantidad">Cantidad:</label>
                <input type="number" name="cantidad" value="1" min="1" required>
                <button type="submit">Añadir a la bolsa</button>
            </form>
        <?php } else { ?>
            <p>Producto no encontrado.</p>
        <?php } ?>
    </div>
</section>