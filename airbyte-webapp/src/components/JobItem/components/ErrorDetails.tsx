import { useIntl } from "react-intl";
import styled from "styled-components";

import { Button } from "components/base";

import { AttemptRead } from "core/request/AirbyteClient";

type IProps = {
  attempts?: AttemptRead[];
  setLogTimestamp: (t: number) => void;
};

const ExpandedFailureContainer = styled.div`
  font-size: 12px;
  line-height: 15px;
  padding: 10px;
  padding-left: 40px;
  color: ${({ theme }) => theme.greyColor40};
`;

const getFailureFromAttempt = (attempt: AttemptRead) => {
  return attempt.failureSummary?.failures[0];
};

const ErrorDetails: React.FC<IProps> = ({ attempts, setLogTimestamp }) => {
  const { formatMessage } = useIntl();

  if (!attempts || attempts.length === 0) {
    return null;
  }

  const getInternalFailureMessage = (attempt: AttemptRead) => {
    const failure = getFailureFromAttempt(attempt);
    const failureMessage = failure?.internalMessage ?? formatMessage({ id: "errorView.unknown" });

    return `${formatMessage({
      id: "sources.additionalFailureInfo",
    })}: ${failureMessage}`;
  };

  const attempt = attempts[attempts.length - 1];
  const failure = getFailureFromAttempt(attempt);

  if (!failure) {
    return null;
  }

  const jumpToLogTimestamp = () => {
    if (failure.timestamp) {
      setLogTimestamp(failure.timestamp);
    }
  };

  const internalMessage = getInternalFailureMessage(attempt);
  return (
    <ExpandedFailureContainer>
      {failure.timestamp ? (
        <>
          <Button size="m" secondary onClick={() => jumpToLogTimestamp()}>
            view
          </Button>{" "}
        </>
      ) : null}
      {internalMessage}
    </ExpandedFailureContainer>
  );
};

export default ErrorDetails;