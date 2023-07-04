import React, { useEffect, useState } from 'react';
import jsonp from 'jsonp';

const LinkChecker = ({ url }) => {
  const [brokenLinks, setBrokenLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        jsonp(url, { timeout: 5000 }, (error, data) => {
          if (error) {
            console.error('Error:', error);
            return;
          }

          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');

          const links = doc.querySelectorAll('a');
          const brokenLinks = [];

          links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
              const resolvedUrl = new URL(href, url).href;
              const img = new Image();
              img.src = resolvedUrl;
              img.onerror = () => {
                brokenLinks.push({ link: resolvedUrl, status: 'Error' });
              };
            }
          });

          setBrokenLinks(brokenLinks);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLinks();
  }, [url]);

  return (
    <div>
      <h1>Broken Links</h1>
      {brokenLinks.map((link, index) => (
        <div key={index}>
          <p>URL: {link.link}</p>
          <p>Status: {link.status}</p>
        </div>
      ))}
    </div>
  );
};

export default LinkChecker;
