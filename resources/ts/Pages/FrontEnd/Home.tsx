import FrontLayout from '@/Layouts/FrontLayout';
import { Hero } from '@/Sections/Home';
const Home = () => {
  return (
    <>
      <Hero />
    </>
  );
};
Home.layout = (page: string) => <FrontLayout children={page} />;
export default Home;
