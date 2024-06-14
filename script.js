document.addEventListener("DOMContentLoaded", function() {
    const agregarTareaBtn = document.getElementById("agregarTareaBtn");
    const tareasPendientes = document.getElementById("tareasPendientes");
    const tareasResueltas = document.getElementById("tareasResueltas");
    const tareasVencidas = document.getElementById("tareasVencidas");

    agregarTareaBtn.addEventListener("click", function() {
        const nuevaTarea = document.getElementById("Nuevatarea").value;
        const fechaInicio = document.getElementById("fechai").value;
        const fechaFin = document.getElementById("fechaf").value;
        const responsable = document.getElementById("Respon").value;

        if (nuevaTarea && fechaInicio && fechaFin && responsable) {
            const tarea = document.createElement("li");
            tarea.innerHTML = `${nuevaTarea} - ${responsable} - ${fechaInicio} - ${fechaFin} 
                                <button onclick="marcarResuelta(this)">Marcar Resuelta</button>
                                <button onclick="eliminarTarea(this)">Eliminar</button>`;

            const fechaInicioDate = new Date(fechaInicio);
            const fechaFinDate = new Date(fechaFin);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            if (esMismoDia(fechaInicioDate, hoy) || esSiguienteDia(fechaInicioDate, hoy)) {
                tareasPendientes.appendChild(tarea);
            } else if (fechaFinDate < hoy) {
                tarea.classList.add("vencida");
                tareasVencidas.appendChild(tarea);
            } else {
                tareasPendientes.appendChild(tarea);
            }

            limpiarCampos();
        } else {
            alert("Por favor complete todos los campos.");
        }
    });

    function esMismoDia(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    function esSiguienteDia(date1, date2) {
        const siguienteDia = new Date(date2);
        siguienteDia.setDate(date2.getDate() + 1);
        return date1.getFullYear() === siguienteDia.getFullYear() &&
               date1.getMonth() === siguienteDia.getMonth() &&
               date1.getDate() === siguienteDia.getDate();
    }

    function limpiarCampos() {
        document.getElementById("Nuevatarea").value = "";
        document.getElementById("fechai").value = "";
        document.getElementById("fechaf").value = "";
        document.getElementById("Respon").value = "";
    }
});
function marcarResuelta(boton) {
    const tarea = boton.parentElement;
    const fechaInicioStr = tarea.textContent.split(" - ")[2];
    const fechaInicioDate = new Date(fechaInicioStr);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaInicioDate <= hoy) {
        tarea.classList.remove("pendiente", "vencida");
        tarea.classList.add("resuelta");
        boton.classList.remove("btn-pendiente", "btn-vencida");
        boton.classList.add("btn-resuelta");
        boton.textContent = "Desmarcar";
        boton.setAttribute("onclick", "desmarcarResuelta(this)");
        document.getElementById("tareasResueltas").appendChild(tarea);
    } else {
        alert("No se puede marcar como resuelta una tarea cuya fecha de inicio aún no ha llegado.");
    }
}


function desmarcarResuelta(boton) {
    const tarea = boton.parentElement;
    tarea.removeChild(boton);
    const marcarResueltaBtn = document.createElement("button");
    marcarResueltaBtn.innerText = "Marcar Resuelta";
    marcarResueltaBtn.setAttribute("onclick", "marcarResuelta(this)");
    tarea.appendChild(marcarResueltaBtn);
    document.getElementById("tareasPendientes").appendChild(tarea);
}

function eliminarTarea(boton) {
    const tarea = boton.parentElement;
    if (confirm("¿Está seguro de que desea eliminar esta tarea?")) {
        tarea.parentElement.removeChild(tarea);
    }
}

