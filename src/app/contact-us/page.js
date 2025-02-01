"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import styles from './contact-form.module.css';

export default function ContactForm() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formValues, setFormValues] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  // Debugowanie zmiennych środowiskowych
  useEffect(() => {
    console.log('Environment variables:', {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS response:', result);
      
      if (result.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormValues({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS error details:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.text) {
        try {
          const errorData = JSON.parse(error.text);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = error.text;
        }
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactHeading}>Contact Us</h1>
      
      {submitStatus && (
        <div className={`${styles.statusMessage} ${submitStatus.success ? styles.success : styles.error}`}>
          <p>{submitStatus.message}</p>
          {submitStatus.success && (
            <Link href="/" className={styles.returnLink}>
              Return to Homepage
            </Link>
          )}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label className={styles.contactLabel} htmlFor="from_name">
            Name
          </label>
          <input
            className={styles.contactInput}
            type="text"
            id="from_name"
            name="from_name"
            value={formValues.from_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.contactLabel} htmlFor="from_email">
            Email
          </label>
          <input
            className={styles.contactInput}
            type="email"
            id="from_email"
            name="from_email"
            value={formValues.from_email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.contactLabel} htmlFor="subject">
            Subject
          </label>
          <input
            className={styles.contactInput}
            type="text"
            id="subject"
            name="subject"
            value={formValues.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.contactLabel} htmlFor="message">
            Message
          </label>
          <textarea
            className={`${styles.contactInput} ${styles.contactTextarea}`}
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            rows="5"
            required
          />
        </div>

        <button 
          type="submit" 
          className={styles.contactButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}