import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { chakra } from '@chakra-ui/react';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import Label from './Label';
import { useColorModeValue as mode } from '@chakra-ui/react';
import type { LabelProps } from './FormTypes';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ChakraFile = chakra<typeof FilePond, FilePondProps>(FilePond);

type PondProps = FilePondProps & LabelProps;

const ChakraPond = ({ ...props }: PondProps) => {
  return (
    <Label name={props.name}>
      <ChakraFile
        {...props}
        bg={mode('slate.100', 'slate.800')}
        color={mode('slate.900', 'emerald.100')}
      />
    </Label>
  );
};

export default ChakraPond;
