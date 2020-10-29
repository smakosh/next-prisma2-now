import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const PostForm = () => {
	const router = useRouter();

	return (
		<Formik
			initialValues={{
				title: "",
				content: "",
			}}
			validationSchema={Yup.object().shape({
				title: Yup.string().required(),
				content: Yup.string().required(),
			})}
			onSubmit={async ({ title, content }, { setSubmitting }) => {
				try {
					await axios.post('/api/create', {
						title,
						content
					});
					router.push("/");
				} catch (err) {
					alert(err.message)
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div>
						<Field style={{ width: "50%", marginBottom: 10 }} name="title" />
						<ErrorMessage name="title" />
					</div>
					<div>
						<Field
							component="textarea"
							rows={8}
							style={{ width: "50%", marginBottom: 10 }}
							name="content"
						/>
						<ErrorMessage name="content" />
					</div>
					<button
						type="submit"
						style={{ marginBottom: 10 }}
						disabled={isSubmitting}
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default PostForm