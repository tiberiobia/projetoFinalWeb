// js/contact.js - Validação Interativa do Formulário de Contacto (Funcionalidade F3)

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return; // Proteção para evitar erros caso o formulário não esteja presente na página

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const termsCheckbox = document.getElementById("terms");
  const formFeedback = document.getElementById("formFeedback");

  // Função para aplicar as classes visuais do Bootstrap (is-valid / is-invalid)
  function setFieldState(field, isValid) {
    if (isValid) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
    } else {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    }
  }

  // Função auxiliar para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Validação em tempo real (à medida que o utilizador digita)
  nameInput.addEventListener("input", () => {
    setFieldState(nameInput, nameInput.value.trim().length >= 3);
  });

  emailInput.addEventListener("input", () => {
    setFieldState(emailInput, isValidEmail(emailInput.value));
  });

  subjectInput.addEventListener("change", () => {
    setFieldState(subjectInput, subjectInput.value !== "");
  });

  messageInput.addEventListener("input", () => {
    setFieldState(messageInput, messageInput.value.trim().length >= 10);
  });

  termsCheckbox.addEventListener("change", () => {
    setFieldState(termsCheckbox, termsCheckbox.checked);
  });

  // Validação ao submeter o formulário
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio / recarregamento padrão da página

    const isNameValid = nameInput.value.trim().length >= 3;
    const isEmailValid = isValidEmail(emailInput.value);
    const isSubjectValid = subjectInput.value !== "";
    const isMessageValid = messageInput.value.trim().length >= 10;
    const isTermsValid = termsCheckbox.checked;

    // Atualiza visualmente o estado de cada campo
    setFieldState(nameInput, isNameValid);
    setFieldState(emailInput, isEmailValid);
    setFieldState(subjectInput, isSubjectValid);
    setFieldState(messageInput, isMessageValid);
    setFieldState(termsCheckbox, isTermsValid);

    const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid && isTermsValid;

    if (isFormValid) {
      // Mensagem de Sucesso
      formFeedback.className = "alert alert-success d-flex align-items-center mt-3";
      formFeedback.innerHTML = `
        <span class="fs-4 me-2">✅</span>
        <div>
          <strong>Mensagem enviada com sucesso!</strong> Obrigado pelo contacto, responderemos em breve.
        </div>
      `;

      // Limpa o formulário após 3 segundos
      setTimeout(() => {
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput, termsCheckbox].forEach((field) => {
          field.classList.remove("is-valid", "is-invalid");
        });
      }, 3000);
    } else {
      // Mensagem de Erro
      formFeedback.className = "alert alert-danger d-flex align-items-center mt-3";
      formFeedback.innerHTML = `
        <span class="fs-4 me-2">⚠️</span>
        <div>
          <strong>Atenção:</strong> Por favor, preencha corretamente todos os campos assinalados a vermelho.
        </div>
      `;
    }
  });
});