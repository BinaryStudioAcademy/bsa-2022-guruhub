type UserSignInRequestDto = import('guruhub-shared').UserSignInRequestDto;

declare namespace globalThis {
  // Won't work with let or const
  // eslint-disable-next-line no-var
  var testsConfig: {
    prefixUrl: string;
    users: {
      student: UserSignInRequestDto;
      jsMentor: UserSignInRequestDto;
      pythonMentor: UserSignInRequestDto;
      csharpMentor: UserSignInRequestDto;
      interviewsManager: UserSignInRequestDto;
      interviewer: UserSignInRequestDto;
      categoriesManager: UserSignInRequestDto;
      mentoringManager: UserSignInRequestDto;
      uamManager: UserSignInRequestDto;
    };
  };
}
