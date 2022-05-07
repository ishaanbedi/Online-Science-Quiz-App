import styled from 'styled-components';


type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 60px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
    correct
      ? 'linear-gradient(90deg, #56FFA4, #59BC86)'
      : !correct && userClicked
        ? 'linear-gradient(90deg, #FF5656, #955374)'
        : 'linear-gradient(90deg, #df8037, #8a4c84)'};
    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
