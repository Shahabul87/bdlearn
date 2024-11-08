// "use client";

// import { 
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader
// } from "@/components/ui/card";
// import { Header } from "@/components/auth/header";
// import { Social } from "@/components/auth/social";
// import { BackButton } from "@/components/auth/back-button";

// interface CardWrapperProps {
//   children: React.ReactNode;
//   headerLabel: string;
//   backButtonLabel: string;
//   backButtonHref: string;
//   showSocial?: boolean;
// };

// export const CardWrapper = ({
//   children,
//   headerLabel,
//   backButtonLabel,
//   backButtonHref,
//   showSocial
// }: CardWrapperProps) => {
//   return (
//     <Card className="w-[500px] shadow-md">
//       <CardHeader>
//         <Header label={headerLabel} />
//       </CardHeader>
//       <CardContent>
//         {children}
//       </CardContent>
//       {showSocial && (
//         <CardFooter>
//           <Social />
//         </CardFooter>
//       )}
//       <CardFooter>
//         <BackButton
//           label={backButtonLabel}
//           href={backButtonHref}
//         />
//       </CardFooter>
//     </Card>
//   );
// };

"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import clsx from 'clsx';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string; // Optional className prop for custom styling
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className
}: CardWrapperProps) => {
  return (
    <Card className={clsx("shadow-sm", className)}>
      <CardHeader>
        <Header label={headerLabel} className="text-gray-100"/>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          className="text-white/80 md:text-md hover:text-cyan-500 font-semibold tracking-wide"
        />
      </CardFooter>
    </Card>
  );
};

