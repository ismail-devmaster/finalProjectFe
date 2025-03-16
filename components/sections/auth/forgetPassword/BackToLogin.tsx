import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackToLogin = () => (
  <div className="text-center">
    <Link
      href="/auth/login"
      className="text-sm text-primary hover:underline inline-flex items-center"
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
    </Link>
  </div>
);

export default BackToLogin;
