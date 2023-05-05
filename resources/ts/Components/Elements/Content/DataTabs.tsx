import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue as mode,
  Grid,
  GridItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface TabProps {
  label: string;
  content: ReactNode;
}

export interface DataTabsProps {
  data: Array<TabProps>;
}

const DataTabs = ({ data }: DataTabsProps) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 1280px)', {
    ssr: true,
    fallback: false,
  });

  return (
    <Tabs
      orientation={isLargerThan800 ? 'vertical' : 'horizontal'}
      position="relative"
      variant="main"
      isLazy
    >
      <Grid
        templateColumns={{ xl: 'repeat(12, 1fr)' }}
        templateRows={{
          base: 'repeat(1, 1fr)',
          xl: 'none',
        }}
      >
        <GridItem
          colSpan={{ base: 0, xl: 3 }}
          py="8"
          borderRight={{ base: 'none', xl: '1px' }}
          borderColor={{
            base: 'none',
            xl: mode('slate.100', 'slate.800'),
          }}
        >
          <TabList>
            {data.map((tab, tabIndex) => (
              <Tab key={tabIndex}>{tab.label}</Tab>
            ))}
          </TabList>
        </GridItem>
        <GridItem colSpan={{ base: 12, xl: 9 }}>
          <TabPanels>
            {data.map((tab, tabIndex) => (
              <TabPanel key={tabIndex}>{tab.content}</TabPanel>
            ))}
          </TabPanels>
        </GridItem>
      </Grid>
    </Tabs>
  );
};

export default DataTabs;
