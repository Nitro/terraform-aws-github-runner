import { logger } from './logger';
import { ActionRequestMessage, scaleUp } from './scale-runners/scale-up';

const sqsEvent = {
  Records: [
    {
      messageId: '',
      receiptHandle: '',
      body: {
        repositoryName: 'self-hosted',
        repositoryOwner: 'test-runners',
        eventType: 'workflow_job',
        id: 987654,
        installationId: 123456789,
      },
      attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '',
        SequenceNumber: '',
        MessageGroupId: '',
        SenderId: '',
        MessageDeduplicationId: '',
        ApproximateFirstReceiveTimestamp: '',
      },
      messageAttributes: {},
      md5OfBody: '',
      eventSource: 'aws:sqs',
      eventSourceARN: '',
      awsRegion: 'eu-central-1',
    },
  ],
};

export function run(): void {
  scaleUp(sqsEvent.Records[0].eventSource, sqsEvent.Records[0].body as ActionRequestMessage)
    .then()
    .catch((e) => {
      logger.error(e);
    });
}

run();
