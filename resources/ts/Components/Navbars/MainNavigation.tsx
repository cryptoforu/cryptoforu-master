import { MotionBtn } from '../Elements/Navigation';
import { useNavigation } from '@/Store/useNavStore';
import useActive from '@/Hooks/useActive';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import useHover from '@/Hooks/useHover';
import { HoverLink } from '@/Motion';

const MainNavigation = () => {
  const { subOpen, main_menu, onSubClose, setSubId } = useNavigation();
  const isActive = useActive();

  const { isHovered, onHover } = useHover();

  return (
    <Box display={{ base: 'none', lg: 'flex' }} alignItems="center" gap="2">
      {main_menu.map((menu, menuIndex) =>
        menu.childs?.length === 0 ? (
          <MotionBtn
            key={menuIndex}
            to={menu.route as string}
            variant={
              isActive(menu.route as string) ? 'activeNav' : 'primaryNav'
            }
            onHoverStart={() => onHover(menuIndex)}
            onHoverEnd={() => onHover()}
          >
            <HoverLink isHovered={isHovered(menuIndex)} />
            <Box as="span" position="relative" zIndex={10}>
              {menu.label}
            </Box>
          </MotionBtn>
        ) : (
          <Popover
            key={menu.label}
            size="md"
            gutter={4}
            variant="main"
            trigger="hover"
            isOpen={subOpen(menu.id as number)}
            onClose={onSubClose}
            placement="bottom-start"
          >
            <PopoverTrigger>
              <MotionBtn
                to=""
                onHoverStart={() => {
                  setSubId(menu.id as number);
                  onHover(menuIndex);
                }}
                onHoverEnd={() => onHover()}
                variant={
                  isActive(menu.route as string) ? 'activeNav' : 'primaryNav'
                }
              >
                <HoverLink isHovered={isHovered(menuIndex)} />
                <Box as="span" position="relative" zIndex={10}>
                  {menu.label}
                </Box>
              </MotionBtn>
            </PopoverTrigger>
            <PopoverContent>
              {menu.childs?.map((child) => (
                <PopoverBody key={child.label}>
                  <MotionBtn
                    width="100%"
                    role="group"
                    to={child.route as string}
                    variant={
                      isActive(menu.route as string)
                        ? 'activeNav'
                        : 'primaryNav'
                    }
                    onHoverStart={() => onHover(child.label)}
                    onHoverEnd={() => onHover()}
                    justifyContent="start"
                  >
                    <HoverLink isHovered={isHovered(child.label)} />
                    <Flex direction="row" minW="100%">
                      <Flex as="span" position="relative" zIndex={10}>
                        {child.label}
                      </Flex>
                      <Spacer />
                      <Flex
                        transition={'all .3s ease'}
                        transform={'translateX(-10px)'}
                        opacity={0}
                        _groupHover={{
                          opacity: '100%',
                          transform: 'translateX(0)',
                        }}
                        justify={'flex-end'}
                        align={'center'}
                        flex={1}
                      >
                        <Icon
                          color={'emerald.400'}
                          w={5}
                          h={5}
                          as={ChevronRightIcon}
                        />
                      </Flex>
                    </Flex>
                  </MotionBtn>
                </PopoverBody>
              ))}
            </PopoverContent>
          </Popover>
        )
      )}
    </Box>
  );
};
export default MainNavigation;
