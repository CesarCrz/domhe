// ===== LOGIN PAGE JAVASCRIPT =====

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initializeLogin()
})

function initializeLogin() {
  // Initialize login tabs
  initLoginTabs()

  // Initialize login form
  initLoginForm()
}

// ===== LOGIN TABS =====
function initLoginTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get user type
      const userType = button.getAttribute("data-tab")
      console.log("Selected user type:", userType)

      // You can add different form fields or validation based on user type here
      updateFormForUserType(userType)
    })
  })
}

// TOGGLE PASSWORD VISIBILITY
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    
    input.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}


function updateFormForUserType(userType) {
  // This function can be used to customize the form based on user type
  const form = document.getElementById("loginForm")

  // Example: You could add different placeholders or fields based on user type
  const emailInput = document.getElementById("loginEmail")
  const passwordInput = document.getElementById("loginPassword")

  switch (userType) {
    case "families":
      emailInput.placeholder = "tu-email@ejemplo.com"
      break
    case "nannies":
      emailInput.placeholder = "nanny@ejemplo.com"
      break
    case "admin":
      emailInput.placeholder = "admin@domhe.nanny"
      break
    default:
      emailInput.placeholder = "tu-email@ejemplo.com"
  }
}

// ===== LOGIN FORM =====
function initLoginForm() {
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginForm)
  }
}

function handleLoginForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  const activeTab = document.querySelector(".tab-btn.active")
  const userType = activeTab ? activeTab.getAttribute("data-tab") : "families"

  // Basic validation
  if (!data.email || !data.password) {
    showNotification("Por favor, completa todos los campos.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    showNotification("Por favor, ingresa un email válido.", "error")
    return
  }

  // Password validation
  if (data.password.length < 6) {
    showNotification("La contraseña debe tener al menos 6 caracteres.", "error")
    return
  }

  // Show loading state
  const submitButton = e.target.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Iniciando sesión..."
  submitButton.disabled = true

  // Simulate login process
  setTimeout(() => {
    // Here you would typically authenticate with your server
    console.log("Login attempt:", { ...data, userType })

    // For demo purposes, show success message
    showNotification(`¡Bienvenido! Iniciando sesión como ${getUserTypeLabel(userType)}...`, "success")

    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false

    // In a real application, you would redirect to the appropriate dashboard
    // window.location.href = getDashboardURL(userType)
  }, 2000)
}

function getUserTypeLabel(userType) {
  const labels = {
    families: "Familia",
    nannies: "Niñera",
    admin: "Administrador",
  }
  return labels[userType] || "Usuario"
}

function getDashboardURL(userType) {
  const urls = {
    families: "./dashboard-family.html",
    nannies: "./dashboard-nanny.html",
    admin: "./dashboard-admin.html",
  }
  return urls[userType] || "./index.html"
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "#4CAF50"
      break
    case "error":
      notification.style.background = "#f44336"
      break
    case "warning":
      notification.style.background = "#ff9800"
      break
    default:
      notification.style.background = "#2196F3"
  }

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 10)

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("Login page error:", e.error)
})

console.log("DOMHE Nanny login page loaded successfully!")
