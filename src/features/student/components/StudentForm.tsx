import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';
export interface IStudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

// Validation Yup
const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Please enter name')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2; // !!x is != empty
      }),
    age: yup
      .number()
      .min(10, 'Min is 10.')
      .max(40, 'Max is 40.')
      .integer('Please enter an interger.')
      .required('Please enter age')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .min(0, 'Min is 0.')
      .max(10, 'Max is 10.')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: IStudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>('');

  const cityOptions = useAppSelector(selectCityOptions);
  console.log(cityOptions);

  const handleFormSubmit = async (formValues: Student) => {
    console.log('Submitted: ', formValues);
    //  await new Promise((resolve) => {
    //      setTimeout(resolve, 3000);
    //  })

     try {
         //clear error before submit
         setError('');
         
         await onSubmit?.(formValues); // chờ onSubmit trả result

     } catch (error:any) {
        console.log('Failed to update student: ', error);
        setError(error.message);
     }
  };

  return (
    <Box maxWidth={500}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

          {Array.isArray(cityOptions) && cityOptions.length > 0 && (
              <SelectField name="city" control={control} label="City" options={cityOptions} />
          )}
        

        {error && <Alert severity="error">{error}</Alert>}
        
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={15} />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
