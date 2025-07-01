<?php
class Producto
{
    private $nombre;
    private $descripcion;
    private $precio;
    private $categoria;
    private $foto;

    public function __construct($nombre, $descripcion, $precio, $categoria, $foto)
    {
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->precio = $precio;
        $this->categoria = $categoria;
        $this->foto = $foto;
    }
    public function obtenerNombre()
    {
        return $this->nombre;
    }
    public function obtenerDescripcion()
    {
        return $this->descripcion;
    }
    public function obtnerPrecio()
    {
        return $this->precio;
    }
    public function obtenerCategoria()
    {
        return $this->categoria;
    }
    public function obtenerFoto()
    {
        return $this->foto;
    }
}
