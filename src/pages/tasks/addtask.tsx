import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/taskSlice';
import type { Task } from '../../types/task';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch } from '../../redux/store';
import { useNavigate } from "react-router";

interface FormValues {
  title: string;
  description: string;
}

const AddTask = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: FormValues = { title: '', description: '' };

  const validationSchema = Yup.object({
    title: Yup.string().required('Titre requis'),
    description: Yup.string().required('Description requise')
});

return(
        <section className="grid grid-cols-[18%_82%] gap-x-8 grid-rows-[15%_75%_10%] bg-[#212845] overflow-hidden h-dvh">
            <Sidebar/>
            <Header/>
            <div className="col-start-2 col-end-3 row-start-2 row-end-4 flex justify-center gap-x-8 p-8 mr-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        const newTask: Task = {
                        id: uuidv4(),
                        title: values.title,
                        description: values.description,
                        status: 'todo'
                        };
                        dispatch(addTask(newTask));
                        resetForm();
                        navigate("/taskin");
                    }}
                >
                    <Form className="flex flex-col gap-4 w-1/3 text-white bg-white/15 p-6 rounded-md">
                        <label htmlFor="title">Titre</label>
                        <Field name="title" className="border p-2 rounded" />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="description">Description</label>
                        <Field name="description" as="textarea" className="border p-2 rounded" />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

                        <button type="submit" className="bg-[#ed6d8b] text-white px-4 py-2 rounded">Ajouter</button>
                    </Form>
                </Formik>
            </div>
        </section>
    )
};


export default AddTask;