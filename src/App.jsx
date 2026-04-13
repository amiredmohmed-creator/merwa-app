import { useMemo, useState } from 'react'
import './App.css'

const services = [
  {
    title: 'Service 1',
    description: 'Details about service 1',
  },
  {
    title: 'Service 2',
    description: 'Details about service 2',
  },
  {
    title: 'Service 3',
    description: 'Details about service 3',
  },
]

const faqs = [
  {
    question: 'How fast can I get a service request processed?',
    answer: 'Most requests are reviewed within 24 hours and we follow up with next steps quickly.',
  },
  {
    question: 'Can I request a custom package?',
    answer: 'Yes. The form allows you to describe your need, and we tailor the solution to your goals.',
  },
  {
    question: 'Will you use my email to contact me?',
    answer: 'Absolutely. We will reach out using the details you provide and confirm the next steps.',
  },
]

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  details: '',
}

function App() {
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const canSubmit = useMemo(
    () => formData.name && formData.email && formData.service && formData.details,
    [formData],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmit) {
      setStatus({ type: 'error', message: 'Please fill all required fields.' })
      return
    }

    setStatus({ type: 'pending', message: 'Sending your request...' })

    try {
      const response = await fetch('https://formsubmit.co/ajax/amirditamo@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          details: formData.details,
          _subject: `New service request from ${formData.name}`,
          _captcha: 'false',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send request')
      }

      await response.json()
      setStatus({ type: 'success', message: 'Submitted! We will contact you soon.' })
      setFormData(initialState)
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          'Unable to complete the request now. Please send an email to amirditamo@gmail.com or retry shortly.',
      })
    }
  }

  return (
    <div className="app-shell">
      <header className="hero-header">
        <div className="brand">Merwa Services</div>
        <nav className="hero-nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#request">Request</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="hero-cta" href="#request">
          Request a Service
        </a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Professional Service Requests</span>
            <h1>Fast, clear service support for your next project.</h1>
            <p>
              Browse services, submit your details, and get a confirmed response from the admin team.
              Everything is built to stay simple and easy to customize.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#request">
                Request Service
              </a>
              <a className="button secondary" href="#services">
                See Services
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <h2>Submit once</h2>
              <p>Just name, email, phone and description — we take care of the rest.</p>
            </div>
  
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="section-header">
            <span className="eyebrow">Our Services</span>
            <h2>What we support for every customer</h2>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article key={service.title} className="feature-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-copy">
            <span className="eyebrow">About</span>
            <h2>Delivering dependable support for every project.</h2>
            <p>
              We focus on clear service options, fast response coordination, and confident follow-up.
              Every request is reviewed quickly so you can move forward with the right support.
            </p>
          </div>
          <div className="about-grid">
            <div>
              <h3>Trusted service delivery</h3>
              <p>We work to make sure your request is received and handled by the right team.</p>
            </div>
            <div>
              <h3>Clear communication</h3>
              <p>We keep the process simple so you know exactly what to expect next.</p>
            </div>
            <div>
              <h3>Reliable support</h3>
              <p>Our team is prepared to respond with care, whether it is a quick question or a full request.</p>
            </div>
          </div>
        </section>

        <section id="request" className="section request-section">
          <div className="section-header">
            <span className="eyebrow">Request a Service</span>
            <h2>Tell us what you need and we will get in touch.</h2>
          </div>
          <div className="request-grid">
            <form className="request-form" onSubmit={handleSubmit}>
              <label>
                Name<span>*</span>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Email<span>*</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional phone number"
                />
              </label>
              <label>
                Service requested<span>*</span>
                <input
                  name="service"
                  type="text"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="E.g. website redesign, marketing support"
                  required
                />
              </label>
              <label>
                Description<span>*</span>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Briefly describe what you need"
                  rows="5"
                  required
                />
              </label>
              <div className="form-actions">
                <button className="button primary" type="submit" disabled={!canSubmit || status.type === 'pending'}>
                  {status.type === 'pending' ? 'Sending...' : 'Submit Request'}
                </button>
              </div>
              {status.message && (
                <p className={`status-message ${status.type}`}>{status.message}</p>
              )}
              <p className="form-note">
                After submission, your request will be confirmed and emailed to the company admin. We will follow up with next steps as soon as possible.
                
              </p>
            </form>
            <aside className="request-side">
              <div className="info-card">
                <h3>Why request here?</h3>
                <ul>
                  <li>Experienced team ready to handle your service needs fast.</li>
                  <li>Requests are delivered to the right person for prompt follow-up.</li>
                  <li>A simple process designed to keep your details clear and secure.</li>
                </ul>
              </div>
              <div className="info-card accent">
                <h3>Need a faster response?</h3>
                <p>Give us a call at <strong>(123) 456-7890</strong> </p>
              </div>
            </aside>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="section-header">
            <span className="eyebrow">FAQ</span>
            <h2>Helpful details for first-time visitors</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((item) => (
              <article key={item.question} className="faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Merwa Services • Reliable service support</p>
        <p>&copy; {new Date().getFullYear()} Merwa Services. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
