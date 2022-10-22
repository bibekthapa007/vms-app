export const checkMimeType = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;

  let files = target.files as FileList;
  let err = [];
  let val = true;
  const types = ["image/png", "image/jpeg", "image/gif"];
  for (var x = 0; x < files.length; x++) {
    if (types.every((type) => files[x].type !== type)) {
      err[x] = files[x].type + " is not a supported format\n";
      val = false;
    }
  }
  for (var z = 0; z < err.length; z++) {
    console.log(err[z]);
    // bootbox.alert(err[z]);
    target.value = "";
  }
  return val;
};
export const maxSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  let files = target.files as FileList;

  if (files.length > 3) {
    const msg = "Only 3 images can be uploaded at a time";
    target.value = "";
    console.log(msg);

    // bootbox.alert(msg);
    return false;
  }
  return true;
};
export const checkFileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  let files = target.files as FileList;
  let size = 2000000;

  let err = [];
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err[x] = files[x].type + "is too large, please pick a smaller file\n";
    }
  }
  for (var z = 0; z < err.length; z++) {
    console.log(err[z]);
    // bootbox.alert(err[z]);
    target.value = "";
  }
  return true;
};

export const getVaccineLink = (link: string) => {
  let serverUrl = process.env.REACT_APP_SERVER_URL;
  if (!link) {
    return "/images/profile.png";
  } else if (link.startsWith("https://")) {
    return link;
  } else if (link.startsWith("data:image")) {
    return link;
  } else {
    return `${serverUrl}/${link}`;
  }
};
