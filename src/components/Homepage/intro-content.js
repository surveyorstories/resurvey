import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  FaTelegram,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa';





const IntroContent = () => {

  return (
    <Layout title="Resurvey Notice Generator" description="Generate Resurvey Notices with ease.">
      <header className="header">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Resurvey Notice Generator</h1>
          <p className="text-gray-600 mb-4">
            Ground Truthing Notice Generation and Ground Validation Notice Generation for Resurvey.
          </p>
          <Link
            to='groundtruthingnotice'
            className='mb-4 inline-block rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
          >
            Go to Notice Generation
          </Link>
        </div>
      </header>

      <main className="container mx-auto">
        {/* Social Media Section */}
        <section className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-9">
            <a href="https://t.me/surveyor_stories" target="_blank" rel="noopener noreferrer">
              <FaTelegram size={30} className="text-gray-600 hover:text-blue-500" />
            </a>
            <a href="https://youtube.com/@surveyorstories" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={30} className="text-gray-600 hover:text-red-500" />
            </a>
            <a href="https://github.com/surveyorstories" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} className="text-gray-600 hover:text-gray-900" />
            </a>
          </div>
        </section>

        {/* YouTube Videos Section */}

      </main>
    </Layout>
  );
};

export default IntroContent;
