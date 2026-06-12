import { useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: string;
}

const Input = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input {...field} {...props} className="w-full p-2 border rounded" />
      {meta.touched && meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default Input;
