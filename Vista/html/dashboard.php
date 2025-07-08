<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Computadoras</title>
    <link rel="stylesheet" href="Vista/html/css/styles.css">
    <script src="Vista/jquery/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="Vista/js/script.js"></script>
</head>

<body>
    <header>
        <h1>Tienda de Computadoras</h1>
        <nav>
            <a href="index.php?accion=panelAdmin">Productos</a>
            <a href="index.php?accion=panelAdmin1">Categorias</a>
            <a href="index.php?accion=panelAdmin2">Pedidos</a>
            <a href="index.php?accion=dashboard">DashBoard</a>
            <a href="index.php?accion=cerrarSesion">Cerrar Sesión</a>
        </nav>
    </header>
    <section id="panel-admin">
        <h2>Panel de Administración</h2>
        <div class="admin-section">
            <h3>Productos mas populares</h3>
            <canvas id="graficaPedidos" width="100" height="50"></canvas>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 Tienda de Computadoras. Todos los derechos reservados.</p>
    </footer>
</body>

</html>