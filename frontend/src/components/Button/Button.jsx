import styled from "styled-components";
import { defaultTheme, typeScale } from "../../utils";

//base button // & use to nest the css
const Button = styled.button`
  padding: 12px 24px;
  font-size: ${typeScale.paragraph};
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: "Roboto Mono", monospace;
  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: ${defaultTheme.primaryColorHover};
    color: ${defaultTheme.textColorOnPriamry};
  }
`;

//inherit from the base button
const PrimaryButton = styled(Button)`
  background-color: ${defaultTheme.primaryColorHover};
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
`;

export const SecondaryButton = styled(Button)`
  background: none;
  border: 2px solid ${defaultTheme.primaryColor};
  color: ${defaultTheme.primaryColor};
`;

export const TertiaryButton = styled(Button)`
  background: none;
  border: none;
  color: ${defaultTheme.primaryColor};
`;
export default PrimaryButton;
