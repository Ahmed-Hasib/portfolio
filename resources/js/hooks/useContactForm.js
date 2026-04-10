import { useState } from 'react';
import { submitContact } from '../services/portfolioService';

const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

export default function useContactForm() {
    const [values, setValues] = useState(initialValues);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;

        setValues((current) => ({
            ...current,
            [name]: value,
        }));
        setErrors((current) => ({
            ...current,
            [name]: undefined,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus('submitting');
        setMessage('');
        setErrors({});

        try {
            const response = await submitContact(values);

            setValues(initialValues);
            setStatus('success');
            setMessage(response.message ?? 'Contact submitted successfully.');
        } catch (caughtError) {
            setStatus('error');

            if (caughtError.response?.status === 422) {
                setErrors(caughtError.response.data.errors ?? {});
                setMessage('Please fix the highlighted fields and try again.');

                return;
            }

            setMessage(
                caughtError.response?.data?.message ??
                    caughtError.message ??
                    'Unable to submit the contact form right now.',
            );
        }
    }

    return {
        values,
        errors,
        status,
        message,
        handleChange,
        handleSubmit,
    };
}
