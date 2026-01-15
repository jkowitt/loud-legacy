"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const inquiryTypes = [
  { value: "demo", label: "Request a demo" },
  { value: "sales", label: "Sales inquiry" },
  { value: "support", label: "Support question" },
  { value: "partnership", label: "Partnership opportunity" },
  { value: "press", label: "Press inquiry" },
  { value: "other", label: "Other" },
];

const products = [
  { value: "valora", label: "VALORA" },
  { value: "sportify", label: "Sportify" },
  { value: "business-now", label: "Business Now" },
  { value: "legacy-crm", label: "Legacy CRM" },
  { value: "all", label: "All products / Platform" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "demo",
    product: "all",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <Header />

      <section className="contact-page">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h1>Get in touch</h1>
              <p className="contact-intro">
                Whether you want a demo, have a question, or just want to chat—we're here.
              </p>

              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✓</div>
                  <h2>Thanks for reaching out!</h2>
                  <p>We'll get back to you within one business day.</p>
                  <Link href="/" className="button button--secondary">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inquiryType">What can we help with?</label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product">Product interest</label>
                      <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                      >
                        {products.map((product) => (
                          <option key={product.value} value={product.value}>
                            {product.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us more about what you're looking for..."
                    />
                  </div>

                  <button type="submit" className="button button--primary button--large">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">
              <div className="sidebar-card">
                <h3>Quick answers</h3>
                <ul className="quick-links">
                  <li>
                    <Link href="/pricing">View pricing plans</Link>
                  </li>
                  <li>
                    <Link href="/about">Learn about us</Link>
                  </li>
                  <li>
                    <Link href="/blog">Read the blog</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Response time</h3>
                <p>We typically respond within <strong>one business day</strong>.</p>
                <p>For urgent support, email <a href="mailto:support@loud-legacy.com">support@loud-legacy.com</a></p>
              </div>

              <div className="sidebar-card">
                <h3>Schedule directly</h3>
                <p>Want to skip the form? Book time with our team directly.</p>
                <a
                  href="https://calendly.com/loud-legacy/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--secondary"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
