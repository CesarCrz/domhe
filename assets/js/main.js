// ===== DOMHE NANNY WEBSITE MAIN JAVASCRIPT =====

// ===== GLOBAL VARIABLES =====
let scrollY = 0
let isLoading = true
const AOS = window.AOS
const Swiper = window.Swiper

// Color palette for random avatar backgrounds
const colorPalette = [
  "#fc2680", // primary-color
  "#793ab8", // secondary-purple
  "#15aae2", // secondary-blue
  "#a1cd3a", // secondary-green
  "#fe8604", // secondary-orange
]

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
})

function initializeWebsite() {
  // Initialize loading screen
  initLoadingScreen()

  // Initialize navigation
  initNavigation()

  // Initialize animations
  initAnimations()

  // Initialize carousels
  initCarousels()

  // Initialize forms
  initForms()

  // Initialize scroll effects
  initScrollEffects()

  // Initialize gallery
  initGallery()

  // Initialize teddy bear animation
  initTeddyAnimation()

  // Initialize star ratings
  initStarRatings()

  // Initialize avatar colors
  initAvatarColors()

  // Initialize date input
  initDateInput()

  // Initialize service-based date handling
  initServiceDateHandling()
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen")
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
        isLoading = false
      }, 500)
    }, 1500)
  })
}

// ===== NAVIGATION =====
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href && href.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(href)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      }
    })
  })
}

// ===== TEDDY BEAR ANIMATION =====
function initTeddyAnimation() {
  const teddyEmoji = document.getElementById("teddy-emoji")

  if (teddyEmoji) {
    let lastScrollY = 0

    window.addEventListener("scroll", () => {
      const currentScrollY = window.pageYOffset
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)

      // Solo rotar cuando hay scroll activo
      if (scrollDifference > 1) {
        const scrollProgress = currentScrollY / (document.body.scrollHeight - window.innerHeight)
        const rotation = scrollProgress * 720 // Dos vueltas completas

        // Aplicar rotación solo durante el scroll
        teddyEmoji.style.transform = `rotate(${rotation}deg)`

        lastScrollY = currentScrollY
      }
    })
  }
}

// ===== STAR RATINGS SYSTEM =====
function initStarRatings() {
  const starContainers = document.querySelectorAll(".stars[data-rating]")

  starContainers.forEach((container) => {
    const rating = Number.parseFloat(container.getAttribute("data-rating"))
    const stars = container.querySelectorAll("i")

    // Limpiar estrellas existentes
    container.innerHTML = ""

    // Generar estrellas basadas en el rating
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i")

      if (i <= Math.floor(rating)) {
        // Estrella completa
        star.className = "fas fa-star"
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Media estrella
        star.className = "fas fa-star-half-alt"
      } else {
        // Estrella vacía
        star.className = "far fa-star"
      }

      container.appendChild(star)
    }
  })
}

// ===== AVATAR COLORS SYSTEM =====
function initAvatarColors() {
  // Extended color palette with gradients
  const extendedColorPalette = [
    "linear-gradient(135deg, #fc2680, #e91e63)", // Pink gradient
    "linear-gradient(135deg, #793ab8, #9c27b0)", // Purple gradient
    "linear-gradient(135deg, #15aae2, #2196f3)", // Blue gradient
    "linear-gradient(135deg, #a1cd3a, #8bc34a)", // Green gradient
    "linear-gradient(135deg, #fe8604, #ff9800)", // Orange gradient
    "linear-gradient(135deg, #e91e63, #f06292)", // Light pink gradient
    "linear-gradient(135deg, #673ab7, #9575cd)", // Light purple gradient
    "linear-gradient(135deg, #00bcd4, #4dd0e1)", // Cyan gradient
  ]

  // Get all family avatars
  const familyAvatars = document.querySelectorAll(".family-avatar")
  const nannyAvatars = document.querySelectorAll(".nanny-avatar")

  // Shuffle function for random color assignment
  function shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Assign random gradient colors to family avatars
  const shuffledFamilyColors = shuffleArray(extendedColorPalette)
  familyAvatars.forEach((avatar, index) => {
    const randomColor = shuffledFamilyColors[index % shuffledFamilyColors.length]
    avatar.style.background = randomColor

    // Add subtle animation delay
    avatar.style.animationDelay = `${index * 0.1}s`
  })

  // Assign different random gradient colors to nanny avatars
  const shuffledNannyColors = shuffleArray(extendedColorPalette.slice().reverse())
  nannyAvatars.forEach((avatar, index) => {
    const randomColor = shuffledNannyColors[index % shuffledNannyColors.length]
    avatar.style.background = randomColor

    // Add subtle animation delay
    avatar.style.animationDelay = `${index * 0.1}s`
  })

  // Add hover effect enhancement
  const allAvatars = document.querySelectorAll(".author-avatar")
  allAvatars.forEach((avatar) => {
    avatar.addEventListener("mouseenter", () => {
      avatar.style.transform = "scale(1.05) rotate(5deg)"
    })

    avatar.addEventListener("mouseleave", () => {
      avatar.style.transform = "scale(1) rotate(0deg)"
    })
  })
}

