// import { InputField } from '@/components/FormFields';
// import { LoginPayload } from '@/models/user';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

// export interface LoginFormProps {
//   initialValues?: LoginPayload;
//   onSubmit?: (formValues: LoginPayload) => void;
// }

// const schema = yup.object().shape({
//     email: yup
//       .string()
//       .required('This is required field.')
//       .test('two-words', 'Please enter at least two words', (value) => {
//         if (!value) return true;
  
//         const parts = value?.split(' ') || [];
//         return parts.filter((x) => Boolean(x)).length >= 2;
//       }),
//     password: yup
//       .number()
//       .positive('Please enter a positive number.')
//       .min(18, 'Min is 18')
//       .max(60, 'Max is 60')
//       .integer('Please enter an integer.')
//       .required('Please enter age.')
//       .typeError('Please enter a valid number.'),
//   });

// export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
//   const [error, setError] = useState<string>('');

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<LoginPayload>({
//     defaultValues: initialValues,
//     resolver: yupResolver(schema),
//   });

//   const handleFormSubmit = async (formValues: LoginPayload) => {
//     try {
//       // Clear previous submission error
//       setError('');

//       await onSubmit?.(formValues);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='form-login'>
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <InputField type="email" name="email" control={control} label="Email" />

//         <InputField name="password" control={control} label="Password" type="password" />

//         {/* {error && <Alert severity="error">{error}</Alert>} */}

//         <div>
//           <button type="submit"  className="btn-primary">
//             {isSubmitting && <div className="circular-progress">Circular Progress</div>}
//             &nbsp;Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { LoginPayload } from '@/models/user';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export interface LoginFormProps {
    initialValues?: LoginPayload;
    onSubmit?: (formValues: LoginPayload) => void;
  }

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        email: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  // const handleFormLogin = handleSubmit((data) => console.log(data));

  const handleFormLogin = async (formValues: LoginPayload) => {
    try {
      // Clear previous submission error
    //  setError('');

      await onSubmit?.(formValues);
    } catch (error) {
     // setError(error.message);
     console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormLogin)}>
      <input {...register("email")} placeholder="Email" type="text" />
      {errors?.email && <p>{errors.email.message}</p>}
      
      <input {...register("password")} placeholder="Password" type="password"/>

      <button className='btn-primary' type="submit">Login</button>
    </form>
  );
}
