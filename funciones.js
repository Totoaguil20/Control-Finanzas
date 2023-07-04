window.addEventListener('DOMContentLoaded', function() {
  var botonIngresar = document.getElementById('botonIngresar');
  var botonCancelar = document.getElementById('botonCancelar');
  var menu = document.getElementById('formulario');

  const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
  var saldo = localStorage.getItem('saldo')|| 0.00;
    var gasto =localStorage.getItem('gasto') ||0.00;
    var ingreso =localStorage.getItem('ingreso') ||0.00;
  // Función para actualizar el saldo, ingresos y gastos en la interfaz
  actualizarDatos();

  botonIngresar.addEventListener('click', function() {
    menu.classList.remove('hidden');
  });

  botonCancelar.addEventListener('click', function() {
    menu.classList.add('hidden');
  });

  function registrarMovimiento(event) {
    event.preventDefault();

    var tipoMovimiento = document.getElementById('tipo').value;
    var fechaMovimiento = document.getElementById('fecha').value;
    var cantidadMovimiento = parseFloat(document.getElementById('cantidad').value);
    var descripcionMovimiento = document.getElementById('descripcion').value;

    if (tipoMovimiento === 'Ingreso') {
      ingreso += cantidadMovimiento;
      saldo += cantidadMovimiento;
      localStorage.setItem('ingreso', ingreso.toFixed(2));
    } else if (tipoMovimiento === 'Gasto') {
      gasto += cantidadMovimiento;
      saldo -= cantidadMovimiento;
      localStorage.setItem('gasto', gasto.toFixed(2));
    }

    localStorage.setItem('saldo', saldo.toFixed(2));

    ocultarFormulario();

    var movimiento = {
      fecha: fechaMovimiento,
      cantidad: cantidadMovimiento,
      tipo: tipoMovimiento,
      descripcion: descripcionMovimiento
    };

    movimientos.push(movimiento);
    localStorage.setItem('movimientos', JSON.stringify(movimientos));

    document.getElementById('tipo').value = 'Ingreso';
    document.getElementById('fecha').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('descripcion').value = '';

    actualizarMovimientos();
    actualizarDatos();
   console.log(saldo);
  }
  function actualizarDatos(){
  
    
    
    var saldoElemento = document.querySelector('.saldo h1');
    saldoElemento.textContent = "$" + parseFloat(saldo).toFixed(2);

    var ingresosElemento = document.getElementById('ingresos');
    ingresosElemento.textContent = "$" + parseFloat(ingreso).toFixed(2);

    var gastosElemento = document.getElementById('gastos');
    gastosElemento.textContent = "$" + parseFloat(gasto).toFixed(2);
    

  }
  function ocultarFormulario() {
    menu.classList.add('hidden');
  }

  var movimientoForm = document.getElementById('movimientoForm');
  movimientoForm.addEventListener('submit', registrarMovimiento);

  function actualizarMovimientos() {
    
    const tablaMovimientos = document.getElementById('tablaMovimientos');

    let htmlMovimientos = '';
    movimientos.forEach(movimiento => {
      htmlMovimientos += `
        <div class="fila">
          <div class="celda">${movimiento.fecha}</div>
          <div class="celda">${"$" + movimiento.cantidad.toFixed(2)}</div>
          <div class="celda">${movimiento.tipo}</div>
          <div class="celda">${movimiento.descripcion}</div>
        </div>
      `;
    });

    tablaMovimientos.innerHTML = htmlMovimientos;
  }

  // Llamamos a las funciones para actualizar los movimientos y el saldo inicial
  actualizarMovimientos();
  actualizarDatos();
});
