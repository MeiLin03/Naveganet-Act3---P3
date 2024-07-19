import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Validación personalizada del correo electrónico y contraseña
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            var emailInput = document.getElementById('email');
            var emailValue = emailInput.value;
            var emailIsValid = emailValue.includes('@') && emailValue.includes('.com');

            var passwordInput = document.getElementById('password');
            var passwordValue = passwordInput.value;
            var passwordIsValid = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/.test(passwordValue);

            if (!emailIsValid) {
                emailInput.setCustomValidity('El correo debe contener "@" y ".com"');
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.setCustomValidity('');
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            }

            if (!passwordIsValid) {
                passwordInput.setCustomValidity('La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
                passwordInput.classList.add('is-invalid');
            } else {
                passwordInput.setCustomValidity('');
                passwordInput.classList.remove('is-invalid');
                passwordInput.classList.add('is-valid');
            }

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Inicio de sesión
document.addEventListener('DOMContentLoaded', function () {
    const toastButton = document.querySelector('#toast-button');
    const toastContent = document.querySelector('.toast');
    const toastBody = document.querySelector('.toast-body');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (toastButton && toastContent && toastBody) {
        toastButton.addEventListener('click', function() {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (email === 'Alumno@ut.com' && password === 'Alumno123&') {
                // Cambiar el contenido del toast-body a "Correcto"
                toastBody.textContent = 'Inicio de sesión exitoso';
            } else {
                // Cambiar el contenido del toast-body a "Incorrecto"
                toastBody.textContent = 'Usuario o contraseña incorrectos';
            }
            
           /* const toast = new bootstrap.Toast(toastContent);
            toast.show();*/
        });
    }

    // Validación de Bootstrap
    (function () {
        'use strict'
        const forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()
});