import { forwardRef } from '@chakra-ui/react';
import { RequestPayload, VisitOptions } from '@inertiajs/core';
import { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

import { useRoute } from '@/Providers/RouteProvider';

import type { PrimaryButtonProps } from './PrimaryButton';
import PrimaryButton from './PrimaryButton';

interface ButtonLinkProps extends PrimaryButtonProps {
  to: string;
  data?: RequestPayload;
  options?: VisitOptions;
  params?: RouteParam | RouteParamsWithQueryOverload;
  routeParams?: boolean;
}

const ButtonLink = forwardRef<ButtonLinkProps, typeof PrimaryButton>(
  function ButtonLink(props, ref) {
    const { to, data, options, params, routeParams, ...rest } = props;
    const { route, navigate } = useRoute();
    const param = routeParams ? route().params : params;
    let url = '';

    if (route().has(to)) {
      url = route(to, param);
    } else {
      url = to;
    }
    return (
      <PrimaryButton
        ref={ref}
        onClick={() => navigate(url, data, options)}
        {...rest}
      />
    );
  }
);
export default ButtonLink;
