import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { doExcel } from "~/exceljs";

export const action = async ({ request }: ActionFunctionArgs) => {
  // const data = await request.json();
  // console.log(data);
  await doExcel();
  return redirect("/");
};
