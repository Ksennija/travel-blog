import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { Feedback } from "../types";
import { fetchFeedbacks, createFeedback } from "../api/feedacksApi";
import styles from "./Feedback.module.css";

export type Props = {
  feedbacks: Feedback[];
};

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const feedback = (await createFeedback(formData)) as Feedback;
  return { feedback };
}

export async function loader() {
  const feedbacks = await fetchFeedbacks();
  return { feedbacks };
}

export const Feedbacks: React.FC = () => {
  const { feedbacks } = useLoaderData() as Props;

  return (
    <div className={styles.feedbacksContainer}>
      {feedbacks.length ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <div>{feedback.name}</div>
              <div>{feedback.description}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>The list is empty</i>
        </p>
      )}

      <Form method="post" id="contact-form">
        <p>
          <span>Country Name</span>
          <input
            placeholder="User Name"
            aria-label="User Name"
            type="text"
            name="name"
          />
        </p>
        <label>
          <span>Description</span>
          <textarea name="description" rows={6} />
        </label>
        <p>
          <button type="submit">Save</button>
        </p>
      </Form>
    </div>
  );
};
