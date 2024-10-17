import React, { useState } from "react";
import { Modal, Input, Form, Button, Select, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { updateProfile } from "../../../services/patchApi";

const { Option } = Select;

const EditModal = ({ visible, onClose, user }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      locationName: user.locationName,
    },
  });

  const onFinish = async (data) => {
    try {
      setLoading(true);
      console.log("Updated data:", data);
      await updateProfile(data);
      notification.success({ message: "Profile updated successfully!" });
      onClose();
    } catch (error) {
      notification.error({
        message: "Update failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit(onFinish)} loading={loading}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item
          label="Username"
          validateStatus={errors.username ? "error" : ""}
          help={errors.username ? errors.username.message : ""}
        >
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <Input placeholder="Enter your username" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Email"
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
              <Input placeholder="Enter your email" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone ? errors.phone.message : ""}
        >
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/, 
                message: "Phone number must be exactly 10 digits",
              },
            }}
            render={({ field }) => (
              <Input placeholder="Enter your phone number" {...field} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          validateStatus={errors.gender ? "error" : ""}
          help={errors.gender ? errors.gender.message : ""}
        >
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <Select placeholder="Select your gender" {...field}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Location"
          validateStatus={errors.locationName ? "error" : ""}
          help={errors.locationName ? errors.locationName.message : ""}
        >
          <Controller
            control={control}
            name="locationName"
            render={({ field }) => (
              <Input placeholder="Enter your location" {...field} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
