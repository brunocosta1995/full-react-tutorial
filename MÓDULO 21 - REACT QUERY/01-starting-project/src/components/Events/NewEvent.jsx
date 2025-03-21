import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { createNewEvent, queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']});  //recarrega/fetch a página após ter sido adicionado o novo dado no backend, com base na key passada e usando o queryClient
      navigate('/events'); //navega para a página após a requisição mutate ter sido executada com sucesso-onSuccess
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submiting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create the event"
          message={
            error.info?.message ||
            "Failed to create the event. Check all of your inputs. Try again later!"
          }
        />
      )}
    </Modal>
  );
}
