import { animate, cubicBezier } from 'framer-motion';
import { useEffect, useState } from 'react';
const useLazyImage = ({ imgId }: { imgId: string }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isLoaded) {
      animate(
        '#placeholder',
        {
          opacity: [0.5, 1, 0.5],
        },
        {
          duration: 1.4,
          ease: cubicBezier(0.4, 0, 0.6, 1),
          repeat: Infinity,
        }
      );
      animate(imgId, {
        opacity: 0,
        display: 'none',
      });
    } else {
      animate(
        '#placeholder',
        {
          opacity: 0,
          display: 'none',
        },
        {
          duration: 1.4,
          ease: cubicBezier(0.4, 0, 0.6, 1),
        }
      );
      animate(
        imgId,
        {
          opacity: 1,
          display: 'block',
        },
        {
          duration: 1.4,
          ease: cubicBezier(0.4, 0, 0.6, 1),
        }
      );
    }
  }, [imgId, isLoaded]);

  return { handleImageOnLoad, isLoaded };
};

export default useLazyImage;
