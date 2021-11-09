import * as React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

const ConditionalInput = ({ control, index, field }) => {
  const value = useWatch({
    name: "test",
    control
  });

  return (
    <Controller
      control={control}
      name={`test.${index}.firstName`}
      render={({ field }) =>
        value?.[index]?.checkbox === "on" ? <input {...field} /> : null
      }
    />
  );
};

function App() {
  const { handleSubmit, control, register } = useForm();
  const { fields, append, prepend } = useFieldArray({
    control,
    name: "test"
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <section key={field.id}>
          <input
            type="checkbox"
            value="on"
            {...register(`test.${index}.checkbox`)}
          />
          <ConditionalInput {...{ control, index, field }} />
        </section>
      ))}

      <button
        type="button"
        onClick={() => append({ firstName: "append value" }) }
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}