// ===== SERVICE-BASED DATE HANDLING =====
function initServiceDateHandling() {
  const serviceSelect = document.getElementById("service")
  const dateLabel = document.getElementById("dateLabel")
  const singleDateWrapper = document.getElementById("singleDateWrapper")
  const dateRangeWrapper = document.getElementById("dateRangeWrapper")

  if (serviceSelect && dateLabel && singleDateWrapper && dateRangeWrapper) {
    serviceSelect.addEventListener("change", (e) => {
      const selectedService = e.target.value
      updateDateInputBasedOnService(selectedService, dateLabel, singleDateWrapper, dateRangeWrapper)
    })
  }
}

function updateDateInputBasedOnService(service, dateLabel, singleDateWrapper, dateRangeWrapper) {
  // Reset both wrappers
  singleDateWrapper.style.display = "flex"
  dateRangeWrapper.style.display = "none"

  switch (service) {
    case "fijo":
      dateLabel.textContent = "Fecha de Inicio"
      break
    case "viajes":
      dateLabel.textContent = "Fechas del Viaje"
      singleDateWrapper.style.display = "none"
      dateRangeWrapper.style.display = "flex"
      break
    case "ocasional":
    case "nocturno":
    case "fiesta":
      dateLabel.textContent = "Fecha Deseada"
      break
    case "semanal":
      dateLabel.textContent = "Fecha de Inicio"
      break
    default:
      dateLabel.textContent = "Fecha Deseada"
      break
  }
}

// ===== DATE INPUT INITIALIZATION =====
function initDateInput() {
  const dateInput = document.getElementById("date")
  const startDateInput = document.getElementById("startDate")
  const endDateInput = document.getElementById("endDate")

  // Set minimum dates for all date inputs
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowString = tomorrow.toISOString().split("T")[0]

  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  const maxDateString = maxDate.toISOString().split("T")[0]

  // Configure single date input
  if (dateInput) {
    dateInput.setAttribute("min", tomorrowString)
    dateInput.setAttribute("max", maxDateString)
    dateInput.setAttribute("placeholder", "Selecciona una fecha")

    dateInput.addEventListener("change", (e) => {
      handleSingleDateChange(e)
    })

    dateInput.addEventListener("focus", () => {
      dateInput.parentElement.classList.add("focused")
    })

    dateInput.addEventListener("blur", () => {
      dateInput.parentElement.classList.remove("focused")
    })
  }

  // Configure date range inputs
  if (startDateInput && endDateInput) {
    startDateInput.setAttribute("min", tomorrowString)
    startDateInput.setAttribute("max", maxDateString)
    endDateInput.setAttribute("min", tomorrowString)
    endDateInput.setAttribute("max", maxDateString)

    startDateInput.addEventListener("change", (e) => {
      handleDateRangeChange(e, "start")
    })

    endDateInput.addEventListener("change", (e) => {
      handleDateRangeChange(e, "end")
    })
  }
}

