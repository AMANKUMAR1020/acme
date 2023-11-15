// //12
// 'use server';

// import { z } from 'zod';
 
// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(['pending', 'paid']),
//   date: z.string(),
// });
 
// const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// export async function createInvoice(formData: FormData) {
    
//   const rawFormData = {
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   };
//   // Test it out:
//   console.log(rawFormData);
// }






//12
// 'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(['pending', 'paid']),
//   date: z.string(),
// });
 
// const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// export async function createInvoice(formData: FormData) {
    
//     const { customerId, amount, status } = CreateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
//     //Test it out:
//     //console.log(rawFormData);
//     const amountInCents = amount * 100;
//     const date = new Date().toISOString().split('T')[0];
   
//     await sql`
//     INSERT INTO invoices (customer_id, amount, status, date)
//     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;

//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');

// }







//12
// 'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });
 

// // Use Zod to update the expected types
// const UpdateInvoice = InvoiceSchema.omit({ date: true });
// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }




// const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// export async function createInvoice(formData: FormData) {
//   const { customerId, amount, status } = CreateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];
 
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }


// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited
// // ...
 
// export async function deleteInvoice(id: string, formData: FormData) {
//   throw new Error('Failed to Delete Invoice');
 
//   // Unreachable code block
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice' };
//   }
// }








// //12
// 'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });
 

// // Use Zod to update the expected types
// const UpdateInvoice = InvoiceSchema.omit({ date: true });
// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }
 
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }



// const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

// // export default function EditInvoiceForm({
// //   invoice,
// //   customers,
// // }: {
// //   invoice: InvoiceForm;
// //   customers: CustomerField[];
// // }) {
// //   const initialState = { message: null, errors: {} };
// //   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
// //   const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);
 
// //   return <form action={dispatch}></form>;
// // }


// export async function createInvoice(prevState: State, formData: FormData) {
//   // Validate form using Zod
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }
 
//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];
 
//   // Insert data into the database
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     // If a database error occurs, return a more specific error.
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }
 
//   // Revalidate the cache for the invoices page and redirect the user.
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }


// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited
// // ...
 
// export async function deleteInvoice(id: string, formData: FormData) {
// //throw new Error('Failed to Delete Invoice');
 
//   // Unreachable code block
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice' };
//   }
// }








// //12
// 'use server';

// import { z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// const InvoiceSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });

// // Use Zod to update the expected types
// const UpdateInvoice = InvoiceSchema.omit({ date: true });
// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }
 
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }



// const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };


// export async function createInvoice(prevState: State, formData: FormData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];
 
//   try {
//     await sql`
//       INSERT INTO invoices (customer_id, amount, status, date)
//       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//     `;
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }


// //const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited
// // ...
 
// export async function deleteInvoice(id: string, formData: FormData) {
// //throw new Error('Failed to Delete Invoice');
 
//   // Unreachable code block
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice' };
//   }
// }















//12
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ date: true });
//const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}



const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


//const UpdateInvoice = FormSchema.omit({ date: true, id: true });//commeited
// ...
 
export async function deleteInvoice(id: string, formData: FormData) {
//throw new Error('Failed to Delete Invoice');
 
  // Unreachable code block
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}