import api from "service/api";

export async function sendEmail(data) {
  return api.post("/admin/email", data);
}
