import { Box, Skeleton } from '@chakra-ui/react';
import type { MDEditorProps } from '@uiw/react-md-editor';
import pMinDelay from 'p-min-delay';
import { lazy, Suspense, useRef, useState } from 'react';

import type { LabelProps } from './FormTypes';
import Label from './Label';
const MDEditor = lazy(() => pMinDelay(import('@uiw/react-md-editor'), 1000));

function MarkdownEditor({ ...props }: MDEditorProps & LabelProps) {
  const mdRef = useRef(null);
  const [value, setValue] = useState(props.value);

  return (
    <Label label={props.label} name={props.name} errors={props.errors}>
      <Suspense fallback={<Skeleton height="400px" />}>
        <Box w="full" h="full" ref={mdRef}>
          <MDEditor value={value} onChange={setValue} {...props} height={400} />
        </Box>
      </Suspense>
    </Label>
  );
}

export default MarkdownEditor;
