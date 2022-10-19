import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const lessThan10MB = (filelist) => {
    return filelist[0] ? filelist[0].size < 10000000 : false;
  }

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: {
        value: true,
        message: 'Arquivo obrigatório'
      },
      validate: {
        lessThan10MB: lessThan10MB,
        // acceptedFormats:
      }
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: {
        value: true,
        message: 'Título obrigatório'
      },
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres'
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres'
      },

    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      maxLength: {
        value: 65,
        message: 'Máximo de 65 caracteres'
      },
      required: {
        value: true,
        message: 'Descrição obrigatória'
      },
      
    },
  };

  const apiRequest = async (params) => {
    const response = await api.post(
      'api/images',
      params
    );
    const success = response.status === 201;

    return success;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    apiRequest,
    {
      // TODO ONSUCCESS MUTATION
      onSuccess: (data, variables, context) => {
        // Boom baby!
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {

    try {
      const { description, title } = data;
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl){
        toast({
          title: 'Imagem não adicionada',
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync({ description, title, url: imageUrl})
      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Imagem cadastrada',
        description: "Sua imagem foi cadastrada com sucesso.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      setImageUrl('');
      setLocalImageUrl('');
      reset({
        title: '',
        description: ''
      }, {
        keepErrors: false, 
        keepDirty: false,
      });
      closeModal();
    }
  };

  const loadImage = async (data) => {

  };
  
  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          onChange={loadImage}
          {...register('image', formValidations.image)}
          error={errors?.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title', formValidations.title)}
          error={errors?.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
          error={errors?.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
