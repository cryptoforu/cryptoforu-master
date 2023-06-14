import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  shouldForwardProp,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { AnimatePresence, isValidMotionProp, m } from 'framer-motion';
import { PropsWithChildren, ReactNode } from 'react';

import { MotionBox } from '@/Motion';
import { tabsVariants } from '@/Motion/variants';

type TabState = {
  selected: number;
  customDirection: number;
  isPending: boolean;
  setSelected: (action: number) => void;
};

export interface MobileMenuProps extends TabState {
  data: Array<TabContentProps>;
}

type TabVariantProps = {
  withlabel?: boolean;
  leftchild?: ReactNode;
  rightchild?: ReactNode;
} & PropsWithChildren;

export interface TabContentProps {
  label: string;
  content: ReactNode;
}

export interface DataTabsProps
  extends TabVariantProps,
    Partial<TabState>,
    Partial<TabsProps> {
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

export const MobileMenu = ({ data, ...props }: MobileMenuProps) => {
  const { selected, customDirection, isPending, setSelected } = props;
  return (
    <Flex direction="column" gap={4}>
      <Flex justifySelf="flex-start">
        <Menu placement="bottom-end">
          <MenuButton
            as={Button}
            variant="primaryBtn"
            rightIcon={<ChevronDownIcon />}
            isLoading={isPending}
          >
            {isPending ? 'Pending' : data[selected].label}
          </MenuButton>
          <MenuList>
            {data.map((menu, menuIndex) => (
              <MenuItem
                key={menu.label}
                color={mode('slate.700', 'slate.300')}
                fontSize={'md'}
                onClick={() => setSelected(menuIndex)}
              >
                {menu.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Box
        position="relative"
        overflow="hidden"
        mt="2"
        rounded="xl"
        bg={mode('slate.200', 'slateAlpha.900')}
        px="2"
        py="6"
      >
        <AnimatePresence initial={false} mode={'wait'} custom={customDirection}>
          <MotionBox
            display="flex"
            flexWrap="wrap"
            minWidth="full"
            gap={4}
            key={selected}
            direction={customDirection}
            variants={tabsVariants}
          >
            {data[selected].content}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Flex>
  );
};

const DataTabs = ({
  data,
  showLabel,
  selected,
  customDirection,
  isPending,
  setSelected,
  ...props
}: DataTabsProps) => {
  return (
    <Tabs {...props} tabIndex={selected} onChange={setSelected}>
      <TabVariant
        withlabel={showLabel}
        leftchild={props.leftchild}
        rightchild={props.rightchild}
      >
        <TabList>
          {data.map((tab, tabIndex) => (
            <Tab key={tabIndex} isDisabled={isPending}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </TabVariant>
      <Indicator layoutId="dataTabs" />
      <TabPanels>
        {data.map((tab, tabIndex) => (
          <TabPanel key={tabIndex}>
            <AnimatePresence
              initial={false}
              mode={'wait'}
              custom={customDirection}
            >
              <MotionBox
                display="flex"
                flexWrap="wrap"
                minWidth="full"
                gap={4}
                key={selected}
                direction={customDirection}
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
