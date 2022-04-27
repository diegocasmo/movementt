// Transform a yup error object to the Formik expected error format (Rails-like)
// Note this is exactly what Formik does behind the scenes:
// https://github.com/jaredpalmer/formik/blob/master/src/Formik.tsx#L673
export const transformYupToFormikError = (yupError) => {
  let errors = {}
  if (yupError.inner.length === 0) {
    errors[yupError.path] = yupError.message
  } else {
    yupError.inner.forEach((err) => {
      if (!errors[err.path]) {
        errors[err.path] = err.message
      }
    })
  }
  return errors
}
