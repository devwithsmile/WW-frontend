import { useGoogleLogin } from "@react-oauth/google";

const useGoogleAuth = (onSubmit) => {
  const login = useGoogleLogin({
    onSuccess: (googleData) => {
      console.log({ googleData });
      onSubmit({ googleData });
    },
  });

  return login;
};

export default useGoogleAuth;
