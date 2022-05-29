import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

export const login = async (requireData) => {
  return await supabase.auth.signIn(requireData);
};

export const SignupHandleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  try {
    const { user } = await supabase.auth.signUp(
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
    await supabase.from("profiles").insert([
      {
        id: user.id,
        username: data.get("name"),
        avatar_url: null,
        website: null,
        user_bio: null,
      },
    ]);
  } catch (error) {
    toast.error("something went wrong try later!");
  }
};
