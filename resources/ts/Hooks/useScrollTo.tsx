import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useCallback } from 'react';

import useSsr from './useSSR';

gsap.registerPlugin(ScrollToPlugin);
const useScrollTo = () => {
  const { isBrowser } = useSsr();
  return useCallback(
    ({ y, offsetY }: ScrollToPlugin.Vars) => {
      isBrowser &&
        gsap.to(window, {
          duration: 2,
          scrollTo: { y: y, offsetY: offsetY, autoKill: true },
          ease: 'power2',
        });
    },
    [isBrowser]
  );
};
export default useScrollTo;
