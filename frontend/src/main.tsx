<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/products.css';
import './styles/services.css';
import './styles/servicesHero.css';
import './styles/howItWorks.css';
import './styles/ctaBanner.css';
import './styles/gallery.css';
import './styles/galleryPage.css';
import './styles/testimonials.css';
import './styles/configurator.css';
import './styles/catalogue.css';
import './styles/productDetails.css';
import './styles/footer.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

>>>>>>> 735266e7bba39ee6bdb811daf2b5e51cf3598620
