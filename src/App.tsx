import { useEffect, useState } from 'react'
import './App.css'

import heroPremium from './assets/hero-premium.png'
import galleryFrontView from './assets/gallery/IMG_3061.jpg'
import gallerySideView from './assets/gallery/IMG_0045.jpg'
import galleryDetailOne from './assets/gallery/IMG_0058.jpg'
import galleryDetailTwo from './assets/gallery/IMG_2105.jpg'
import galleryDetailThree from './assets/gallery/IMG_3643.jpg'
import galleryDetailFour from './assets/gallery/IMG_4236.jpg'
import galleryDetailFive from './assets/gallery/IMG_4238.jpg'
import galleryDetailSix from './assets/gallery/IMG_4702.jpg'

const galleryImages = [
  {
    src: galleryFrontView,
    alt: 'Vue avant premium de la moto Flavio Taxi Moto',
  },
  {
    src: gallerySideView,
    alt: 'Présentation latérale du taxi moto premium',
  },
  {
    src: galleryDetailOne,
    alt: 'Détail du véhicule avec l’équipement premium',
  },
  {
    src: galleryDetailTwo,
    alt: 'Moto en mouvement sur un trajet premium',
  },
  {
    src: galleryDetailThree,
    alt: 'Vue rapprochée du taxi moto en environnement urbain',
  },
  {
    src: galleryDetailFour,
    alt: 'Service Flavio Taxi Moto dans un cadre premium',
  },
  {
    src: galleryDetailFive,
    alt: 'Expérience premium à bord du taxi moto',
  },
  {
    src: galleryDetailSix,
    alt: 'Mise en scène élégante du service moto premium',
  },
]

const features = [
  {
    icon: '⛵',
    title: 'Honda Goldwing',
    description: 'Voyagez à bord d’une Honda Goldwing, reconnue pour son confort exceptionnel.',
  },
  {
    icon: '⏱',
    title: 'Ponctualité',
    description: 'Optimisez vos déplacements et évitez les embouteillages.',
  },
  {
    icon: '🛡',
    title: 'Sécurité',
    description: 'Pilote expérimenté, conduite souple et équipement homologué.',
  },
  {
    icon: '◈',
    title: 'Paiements simplifiés',
    description: 'CB, espèces, Apple Pay, Google Pay, virement/Wero.',
  },
  {
    icon: '✦',
    title: 'Disponible 7j/7',
    description: 'Réservation à l’avance ou selon disponibilité.',
  },
  {
    icon: '✧',
    title: 'Service Premium',
    description: 'Une expérience haut de gamme avec un accueil professionnel et personnalisé.',
  },
]

const services = [
  {
    icon: '✦',
    eyebrow: 'Prestige & précision',
    title: 'Transferts aéroport',
    description: 'Service dédié pour Orly, CDG, Versailles et les principales gares avec une précision optimale.',
  },
  {
    icon: '◌',
    eyebrow: 'Mobilité executive',
    title: 'Trajets professionnels',
    description: 'Déplacements élégants et rapides pour vos rendez-vous, réunions et missions importantes.',
  },
  {
    icon: '⟡',
    eyebrow: 'Confort partout',
    title: 'Toutes distances',
    description: 'Des trajets courts aux longues distances, avec confort, sécurité et maîtrise du temps.',
  },
]

const destinations = [
  { name: 'Yvelines', label: 'Trajets premium', icon: '◈' },
  { name: 'Paris', label: 'Mobilité urbaine', icon: '⬢' },
  { name: 'Versailles', label: 'Service élégant', icon: '✦' },
  { name: 'Orly', label: 'Aéroport express', icon: '✧' },
  { name: 'CDG', label: 'Connexion rapide', icon: '⬡' },
  { name: 'Gares', label: 'Transits fluides', icon: '⟡' },
]

const reviews = [
  {
    name: 'Claire',
    initials: 'CL',
    quote: 'Service impeccable, très professionnel et incroyablement ponctuel pour mon transfert de dernière minute.',
  },
  {
    name: 'Nicolas',
    initials: 'NI',
    quote: 'Le confort de la Honda Goldwing est remarquable. Un trajet fluide, élégant et vraiment agréable.',
  },
  {
    name: 'Sophie',
    initials: 'SO',
    quote: 'Une expérience premium du début à la fin. Tout était parfaitement organisé pour mon vol tôt le matin.',
  },
]

