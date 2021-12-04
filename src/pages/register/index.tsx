import { BaseFormScreen, StepOneUser, StepTwoUser } from "@components";
import { FormRegisterEnum } from "@enums";
import { useEffect, useState } from "react";

interface IFormProps {
  form: FormRegisterEnum;
  setFormProperties(values: unknown): void;
  goToStepTwo(): void;
  formProperties: unknown;
}
function Form({ form, setFormProperties, goToStepTwo, formProperties }: IFormProps) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOneUser
        onChangeFormProperties={setFormProperties}
        goToStepTwo={goToStepTwo}
        formProperties={formProperties}
      />
    );
  }

  return <StepTwoUser formProperties={formProperties} />;
}

export default function Register() {
  const [form, setForm] = useState(FormRegisterEnum.STEP_ONE);
  const [formProperties, setFormProperties] = useState();

  useEffect(() => {
    console.log(formProperties);
  }, [formProperties]);

  function goToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  function goToStepOne() {
    setForm(FormRegisterEnum.STEP_ONE);
  }

  const goBack = form === FormRegisterEnum.STEP_TWO ? goToStepOne : null;

  return (
    <BaseFormScreen goBack={goBack}>
      <Form
        form={form}
        goToStepTwo={goToStepTwo}
        setFormProperties={setFormProperties}
        formProperties={formProperties}
      />
    </BaseFormScreen>
  );
}