import { motion } from 'framer-motion';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';
import useContactForm from '../../hooks/useContactForm';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function Field({ label, name, value, onChange, error, type = 'text' }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-ink">{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-3 w-full rounded-[1.25rem] border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none ring-0 transition focus:border-accent/40"
            />
            {error ? (
                <span className="mt-2 block text-sm text-accent-warm">
                    {error[0]}
                </span>
            ) : null}
        </label>
    );
}

export default function ContactSection({ profile }) {
    const { values, errors, status, message, handleChange, handleSubmit } =
        useContactForm();

    return (
        <motion.section {...reveal} id="contact" className="mt-8">
            <SurfaceCard className="px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <SectionHeading
                            eyebrow="Contact"
                            title="Ready for collaboration, freelance work, or product conversations."
                            description="The contact form is already connected to the backend API and validates submissions through Laravel before storing them."
                        />

                        <div className="mt-6 space-y-4">
                            <div className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                    Email
                                </p>
                                <p className="mt-3 text-sm leading-7 text-ink">
                                    {profile?.email ?? 'hello@hasib.dev'}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                    Location
                                </p>
                                <p className="mt-3 text-sm leading-7 text-ink">
                                    {profile?.location ?? 'Dhaka, Bangladesh'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <Field
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                error={errors.phone}
                            />
                            <Field
                                label="Subject"
                                name="subject"
                                value={values.subject}
                                onChange={handleChange}
                                error={errors.subject}
                            />
                        </div>

                        <label className="block">
                            <span className="text-sm font-semibold text-ink">
                                Message
                            </span>
                            <textarea
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                rows={6}
                                className="mt-3 w-full rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none ring-0 transition focus:border-accent/40"
                            />
                            {errors.message ? (
                                <span className="mt-2 block text-sm text-accent-warm">
                                    {errors.message[0]}
                                </span>
                            ) : null}
                        </label>

                        {message ? (
                            <div
                                className={[
                                    'rounded-[1.25rem] px-4 py-3 text-sm',
                                    status === 'success'
                                        ? 'border border-accent/20 bg-accent/8 text-accent'
                                        : 'border border-accent-warm/20 bg-accent-warm/10 text-accent-warm',
                                ].join(' ')}
                            >
                                {message}
                            </div>
                        ) : null}

                        <Button
                            type="submit"
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting'
                                ? 'Sending Message...'
                                : 'Send Message'}
                        </Button>
                    </form>
                </div>
            </SurfaceCard>
        </motion.section>
    );
}
