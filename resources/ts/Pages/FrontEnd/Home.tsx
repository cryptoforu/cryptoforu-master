import FrontLayout from '@/Layouts/FrontLayout';
import { lazy } from 'react';
import { SectionProvider } from '@/Providers';
import { SectionWrapper } from '@/Components/Wrappers';
import { Hero, Features } from '@/Sections/Home';

const CryptoAcademy = lazy(() => import('@/Sections/Home/CryptoAcademy'));
const EarnCrypto = lazy(() => import('@/Sections/Home/EarnCrypto'));
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <SectionProvider
        sectionId="crypto-academy"
        isLazy={true}
        label="Crypto Academy"
      >
        <SectionWrapper py="16">
          <CryptoAcademy />
        </SectionWrapper>
      </SectionProvider>
      <SectionProvider
        sectionId="earn-crypto"
        isLazy={true}
        label="Earn Crypto"
      >
        <SectionWrapper py="4" position="relative">
          <EarnCrypto />
        </SectionWrapper>
      </SectionProvider>
    </>
  );
};
Home.layout = (page: string) => <FrontLayout children={page} />;
export default Home;
