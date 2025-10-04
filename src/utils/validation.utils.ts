import * as Yup from 'yup';
const baseSchema ={
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
};

const usernameSchema = {
     username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    )
    .required('Username is required'),
};

export const loginValidationSchema = Yup.object().shape({
  ...baseSchema,


});

export const signupValidationSchema = Yup.object().shape({
  ...usernameSchema,
  ...baseSchema
});
