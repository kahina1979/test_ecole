$(document).ready(function () {

  function setError(input, message) {
    input.addClass('is-invalid').removeClass('is-valid');
    input.closest('.mb-3, .form-check').find('.error-message').first().text(message);
  }

  function setSuccess(input) {
    input.addClass('is-valid').removeClass('is-invalid');
    input.closest('.mb-3, .form-check').find('.error-message').first().text('');
  }

  function calculerAge(dateNaissance) {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Formulaire d'inscription
  $('#inscriptionForm').on('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    const nom = $('#nom');
    const dateNaissance = $('#dateNaissance');
    const email = $('#email');
    const telephone = $('#telephone');
    const filiere = $('#filiere');
    const motdepasse = $('#motdepasse');
    const confirmation = $('#confirmation');
    const cgu = $('#cgu');

    const nomVal = nom.val().trim();
    const emailVal = email.val().trim();
    const telVal = telephone.val().trim();
    const mdpVal = motdepasse.val().trim();
    const confVal = confirmation.val().trim();

    const nomRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(05|06|07)\d{8}$/;
    const mdpRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nomRegex.test(nomVal)) {
      setError(nom, "Le nom doit contenir au moins 3 lettres");
      isValid = false;
    } else {
      setSuccess(nom);
    }

    if (dateNaissance.val() === '') {
      setError(dateNaissance, "Âge invalide (16 à 60 ans requis)");
      isValid = false;
    } else {
      const age = calculerAge(dateNaissance.val());
      if (age < 16 || age > 60) {
        setError(dateNaissance, "Âge invalide (16 à 60 ans requis)");
        isValid = false;
      } else {
        setSuccess(dateNaissance);
      }
    }

    if (!emailRegex.test(emailVal)) {
      setError(email, "Veuillez entrer un email valide");
      isValid = false;
    } else {
      setSuccess(email);
    }

    if (!telRegex.test(telVal)) {
      setError(telephone, "Format : 05XXXXXXXX / 06XXXXXXXX / 07XXXXXXXX");
      isValid = false;
    } else {
      setSuccess(telephone);
    }

    if (filiere.val() === '') {
      setError(filiere, "Veuillez choisir une filière");
      isValid = false;
    } else {
      setSuccess(filiere);
    }

    if (!mdpRegex.test(mdpVal)) {
      setError(motdepasse, "MDP trop faible (8 car., 1 maj., 1 chiffre)");
      isValid = false;
    } else {
      setSuccess(motdepasse);
    }

    if (confVal !== mdpVal || confVal === '') {
      setError(confirmation, "Les mots de passe ne correspondent pas");
      isValid = false;
    } else {
      setSuccess(confirmation);
    }

    if (!cgu.is(':checked')) {
      cgu.addClass('is-invalid').removeClass('is-valid');
      cgu.closest('.form-check').find('.error-message').text("Vous devez accepter les conditions");
      isValid = false;
    } else {
      cgu.addClass('is-valid').removeClass('is-invalid');
      cgu.closest('.form-check').find('.error-message').text('');
    }

    if (isValid) {
      $('#successInscription').removeClass('d-none').hide().fadeIn();
      $('#inscriptionForm')[0].reset();
      $('#inscriptionForm .form-control, #inscriptionForm .form-select, #inscriptionForm .form-check-input')
        .removeClass('is-valid is-invalid');
    }
  });

  // Formulaire contact
  $('#contactForm').on('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    const nom = $('#nom');
    const email = $('#email');
    const sujet = $('#sujet');
    const message = $('#message');

    const nomVal = nom.val().trim();
    const emailVal = email.val().trim();
    const sujetVal = sujet.val().trim();
    const messageVal = message.val().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nomVal.length < 3) {
      setError(nom, "Le nom est obligatoire");
      isValid = false;
    } else {
      setSuccess(nom);
    }

    if (!emailRegex.test(emailVal)) {
      setError(email, "Email invalide");
      isValid = false;
    } else {
      setSuccess(email);
    }

    if (sujetVal.length < 5) {
      setError(sujet, "Le sujet est trop court");
      isValid = false;
    } else {
      setSuccess(sujet);
    }

    if (messageVal.length < 20 || messageVal.length > 500) {
      setError(message, "Message trop court ou trop long");
      isValid = false;
    } else {
      setSuccess(message);
    }

    if (isValid) {
      showContactToast();
      $('#contactForm')[0].reset();
      $('#compteur').text('0 / 500');
      $('#contactForm .form-control').removeClass('is-valid is-invalid');
    }
  });

  // Compteur du textarea contact
  $('#message').on('input', function () {
    $('#compteur').text($(this).val().length + ' / 500');
  });

});