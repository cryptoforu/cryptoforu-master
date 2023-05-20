import { BuilderForm, ArrayDataForm } from '@/Forms';
import { Grid, GridItem, Card, CardBody, Flex } from '@chakra-ui/react';

const AddData = () => {
  return (
    <Flex maxW="full" direction="column">
      <Grid templateColumns="repeat(12, 1fr)" gap={8}>
        <GridItem colSpan={4}>
          <Card
            variant="filled"
            bg="slate.900"
            borderColor="slate.700"
            position="sticky"
            top="10"
            bottom="0"
            maxH="100vh"
          >
            <CardBody>
              <BuilderForm />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={8}>
          <ArrayDataForm />
        </GridItem>
      </Grid>
    </Flex>
  );
};
export default AddData;
