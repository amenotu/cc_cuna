interface Response {
  status?: number;
  statusText?: string;
  qualificationStatus: null | boolean;
  dqMsg?: string;
}

interface Request {
  url: string;
  method: string;
  body: string;
  headers: {};
  mode: string;
  redirect: string;
  referrerPolicy: string;
}

export const mockPost = (requestObj: Request) => {
  console.log("REQUEST OBJECT FROM MOCKPOST: ", requestObj);

  const parsedRequestObj = JSON.parse(requestObj.body);
  const aFifthOfEYI = parsedRequestObj.estimatedYearlyIncome / 5;

  let response: Response = {
    status: undefined,
    statusText: undefined,
    qualificationStatus: null,
  };

  if (parsedRequestObj.autoPurchasePrice > 1000000) {
    response.status = 400;
    response.statusText = "Bad Request";
  } else {
    if (
      parsedRequestObj.autoPurchasePrice > aFifthOfEYI ||
      parsedRequestObj.estimatedCreditScore < 600
    ) {
      response.status = 200;
      response.statusText = "Success";
      response.qualificationStatus = false;
      response.dqMsg = "some Lorem Ispsum";
    } else {
      response.status = 200;
      response.statusText = "Success";
      response.qualificationStatus = true;
    }
  }

  return new Promise<Response>((resolve) => {
    resolve(response);
  });
};
