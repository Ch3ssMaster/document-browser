import { Form, Input, Button, Alert } from "antd";
import faker from "faker";
import { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewDocument, nextKey } from "../store/documentSlice";

const NewDoc = () => {
  const dispatch = useDispatch();
  const key = useSelector(nextKey);
  const status = useSelector((state) => state.document.status);
  const error = useSelector((state) => state.document.error);
  const savingNewDocument = useSelector(
    (state) => state.document.documents.addingDocument
  );
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let createNewDocument = {
      key: key,
      channel: faker.random.arrayElement(["PDF", "SMS"]),
      name: values.newDoc,
      group: faker.random.arrayElement([
        "Receipts",
        "Finitech",
        "Users",
        "RRHH",
      ]),
      status: faker.random.arrayElement([
        "Received",
        "Printed",
        "Sorted",
        "Folded",
        "Delivered",
      ]),
      modified: faker.date.recent(),
      type: faker.random.arrayElement(["Prior", "Non-prior", "Regist."]),
      address: faker.system.directoryPath(),
    };

    dispatch(addNewDocument(createNewDocument)).then(() => {
      form.setFieldsValue({
        newDoc: "",
      });
    });
  };

  return (
    <Fragment>
      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item label="Doc. Name" name="newDoc" rules={[{ required: true }]}>
          <Input placeholder="create new doc." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            + Add New
          </Button>
        </Form.Item>
      </Form>
      {savingNewDocument && status === "Failed" && (
        <Alert
          message={status + " saving a new document"}
          description={error}
          type="error"
          closable
        />
      )}
      {savingNewDocument && status === "Succeeded" && (
        <Alert
          message={status + " saving a new document"}
          description="A new document was successfully saved!"
          type="success"
          closable
        />
      )}
    </Fragment>
  );
};

export default NewDoc;
