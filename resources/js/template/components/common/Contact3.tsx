import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Contact3() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = form.current;
    if (!formEl) return;

    const formData = new FormData(formEl);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
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
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tmp-contact-area" id="contacts">
      <div className="inner">
        <div className="contact-get-in-touch-wrap">
          <div className="section-head text-align-left mb--50">
            <h2 className="custom-title mb--20 tmp-scroll-trigger tmp-fade-in animation-order-1">
              GET IN TOUCH
              <span>
                <img
                  loading="lazy"
                  alt="custom-line"
                  src="/assets/images/custom-line/custom-line.png"
                  width={81}
                  height={6}
                />
              </span>
            </h2>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Elevate your brand with us
            </h2>
            <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
              It's a well-established fact that a reader will be distracted by
              readable content. Elevate your presence with intentional design.
            </p>
          </div>
          <div className="contact-inner">
            <div className="contact-form">
              <form id="contact-form" ref={form} onSubmit={sendMail}>
                <div className="contact-form-wrapper row">
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
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="input-field"
                        name="subject"
                        placeholder="Subject"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="input-field"
                        name="message"
                        placeholder="Your Message"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="tmp-btn hover-icon-reverse radius-round w-100"
                      disabled={isSubmitting}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">
                          {isSubmitting ? "Sending..." : "Appointment Now"}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
