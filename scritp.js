// ===============================
// REGISTRO RUC 2.0
// ===============================

let registros = JSON.parse(localStorage.getItem("registros")) || [];
let editando = -1;

// ===============================
// INICIAR APLICACIÓN
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    mostrarFecha();
    mostrarRegistros();

    document.getElementById("guardar").addEventListener("click", guardarRegistro);

    document.getElementById("buscar").addEventListener("keyup", buscarRegistros);

});

// ===============================
// FECHA
// ===============================
function mostrarFecha(){

    const hoy = new Date();

    document.getElementById("fecha").textContent =
        hoy.toLocaleDateString("es-PE") + " - " +
        hoy.toLocaleTimeString("es-PE");

}

// ===============================
// GUARDAR
// ===============================
function guardarRegistro(){

    const ruc = document.getElementById("ruc").value.trim();
    const rs = document.getElementById("rs").value.trim();
    const dni1 = document.getElementById("dni1").value.trim();
    const dni2 = document.getElementById("dni2").value.trim();
    const obs = document.getElementById("obs").value.trim();

    if(ruc.length != 11){

        alert("El RUC debe tener 11 dígitos.");
        return;

    }

    if(dni1.length != 8){

        alert("El DNI 1 debe tener 8 dígitos.");
        return;

    }

    if(dni2.length != 8){

        alert("El DNI 2 debe tener 8 dígitos.");
        return;

    }

    if(rs==""){

        alert("Ingrese la Razón Social.");
        return;

    }

    const registro = {

        ruc,
        rs,
        dni1,
        dni2,
        obs,
        fecha:new Date().toLocaleString()

    };

    if(editando==-1){

        registros.push(registro);

    }else{

        registros[editando]=registro;
        editando=-1;

        document.getElementById("guardar").innerHTML="💾 Guardar Registro";

    }

    guardarLocal();

    limpiarFormulario();

    mostrarRegistros();

    alert("Registro guardado correctamente.");

}

// ===============================
// GUARDAR LOCAL
// ===============================
function guardarLocal(){

    localStorage.setItem("registros",JSON.stringify(registros));

}

// ===============================
// MOSTRAR TABLA
// ===============================
function mostrarRegistros(){

    const tabla=document.getElementById("tabla");

    tabla.innerHTML="";

    registros.forEach((r,index)=>{

        tabla.innerHTML += `

        <tr>

        <td>${r.ruc}</td>

        <td>${r.rs}</td>

        <td>${r.dni1}</td>

        <td>${r.dni2}</td>

        <td>

        <button class="editar" onclick="editar(${index})">
        ✏️
        </button>

        <button class="eliminar" onclick="eliminar(${index})">
        🗑️
        </button>

        </td>

        </tr>

        `;

    });

}

// ===============================
// EDITAR
// ===============================
function editar(index){

    const r = registros[index];

    document.getElementById("ruc").value=r.ruc;
    document.getElementById("rs").value=r.rs;
    document.getElementById("dni1").value=r.dni1;
    document.getElementById("dni2").value=r.dni2;
    document.getElementById("obs").value=r.obs;

    editando=index;

    document.getElementById("guardar").innerHTML="Actualizar Registro";

}

// ===============================
// ELIMINAR
// ===============================
function eliminar(index){

    if(confirm("¿Eliminar este registro?")){

        registros.splice(index,1);

        guardarLocal();

        mostrarRegistros();

    }

}

// ===============================
// BUSCAR
// ===============================
function buscarRegistros(){

    const texto=document.getElementById("buscar").value.toLowerCase();

    const filas=document.querySelectorAll("#tabla tr");

    filas.forEach(fila=>{

        fila.style.display=fila.textContent.toLowerCase().includes(texto)
        ? ""
        : "none";

    });

}

// ===============================
// LIMPIAR
// ===============================
function limpiarFormulario(){

    document.getElementById("ruc").value="";
    document.getElementById("rs").value="";
    document.getElementById("dni1").value="";
    document.getElementById("dni2").value="";
    document.getElementById("obs").value="";

}