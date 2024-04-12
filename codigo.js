let funcionalidad = parseInt(prompt('Ingresa la opcion deseada\n1-Filtrar por prioridad de vencimiento\n2-Buscar vencimiento por nombre\n3-Mostrar cantidad de vencimientos pendientes\n0-PARA SALIR'));


while (funcionalidad != 0) {
    switch (funcionalidad) {
        case 1:
            //filtrado
            let opcion = parseInt(prompt('Visualizar vencimientos por prioridad\n1-Alta\n2-Media\n3-Baja'));
            filtrarPorPrioridad(opcion);
            break;
        case 2:
            //busqueda por nombre de vencimiento
            let nombre = prompt('Ingresa el nombre de la vencimiento a buscar');
            if (nombre != '') {
                buscarTarea(nombre);
            } else {
                alert('No ingresaste ningun vencimiento')
            }
            break;
        case 3:
            //funcion que cuenta la cantidad de vencimientos pendientes
            contarTareas();
            break;
        default:
            alert('Opcion invalida!');
            break;
    }

    funcionalidad = parseInt(prompt('Ingresa la opcion deseada\n1-Filtrar por prioridad de vencimiento\n2-Buscar vencimiento por nombre\n3-Mostrar cantidad de vencimientos pendientes\n0-PARA SALIR'));
}


function filtrarPorPrioridad(prioridad) {
    let filtrados = [];
    if (prioridad == 1) {
        filtrados = tareas.filter(tarea => tarea.prioridad.toLowerCase() == "alta");
    } else if (prioridad == 2) {
        filtrados = tareas.filter(tarea => tarea.prioridad.toLowerCase() == "media");
    } else if (prioridad == 3) {
        filtrados = tareas.filter(tarea => tarea.prioridad.toLowerCase() == "baja");
    } else {
        alert('prioridad invalida');
    }
    console.table(filtrados);
}


function buscarTarea(nomTarea) {
    let tareaEncontrada = tareas.find(tarea => tarea.nombre.toLowerCase().includes(nomTarea.toLowerCase()));

    if (tareaEncontrada != undefined) {
        alert(`La tarea fue encontrada:\nID:${tareaEncontrada.id} \nNOMBRE:${tareaEncontrada.nombre} \nDURACION: ${tareaEncontrada.duracion} \nPRIORIDAD: ${tareaEncontrada.prioridad} \nFECHA: ${tareaEncontrada.fecha.toLocaleDateString()}`);
    } else {
        console.log('Tarea no encontrada');
    }
}


function contarTareas() {
    alert('Cantidad de tareas pendientes: ' + tareas.length);
}




