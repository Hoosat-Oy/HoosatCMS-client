import React, { useState } from 'react';
import { FormBuilder } from '../../../../HoosatUI';
import { useTranslation } from 'react-i18next';
import { SessionDTO, UploadsDTO } from '../../@types';
import { UploadFile } from '../../Controllers/Files'; // Import the FileDTO interface

interface AddFileProps {
  session: SessionDTO;
  closeComponent: () => void;
}

export const AddFile: React.FC<AddFileProps> = (props: AddFileProps) => {
  const [t] = useTranslation();
  const [files, setFiles] = useState<File[] | null>(null); // Add a state to store the selected file

  const handleSubmit = async () => {
    if (files) {
      const file: UploadsDTO = {
        files: files
      };

      if (await UploadFile(props.session, file)) {
        props.closeComponent();
      }
    }
  };

  return (
    <FormBuilder
      submitbuttontext={`${t('files.add-submit-button')}`}
      inputs={[
        {
          itype: 'input',
          id: 'file',
          label: `${t('files.add-file-input')}`,
          type: 'file',
          multiple: true,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles(Array.from(e.target.files));
            }
          }
        }
      ]}
      onSubmit={handleSubmit}
    />
  );
};
