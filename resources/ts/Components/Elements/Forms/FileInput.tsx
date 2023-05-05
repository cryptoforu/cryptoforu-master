import { useRef } from 'react';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond, registerPlugin, FilePondProps } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import { useFormikContext } from 'formik';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

type FileProps = FilePondProps;

const FileInput = (props: FileProps) => {
  const fileRef = useRef<FilePond>(null);
  const { setFieldValue } = useFormikContext();
  return (
    <FilePond
      ref={fileRef}
      name={props.name}
      onupdatefiles={(files) =>
        setFieldValue(fileRef.current?.props.name as string, files[0].file)
      }
      {...props}
    />
  );
};

export default FileInput;