function handleSingleDateChange(e) {
  const selectedDateString = e.target.value
  if (!selectedDateString) return

  // Parse date correctly to avoid timezone issues
  const [year, month, day] = selectedDateString.split("-").map(Number)
  const selectedDate = new Date(year, month - 1, day)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  if (selectedDate < tomorrow) {
    showNotification(
      "Por favor selecciona una fecha a partir de mañana para permitir la preparación del servicio.",
      "warning",
    )
    e.target.value = ""
    return
  }

  // Format date correctly for display
  const formattedDate = formatDateToSpanish(selectedDateString)

  // Check if it's a weekend and show appropriate message
  if (isWeekend(selectedDateString)) {
    showNotification(`Fecha seleccionada: ${formattedDate} - ¡Perfecto para eventos familiares! 🎉`, "success")
  } else {
    showNotification(`Fecha seleccionada: ${formattedDate} ✅`, "success")
  }
}

function handleDateRangeChange(e, type) {
  const selectedDateString = e.target.value
  if (!selectedDateString) return

  const [year, month, day] = selectedDateString.split("-").map(Number)
  const selectedDate = new Date(year, month - 1, day)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  if (selectedDate < tomorrow) {
    showNotification(
      "Por favor selecciona una fecha a partir de mañana para permitir la preparación del servicio.",
      "warning",
    )
    e.target.value = ""
    return
  }

  const formattedDate = formatDateToSpanish(selectedDateString)

  if (type === "start") {
    // Update end date minimum to be after start date
    const endDateInput = document.getElementById("endDate")
    if (endDateInput) {
      const nextDay = new Date(selectedDate)
      nextDay.setDate(nextDay.getDate() + 1)
      const nextDayString = nextDay.toISOString().split("T")[0]
      endDateInput.setAttribute("min", nextDayString)
    }
    showNotification(`Fecha de inicio: ${formattedDate} ✅`, "success")
  } else {
    // Validate end date is after start date
    const startDateInput = document.getElementById("startDate")
    if (startDateInput && startDateInput.value) {
      const [startYear, startMonth, startDay] = startDateInput.value.split("-").map(Number)
      const startDate = new Date(startYear, startMonth - 1, startDay)

      if (selectedDate <= startDate) {
        showNotification("La fecha de fin debe ser posterior a la fecha de inicio.", "error")
        e.target.value = ""
        return
      }
    }
    showNotification(`Fecha de fin: ${formattedDate} ✅`, "success")
  }
}

// ===== ANIMATIONS =====
function initAnimations() {
  // Initialize AOS (Animate On Scroll)
  if (AOS) {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }
}

