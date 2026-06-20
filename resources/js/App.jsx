import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobaleffectProvider from './template/components/common/GlobaleffectProvider';
import { ModalUIProvider } from './template/context/ModalUIContext';
import HomePage6 from './template/pages/homes/index-06';
import ProjectDetailsPage from './template/pages/projects/project-details';
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
                <Routes>
                    <Route path="/" element={<HomePage6 />} />
                    <Route
                        path="/portfolio-details/:slug?"
                        element={<ProjectDetailsPage />}
                    />
                    <Route
                        path="/project-details/:slug?"
                        element={<ProjectDetailsPage />}
                    />
                </Routes>
            </ModalUIProvider>
            <GlobaleffectProvider />
        </BrowserRouter>
    );
}
