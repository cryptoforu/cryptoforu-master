import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import type { RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

import { useRoute } from '@/Providers/RouteProvider';

export interface NavigationLinkProps
  extends ThemingProps,
    HTMLChakraProps<'a'> {
  to: string;
  params?: RouteParam | RouteParamsWithQueryOverload;
  routeParams?: boolean;
}

const InternalLink = chakra(Link);

const NavigationLink = forwardRef<NavigationLinkProps, 'a'>(
  function NavigationLink(props, ref) {
    const { variant, to, params, routeParams, ...rest } = props;
    const styles = useStyleConfig('NavigationLink', { variant });
    const { route } = useRoute();
    const param = routeParams ? route().params : params;
    let url = '';

    if (route().has(to)) {
      url = route(to, param);
    } else {
      url = to;
    }
    return <InternalLink ref={ref} href={url} __css={styles} {...rest} />;
  }
);
export default NavigationLink;
