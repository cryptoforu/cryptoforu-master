import { chakra, LinkProps } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { useRoute } from '@/Providers/RouteProvider';
import { FormDataConvertible, VisitOptions } from '@inertiajs/core';
import { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

type NavLinkComponent = LinkProps;

interface NavLinkProps extends NavLinkComponent {
  to: string;
  data?: Record<string, FormDataConvertible>;
  options?: VisitOptions;
  params?: RouteParam | RouteParamsWithQueryOverload;
  routeParams?: boolean;
}

const Navigate = chakra(Link);
const NavLink = ({ ...props }: NavLinkProps) => {
  const { to, data, options, params, routeParams, ...rest } = props;
  const { route } = useRoute();
  const param = routeParams ? route().params : params;
  let url = '';

  if (route().has(to)) {
    url = route(to, param);
  } else {
    url = to;
  }

  return <Navigate href={url} data={data} {...rest} />;
};

export default NavLink;
