import { redirect } from "next/navigation";

export default function November27Root() {
  // Если кто-то зайдет на /november27 — перебросим на дефолтную локаль
  redirect("/november27/en");
}
