import { useState } from 'react';

import useModal from 'hooks/useModal';
import usePreQuestion from 'hooks/usePreQuestion';
import useSnackbar from 'hooks/useSnackbar';

import { MESSAGE } from 'constants/constants';

import { PreQuestionCustomHookType, PreQuestionParticipantType } from 'types/preQuestion';
import { ParticipantType } from 'types/team';

const usePreQuestionModal = () => {
  const { isModalOpen, onClickOpenModal, onClickCloseModal } = useModal();
  const { preQuestion, getPreQuestion, deletePreQuestion } = usePreQuestion();
  const { showSnackbar } = useSnackbar();
  const [preQuestionParticipant, setPreQuestionParticipant] = useState({} as ParticipantType);

  const onClickOpenPreQuestionModal = async ({ participant }: PreQuestionParticipantType) => {
    await getPreQuestion({ levellogId: participant.levellogId });
    onClickOpenModal();
    setPreQuestionParticipant(participant);
  };

  const onClickDeletePreQuestion = async ({
    levellogId,
    preQuestionId,
  }: Pick<PreQuestionCustomHookType, 'levellogId' | 'preQuestionId'>) => {
    await deletePreQuestion({
      levellogId,
      preQuestionId,
    });
    onClickCloseModal();
    showSnackbar({ message: MESSAGE.PREQUESTION_DELETE_CONFIRM });
  };

  return {
    preQuestion,
    preQuestionParticipant,
    isPreQuestionModalOpen: isModalOpen,
    onClickOpenPreQuestionModal,
    onClickDeletePreQuestion,
    handleClickClosePreQuestionModal: onClickCloseModal,
  };
};

export default usePreQuestionModal;
