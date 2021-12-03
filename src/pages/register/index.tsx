import { BaseFormScreen } from "@components";
import { FormRegisterEnum } from "@enums";
import { useState } from "react";

import StepOne from "./_step-one";
import StepTwo from "./_step-two";

function Form({ form, setFormProperties, goToStepTwo,}) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOne
        onChangeFormProperties={setFormProperties}
        goToStepTwo={goToStepTwo}
      />
    );
  }

  return <StepTwo />;
}

export default function Register() {
  const [form, setForm,] = useState(FormRegisterEnum.STEP_ONE);
  const [formProperties, setFormProperties,] = useState();


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
      />
    </BaseFormScreen>
  );
}