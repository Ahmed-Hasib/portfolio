import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sandMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = form.current;
    if (!formEl) return;

    const formData = new FormData(formEl);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formEl,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        formEl.reset();
      } else {
        toast.error("Oops! Message not sent.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-area-wrapper tmp-section-gap">
      <div className="container">
        {/* Contact Info Boxes */}
        <div className="contact-info-wrap">
          <div className="row">
            {/* Address */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-1">
                <div className="contact-icon">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <h3 className="title">Address</h3>
                <p className="para">Dhaka 102, utl 1216, road 45</p>
                <p className="para">house of street</p>
              </div>
            </div>
            {/* Email */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-2">
                <div className="contact-icon">
                  <i className="fa-solid fa-envelope" />
                </div>
                <h3 className="title">E-mail</h3>
                <a href="mailto:hasan@yourmail.com">
                  <p className="para">hasan@yourmail.com</p>
                </a>
                <a href="mailto:themespark11@gmail.com">
                  <p className="para">themespark11@gmail.com</p>
                </a>
              </div>
            </div>
            {/* Phone */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-3">
                <div className="contact-icon">
                  <i className="fa-solid fa-phone" />
                </div>
                <h3 className="title">Call Me</h3>
                <p className="para">0000 - 000 - 000 00</p>
                <p className="para">+1234 - 000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="get-in-touch-area tmp-section-gapTop">
        <div className="container">
          <div className="contact-get-in-touch-wrap">
            <div className="get-in-touch-wrapper tmponhover">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5">
                  <div className="section-head text-align-left">
                    <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                      <span className="subtitle">GET IN TOUCH</span>
                    </div>
                    <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                      Elevate your brand with Me
                    </h2>
                    <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                      ished fact that a reader will be distrol acted bioiiy
                      desig ished fact that a reader will acted ished fact that
                      a reader will be distrol acted
                    </p>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-inner">
                    <form
                      className="tmp-dynamic-form"
                      id="contact-form"
                      ref={form}
                      onSubmit={sandMail}
                    >
                      <div className="contact-form-wrapper row">
                        {/* Name */}
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              name="name"
                              placeholder="Your Name"
                              type="text"
                              required
                            />
                          </div>
                        </div>
                        {/* Phone */}
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              name="phone"
                              placeholder="Phone Number"
                              type="text"
                              required
                            />
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              name="email"
                              placeholder="Your Email"
                              type="email"
                              required
                            />
                          </div>
                        </div>
                        {/* Subject */}
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="input-field"
                              type="text"
                              name="subject"
                              placeholder="Subject"
                              required
                            />
                          </div>
                        </div>
                        {/* Message */}
                        <div className="col-lg-12">
                          <div className="form-group">
                            <textarea
                              className="input-field"
                              placeholder="Your Message"
                              name="message"
                              required
                            />
                          </div>
                        </div>
                        {/* Submit */}
                        <div className="col-lg-12">
                          <div className="tmp-button-here">
                            <button
                              className="tmp-btn hover-icon-reverse radius-round w-100"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <span className="icon-reverse-wrapper">
                                <span className="btn-text">
                                  {isSubmitting
                                    ? "Sending..."
                                    : "Appointment Now"}
                                </span>
                                <span className="btn-icon">
                                  <i className="fa-sharp fa-regular fa-arrow-right" />
                                </span>
                                <span className="btn-icon">
                                  <i className="fa-sharp fa-regular fa-arrow-right" />
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
