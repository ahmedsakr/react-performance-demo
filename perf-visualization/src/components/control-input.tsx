import styled from "styled-components"
import { SMALL_SCREEN_BREAKPOINT } from "../breakpoints";

const InputBox = styled.div`
  display: flex;

  @media only screen and (max-width: ${SMALL_SCREEN_BREAKPOINT}) {
    flex-direction: column;
  }

  @media only screen and (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    flex-direction: row;
    column-gap: 16px;
    justify-content: space-between;
  }
`;

const InputText = styled.text`
  font-size: 14px;
  font-weight: bold;
`

interface ControlInputProps {
  inputName: string;
  inputValue: string;
  onInputChange: (newInput: string) => void;
  onLoseFocus: () => void;
}

export const ControlInput = ({ inputName, inputValue, onInputChange, onLoseFocus }: ControlInputProps) => {


  return (
    <InputBox>
      <InputText>{inputName}</InputText>
      <input type="text" onChange={(event) => onInputChange((event.target as HTMLInputElement).value)} value={inputValue} onBlur={onLoseFocus}/>
    </InputBox>
  )
}