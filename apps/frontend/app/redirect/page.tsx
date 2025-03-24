import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect("/"); // This will let middleware do the redirect to preferred language + dashboard
}
