import Result from "../../models/Result";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const result = await $fetch<Result<any>>(
    `${config.public.apiEndpoint}register`,
    {
      method: "post",
      body: {
        username: body.username,
        password: body.password,
        firstname: body.firstname,
        lastname: body.lastname,
      },
    }
  );

  if (!result.success) {
    return { success: false, message: result.message };
  }

  deleteCookie(event, "auth");

  return { success: true, message: result.message };
});
