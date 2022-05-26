import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { supabase } from "../../supabaseClient";

const Input = styled("input")({
  display: "none",
});

export const UploadButtons = ({ setAvatar }) => {
  const uploadAvatar = async (event) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (data) {
        const { publicURL, error } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        setAvatar(publicURL);
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <label htmlFor="icon-button-file">
      <Input
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={uploadAvatar}
      />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  );
};
