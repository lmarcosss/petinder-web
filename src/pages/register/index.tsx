import { BaseFormScreen, StepOneUser, StepTwoUser } from "@components";
import { FormRegisterEnum, ErrorsEnum } from "@enums";
import { useRouter } from "next/router";
import { useState } from "react";
import { IUserFormProperties, IUserStepTwo } from "types/UserType";
import { useToast } from "@chakra-ui/react";
import { doRegister } from "@services/auth/register";

interface IFormProps {
  form: FormRegisterEnum;
  setFormProperties(values: IUserFormProperties): void;
  goToStepTwo(): void;
  formProperties: IUserFormProperties;
  onSubmit: (data: IUserStepTwo) => void;
}

function Form({
  form,
  setFormProperties,
  goToStepTwo,
  formProperties,
  onSubmit
}: IFormProps) {
  if (form === FormRegisterEnum.STEP_ONE) {
    return (
      <StepOneUser
        onChangeFormProperties={setFormProperties}
        goToStepTwo={goToStepTwo}
        formProperties={formProperties}
      />
    );
  }

  return <StepTwoUser onSubmit={onSubmit} />;
}

export default function Register() {
  const [form, setForm] = useState(FormRegisterEnum.STEP_ONE);
  const [formProperties, setFormProperties] = useState<IUserFormProperties>();

  const route = useRouter();
  const toastr = useToast();

  function goToStepTwo() {
    setForm(FormRegisterEnum.STEP_TWO);
  }

  function goToStepOne() {
    setForm(FormRegisterEnum.STEP_ONE);
  }

  function goToHome() {
    route.replace("/");
  }

  function goToLogin() {
    route.replace("/login");
  }

  async function handleSubmit(stepTwoData) {
    try {
      const formValues = { ...formProperties, ...stepTwoData };

      await doRegister(formValues);

      goToLogin();
    } catch (err) {
      toastr({
        description: err.response.data.message || ErrorsEnum.UNEXPECTED,
        status: "error",
        position: "top-right",
        isClosable: true
      });
    }
  }

  const goBack = form === FormRegisterEnum.STEP_TWO ? goToStepOne : goToHome;

  return (
    <BaseFormScreen goBack={goBack}>
      <Form
        form={form}
        goToStepTwo={goToStepTwo}
        setFormProperties={setFormProperties}
        formProperties={formProperties}
        onSubmit={handleSubmit}
      />
    </BaseFormScreen>
  );
}