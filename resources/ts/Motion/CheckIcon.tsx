import { Icon } from '@chakra-ui/react';
import { AnimatePresence, m } from 'framer-motion';

const AnimatedCheckIcon = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <AnimatePresence initial={false}>
      {isChecked && (
        <Icon
          viewBox="0 0 50 50"
          fill="none"
          strokeWidth={1.5}
          stroke="currentcolor"
        >
          <m.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: isChecked ? 'easeOut' : 'easeIn',
            }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M41.9375 8.625C41.273438 8.648438 40.664063 9 40.3125 9.5625L21.5 38.34375L9.3125 27.8125C8.789063 27.269531 8.003906 27.066406 7.28125 27.292969C6.5625 27.515625 6.027344 28.125 5.902344 28.867188C5.777344 29.613281 6.078125 30.363281 6.6875 30.8125L20.625 42.875C21.0625 43.246094 21.640625 43.410156 22.207031 43.328125C22.777344 43.242188 23.28125 42.917969 23.59375 42.4375L43.6875 11.75C44.117188 11.121094 44.152344 10.308594 43.78125 9.644531C43.410156 8.984375 42.695313 8.589844 41.9375 8.625Z"
          />
        </Icon>
      )}
    </AnimatePresence>
  );
};
export default AnimatedCheckIcon;
