const textarea = document.getElementById('biografiaMedico');
const contador = document.getElementById('contador');

textarea.addEventListener('input', function () {
    contador.textContent = `${textarea.value.length}/200 caracteres`;
    if (textarea.value.length === 200) {
        contador.style.fontWeight = "bold";
    } else {
        contador.style.fontWeight = "normal";
    }
});

function convertirAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

  return horas * 60 + minutos;
}

function validarHoras(inicio, fin, errorElement, mensaje) {
    const inicioMinutos = convertirAMinutos(inicio.value) 
    const finMinutos = convertirAMinutos(fin.value)
    if (inicioMinutos >= finMinutos) {
        estilizarCampoError(inicio);
        estilizarCampoError(fin);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(inicio)
        quitarEstiloCampoError(fin)
        errorElement.textContent = '';
        return true;
    }
}

function validarCampoObligatorio(campo, errorElement, mensaje) {

    if (campo.value.trim() === '') {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarCorreo(campo, errorElement,mensaje) {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@unicauca\.edu\.co$/;
    if (!correoRegex.test(campo.value)) {
        estilizarCampoError(campo);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(campo)
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    let errorElementParent = errorElement.parentElement;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        estilizarCampoError(errorElementParent);
        errorElement.textContent = mensaje;
        return false;
    } else {
        quitarEstiloCampoError(errorElementParent)
        errorElement.textContent = '';
        return true;
    }
}

function estilizarCampoError(campo) {
    campo.classList.add("campo-error");
}

function quitarEstiloCampoError(campo) {
    campo.classList.remove("campo-error");
}

// function mostrarMensajeExito() {
//     Toastify({
//         text: "✅ ¡Registro exitoso!",
//         duration: 3000,            // Duración: 3 segundos
//         gravity: "top",             // Posición: arriba
//         position: "right",          // Alineación: derecha
//         style: {
//             background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
//             color: "#fff",                      // Texto blanco
//             borderRadius: "12px",               // Esquinas redondeadas
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
//             padding: "12px 20px"               // Más relleno
//         },
//         stopOnFocus: true, // No desaparecer al pasar el mouse
//     }).showToast();
// }

// Función principal que valida todo el formulario
function validarFormularioMedico() {

    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputInicioAtencion = document.getElementById('inicioAtencion');
    const inputFinAtencion = document.getElementById('finAtencion');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorInicioAtencion=document.getElementById('errorInicioAtencion')
    const labelErrorFinAtencion=document.getElementById('errorFinAtencion')
    const labelErrorHorarioMedico=document.getElementById('errorHorarioMedico')
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');

    const nombresMedicoValidos=validarCampoObligatorio(inputNombresMedico,labelErrorNombresMedico,"El campo nombres es obligatorio");
    const apellidosMedicoValidos = validarCampoObligatorio(inputApellidosMedico,labelErrorApellidosMedico, "Los apellidos son obligatorios");
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const especialidadValida = validarCampoObligatorio(inputEspecialidadMedico,labelErrorEspecialidadMedico,"La especialidad es obligatoria") && validarLongitud(inputEspecialidadMedico,labelErrorEspecialidadMedico , 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres');
    const inicioAtencionValida = validarCampoObligatorio(inputInicioAtencion,labelErrorInicioAtencion,"La hora de inicio de atención es obligatoria");
    const finAtencionValida = validarCampoObligatorio(inputFinAtencion,labelErrorFinAtencion,"La hora de fin de atención es obligatoria");
    const atencionValida = inicioAtencionValida && finAtencionValida && validarHoras(inputInicioAtencion, inputFinAtencion, labelErrorHorarioMedico, 'La hora fin debe ser mayor a la de inicio');
    const aniosExpValidos = validarCampoObligatorio(inputAniosExpMedico,labelErrorAniosExpMedico,'Los años de experiencia son obligatorios');

    // Si todas las validaciones son correctas, se devuelve true y se puede enviar el formulario al servidor
    if (nombresMedicoValidos && apellidosMedicoValidos && generoValido && especialidadValida && inicioAtencionValida && finAtencionValida && atencionValida && aniosExpValidos) {
        // mostrarMensajeExito(); 
        // const formulario = document.getElementById('formMedico'); 
        // formulario.scrollIntoView({ behavior: "smooth", block: "start" });        
        // setTimeout(() => {
        //     formulario.reset();
        // }, 2000);
        return true; // false cambiado que Evitaba el envío del formulario
    } else {
        mostrarNotificacion("Por favor, complete correctamente el formulario", "error")
        return false; // Bloquea el envío del formulario
    }
}

function validarCamposAlCambiarFoco()
{
    const inputNombresMedico = document.getElementById('nombresMedico');
    const inputApellidosMedico = document.getElementById('apellidosMedico');
    const inputGenero = document.getElementsByName('generoMedico');
    const inputEspecialidadMedico = document.getElementById('especialidadMedico');
    const inputInicioAtencion = document.getElementById('inicioAtencion');
    const inputFinAtencion = document.getElementById('finAtencion');
    const inputAniosExpMedico = document.getElementById('aniosExpMedico');

    const labelErrorNombresMedico=document.getElementById('errorNombresMedico');
    const labelErrorApellidosMedico=document.getElementById('errorApellidosMedico');
    const labelErrorGenero=document.getElementById('errorGeneroMedico');
    const labelErrorEspecialidadMedico=document.getElementById('errorEspecialidadMedico');
    const labelErrorInicioAtencion=document.getElementById('errorInicioAtencion')
    const labelErrorFinAtencion=document.getElementById('errorFinAtencion')
    const labelErrorAniosExpMedico=document.getElementById('errorAniosExpMedico');

    inputNombresMedico.addEventListener('blur',()=> validarCampoObligatorio(
        inputNombresMedico,
        labelErrorNombresMedico,
        "El nombre es obligatorio"));
        
    inputApellidosMedico.addEventListener('blur', () => validarCampoObligatorio(inputApellidosMedico, labelErrorApellidosMedico, 'Los apellidos son obligatorios.'));
    Array.from(inputGenero).forEach(input => input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio')));
    inputEspecialidadMedico.addEventListener('blur', () => validarCampoObligatorio(inputEspecialidadMedico,labelErrorEspecialidadMedico,"La especialidad es obligatoria") && validarLongitud(inputEspecialidadMedico, labelErrorEspecialidadMedico, 1, 20, 'La especialidad debe tener entre 1 y 20 caracteres.'));
    inputInicioAtencion.addEventListener('blur', () => validarCampoObligatorio(inputInicioAtencion,labelErrorInicioAtencion,"La hora de inicio de atención es obligatoria"));
    inputFinAtencion.addEventListener('blur', () => validarCampoObligatorio(inputFinAtencion,labelErrorFinAtencion,"La hora de fin de atención es obligatoria"));
    inputAniosExpMedico.addEventListener('blur', () => validarCampoObligatorio(inputAniosExpMedico,labelErrorAniosExpMedico,'Los años de experiencia son obligatorios') && validarLongitud(inputAniosExpMedico, labelErrorAniosExpMedico, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres.'));
    
}

document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);