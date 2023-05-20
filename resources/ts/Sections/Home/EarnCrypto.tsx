import { Container, Flex } from '@chakra-ui/react';
import { DataTabs } from '@/Components/Elements/Content';
import { ProseHeadings } from '@/Components/Elements/Typography';
import { SecondaryButton } from '@/Components/Elements/Navigation';
import { useEarnData } from '@/Store/Controllers/useHomeStore';
import { SectionHeader } from '@/Components/Elements/Content';
import { useSectionDispatch } from '@/Providers';
import { PatternWrapper } from '@/Components/Patterns';
import { ReactComponent as PolygonLuminary } from '@/images/polygon-luminary.svg';
const EarnCrypto = () => {
  const { data } = useEarnData();
  const { handleLoad } = useSectionDispatch();
  return (
    <>
      <PatternWrapper top="0" insetX="0" width="100%" height="55rem" mx="auto">
        <Flex maxWidth="full" rounded="xl" justify="center" opacity={0.3}>
          <PolygonLuminary />
        </Flex>
      </PatternWrapper>
      <Container
        id="earn-crypto"
        maxWidth="8xl"
        onLoad={() => handleLoad('earn-crypto')}
      >
        <SectionHeader
          variant="large"
          textAlign="center"
          py="16"
          badgeLabel="Earn Crypto"
          title="Earn Crypto with"
          gradTitle="Cryptoforu"
          desc="Join us in a Brand New Crypto World. Start exploring our awesome
          services and Earn your Online Passive Income right way"
        />
        <DataTabs
          data={data}
          position="relative"
          variant="secondary"
          colorScheme="emerald"
          showLabel={true}
          leftchild={
            <ProseHeadings component="h3" size="lg">
              Popular Categories
            </ProseHeadings>
          }
          rightchild={
            <SecondaryButton ml="4" to="earn-crypto">
              Show All
            </SecondaryButton>
          }
        />
      </Container>
    </>
  );
};
export default EarnCrypto;
