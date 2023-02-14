import Result from "../../models/Result";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const result = await $fetch<Result<any>>(
    `${config.public.apiEndpoint}login`,
    {
      method: "post",
      body: { username: body.username, password: body.password },
    }
  );

  if (!result.success) {
    return { success: false, message: result.message };
  }

  setCookie(event, "auth", result.data);

  return { success: true, message: result.message };
});
