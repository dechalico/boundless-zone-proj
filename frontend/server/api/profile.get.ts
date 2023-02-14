import Result from "../../models/Result";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = getCookie(event, "auth");

  if (!cookie) {
    return { success: false, message: "Unable to authenticate account" };
  }

  const result = await $fetch<Result<any>>(
    `${config.public.apiEndpoint}account`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );

  if (!result.success) {
    return { success: false, message: result.message };
  }

  return { success: true, message: result.message, data: result.data };
});
