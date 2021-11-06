import Resizer from "react-image-file-resizer";

const blobToFile = (blob, fileName = "default-name.jpg", type = "image/jpeg") => {
  const file = new File([blob], fileName, { type });
  return file;
};

const loadImageFile = async (url) => {
  const filename = "profile-picture.jpg";
  const file = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => blobToFile(blob, filename));
  return file;
};

const SIZE_LIMIT = 4194304; // 4mb
const MAX_LENGTH = 540;

const resizeImageFile = (file) => {
  // console.log("original file size", file.size);
  // console.log("compress should", file?.size ? Math.min(SIZE_LIMIT, file.size) * 100 / file.size : 0);
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      MAX_LENGTH, // ratio preserved
      MAX_LENGTH, // ratio preserved
      "JPEG",
      file?.size ? Math.min(SIZE_LIMIT, file.size) * 100 / file.size : 0,
      0,
      (uri) => resolve(uri),
      "blob"
    );
  });
}

export const convertImageUrlToFile = async (url) => {
  const file = await loadImageFile(url);
  console.log("original file", file);
  const resizedBlob = await resizeImageFile(file);
  const resizedFile = blobToFile(resizedBlob);
  console.log("resized file", resizedFile);
  return resizedFile;
};
