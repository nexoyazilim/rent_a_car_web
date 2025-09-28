import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.getAttribute('data-wow-delay') || '0';
            
            setTimeout(() => {
              element.style.visibility = 'visible';
              element.style.animationPlayState = 'running';
            }, parseFloat(delay) * 1000);
            
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with wow class
    const wowElements = document.querySelectorAll('.wow');
    wowElements.forEach((el) => {
      el.style.visibility = 'hidden';
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return elementsRef;
};

export default useScrollReveal;
