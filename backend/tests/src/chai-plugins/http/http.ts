import { AssertionConstants } from '~/lib/common/constants/constants';
import { Response } from '~/lib/common/types/types';

const chaiHttp: Chai.ChaiPlugin = ({ Assertion }) => {
  Assertion.addMethod('status', function (expectedStatus: number) {
    const response = this._obj as Response;

    this.assert(
      response.statusCode === expectedStatus,
      'Expected response to have status #{exp}, but got #{act}',
      'Expected response not to have status #{act}',
      expectedStatus,
      response.statusCode,
    );
  });

  Assertion.addProperty('normalExecutionTime', function () {
    const response = this._obj as Response;

    this.assert(
      response.durationMs <= AssertionConstants.ResponseNormalExecutionTimeMs,
      'Expected response to have execution time less or equal to #{exp}ms, but got #{act}ms',
      'Expected response to have execution time more than #{exp}ms, but got #{act}ms',
      AssertionConstants.ResponseNormalExecutionTimeMs,
      response.durationMs,
    );
  });
};

export { chaiHttp };
