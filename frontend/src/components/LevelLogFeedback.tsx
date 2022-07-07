import React, { useRef } from 'react';
import styled from 'styled-components';

import Input from './@commons/Input';
import SmallInput from './@commons/SmallInput';
import Button from './@commons/Button';
import { FeedbackAddContainer } from './@commons/Style';
import { useFeedback } from '../hooks/useFeedback';
import { FeedbackType } from '../types';

const LevelLogFeedback = () => {
  const { feedbackAdd } = useFeedback();
  const feedbackRef = useRef([]);

  const handleSubmitFeedbackForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [name, study, speak, etc] = feedbackRef.current;
    const feedbackResult: Omit<FeedbackType, 'id'> = {
      name: name.value,
      feedback: {
        study: study.value,
        speak: speak.value,
        etc: etc.value,
      },
    };

    feedbackAdd(feedbackResult);
  };

  return (
    <FeedbackAddContainer>
      <h2>피드백 입력화면</h2>
      <FormStyle onSubmit={handleSubmitFeedbackForm}>
        <SmallInput
          labelText={'You?'}
          inputRef={(el: HTMLInputElement) => (feedbackRef.current[0] = el)}
        />
        <Input
          labelText={'학습 측면에서 좋은 점과 부족한 점은?'}
          inputRef={(el: HTMLInputElement) => (feedbackRef.current[1] = el)}
        />
        <Input
          labelText={'인터뷰, 말하기 측면에서 좋은 점과 개선할 부분은?'}
          inputRef={(el: HTMLInputElement) => (feedbackRef.current[2] = el)}
        />
        <Input
          labelText={'기타 피드백 (위 2 질문 외에 다른 피드백도 주세요.)'}
          inputRef={(el: HTMLInputElement) => (feedbackRef.current[3] = el)}
        />
        <Button>등록!</Button>
      </FormStyle>
    </FeedbackAddContainer>
  );
};

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export default LevelLogFeedback;