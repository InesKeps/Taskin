import { useField } from 'formik';
import { useState } from 'react';

interface Props {
  label: string;
  name: string;
}

const Password = ({ label, name }: Props) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(name);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          {...field}
          type={show ? 'text' : 'password'}
          className="w-full p-2 border rounded"
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-2 top-2 cursor-pointer"
        >
          {show ? '👁️' : '🙈'}
        </span>
      </div>
      {meta.touched && meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default Password;
