export default function Tabs({ children, buttons, ButtonsContainer= "menu" }) {
  //recebendo componente dinamicamente via props - é necessário criar variável com letra maiuscula.
  // const ButtonsContainer = buttonsContainer;

  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
