<?php
require_once "Conexion.php";
$conexion = new Conexion();
$conexion->abrir();
$sql = "SELECT productos.nombre, SUM(pedidos.cantidad) AS total_pedidos
        FROM productos
        LEFT JOIN pedidos ON productos.id = pedidos.id_producto
        GROUP BY productos.id
        ORDER BY total_pedidos DESC";

$conexion->consulta($sql);
$data = [];
while ($row = $conexion->obtenerResult()->fetch_assoc()) {
    $data[] = $row;
}
header('Content-Type: application/json');
echo json_encode($data);