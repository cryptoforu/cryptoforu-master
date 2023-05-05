import React, { useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import { ProsePa } from '../Elements/Typography';
import useAdminLayout from '@/Store/useAdminLayout';
import { m, MotionProps } from 'framer-motion';
import { Spacer, Button } from '@chakra-ui/react';
import { LazyImage } from '../Elements/Content';
interface SidebarLabelProps extends MotionProps {
  label: string;
  onTap?: (e: MouseEvent) => void;
  children: React.ReactNode;
  icon?: string;
}

const SidebarLabel = ({ label, onTap, icon, children }: SidebarLabelProps) => {
  const { widthState } = useAdminLayout();
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: widthState ? 0 : 1,
        display: widthState ? 'none' : 'block',
      },
      { duration: 0.5, delay: widthState ? 0 : 1 }
    );
  }, [animate, scope, widthState]);
  return (
    <Button
      as={m.button}
      my={widthState ? '2px' : '4px'}
      bg={widthState ? 'transparent' : 'inherit'}
      justifyContent={widthState ? 'center' : ''}
      onTap={onTap}
      display="flex"
      minWidth="100%"
      position="relative"
      _hover={{ cursor: 'pointer' }}
      variant="ghost"
      leftIcon={
        <LazyImage
          boxProps={{
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            h: '30px',
            w: '30px',
            borderRadius: '12px',
            bg: 'gray.700',
          }}
          imgProps={{ w: '24px', h: '24px', src: icon }}
        />
      }
      marginY="2"
    >
      <ProsePa id={label} ref={scope} my="auto">
        {label}
      </ProsePa>
      <Spacer />
      {children}
    </Button>
  );
};

export default SidebarLabel;
