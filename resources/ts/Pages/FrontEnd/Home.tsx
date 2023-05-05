import FrontLayout from '@/Layouts/FrontLayout';
import { Heading } from '@chakra-ui/react';
const Home = () => {
  return (
    <div>
      <Heading as="h1" size="4xl" noOfLines={1}>
        Sve Ovo Ja
      </Heading>
    </div>
  );
};
Home.layout = (page: string) => <FrontLayout children={page} />;
export default Home;
