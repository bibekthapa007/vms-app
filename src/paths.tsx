const paths = {
  home: "/",
  signin: "/auth/signin",
  signup: "/auth/signup",
  vaccine: "/vaccine",
  createVaccine: "/vaccine/create",

  updateVaccine(id: string) {
    return `/vaccine/edit/${id}`;
  },
};

export default paths;
