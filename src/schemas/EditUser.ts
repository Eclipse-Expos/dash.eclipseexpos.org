import { z } from 'zod';

const invalid_type_error = 'invalid type';
const required_error = 'this field is required';

export const EditUser = z.object({
    firstName: z
        .string({ invalid_type_error, required_error })
        .max(10, 'First name is too long'),
    lastName: z
        .string({ invalid_type_error, required_error })
        .max(10, 'Last name is too long'),
});