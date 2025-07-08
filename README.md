# Tienda de computadoras

Este proyecto es una tienda web desarrollada en PHP y MySQL, que permite la gestión y venta de computadoras y accesorios. Incluye panel de administración, registro de usuarios, catálogo filtrable, gestión de pedidos y carga de múltiples imágenes por producto.

## Características principales

- **Catálogo de productos**: Visualización de computadoras y accesorios, con filtros por categoría y paginación.
- **Gestión de productos**: Alta, edición y eliminación de productos desde el panel admin.
- **Gestión de categorías**: Crear, editar y eliminar categorías (no se pueden eliminar si tienen productos asociados).
- **Gestión de pedidos**: Visualización y registro de pedidos, con cambio de estado.
- **Registro y login de usuarios**: Para clientes y administradores.
- **Carga de imágenes**: Soporte para múltiples imágenes por producto.
- **Panel de administración**: Acceso restringido para gestionar productos, categorías y pedidos.
- **Filtros y búsqueda**: Filtrado por categoría desde el catálogo (AJAX).
- **Frontend responsivo**: Interfaz amigable y adaptable a dispositivos móviles.
- **Carrito de compras**: Añade productos y realiza pedidos simulados.
- **Paginación**: Navegación por páginas tanto en el catálogo general como en los filtrados.

## Estructura de carpetas

'''
/Controlador
    Controlador.php
/Modelo
    Conexion.php
    Producto.php
    GestionProducto.php
    Categoria.php
    GestionCategoria.php
    Pedido.php
    GestionPedido.php
    Usuario.php
    GestionUsuario.php
    Sesion.php
    GestionSesion.php
    imagenesProducto.php
    GestorImagenesProducto.php
    VerProductos.php
    VerProductosFiltro.php
    VerCategorias.php
    VerCategoriasBot.php
    VerCategoriasTab.php
    VerUsuarios.php
    VerPedidos.php
    VerTabla.php
/Vista
    /html
        inicio.php
        catalogo.php
        panelAdmin1.php
        panelAdmin2.php
        panelAdmin3.php
        editarProducto.php
        editarCategoria.php
        editarEstado.php
        registro.php
        logAdmin.php
        simcomp.php
        detalleProducto.php
        carrito.php
        css/styles.css
    /js
        script.js
    /jquery
        jquery.js
/upload
    (Imágenes de productos)
tienda_tenis.sql
index.php
'''

## Instalación y configuración

1. **Clona o descarga el repositorio.**
2. **Importa la base de datos**  
   Usa el archivo 'tienda_computadoras.sql' en phpMyAdmi.
3. **Configura el entorno**  
   - Coloca el proyecto en la carpeta 'htdocs' de XAMPP.
   - Asegúrate de que la base de datos, usuario y contraseña en 'Modelo/Conexion.php' coincidan con tu entorno.
4. **Sube imágenes**  
   La carpeta '/upload' debe tener permisos de escritura para guardar imágenes de productos.
5. **Accede a la aplicación**  
   - Abre tu navegador y entra a 'http://localhost/tienda_computadoras/index.php'
   - Usa la zona admin para gestionar productos, categorías y pedidos.

## Usuarios y roles

- **Administrador**: Puede gestionar productos, categorías y pedidos.
  - Usuario demo: 'admin@admin.com' - Contraseña: '12345'
- **Cliente**: Puede registrarse, ver el catálogo, ver pedidos asociados y realizar pedidos.
  - Usuarios:
    - 'jok@gmail.com' - '1212'
    - 'mario@gmail.com' - '1212'
    - 'sas@gmail.com' - '1212'

## Funcionalidades avanzadas

- Filtro de productos por categoría (AJAX y paginación).
- Registro y login de usuarios.
- Gestión de múltiples imágenes por producto.
- Panel de administración con tablas dinámicas.
- Validaciones en formularios.
- Carrito de compras y simulación de pedidos.
- Cambio de estado de pedidos desde el panel admin.

## Consideraciones

- **No puedes eliminar una categoría si tiene productos asociados.**  
  El sistema mostrará un mensaje de advertencia.
- **No puedes eliminar un producto si tiene imágenes asociadas** sin eliminarlas primero.  
  El sistema elimina primero las imágenes y luego el producto.
- **Las imágenes de productos** se almacenan en la carpeta '/upload'.
- **Las sesiones** se usan para gestionar usuarios y carritos.

## Créditos

Desarrollado por el grupo de Wendy (Wendy Yulieth Garcia Gonzales y Santiago Arévalo Acosta.)  
Proyecto académico para la gestión de una tienda de computadoras