const faqs = [
  {
    question: 'Êtes-vous disponibles en soirée ?',
    answer: 'Oui. Nous opérons 7 jours sur 7, y compris en soirée et tard dans la nuit selon la disponibilité.',
  },
  {
    question: 'Pouvez-vous assurer les trajets vers les aéroports ?',
    answer: 'Absolument. Nous couvrons les principaux aéroports et gares avec un suivi adapté.',
  },
  {
    question: 'Proposez-vous un devis à l’avance ?',
    answer: 'Oui. Un devis personnalisé est disponible pour les trajets réguliers ou les réservations spécifiques.',
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const [activeReview, setActiveReview] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    departure: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll, .reveal-card')

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const { name, phone, email, departure, destination, date, time } = formData

    if (!name.trim() || !phone.trim() || !email.trim() || !departure.trim() || !destination.trim() || !date || !time) {
      setFeedback('Veuillez remplir au minimum votre nom, téléphone, e-mail, départ, arrivée, date et heure.')
      return
    }

    const message = `Bonjour Flavio,\n\nJe souhaite obtenir un devis pour un trajet.\n\n👤 Nom :\n${name.trim()}\n\n📞 Téléphone :\n${phone.trim()}\n\n✉️ Email :\n${email.trim()}\n\n📍 Départ :\n${departure.trim()}\n\n📍 Arrivée :\n${destination.trim()}\n\n📅 Date :\n${date}\n\n🕒 Heure :\n${time}\n\n👤 Passagers :\n${formData.passengers || '1'}\n\n📝 Message :\n${formData.message.trim() || 'Aucune'}\n\nMerci.`

    const encodedMessage = encodeURIComponent(message)
    const number = '33629495850'
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent)
    const waUrl = isMobile
      ? `https://wa.me/${number}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${number}&text=${encodedMessage}`

    setIsSubmitting(true)
    setFeedback('')

    window.setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
      setIsSubmitting(false)
      setFeedback('Demande de devis envoyée avec succès.')
    }, 700)
  }

  return (
    <div className="page-shell">
      <header className="hero" id="accueil" aria-labelledby="hero-title">
        <nav className={`hero__nav${scrolled ? ' hero__nav--scrolled' : ''}`} aria-label="Navigation principale">
          <a href="#accueil" className="brand">
            Flavio Taxi Moto
          </a>
          <div className="nav-links">
            <a href="#accueil" className="nav-link">
              Accueil
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#why-us" className="nav-link">
              Pourquoi nous choisir
            </a>
            <a href="#reviews" className="nav-link">
              Galerie
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
          <a href="#contact" className="nav-cta">
            Réserver
          </a>
        </nav>

        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">Taxi Moto Premium</p>
            <h1 id="hero-title">Taxi Moto Premium</h1>
            <p className="hero__subtitle">Yvelines • Paris • Versailles • Orly • CDG</p>
            <div className="hero__badges" aria-label="Prestige du service">
              <span className="hero__badge">🏍️ Honda Goldwing 2022</span>
              <span className="hero__badge hero__badge--active">🟢 Disponible 7j/7</span>
            </div>
            <div className="hero__rating" aria-label="Note du service premium">
              <span className="hero__stars">★★★★★</span>
              <span className="hero__rating-label">Service Premium</span>
            </div>
            <p className="hero__description">
              Service de taxi moto premium disponible 7j/7. Déplacements rapides, confortables et ponctuels vers les aéroports, les gares, les rendez-vous professionnels et toutes distances à bord d'une Honda Goldwing.
            </p>

            <div className="hero__actions">
              <a className="btn btn-primary" href="tel:+33629495850">
                Appeler
              </a>
              <a className="btn btn-secondary" href="https://wa.me/33629495850" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="btn btn-ghost" href="#contact">
                Demander un devis
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-label="Moto premium Flavio Taxi Moto">
            <img
              src={heroPremium}
              alt="Honda Goldwing Taxi Moto"
              width="1400"
              height="1400"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>
      </header>

      <main>
        <section id="why-us" className="section reveal-on-scroll">
          <SectionHeading
            eyebrow="Pourquoi nous choisir"
            title="Une expérience premium à la hauteur de vos exigences"
            description="Précision, confort et élégance pour chaque déplacement, à toute heure."
          />

          <div className="card-grid card-grid--features">
            {features.map((feature, index) => (
              <article key={feature.title} className="info-card info-card--feature reveal-card" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="info-card__icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section section--alt reveal-on-scroll">
          <SectionHeading
            eyebrow="Nos services"
            title="Des solutions sur mesure pour chaque trajet"
            description="Chaque course est pensée pour répondre à votre besoin avec rapidité et discrétion."
          />

          <div className="card-grid">
            {services.map((service, index) => (
              <article key={service.title} className="service-card reveal-card" style={{ transitionDelay: `${index * 120}ms` }}>
                <div className="service-card__accent" aria-hidden="true" />
                <div className="service-card__icon" aria-hidden="true">
                  {service.icon}
                </div>
                <p className="service-card__eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="destinations" className="section reveal-on-scroll">
          <SectionHeading
            eyebrow="Destinations"
            title="Une couverture élégante sur les axes essentiels"
            description="Nous accompagnons vos trajets entre Yvelines, Paris, Versailles, Orly et CDG."
          />

          <div className="destination-showcase" aria-label="Destinations premium">
            <div className="destination-showcase__lines" aria-hidden="true" />
            {destinations.map((destination, index) => (
              <article key={destination.name} className="destination-card reveal-card" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="destination-card__icon" aria-hidden="true">
                  {destination.icon}
                </div>
                <h3>{destination.name}</h3>
                <p>{destination.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="reviews" className="section section--alt reveal-on-scroll">
          <SectionHeading
            eyebrow="Avis clients"
            title="Ce que disent nos voyageurs"
            description="Des expériences premium, cohérentes et remarquablement agréables, à chaque trajet."
          />

          <div className="testimonials-shell">
            <div className="testimonials-rating" aria-label="Note moyenne">
              <span className="testimonials-rating__stars">★★★★★</span>
              <span className="testimonials-rating__score">5.0/5</span>
              <p>Basé sur les avis Google</p>
            </div>

            <div className="testimonial-carousel" role="region" aria-label="Témoignages clients">
              <button
                type="button"
                className="testimonial-carousel__arrow"
                onClick={() => setActiveReview((current) => (current - 1 + reviews.length) % reviews.length)}
                aria-label="Témoignage précédent"
              >
                ‹
              </button>

              <article className="testimonial-card reveal-card">
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar" aria-hidden="true">
                    {reviews[activeReview].initials}
                  </div>
                  <div>
                    <h3>{reviews[activeReview].name}</h3>
                    <p className="testimonial-card__meta">Voyageur premium</p>
                  </div>
                </div>

                <div className="testimonial-card__stars" aria-label="Cinq étoiles">
                  ★★★★★
                </div>

                <p className="testimonial-card__quote">“{reviews[activeReview].quote}”</p>
              </article>

              <button
                type="button"
                className="testimonial-carousel__arrow"
                onClick={() => setActiveReview((current) => (current + 1) % reviews.length)}
                aria-label="Témoignage suivant"
              >
                ›
              </button>
            </div>

            <div className="testimonial-dots" aria-label="Pagination des témoignages">
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  className={`testimonial-dot ${index === activeReview ? 'testimonial-dot--active' : ''}`}
                  onClick={() => setActiveReview(index)}
                  aria-label={`Afficher le témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section reveal-on-scroll">
          <SectionHeading
            eyebrow="Galerie"
            title="Découvrez votre future expérience"
            description="Quelques aperçus de votre taxi moto premium."
          />

          <div className="gallery-shell">
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  key={image.alt}
                  type="button"
                  className={`gallery-card reveal-card ${index === 0 ? 'gallery-card--featured' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section reveal-on-scroll">
          <SectionHeading
            eyebrow="Comment ça fonctionne ?"
            title="Votre réservation en 4 étapes simples"
            description="Une expérience fluide, rapide et premium de la demande au drop-off."
          />

          <div className="timeline">
            <div className="timeline__step">
              <div className="timeline__card">
                <div className="timeline__icon">📲</div>
                <h3>Demande de devis</h3>
                <p>Remplissez le formulaire ou contactez-nous directement.</p>
              </div>
            </div>
            <div className="timeline__step">
              <div className="timeline__card">
                <div className="timeline__icon">✅</div>
                <h3>Confirmation rapide</h3>
                <p>Nous confirmons votre trajet et votre tarif dans les meilleurs délais.</p>
              </div>
            </div>
            <div className="timeline__step">
              <div className="timeline__card">
                <div className="timeline__icon">🏍️</div>
                <h3>Prise en charge</h3>
                <p>Votre pilote vous attend au lieu convenu, à l’heure prévue.</p>
              </div>
            </div>
            <div className="timeline__step">
              <div className="timeline__card">
                <div className="timeline__icon">📍</div>
                <h3>Arrivée à destination</h3>
                <p>Voyagez rapidement, confortablement et en toute sérénité.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section reveal-on-scroll">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Tout ce qu’il faut savoir avant votre prochain trajet premium."
          />

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item reveal-card">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section section--contact reveal-on-scroll">
          <div className="booking-shell">
            <div className="booking-copy reveal-card">
              <p className="eyebrow">Réservation premium</p>
              <h2>Réservez votre trajet avec élégance et rapidité</h2>
              <p>Une expérience simple, fluide et rassurante pour chaque déplacement, à toute heure.</p>
              <ul className="booking-benefits">
                <li>✓ Réponse rapide</li>
                <li>✓ Disponible 7j/7</li>
                <li>✓ Devis gratuit</li>
                <li>✓ Paiement sécurisé</li>
              </ul>
            </div>

            <div className="booking-card reveal-card">
              <div className="booking-card__header">
                <p className="eyebrow">Demande de réservation</p>
                <h2>Votre trajet sur mesure</h2>
                <p>Décrivez votre besoin et nous vous recontactons rapidement.</p>
              </div>

              <form className="booking-form" aria-label="Formulaire de demande de devis">
                <div className="booking-form__grid">
                  <label className="field field--floating">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " autoComplete="name" />
                    <span>Nom</span>
                  </label>
                  <label className="field field--floating">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder=" " autoComplete="tel" />
                    <span>Téléphone</span>
                  </label>
                  <label className="field field--floating">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " autoComplete="email" />
                    <span>Email</span>
                  </label>
                  <label className="field field--floating">
                    <input type="text" name="departure" value={formData.departure} onChange={handleChange} placeholder=" " autoComplete="off" />
                    <span>Départ</span>
                  </label>
                  <label className="field field--floating">
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder=" " autoComplete="off" />
                    <span>Destination</span>
                  </label>
                  <label className="field field--floating">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    <span>Date</span>
                  </label>
                  <label className="field field--floating">
                    <input type="time" name="time" value={formData.time} onChange={handleChange} />
                    <span>Heure</span>
                  </label>
                  <label className="field field--floating">
                    <input type="number" min="1" max="4" name="passengers" value={formData.passengers} onChange={handleChange} placeholder=" " />
                    <span>Nombre de passagers</span>
                  </label>
                </div>

                <label className="field field--full field--floating">
                  <textarea rows={4} name="message" value={formData.message} onChange={handleChange} placeholder=" " />
                  <span>Message</span>
                </label>

                <div className="booking-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-booking"
                    onClick={handleSubmit}
                    aria-label="Envoyer la demande de devis via WhatsApp"
                  >
                    {isSubmitting ? 'Ouverture…' : 'Réserver'}
                  </button>

                  <a
                    className="btn btn-secondary btn-booking btn-booking--secondary"
                    href="https://wa.me/33629495850"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>

                {feedback ? (
                  <p
                    className={`booking-card__feedback ${feedback.includes('succès') ? 'booking-card__feedback--success' : ''}`}
                    aria-live="polite"
                  >
                    {feedback}
                  </p>
                ) : null}

                <div className="booking-card__contact-info">
                  <p>☎ 06 29 49 58 50</p>
                  <p>✉ flaviotaximoto@gmail.com</p>
                  <p>📍 Yvelines • Paris • Versailles • Orly • CDG</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
          <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox__close" onClick={() => setActiveImage(null)}>
              ×
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => setActiveImage((prev) => (prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length))}
            >
              ‹
            </button>
            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              sizes="100vw"
            />
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => setActiveImage((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length))}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__column">
            <h3>Flavio Taxi Moto</h3>
            <p>Premium motorcycle taxi service.</p>
            <p>Yvelines • Paris • Versailles • Orly • CDG</p>
          </div>

          <div className="footer__column">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#why-us">Pourquoi nous choisir</a></li>
              <li><a href="#gallery">Galerie</a></li>
              <li><a href="#contact">Réserver</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3>Contact</h3>
            <ul>
              <li>📞 06 29 49 58 50</li>
              <li>✉️ flaviotaximoto@gmail.com</li>
              <li>📍 Basé dans les Yvelines</li>
              <li>Disponible 7j/7</li>
            </ul>
          </div>

          <div className="footer__column">
            <h3>Paiements acceptés</h3>
            <ul>
              <li>Visa</li>
              <li>Mastercard</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
              <li>Espèces</li>
              <li>Virement</li>
              <li>Wero</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Flavio Taxi Moto — Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
