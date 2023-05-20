import {
  Button,
  HTMLChakraProps,
  IconButton,
  IconButtonProps,
  ButtonProps,
  chakra,
  forwardRef,
} from '@chakra-ui/react';
import { m } from 'framer-motion';
import { btnOutline } from '@/Motion/variants';
import { useRoute } from '@/Providers/RouteProvider';
import { RequestPayload, VisitOptions } from '@inertiajs/core';
import { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

type BtnComponent = typeof Button | typeof IconButton;

export interface BtnLinkProps extends HTMLChakraProps<BtnComponent> {
  to: string;
  component?: BtnComponent;
  data?: RequestPayload;
  options?: VisitOptions;
  params?: RouteParam | RouteParamsWithQueryOverload;
  routeParams?: boolean;
  iconProps?: IconButtonProps;
  leftIcon?: ButtonProps['leftIcon'];
  rightIcon?: ButtonProps['rightIcon'];
}

const Btn = chakra((component) => component);

const BtnLink = forwardRef<BtnLinkProps, BtnComponent>(function Btnlink(
  props,
  ref
) {
  const {
    to,
    data,
    options,
    params,
    routeParams,
    component = Button,
    iconProps,
    ...rest
  } = props;
  const { route, navigate } = useRoute();
  const param = routeParams ? route().params : params;
  let url = '';

  if (route().has(to)) {
    url = route(to, param);
  } else {
    url = to;
  }
  return (
    <Btn
      ref={ref}
      as={component}
      onClick={() => navigate(url, data, options)}
      {...rest}
    />
  );
});
export const MotionBtn = chakra(m(BtnLink));

export const PrimaryButton = (props: BtnLinkProps) => {
  return (
    <MotionBtn
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={btnOutline}
      custom="#34d399"
      variant="primaryBtn"
      {...props}
    />
  );
};

export const SecondaryButton = (props: BtnLinkProps) => {
  return (
    <MotionBtn
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={btnOutline}
      custom="#1e293b"
      variant="secondaryBtn"
      {...props}
    />
  );
};

export default BtnLink;
