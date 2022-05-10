import { supabase } from "../../supabaseClient";

export const loginHandleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log("user", user);
      console.log("session", session);
      console.log("error", error);
    } catch (error) {
      console.error("something went wrong");
    } finally {
      console.log("all went well");
   
    }
};

export  const SignupHandleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const { user, session, error } = await supabase.auth.signUp(
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
      console.log("user", user);
      console.log("session", session);
      console.log("error", error);
      if (error.status === 422) {
        console.log("password length should be more than 6 char");
      }
    } catch (error) {
      console.error("something went wrong", error);
    } finally {
      console.log("all went well");
    }
  };