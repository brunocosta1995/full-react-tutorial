import Input from "./Input";
import { isEmail, hasMinLength, isNotEmpty } from "../util/validation";
import useInput from "../hook/useInput";

/* eslint-disable react/react-in-jsx-scope */
export default function Login() {
  const {
    value: emailInput,
    handleChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordInput,
    handleChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: hasPasswordError,
  } = useInput("", (value) => hasMinLength(value, 6) && isNotEmpty(value));

  // const emailInvalid = userInput.email !== "" && !userInput.email.includes("@"); versão com keyPress
  // const emailInvalid = isEdit.email && !isEmail(emailInput); //versão com lostFocus/blur
  // const passwordInvalid = isEdit.password && !hasMinLength(passwordInput, 6);

  function handleSubmit(event) {
    event.preventDefault();

    if (hasEmailError || hasPasswordError) {
      return;
    }

    console.log("Submitted!", { emailInput, passwordInput });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          error={hasEmailError && "Please enter a valid email"}
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailInput}
        />
        <Input
          id="password"
          label="Password"
          error={hasPasswordError && "Plase enter a valid password"}
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordInput}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
