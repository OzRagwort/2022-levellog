import React from 'react';
import styled from 'styled-components';
import { useFeedback } from '../hooks/useFeedback';

import { FeedbackType } from '../types';
import Button from './@commons/Button';

const Feedback = ({ userFeedback, requsetFeedbackLookup }: FeedbackProps) => {
  const { feedbackDelete } = useFeedback();
  const {
    id,
    name,
    feedback: { study, speak, etc },
  } = userFeedback;

  const handleClickDeleteButton = async () => {
    await feedbackDelete(id);
    requsetFeedbackLookup();
  };

  return (
    <FeedbackContent>
      <div>
        <h3>{name}의 피드백</h3>
        <Button onClick={handleClickDeleteButton}>삭제</Button>
      </div>
      <hr />
      <h3>학습 측면에서 좋은 점과 부족한 점은?</h3>
      <p>{study}</p>
      <h3>인터뷰, 말하기 측면에서 좋은 점과 개선할 부분은?</h3>
      <p>{speak}</p>
      <h3>기타 피드백 (위 2 질문 외에 다른 피드백을 주새요.)</h3>
      <p>{etc}</p>
    </FeedbackContent>
  );
};

interface FeedbackProps {
  userFeedback: FeedbackType;
  requsetFeedbackLookup: Function;
}

const FeedbackContent = styled.div`
  height: 300px;
  width: 700px;
  overflow: auto;
  padding: 10px;
  border: 1px solid black;
  margin: 30px;
`;

export default Feedback;