function togglePasswordVisibility(fieldId) {
  const input = document.getElementById(fieldId);
  const toggle = input.nextElementSibling;

  if (input.type === "password") {
    input.type = "text";
    toggle.textContent = "🙈";
  } else {
    input.type = "password";
    toggle.textContent = "👁️";
  }
}

const passwordInput = document.getElementById("password");
if (passwordInput) {
  passwordInput.addEventListener("input", checkPasswordStrength);
}

function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const bar = document.getElementById("progress-bar");
  const feedbackDiv = document.getElementById("password-feedback");

  let score = 0;
  let feedback = "";

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback += "Too short (Min 8 chars). ";
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    score += 1;
  } else {
    feedback += "Needs special characters. ";
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback += "Needs capital letters. ";
  }

  bar.style.width = (score / 3) * 100 + "%";

  switch (score) {
    case 0:
      bar.style.backgroundColor = "transparent";
      break;
    case 1:
      bar.style.backgroundColor = "red";
      break;
    case 2:
      bar.style.backgroundColor = "orange";
      break;
    case 3:
      bar.style.backgroundColor = "green";
      break;
  }

  if (score < 3 && password.length > 0) {
    feedbackDiv.title = "Password Strength: " + feedback.trim();
    feedbackDiv.style.border = "1px solid " + bar.style.backgroundColor;
  } else {
    feedbackDiv.title = "Password is strong.";
    feedbackDiv.style.border = "none";
  }
}

function validateForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;

  if (!usernameRegex.test(username)) {
    alert(
      "🚨 ERROR: Le nom d'utilisateur ne peut pas contenir de caractères spéciaux."
    );
    document.getElementById("username").focus();
    return false;
  }

  if (!emailRegex.test(email)) {
    alert(
      "📧 ERROR: Veuillez saisir une adresse électronique valide."
    );
    document.getElementById("email").focus();
    return false;
  }

  let passwordScore = 0;
  if (password.length >= 8) passwordScore++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) passwordScore++;
  if (/[A-Z]/.test(password)) passwordScore++;

  if (passwordScore < 3) {
    alert(
      "🔒 ERROR: Votre mot de passe doit comporter au moins 8 caractères, inclure une majuscule et un caractère spécial."
    );
    document.getElementById("password").focus();
    return false;
  }

  if (password !== confirmPassword) {
    alert("⚠️ ERROR: Le mot de passe et le mot de passe de confirmation ne correspondent pas.");
    document.getElementById("confirm-password").focus();
    return false;
  }

  alert(
    "✅ SUCCESS: Formulaire d'inscription validé avec succès !"
  );
  return true;
}

checkPasswordStrength();
