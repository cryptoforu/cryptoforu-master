import { useRoute } from '@/Providers/RouteProvider';

const useActive = () => {
  const { route } = useRoute();

  const isActive = (url: string) => {
    return route().current(url);
  };

  return isActive;
};

export default useActive;
