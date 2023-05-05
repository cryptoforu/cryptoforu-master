import { Flex, Grid } from '@chakra-ui/react';
import { useSelectedValues } from '@/Store/useMenuSelect';
import { ImgCard } from '@/Components/Elements/Content';
import type { EarnCategory } from '@/Types/generated';

const ContextGrid = () => {
  const values = useSelectedValues<EarnCategory>();
  return (
    <Flex p="16px" my="24px" maxWidth="100%">
      <Grid
        templateColumns={{ sm: '1fr', md: '1fr 1fr', xl: 'repeat(4, 1fr)' }}
        templateRows={{ sm: '1fr 1fr 1fr auto', md: '1fr 1fr', xl: '1fr' }}
        gap="24px"
      >
        {values?.earn?.map((value) => (
          <ImgCard
            key={value?.id}
            image={
              value.image_name
                ? `/img/cache/lg/${value.image_name}`
                : value.image
            }
            srcSet={
              value.image_name
                ? `/img/cache/sm/${value.image_name} 300w, /img/cache/md/${value.image_name} 600w, /img/cache/lg/${value.image_name} 1200w`
                : undefined
            }
            title={value?.title}
            category={values?.name}
            description={
              value?.main_features ? value.main_features : value.content
            }
            to="admin-earn.edit"
            params={value.id}
          />
        ))}
      </Grid>
    </Flex>
  );
};
export default ContextGrid;
