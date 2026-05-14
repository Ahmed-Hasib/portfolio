import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Contact({
  parentClass = "get-in-touch-area tmp-section-gapTop",
}) {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(form.current!);
    const email = formData.get("email") as string;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current!,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        form.current?.reset();
      } else {
        toast.error("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={parentClass} id="contacts">
      <div className="container">
        <div className="get-in-touch-wrapper tmponhover">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">{/* Left Info (unchanged) */}</div>

            <div className="col-lg-7">
              <div className="contact-inner">
                <div className="section-head section-head-one-side text-align-left tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <span className="title">GET IN TOUCH</span>
                </div>
                <div className="contact-form">
                  <form
                    className="tmp-dynamic-form"
                    id="contact-form"
                    ref={form}
                    onSubmit={sendMail}
                  >
                    <div className="contact-form-wrapper row">
                      {/** Name */}
                      <div className="col-lg-6">
                        <input
                          className="input-field"
                          name="name"
                          placeholder="Your Name"
                          type="text"
                          required
                        />
                      </div>

                      {/** Phone */}
                      <div className="col-lg-6">
                        <input
                          className="input-field"
                          name="phone"
                          placeholder="Phone Number"
                          type="text"
                          required
                        />
                      </div>

                      {/** Email */}
                      <div className="col-lg-6">
                        <input
                          className="input-field"
                          name="email"
                          placeholder="Your Email"
                          type="email"
                          required
                        />
                      </div>

                      {/** Subject */}
                      <div className="col-lg-6">
                        <input
                          className="input-field"
                          name="subject"
                          placeholder="Subject"
                          type="text"
                          required
                        />
                      </div>

                      {/** Message */}
                      <div className="col-lg-12">
                        <textarea
                          className="input-field"
                          placeholder="Your Message"
                          name="message"
                          required
                        />
                      </div>

                      {/** Submit Button */}
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
  );
}
