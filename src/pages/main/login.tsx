import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/input';
import Password from '../../components/password';
import bkg from '../../assets/images/bkg.png';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Nom requis'),
    password: Yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
  try {
    await axios.post('http://localhost:3000/api/users/register', {
      name: values.name,
      password: values.password,
    });
    localStorage.setItem('username', values.name);
    navigate('/taskin');
  } catch (error) {
    console.error('Erreur lors de l’inscription', error);
  }
};

    return(
       <section className='h-dvh flex justify-center items-center bg-[#212845]'>
            <div className='flex justify-center bg-[#212845] z-10 border-2 border-[#ed6d8b] rounded-lg w-2/6'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='w-[70%] py-12 text-[#fff]'>
                    <div>
                        <h2 className='font-semibold text-2xl text-center mb-4'>Inscription</h2>
                        <Input label="Nom" name="name" />
                        <Password label="Mot de passe" name="password" />
                        <button type="submit" className='bg-[#ed6d8b] ml-20 hover:bg-[#ec345f] cursor-pointer rounded-full py-1 mt-4 text-white w-1/2'>
                            Envoyer
                        </button>
                    </div>
                    </Form>
                </Formik>
            </div>
            <img src={bkg} className='absolute bottom-0 right-0 z-0 w-full h-3/4' alt="" />
            <img src={bkg} className='absolute bottom-0 right-0 z-0 w-full h-2/4' alt="" />
        </section>
    )
}

export default Login;