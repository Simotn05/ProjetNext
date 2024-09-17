import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; // Import du composant Link

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



// const CodePage: React.FC = () => {
//     return (
//       <div className="flex items-center justify-center bg-white-100 mt-8">
//         <div className="bg-white p-10 w-96 h-45 rounded-lg shadow-lg ">
//           <p className="text-center text-sm ">
//             <strong className="text-xl">Pour accéder au code de la route : </strong><br/><br/>
//             <a href="https://lcode.ma/" target="_blank" className="font-bold text-lg text-red-600 hover:underline">
//               Cliquez-ici
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   };
  
//   export default CodePage;
  