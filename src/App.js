/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable-next-line no-unused-vars */
import { Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import LandingPage from 'pages/LandingPage';
import ProjectPage from 'pages/ProjectPage';
import NotFoundPage from 'pages/NotFoundPage';

import { ProjectDetailPage } from 'pages/ProjectDetailPage';
import { DiscussProjectPage } from 'pages/DiscussProjectPage';

import './assets/css/styles.css';
import AboutUsPage from 'pages/AboutUsPage';

function App() {
  return (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_ORGANIZATION_TITLE}</title>
        <meta name="description" content={process.env.REACT_APP_ORGANIZATION_DESCRIPTION} />
        <meta name="keywords" content={process.env.REACT_APP_ORGANIZATION_KEYWORDS} />
      </Helmet>

      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route exact path="/project/:id" element={<ProjectDetailPage />} />
        <Route exact path="/AboutUs" element={<AboutUsPage />} />
        <Route exact path="/discuss-project" element={<DiscussProjectPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
