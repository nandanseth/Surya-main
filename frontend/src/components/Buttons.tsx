import { Colors, transitionCss } from '../styles/styles';
import styled, { css } from 'styled-components';

const CreateNewPolicyButton = ({ onClick, textOverride }: { onClick?: any; textOverride?: string }) => {
  const text = 'Create new Policy' || textOverride;
  return (
    <CreateButton onClick={onClick}>
      <Span>
        <Plus src="/plus.png" />
      </Span>
      {text}
    </CreateButton>
  );
};

export const CreateButton = styled.button`
  background: linear-gradient(90deg, #f7fcff 0.64%, #f7fefb 97.71%);
  border-radius: 28.5px;
  padding: 8px 16px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${transitionCss}
  color: ${Colors.green};
  font: inherit;
  font-weight: 500;
  font-size: 14px;
  margin-left: 50px;
  :hover {
    transform: scale(1.01);
  }
`;

const Span = styled.span`
  margin-right: 6px;
`;

const Plus = styled.img`
  width: 26;
  height: 26px;
  object-fit: contain;
`;

const buttonBaseCss = css`
  border-radius: 28px;
  font-size: 16px;
  text-align: center;
  padding: 18px 24px;
  flex: 1 1 auto;
  margin: 0 4px;
`;

export const Save = styled.button`
  ${transitionCss}
  background: rgba(89, 195, 179, 0.125683);
  ${buttonBaseCss}
  color: #59C3B3;

  :hover {
    background: rgba(89, 195, 179, 0.4125683);
  }
`;

export const Cancel = styled.button`
  ${transitionCss}
  background: rgba(249, 250, 250, 1);
  ${buttonBaseCss}
  color: ${Colors.text};
  :hover {
    background: rgba(100, 100, 100, 0.7);
  }
`;

export const Close = styled.button`
  ${transitionCss}

  background: #F9FAFA;
  ${buttonBaseCss}
  mix-blend-mode: normal;
  border: 1px solid rgba(58, 86, 100, 0.08);
  box-sizing: border-box;
  border-radius: 28px;
  color: black;
  min-width: 200px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: uppercase;

  :hover {
    opacity: 0.68;
  }
`;

const Buttons = {
  CreateNewPolicyButton,
};

export default Buttons;
