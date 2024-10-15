window.addEventListener('load', function(){
    
    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const password = this.document.getElementById('password');
    const btnIngresar = this.document.getElementById('btnIngresar');
    const msgError = this.document.getElementById('msgError');

    btnIngresar.addEventListener('click', function(){

        if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' || 
            numeroDocumento.value === null || numeroDocumento.value.trim() === '' || 
            password.value === null || password.value.trim() === '') {
                mostrarAlerta('Error: Debe completar correctamente sus credenciales');
                return;
        }
        ocultarAlerta();
        autenticar();

    });

});

function mostrarAlerta(mensaje) {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta() {
    msgError.innerHTML = '';
    msgError.style.display = 'none';
}

async function autenticar() {

    const url = 'http://localhost:8082/login/autenticar-async';
    const request = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    };

    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if(!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema con la autenticación');
            throw new Error(`Error: ${response.statusText}`);
        }

        // validar respuesta
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if(result.codigo === '00') {
            localStorage.setItem('result', JSON.stringify(result));
            window.location.replace('principal.html');
        } else {
            mostrarAlerta(result.mensaje);
        }

    } catch (error) {
        
        console.log('Error: Ocurrió un problema con la autenticación', error);
        mostrarAlerta('Error: Ocurrió un problema con la autenticación');

    }

}