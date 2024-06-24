import { Formik, Field, Form, FormikHelpers } from 'formik'

import styles from './Profile.module.css'

interface Values {
  firstName: string
  lastName: string
  email: string
}

const initialValues: Values = {
  firstName: '',
  lastName: '',
  email: '',
}

const Profile = () => (
  <div className={styles.container}>
    <h1>Profile page</h1>
    //TODO refactor with use Ant design form
    <Formik
      initialValues={initialValues}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 500)
      }}>
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="John" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
)

export default Profile
