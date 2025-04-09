// // app/ClientHeader.tsx
// "use client";

// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
// import { usePathname } from 'next/navigation';
// import Header from './components/Header';


// export default function ClientHeader() {
//   const pathname = usePathname();
//   const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

//   if (isAuthPage) return null;

//   return (
//     <Header>
//       <SignedOut>
//         <SignInButton />
//         <SignUpButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </Header>
//   );
// }