// ===== CAROUSELS =====
function initCarousels() {
  if (!Swiper) return

  // Family testimonials carousel
  const familyTestimonials = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonials-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".testimonials-swiper .swiper-button-next",
      prevEl: ".testimonials-swiper .swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // Nanny testimonials carousel
  const nannyTestimonials = new Swiper(".nanny-testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".nanny-testimonials-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".nanny-testimonials-swiper .swiper-button-next",
      prevEl: ".nanny-testimonials-swiper .swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })
}

// ===== FORMS =====
function initForms() {
  // Contact form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }
}

// ===== ENHANCED FORM HANDLING =====
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.name || !data.email || !data.phone || !data.location || !data.message) {
    showNotification("Por favor, completa todos los campos requeridos.", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    showNotification("Por favor, ingresa un email válido.", "error")
    return
  }

  // Phone validation (Mexican phone numbers)
  const phoneRegex = /^[\d\s\-+()]{10,}$/
  if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    showNotification("Por favor, ingresa un teléfono válido (mínimo 10 dígitos).", "error")
    return
  }

  // Enhanced date validation based on service type
  const serviceType = data.service
  if (serviceType === "viajes") {
    // Validate date range for travel service
    if (!data.startDate || !data.endDate) {
      showNotification("Por favor, selecciona las fechas de inicio y fin para el servicio de viajes.", "error")
      return
    }

    const startDate = new Date(data.startDate)
    const endDate = new Date(data.endDate)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    if (startDate < tomorrow || endDate < tomorrow) {
      showNotification("Por favor selecciona fechas a partir de mañana.", "error")
      return
    }

    if (endDate <= startDate) {
      showNotification("La fecha de fin debe ser posterior a la fecha de inicio.", "error")
      return
    }
  } else if (data.date) {
    // Validate single date for other services
    const selectedDate = new Date(data.date)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    if (selectedDate < tomorrow) {
      showNotification("Por favor selecciona una fecha a partir de mañana.", "error")
      return
    }

    // Check if date is too far in the future
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)
    if (selectedDate > maxDate) {
      showNotification("Por favor selecciona una fecha dentro del próximo año.", "error")
      return
    }
  }

  // Create enhanced WhatsApp message
  const serviceNames = {
    ocasional: "Servicio Ocasional",
    fijo: "Servicio Fijo",
    semanal: "Paquete Semanal",
    nocturno: "Servicio Nocturno",
    fiesta: "Servicio en Fiesta",
    viajes: "Servicio de Viajes",
  }

  const serviceName = data.service ? serviceNames[data.service] || data.service : "No especificado"

  // Enhanced date formatting based on service type
  let dateText = "No especificada"
  let dateEmoji = "📅"

  if (serviceType === "viajes" && data.startDate && data.endDate) {
    const startFormatted = formatDateToSpanish(data.startDate)
    const endFormatted = formatDateToSpanish(data.endDate)
    dateText = `Del ${startFormatted} al ${endFormatted}`
    dateEmoji = "✈️"
  } else if (data.date) {
    const selectedDate = new Date(data.date)
    dateText = formatDateToSpanish(data.date)

    // Add emoji based on day of week and service type
    const dayOfWeek = selectedDate.getDay()
    if (serviceType === "fijo") {
      dateEmoji = "📅" // Fixed service start date
    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
      dateEmoji = "🎉" // Weekend
    } else {
      dateEmoji = "📅" // Weekday
    }
  }

  const whatsappMessage = `¡Hola! Soy ${data.name} 👋

📧 Email: ${data.email}
📱 Teléfono: ${data.phone}
📍 Ubicación: ${data.location}
🏠 Servicio solicitado: ${serviceName}
${dateEmoji} ${serviceType === "fijo" ? "Fecha de inicio" : serviceType === "viajes" ? "Fechas del viaje" : "Fecha deseada"}: ${dateText}

💬 Mensaje:
${data.message}

¡Espero su respuesta para agendar el servicio con DOMHE Nanny! 😊

_Enviado desde domhenanny.com_`

  // Show loading state
  const submitButton = e.target.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Enviando..."
  submitButton.disabled = true

  // Simulate processing time
  setTimeout(() => {
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappURL = `https://wa.me/5213334978486?text=${encodedMessage}`

    // Enhanced WhatsApp opening for better iOS compatibility
    if (isIOS()) {
      // For iOS devices, use location.href instead of window.open
      window.location.href = whatsappURL
    } else {
      // For other devices, use window.open
      window.open(whatsappURL, "_blank")
    }

    // Show success message and reset form
    showNotification("¡Mensaje enviado a WhatsApp exitosamente!", "success")
    e.target.reset()

    // Reset date inputs visibility
    const singleDateWrapper = document.getElementById("singleDateWrapper")
    const dateRangeWrapper = document.getElementById("dateRangeWrapper")
    const dateLabel = document.getElementById("dateLabel")

    if (singleDateWrapper && dateRangeWrapper && dateLabel) {
      singleDateWrapper.style.display = "flex"
      dateRangeWrapper.style.display = "none"
      dateLabel.textContent = "Fecha Deseada"
    }

    // Reset button
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 1000)
}

