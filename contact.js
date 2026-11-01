$(document).ready(function() {

    const $nameInput = $('#task0NameInput');
    const $greetButton = $('#task0Btn');
    const $resultElement = $('#task0Result');

    $greetButton.on('click', function() {
        const trimmedValue = $nameInput.val().trim();

        if (trimmedValue === '') {
            $resultElement.text('Please enter a valid name (field cannot be empty or spaces)!');
            $resultElement.removeClass('text-success').addClass('text-danger');
        } else {
            $resultElement.text(`Welcome, ${trimmedValue}! Thank you for visiting Nana Flowers.`);
            $resultElement.removeClass('text-danger').addClass('text-success');
        }
    });

    const $form = $('.needs-validation');

    $form.on('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;

        const $userName = $('#userName');
        const $userPhone = $('#userPhone');
        const $flowerName = $('#flowerName');
        const $userMessage = $('#userMessage');

        if ($userName.val().trim().length < 2) {
            $userName.addClass('is-invalid').removeClass('is-valid');
            isValid = false;
        } else {
            $userName.addClass('is-valid').removeClass('is-invalid');
        }
        const phoneRegex = /^(\+7|8)[0-9]{10}$/;
        if (!phoneRegex.test($userPhone.val().trim())) {
            $userPhone.addClass('is-invalid').removeClass('is-valid');
            isValid = false;
        } else {
            $userPhone.addClass('is-valid').removeClass('is-invalid');
        }

        if ($flowerName.val().trim().length < 2) {
            $flowerName.addClass('is-invalid').removeClass('is-valid');
            isValid = false;
        } else {
            $flowerName.addClass('is-valid').removeClass('is-invalid');
        }

        const msgLength = $userMessage.val().trim().length;
        if (msgLength < 10 || msgLength > 500) {
            $userMessage.addClass('is-invalid').removeClass('is-valid');
            isValid = false;
        } else {
            $userMessage.addClass('is-valid').removeClass('is-invalid');
        }

        $form.addClass('was-validated');

        if (isValid) {
            $('#successAlert').remove();

            const successMessage = `
                <div id="successAlert" class="alert alert-success mt-3" role="alert">
                    <strong>Success! (Demo)</strong> Your order/message has been successfully validated. (Note: Frontend-only simulation, no backend transmission).
                </div>
            `;
            $form.append(successMessage);
        }
    });

});
