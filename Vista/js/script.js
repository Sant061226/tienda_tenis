$(document).ready(function () {
  verCategorias();
  verProductos();
  verProductosTabla();
  verCategoriasTab();
  verCategoriasBot();
  verPedidos();
  verPedUs();
  iniciarCarruselesAutomaticos();
  VerdetalleProducto();
});
function verPedUs() {
  $.post("Modelo/VerPedidosClientes.php", {}, function (respuesta) {
    $("#tebcli").html(respuesta);
  });
}
function verCategorias() {
  $.post("Modelo/VerCategorias.php", {}, function (respuesta) {
    $("#categorias").html(respuesta);
  });
}
function verCategoriasBot() {
  $.post("Modelo/VerCategoriasBot.php", {}, function (respuesta) {
    $("#catbo").html(respuesta);
  });
}
function verCategoriasTab() {
  $.post("Modelo/VerCategoriasTab.php", {}, function (respuesta) {
    $("#tabcat").html(respuesta);
  });
}
function verProductos() {
  $.post("Modelo/VerProductos.php", {}, function (respuesta) {
    $("#producto").html(respuesta);
  });
}
function verPedidos() {
  $.post("Modelo/VerPedidos.php", {}, function (respuesta) {
    $("#tebped").html(respuesta);
  });
}
function verProductosTabla() {
  $.post("Modelo/VerTabla.php", {}, function (respuesta) {
    $("#tablaprod").html(respuesta);
  });
}
function compraSimulada() {
  var id = $("#id").val();
  $.post(
    "index.php?accion=compraSimulada",
    {
      id: id,
    },
    function (documento) {
      $("#compra").html(documento);
    }
  );
}
$(document).on("click", ".filtro-categoria", function (e) {
  e.preventDefault();
  var id_categoria = $(this).data("id");
  $.post(
    "Modelo/VerProductosFiltro.php",
    { id_categoria: id_categoria },
    function (respuesta) {
      $("#producto").html(respuesta);
    }
  );
});
$(document).on("click", ".filtro-categoria", function (e) {
  e.preventDefault();
  var id_categoria = $(this).data("id");
  // Quitar la clase activa de todos los botones
  $(".navbar button").removeClass("active");
  // Agregar la clase activa al botón presionado
  $(this).closest("button").addClass("active");
  $.post(
    "Modelo/VerProductosFiltro.php",
    { id_categoria: id_categoria },
    function (respuesta) {
      $("#producto").html(respuesta);
    }
  );
});
$(document).ready(function () {
  $("#abrirModalCliente").click(function (e) {
    e.preventDefault();
    $("#modalCliente").fadeIn();
  });
  $("#cerrarModalCliente").click(function () {
    $("#modalCliente").fadeOut();
  });
  // Cierra el modal si se hace clic fuera del contenido
  $("#modalCliente").click(function (e) {
    if (e.target === this) $(this).fadeOut();
  });
});
var carruselTimers = {};

function iniciarCarruselesAutomaticos() {
  $(".carousel").each(function () {
    var $carousel = $(this);
    var $imgs = $carousel.find(".carousel-img");
    var carouselId = $carousel.data("prod");
    if ($imgs.length > 1) {
      // Evita múltiples intervalos para el mismo carrusel
      if (carruselTimers[carouselId]) {
        clearInterval(carruselTimers[carouselId]);
      }
      $imgs.hide().first().show();
      carruselTimers[carouselId] = setInterval(function () {
        var idx = $imgs.index($imgs.filter(":visible"));
        $imgs.eq(idx).hide();
        idx = (idx + 1) % $imgs.length;
        $imgs.eq(idx).show();
      }, 3000);
    }
  });
}

// Al cargar productos o filtrar
$(document).on("DOMSubtreeModified", "#producto", function () {
  iniciarCarruselesAutomaticos();
});

// Botones manuales
$(document).on("click", ".carousel .prev, .carousel .next", function () {
  var $carousel = $(this).closest(".carousel");
  var $imgs = $carousel.find(".carousel-img");
  var idx = $imgs.index($imgs.filter(":visible"));
  $imgs.eq(idx).hide();
  if ($(this).hasClass("next")) {
    idx = (idx + 1) % $imgs.length;
  } else {
    idx = (idx - 1 + $imgs.length) % $imgs.length;
  }
  $imgs.eq(idx).show();
});
// carrito
function VerdetalleProducto() {
  var id = $("input[name='id']").val();

  $.post("Modelo/detalleProducto.php", { id: id }, function (respuesta) {
    $("#detalle-producto").html(respuesta);
  });
}

$("#btnAgregarCarrito").on("click", function (e) {
  e.preventDefault();
  var datos = $("#Form-agregarCarrito").serialize();
  $.post("index.php?accion=agregarCarrito", datos, function (respuesta) {
    verCarrito();
    alert("Producto añadido al carrito");
  });
});

function verCarrito() {
  $("#tabla-carrito").load("index.php?accion=verCarrito");
}

// Delegar el evento para los botones de paginación (funciona para productos y filtrados)
$(document).on("click", ".btn-pagina", function () {
  var pagina = $(this).data("pagina");
  // Busca si hay un filtro de categoría activo
  var id_categoria = $(".navbar button.active").data("id") || 0;
  // Si hay filtro, usa VerProductosFiltro.php, si no, usa VerProductos.php
  if (id_categoria && id_categoria > 0) {
    $.post(
      "Modelo/VerProductosFiltro.php",
      { pagina: pagina, id_categoria: id_categoria },
      function (respuesta) {
        $("#producto").html(respuesta);
      }
    );
  } else {
    $.post("Modelo/VerProductos.php", { pagina: pagina }, function (respuesta) {
      $("#producto").html(respuesta);
    });
  }
});
$(document).on("click", ".filtro-categoria", function (e) {
  e.preventDefault();
  var id_categoria = $(this).data("id");
  $(".navbar button").removeClass("active");
  $(this).closest("button").addClass("active");
  // Siempre carga la página 1 al filtrar
  $.post(
    "Modelo/VerProductosFiltro.php",
    { id_categoria: id_categoria, pagina: 1 },
    function (respuesta) {
      $("#producto").html(respuesta);
    }
  );
});
$(document).ready(function () {
  $.getJSON("Modelo/Dashboard.php", function (data) {
    const labels = data.map((item) => item.nombre);
    const cantidades = data.map((item) => item.total_pedidos || 0); // <-- Cambiado aquí

    const ctx = document.getElementById("graficaPedidos").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cantidad de pedidos",
            data: cantidades,
            backgroundColor: "rgb(39, 38, 31)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  });
});
