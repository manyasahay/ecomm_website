document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var phoneNumber = getInputVal('phone');
    var name = getInputVal('name');
    var company = getInputVal('company');
    var email = getInputVal('email');
    var message = getInputVal('message');

    saveMessage(phoneNumber, name, company, email, message);

    document.querySelector('.alert').style.display = 'block';

    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    document.getElementById('contactForm').reset();
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveMessage(phoneNumber, name, company, email, message) {
    var messagesRef = firebase.database().ref('messages/' + phoneNumber);
    messagesRef.set({
        name: name,
        company: company,
        email: email,
        message: message
    });
}