import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const param = useParams();
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryKey: ["events", param.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: param.id }),
    staleTime: 10000
  });

  /* FAZENDO USO DA ATUALIZAÇÃO DOS DADOS VIA ROUTER+REACT-QUERY COM ACTION. ABAIXO SOMENTE COM REACT-QUERY
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    //atualizar imediatamente a página após fechar o modal com os dados atualizados do formulário
    //atualizando com novos dados e cancelando dados antigos do cache
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ["events", param.id] });

      const previousEvent = queryClient.getQueryData(["event", param.id]);
      queryClient.setQueryData(["events", param.id], newEvent);

      return { previousEvent };
    },
    //caso ocorra um erro em atualizar a página com os novos dados ela retorna com os dados anteriores
    onError: (data, error, context) => {
      queryClient.setQueryData(["events", param.id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", param.id]);
    },
  });*/

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
    // mutate({ id: param.id, event: formData });
    // navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to fetch the event"
          message={
            error?.info.message || "Failed to load the event. Try again later"
          }
        />
        <div className="form-actions">
          <Link to="../">
            <button className="button">Okay</button>
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedFormData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedFormData });
  await queryClient.invalidateQueries(["events", params.id]);
  return redirect("../");
}
