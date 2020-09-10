interface Response {
  status?: number;
  statusText?: string;
  qualificationStatus?: boolean;
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
  const parsedRequestObj = JSON.parse(requestObj.body);
  const aFifthOfEYI = parsedRequestObj.estimatedYearlyIncome / 5;

  let response: Response = {
    status: undefined,
    statusText: undefined,
    qualificationStatus: undefined,
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
      response.dqMsg =
        "Facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Eaque ipsa quae ab illo inventore veritatis et quasi. Animi, id est laborum et dolorum fuga. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Itaque earum rerum hic tenetur a sapiente delectus. Excepteur sint occaecat cupidatat non proident, sunt in culpa. Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptate  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At vero eos et accusamus. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. Totam rem aperiam. Nihil molestiae consequatur, vel illum qui dolorem eum.";
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
