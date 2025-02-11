import { useActionState, use, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

function isNotEmpty(value) {
  return value.trim() !== "";
}

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  const [formState, formAction] = useActionState(opinionAction, {
    errors: null,
  });

  async function opinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!isNotEmpty(userName) || userName.trim().length < 6) {
      errors.push("Enter with a usernamen that has a least six characters");
    }

    if (!isNotEmpty(title)) {
      errors.push("Enter with a title");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Enter with a opinion that has between 6 and 300 characters");
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ userName, title, body });

    return {
      errors: null,
    };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit/>
      </form>
    </div>
  );
}
