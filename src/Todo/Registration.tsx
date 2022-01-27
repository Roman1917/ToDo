import { Form } from "react-final-form";
import { View } from "react-native";
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { localHost } from "../constantsTodo";
import { addUser } from "../Actions/ActionsTodoList";

interface IRegistration {
  navigation: any;
  loginReg: string;
  handleSubmit: any;
  setloginReg: string;
}

interface IFirst {
  setemailReg: any;
  emailReg: any;
}
const FieldFirst = ({ setemailReg, emailReg }: IFirst) => {
  return (
    <div className="loginput1">
      <Field
        name="email"
        className="loginput1"
        type="email"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              label="Email"
              variant="outlined"
              className="loginput1"
              onChange={(e) => {
                setemailReg(e.target.value);
              }}
              value={emailReg}
            />
            {meta.touched && meta.error && (
              <div className="meta1" style={{ color: "red" }}>
                {meta.error}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};
interface ISecond {
  setpasswordReg: any;
  passwordReg: any;
}
const FieldSecond = ({ setpasswordReg, passwordReg }: ISecond) => {
  return (
    <div className="loginput2">
      <Field
        name="password"
        className="loginput2"
        type="password"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              label="Password"
              variant="outlined"
              className="loginput2"
              onChange={(e) => {
                setpasswordReg(e.target.value);
              }}
              value={passwordReg}
            />
            {meta.touched && meta.error && (
              <div className="meta2" style={{ color: "red" }}>
                {meta.error}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};
interface ILog {
  setloginReg: any;
  loginReg: any;
}
const FieldLogin = ({ setloginReg, loginReg }: ILog) => {
  return (
    <div className="loginput3">
      <Field
        name="login"
        className="loginput3"
        type="login"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              label="Login"
              variant="outlined"
              className="loginput3"
              onChange={(e) => {
                setloginReg(e.target.value);
              }}
              value={loginReg}
            />
            {meta.touched && meta.error && (
              <div className="meta3" style={{ color: "red" }}>
                {meta.error}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

interface ISign {
  loginReg: any;
  emailReg: any;
  passwordReg: any;
  navigation: any;
}

const SignButton = ({ navigation, loginReg, emailReg, passwordReg }: ISign) => {
  async function registerUser(event: any) {
    event.preventDefault();

    var result = "";
    var words =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    var max_position = words.length - 1;
    for (let i = 0; i < 25; ++i) {
      const position = Math.floor(Math.random() * max_position);
      result = result + words.substring(position, position + 1);
    }

    const response = await fetch(`${localHost}/auth/registration`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        login: loginReg,
        email: emailReg,
        password: passwordReg,
        userID: result,
      }),
    });
    const data = await response.json();

    if (data.user) {
      alert(" Your account is ready");
      navigation.navigate("Login");
    } else {
      alert("Try again");
    }
  }

  return (
    <div className="logbutton">
      <Button variant="contained" className="logbutton" onClick={registerUser}>
        create account
      </Button>
    </div>
  );
};
interface IBack {
  navigation: any;
}
const BackLoginButton = ({ navigation }: IBack) => {
  return (
    <div className="logbutton">
      <Button
        variant="contained"
        className="logbutton"
        onClick={() => navigation.navigate("Login")}
      >
        to login
      </Button>
    </div>
  );
};

const onSubmit = () => {
  debugger;
};

const validate = (e: any) => {
  const errors: { password?: string; email?: string; login?: string } = {};
  if (e.password && e.password.length < 5) {
    errors.password = "Short password";
  } else errors.password = "";
  if (e.email && !e.email.includes("@")) {
    errors.email = "Invalid email";
  } else errors.email = "";
  if (e.login && e.login.length < 6) {
    errors.login = "Invalid login";
  } else errors.login = "";

  return errors;
};

const Registration = ({ navigation }: IRegistration) => {
  const [loginReg, setloginReg] = useState<string>("");
  const [emailReg, setemailReg] = useState<string>("");
  const [passwordReg, setpasswordReg] = useState<string>("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div className="login1">
        <h1 className="hlog">Registration</h1>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldLogin setloginReg={setloginReg} loginReg={loginReg} />

              <FieldFirst setemailReg={setemailReg} emailReg={emailReg} />

              <FieldSecond
                setpasswordReg={setpasswordReg}
                passwordReg={passwordReg}
              />
              <div className="navigateButtons">
                <SignButton
                  navigation={navigation}
                  loginReg={loginReg}
                  emailReg={emailReg}
                  passwordReg={passwordReg}
                />

                <BackLoginButton navigation={navigation} />
              </div>
            </form>
          )}
        ></Form>
      </div>
    </View>
  );
};

export default Registration;
