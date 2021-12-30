import React, { useEffect, useState } from 'react';
import Splash from '../components/splash/Splash';
import Bio from '../components/bio/Bio';
import Work from '../components/work/Work';
import Skills from '../components/skills/Skills';
import Modal from '../components/modal/Modal';
import Layout from '../components/layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Helmet } from 'react-helmet';

library.add(fab, faEnvelope);

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const IndexPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmited, setIsSubmitted] = useState(false);
  const [formInfo, setFormInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormInfo({});
    setIsSubmitted(false);
  };

  const handleFormChange = (e) => {
    setFormInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const clearForm = () => {
    setFormInfo((prev) => {
      for (let key of Object.keys(prev)) {
        prev[key] = '';
      }

      return { ...prev };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formInfo }),
    })
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((error) => alert(error));

    clearForm();
  };

  return (
    <Layout>
      <div className="App">
        <Helmet></Helmet>
        <Splash handleOpenModal={handleOpenModal} />
        <Bio />
        <Modal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          isSubmited={isSubmited}
          formInfo={formInfo}
        />
        <Work />
        <Skills />
      </div>
    </Layout>
  );
};

export default IndexPage;