// ===== iOS DETECTION =====
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  const hero = document.querySelector(".hero")
  const socialFloating = document.getElementById("social-floating")
  const ctaFixed = document.getElementById("cta-fixed")
  const footer = document.querySelector(".footer")

  window.addEventListener("scroll", () => {
    scrollY = window.pageYOffset

    // Hero parallax effect with proper hiding
    if (hero) {
      const heroHeight = hero.offsetHeight
      const scrollProgress = Math.min(scrollY / heroHeight, 1)
      const parallaxOffset = scrollY * 0.5

      hero.style.transform = `translateY(${parallaxOffset}px)`

      // Hide hero when it reaches the next section
      if (scrollProgress > 0.8) {
        hero.style.opacity = Math.max(0, 1 - (scrollProgress - 0.8) * 5)
      } else {
        hero.style.opacity = 1
      }
    }

    // Update social buttons and CTA visibility
    updateFloatingElementsVisibility()
  })
}

function updateFloatingElementsVisibility() {
  const socialFloating = document.getElementById("social-floating")
  const ctaFixed = document.getElementById("cta-fixed")
  const footer = document.querySelector(".footer")

  if (socialFloating && ctaFixed) {
    const footerTop = footer ? footer.offsetTop : document.body.scrollHeight
    const windowBottom = scrollY + window.innerHeight

    // Show elements after scrolling 300px
    if (scrollY > 300) {
      socialFloating.classList.add("visible")

      // Hide CTA button when reaching footer
      if (windowBottom >= footerTop - 100) {
        ctaFixed.classList.remove("visible")
      } else {
        ctaFixed.classList.add("visible")
      }
    } else {
      socialFloating.classList.remove("visible")
      ctaFixed.classList.remove("visible")
    }
  }
}

// ===== GALLERY =====
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector(".gallery-img")
      const imgSrc = img.src
      const imgAlt = img.alt

      // Create modal for image viewing
      createImageModal(imgSrc, imgAlt)
    })
  })
}

function createImageModal(src, alt) {
  // Create modal elements
  const modal = document.createElement("div")
  modal.className = "image-modal"
  modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}" class="modal-image">
            </div>
        </div>
    `

  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `

  const modalContent = modal.querySelector(".modal-content")
  modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `

  const modalImage = modal.querySelector(".modal-image")
  modalImage.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
    `

  const modalClose = modal.querySelector(".modal-close")
  modalClose.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
    `

  // Add to DOM
  document.body.appendChild(modal)

  // Show modal
  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)

  // Close modal functionality
  const closeModal = () => {
    modal.style.opacity = "0"
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal)
      }
    }, 300)
  }

  modalClose.addEventListener("click", closeModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Close with Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal()
      document.removeEventListener("keydown", handleEscape)
    }
  }
  document.addEventListener("keydown", handleEscape)
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

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== DATE FORMATTING UTILITIES =====
function formatDateToSpanish(dateString) {
  // Parse date correctly to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("es-ES", options)
}

function isWeekend(dateString) {
  // Parse date correctly to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
}

function addBusinessDays(date, days) {
  const result = new Date(date)
  let addedDays = 0

  while (addedDays < days) {
    result.setDate(result.getDate() + 1)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++
    }
  }

  return result
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Additional scroll-based effects can be added here
  }, 16),
) // ~60fps

// Optimize resize events
window.addEventListener(
  "resize",
  debounce(() => {
    // Handle responsive adjustments
    updateFloatingElementsVisibility()
    initStarRatings() // Reinitialize stars on resize
    initAvatarColors() // Reinitialize avatar colors on resize
  }, 250),
)

// ===== SEO AND ACCESSIBILITY =====
// Add structured data for SEO
function addStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DOMHE Nanny",
    description: "Agencia de niñeras profesionales en Guadalajara. Servicios personalizados de cuidado infantil 24/7.",
    url: "https://domhe.nanny",
    telephone: "+52-1-333-497-8486",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guadalajara",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
    openingHours: "Mo-Su 08:00-20:00",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "20.6597",
        longitude: "-103.3496",
      },
      geoRadius: "50000",
    },
  }

  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.textContent = JSON.stringify(structuredData)
  document.head.appendChild(script)
}

// Initialize structured data
addStructuredData()

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

// ===== FINAL INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMHE Nanny website loaded successfully!")
})
