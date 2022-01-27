import { Form } from "react-final-form";
import { View } from "react-native";
import TextField from "@mui/material/TextField";
import { Field } from "react-final-form";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { localHost } from "../constantsTodo";
import { addUser } from "../Actions/ActionsTodoList";
import { useDispatch } from "react-redux";

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

interface ITwice {
  setpasswordReg: any;
  passwordReg: any;
}
const FieldSecond = ({ setpasswordReg, passwordReg }: ITwice) => {
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

interface ISign {
  navigation: any;
  emailReg: any;
  passwordReg: any;
}

const SignButton = ({ navigation, emailReg, passwordReg }: ISign) => {
  const dispatch = useDispatch();
  async function loginUser(event: any) {
    event.preventDefault();

    const response = await fetch(`${localHost}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailReg,
        password: passwordReg,
      }),
    });
    const data = await response.json();

    if (data.user) {
      alert("Login Successfully");
      localStorage.setItem("accessToken", data.user.accessToken);
      localStorage.setItem("refreshToken", data.user.refreshToken);
      dispatch(
        addUser(
          data.user.email,
          data.user.userID,
          data.user.accessToken,
          data.user.refreshToken
        )
      );

      navigation.navigate("TodoList");
    } else {
      alert("Please check your email and password");
    }
  }
  return (
    <div className="logbutton">
      <Button variant="contained" className="logbutton" onClick={loginUser}>
        sign in
      </Button>
    </div>
  );
};
interface ISign2 {
  navigation: any;
}
const RegistrationBut = ({ navigation }: ISign2) => {
  return (
    <div className="logbutton">
      <Button
        variant="contained"
        className="logbutton"
        onClick={() => navigation.navigate("Registration")}
      >
        Registration
      </Button>
    </div>
  );
};

const onSubmit = () => {
  debugger;
};

const validate = (e: any) => {
  const errors: { password?: string; email?: string } = {};
  if (e.password && e.password.length < 5) {
    errors.password = "Short password";
  } else errors.password = "";
  if (e.email && !e.email.includes("@")) {
    errors.email = "Invalid email";
  } else errors.email = "";

  return errors;
};
interface ILOgin {
  navigation: any;
}
const Login = ({ navigation }: ILOgin) => {
  const [passwordReg, setpasswordReg] = useState("");
  const [emailReg, setemailReg] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div className="login">
        <h1 className="hlog">Login</h1>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldFirst setemailReg={setemailReg} emailReg={emailReg} />

              <FieldSecond
                setpasswordReg={setpasswordReg}
                passwordReg={passwordReg}
              />
              <div className="navigateButtons">
                <SignButton
                  navigation={navigation}
                  emailReg={emailReg}
                  passwordReg={passwordReg}
                />

                <RegistrationBut navigation={navigation} />
              </div>
            </form>
          )}
        ></Form>
      </div>
    </View>
  );
};

export default Login;
