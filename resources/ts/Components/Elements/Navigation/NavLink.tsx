import {
  chakra,
  LinkProps,
  ThemingProps,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';
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
  variant?: ThemingProps['variant'];
  size?: ThemingProps['size'];
}

const Navigate = chakra(Link);

const NavLink = forwardRef<NavLinkProps, typeof Navigate>(function NavLink(
  props,
  ref
) {
  const { to, data, options, params, routeParams, variant, size, ...rest } =
    props;
  const styles = useStyleConfig('NavigationLink', { variant, size });
  const { route } = useRoute();
  const param = routeParams ? route().params : params;
  let url = '';

  if (route().has(to)) {
    url = route(to, param);
  } else {
    url = to;
  }
  return (
    <Navigate itemRef={ref} href={url} data={data} __css={styles} {...rest} />
  );
});

export default NavLink;
