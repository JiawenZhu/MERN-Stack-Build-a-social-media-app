export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg")
    err = "Image format is incorrect.";

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "profile_img");
    formData.append("cloud_name", "pengushe");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/pengushe-home/image/upload/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    const secure_url = data.secure_url.slice(0, 54) + "f_auto/" + data.secure_url.slice(54, data.secure_url.length);
    // console.log(secure_url);
    imgArr.push({ public_id: data.public_id, url: secure_url });
  }
  return imgArr;
};
