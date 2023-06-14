import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import { chakra, useColorModeValue as mode } from '@chakra-ui/react';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';

import type { LabelProps } from './FormTypes';
import Label from './Label';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ChakraFile = chakra<typeof FilePond, FilePondProps>(FilePond);

type PondProps = FilePondProps & LabelProps;

const ChakraPond = ({ ...props }: PondProps) => {
  return (
    <Label name={props.name}>
      <ChakraFile
        {...props}
        sx={{
          '.filepond--panel-root': {
            bg: mode('slate.100', 'slateAlpha.900'),
            border: '1px solid',
            borderColor: mode('slate.200', 'slate.900'),
          },
          '.filepond--drop-label': {
            color: mode('slate.900', 'emerald.100'),
          },
        }}
      />
    </Label>
  );
};

export default ChakraPond;
