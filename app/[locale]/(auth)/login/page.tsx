import { LoginForm } from "@/components/forms/login";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
                <CardDescription>
                    إملء المعلومات التالية لدخول لمنطقة الأدمين.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <LoginForm />
            </CardContent>
        </Card>
    );
}
