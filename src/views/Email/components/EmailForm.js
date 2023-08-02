// import { RichTextEditor } from "components/shared";
import {
  Button,
  FormContainer,
  FormItem,
  Input,
  Notification,
  toast,
} from "components/ui";
import { Field, Form, Formik } from "formik/dist";
import React, { forwardRef, useState } from "react";
import * as Yup from "yup";
import { IoSend } from "react-icons/io5";
import { sendEmail } from "service/emailService";
import MyEditor from "views/common/MyEditor";

const validationSchema = Yup.object().shape({
  from: Yup.string().required("Sender Required"),
  to: Yup.string().required("Receiver Required"),
  subject: Yup.string().required("Subject Required"),
});

const EmailForm = forwardRef((props, ref) => {
  const { formikRef } = ref || {};
  const [editorData, setEditorData] = useState();

  const onSend = async (values, setSubmitting) => {
    setSubmitting(true);
    try {
      console.log("editorData", editorData);
      const emailData = {
        to: values.to,
        subject: values.subject,
        body: editorData,
      };

      const response = await sendEmail(emailData);

      if (response.success) {
        toast.push(<Notification type="success" title={response.message} />, {
          placement: "top-center",
        });
      } else {
        toast.push(
          <Notification
            type="danger"
            title={`Email Not Sent, Please Try Again`}
          />,
          {
            placement: "top-center",
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  };

  return (
    <div className="mb-2">
      <Formik
        innerRef={formikRef}
        initialValues={{
          from: "pranav@sapientcodelabs.xyz",
          to: "",
          subject: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          await onSend(values, setSubmitting);
          resetForm({ values: "" });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="From"
                labelClass="!justify-start"
                invalid={errors.from && touched.from}
                errorMessage={errors.from}
              >
                <Field
                  disabled
                  autoComplete="off"
                  name="from"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="To"
                labelClass="!justify-start"
                invalid={errors.to && touched.to}
                errorMessage={errors.to}
              >
                <Field autoComplete="off" name="to" component={Input} />
              </FormItem>
              <FormItem
                label="Subject"
                labelClass="!justify-start"
                invalid={errors.subject && touched.subject}
                errorMessage={errors.subject}
              >
                <Field autoComplete="off" name="subject" component={Input} />
              </FormItem>
              <FormItem
                className="mb-0"
                labelClass="!justify-start"
                invalid={errors.message && touched.message}
                errorMessage={errors.message}
              >
                {/* {({ field, form }) => (
                    <RichTextEditor
                      ref={editorRef}
                      value={field.value}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    />
                  )} */}
                <MyEditor setEditorData={setEditorData} />
              </FormItem>
              <div className="md:flex items-center my-4">
                <Button size="sm" className="ltr:mr-3 rtl:ml-3" type="button">
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  icon={<IoSend />}
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default EmailForm;
