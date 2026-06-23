import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
