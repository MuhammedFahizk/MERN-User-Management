import { useDispatch } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, Input, notification, Form } from "antd";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Div from "../../common/Div";
import Text from "../../common/Text";
import { loginUser } from "../../../services/postApi";
import { setAccessToken } from '../../../Redux/feathers/auth';

const Login = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFinish = async (data) => {
    try {
      const response = await loginUser(data);
      const {accessToken} = response.data;
      dispatch(setAccessToken(accessToken))
      notification.success({ message: "Signup successful!", description: response.message });
    } catch (error) {
      notification.error({ message: "Signup failed", description: error.message });
    }
  };
  return (
    <Form
      className="w-[400px] mx-auto" 
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit(onFinish)}
    >
      <Form.Item
        name="email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email ? errors.email.message : ""}
      >
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Email"
              prefix={<MdAlternateEmail />}
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="password"
        validateStatus={errors.password ? "error" : ""}
        help={errors.password ? errors.password.message : ""}
      >
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Password"
              prefix={<RiLockPasswordLine />}
              size="large"
              className="mb-4"
              visibilityToggle
            />
          )}
        />
      </Form.Item>
      <Div className={'flex justify-between h-full items-top'}>
        <Form.Item
          className=" "
          name="remember"
          valuePropName="checked"
          validateStatus={errors.remember ? "error" : ""}
          help={errors.remember ? errors.remember.message : ""}
        >
          <Controller
            control={control}
            rules={{
              required: "You must agree to the terms",
            }}
            name="remember"
            render={({ field }) => (
              <Checkbox className="ms-auto" {...field}>
                Remember me
              </Checkbox>
            )}
          />
        </Form.Item>
        <Text className={'mt-1 cursor-pointer text-blue-400'}>
          Forgot Password?
        </Text>
      </Div>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
