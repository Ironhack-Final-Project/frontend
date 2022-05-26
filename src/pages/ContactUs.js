function ContactUs() {
  return (
    <>
      <div className="contact-us">
        <h1>Contact Us</h1>
        <h3>
          If you have any questions, concerns or requests, please contact us!
        </h3>

        <h5>Send a Mail</h5>

        <form action="mailto:puppy-palace@mail.com" method="POST">
          <button className="submit-btn" type="submit">Mail</button>
        </form>
      </div>
    </>
  );
}

export default ContactUs;
