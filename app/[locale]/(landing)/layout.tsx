import Footer from "./_res/footer";
import Header from "./_res/header";
import WhatsappFloatIcon from "./_res/whatsapp-float-icon";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsappFloatIcon />
        </>
    );
}
