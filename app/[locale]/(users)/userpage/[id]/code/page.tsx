import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; 

const CodePage: React.FC = () => {
  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
        <Logo/>
      <CardContent className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-10">
          Pour accéder au code de la route :
        </h1>
        <Link href="https://lcode.ma/" target="_blank" passHref>
          <Button >
            Cliquez-ici
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CodePage;




  