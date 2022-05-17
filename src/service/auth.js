import { supabase } from "../supabaseClient";

export const login = async (requireData) => {
  console.log(requireData);
  return await supabase.auth.signIn(requireData);
};

export const SignupHandleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  try {
    await supabase.auth.signUp(
      {
        email: data.get("email"),
        password: data.get("password"),
      },
      {
        data: {
          user_name: data.get("name"),
        },
      }
    );
  } catch (error) {
    console.error("something went wrong", error);
  } finally {
    console.log("all went well");
  }
};
