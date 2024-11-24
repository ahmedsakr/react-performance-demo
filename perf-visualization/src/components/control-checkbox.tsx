import styled from "styled-components"
import { SMALL_SCREEN_BREAKPOINT } from "../breakpoints";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputText = styled.text`
  font-size: 14px;
  font-weight: bold;
`

interface ControlInputProps {
  inputName: string;
  options: {
    id: string;
    text: string;
    selected: boolean;
  }[]
  onSelect: (inputId: string) => void;
}

const CheckboxOption = ({ selected, onSelect, id, text }: { selected: boolean, onSelect: () => void, id: string, text: string }) => (
  <div onClick={onSelect}>
    <input type="checkbox" id={id} name={id} checked={selected}/>
    <text>{text}</text>
  </div>
)

export const ControlCheckboxes = ({ inputName, options, onSelect }: ControlInputProps) => {


  return (
    <InputBox>
      <InputText>{inputName}</InputText>
      {options.map((option) => (
        <CheckboxOption
          selected={option.selected}
          onSelect={() => onSelect(option.id)}
          id={option.id}
          text={option.text}
        />
      ))}
    </InputBox>
  )
}