// ===============================
// Cargar registros guardados
// ===============================
let registros = JSON.parse(localStorage.getItem("registros")) || [];
let editando = -1;

// Esperar a que cargue toda la página
document.addEventListener("DOMContentLoaded", () => {

    console.log("Aplicación iniciada correctamente");

    mostrarRegistros();

    document.getElementById("guardar").addEventListener("click", guardarRegistro);

    document.getElementById("buscar").addEventListener("keyup", buscarRegistro);

});

// ===============================
// Guardar Registro
// ===============================
function guardarRegistro() {

    console.log("Botón Guardar presionado");

    const ruc = document.getElementById("ruc").value.trim();
    const rs = document.getElementById("rs").value.trim();
    const dni1 = document.getElementById("dni1").value.trim();
    const dni2 = document.getElementById("dni2").value.trim();

    if (ruc === "" || rs === "" || dni1 === "" || dni2 === "") {
        alert("Complete todos los campos.");
        return;
    }

    const nuevoRegistro = {
        ruc,
        rs,
        dni1,
        dni2
    };

    if (editando === -1) {
        registros.push(nuevoRegistro);
    } else {
        registros[editando] = nuevoRegistro;
        editando = -1;
        document.getElementById("guardar").textContent = "Guardar Registro";
    }

    localStorage.setItem("registros", JSON.stringify(registros));

    console.log("Datos guardados:");
    console.log(registros);

    limpiar();

    mostrarRegistros();

    alert("Registro guardado correctamente.");

}

// ===============================
// Mostrar registros
// ===============================
function mostrarRegistros() {

    const tabla = document.getElementById("tabla");

    tabla.innerHTML = "";

    registros.forEach((registro, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${registro.ruc}</td>
            <td>${registro.rs}</td>
            <td>${registro.dni1}</td>
            <td>${registro.dni2}</td>
            <td>
                <button class="editar" onclick="editarRegistro(${index})">
                    Editar
                </button>

                <button class="eliminar" onclick="eliminarRegistro(${index})">
                    Eliminar
                </button>
            </td>
        </tr>
        `;

    });

}

// ===============================
// Editar Registro
// ===============================
function editarRegistro(index) {

    document.getElementById("ruc").value = registros[index].ruc;
    document.getElementById("rs").value = registros[index].rs;
    document.getElementById("dni1").value = registros[index].dni1;
    document.getElementById("dni2").value = registros[index].dni2;

    editando = index;

    document.getElementById("guardar").textContent = "Actualizar Registro";

}

// ===============================
// Eliminar Registro
// ===============================
function eliminarRegistro(index) {

    if (confirm("¿Desea eliminar este registro?")) {

        registros.splice(index, 1);

        localStorage.setItem("registros", JSON.stringify(registros));

        mostrarRegistros();

    }

}

// ===============================
// Buscar
// ===============================
function buscarRegistro() {

    const texto = document.getElementById("buscar").value.toLowerCase();

    const filas = document.querySelectorAll("#tabla tr");

    filas.forEach(fila => {

        const contenido = fila.textContent.toLowerCase();

        fila.style.display = contenido.includes(texto) ? "" : "none";

    });

}

// ===============================
// Limpiar formulario
// ===============================
function limpiar() {

    document.getElementById("ruc").value = "";
    document.getElementById("rs").value = "";
    document.getElementById("dni1").value = "";
    document.getElementById("dni2").value = "";

}