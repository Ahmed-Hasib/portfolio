import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobaleffectProvider from './template/components/common/GlobaleffectProvider';
import { ModalUIProvider } from './template/context/ModalUIContext';
import HomePage6 from './template/pages/homes/index-06';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <BrowserRouter>
            <ToastContainer
                position="bottom-left"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ModalUIProvider>
                <HomePage6 />
            </ModalUIProvider>
            <GlobaleffectProvider />
        </BrowserRouter>
    );
}
