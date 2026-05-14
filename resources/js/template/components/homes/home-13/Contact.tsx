import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = form.current;
    if (!formEl) return;

    const formData = new FormData(formEl);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = formData.get("subject") as string;

    if (!name || !email || !subject || !message) {
      toast.error("All fields are required.");
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
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-area-left-portfolio-fixed finance banner-personal-portfolio signle-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-header pb--20">
              <h4 className="subtitle wow move-right">
                <i className="fa-regular fa-envelope" /> CONTACT
              </h4>
              <h2 className="title tmp-title-split">
                Let's Work <span>Together!</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row g-5 mt--10">
              <div className="col-lg-5 mt_md--30 mt_sm--30">
                <div className="thumbnail">
                  <img
                    loading="lazy"
                    className="w-100 radius"
                    alt="About Images"
                    src="/assets/images/contact/01.webp"
                    width={750}
                    height={1366}
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <form
                  className="contact-form-1 tmp-dynamic-form with-input-bg"
                  id="contact-form"
                  ref={form}
                  onSubmit={sendMail}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Your Subject"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      required
                    />
                  </div>
                  <div className="form-group mb--0">
                    <button
                      type="submit"
                      className="w-100 btn-default btn-large tmp-btn"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
