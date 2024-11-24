import styled from "styled-components"
import { SMALL_SCREEN_BREAKPOINT } from "../breakpoints";
import { ExampleControlsValues } from "../examples/market-metadata-experiment/example.context";

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
  onSelect: (inputId: keyof ExampleControlsValues['changingProps']) => void;
}

const CheckboxOption = ({ selected, onSelect, id, text }: { selected: boolean, onSelect: () => void, id: string, text: string }) => (
  <div onClick={onSelect}>
    <input type="checkbox" id={id} name={id} checked={selected}/>
    <text>{text}</text>
  </div>
)

const PaddedOptions = styled.div`
  padding: 8px 16px 8px 16px;
`

export const ControlCheckboxes = ({ inputName, options, onSelect }: ControlInputProps) => {


  return (
    <InputBox>
      <InputText>{inputName}</InputText>
      <PaddedOptions>
        {options.map((option) => (
          <CheckboxOption
            selected={option.selected}
            onSelect={() => onSelect(option.id as keyof ExampleControlsValues['changingProps'])}
            id={option.id}
            text={option.text}
          />
        ))}
      </PaddedOptions>

    </InputBox>
  )
}