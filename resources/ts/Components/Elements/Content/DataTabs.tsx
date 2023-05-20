import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabsProps,
  TabIndicator,
  chakra,
  shouldForwardProp,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { m, isValidMotionProp, AnimatePresence } from 'framer-motion';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { MotionBox } from '@/Motion';
import { tabsVariants } from '@/Motion/variants';

type TabVariantProps = {
  withlabel?: boolean;
  leftchild?: ReactNode;
  rightchild?: ReactNode;
} & PropsWithChildren;

export interface TabContentProps {
  label: string;
  content: ReactNode;
}

export interface DataTabsProps extends Partial<TabsProps>, TabVariantProps {
  data: Array<TabContentProps>;
  showLabel?: boolean;
}

const Indicator = chakra(m(TabIndicator), {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function TabVariant({
  withlabel,
  leftchild,
  rightchild,
  children,
}: TabVariantProps) {
  if (withlabel) {
    return (
      <Flex minWidth="full" align="center" px="16">
        {leftchild}
        <Spacer />
        {children}
        {rightchild}
      </Flex>
    );
  } else {
    return <>{children}</>;
  }
}

const DataTabs = ({ data, showLabel, ...props }: DataTabsProps) => {
  const [[selectedTab, direction], setTab] = useState([0, 0]);
  const handleTab = (index: number) => {
    setTab([index, selectedTab > index ? 0 : 1]);
  };
  return (
    <Tabs {...props} tabIndex={selectedTab} onChange={handleTab}>
      <TabVariant
        withlabel={showLabel}
        leftchild={props.leftchild}
        rightchild={props.rightchild}
      >
        <TabList>
          {data.map((tab, tabIndex) => (
            <Tab key={tabIndex}>{tab.label}</Tab>
          ))}
        </TabList>
      </TabVariant>
      <Indicator layoutId="dataTabs" />
      <TabPanels>
        {data.map((tab, tabIndex) => (
          <TabPanel key={tabIndex}>
            <AnimatePresence mode="wait" custom={direction}>
              <MotionBox
                display="flex"
                flexWrap="wrap"
                minWidth="full"
                gap={4}
                key={selectedTab}
                direction={direction}
                variants={tabsVariants}
              >
                {tab.content}
              </MotionBox>
            </AnimatePresence>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default DataTabs;
